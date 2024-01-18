
import {useNavigate, Link} from 'react-router-dom'
import { getAuth, updateProfile } from 'firebase/auth'
import { useState} from 'react'
import {updateDoc, doc} from 'firebase/firestore'
import {db} from '../firebase.config'
import {toast} from 'react-toastify'


function Profile() {
    const navigate = useNavigate()

    const [changeDetails, setChangeDetails] = useState(false)
    const auth = getAuth()
    // const [user, setUser] = useState(null)
    const [formData, setFormData] = useState({
        name: auth.currentUser.displayName,
        email: auth.currentUser.email,
    })

    const {name, email} = formData

    const handleLogOut = () => {
        auth.signOut()
        navigate('/sign-in')
    }

    const onSubmit = async () => {
       try {
            //update display name in firebase
            if(auth.currentUser.displayName !== name){
            await updateProfile(auth.currentUser,{
                displayName: name
            })

            //update in firestore
            const useRef = doc(db, 'users', auth.currentUser.uid)

            await updateDoc(useRef, {
                name,
            })
        }
       } catch (error) {
        console.log(error)
            toast.error('Could not update profile details')
       }
    }
    const handleProfileInputChange = (e) => {
        setFormData((prevState) => {
            return {...prevState, [e.target.id]: e.target.value}
        }
            
        )
    }

    return (
        <div>
            <div className="profile">
                <header className="profileHeader">
                    <p className="pageHeader">My Profile</p>
                    <button  type="button" className="logOut" onClick={handleLogOut}>Logout</button>
                </header>
                <main className="profileDetailsHeader">
                    <p className="profileDetailsText">Personal Details</p>
                    <p className="changePersonalDetails" onClick={() => {
                        changeDetails && onSubmit()
                        setChangeDetails((prevState) => !prevState)
                    }}>
                        {changeDetails ? 'done' :'change'}
                    </p>
                    <div className="profileCard">
                        <form>
                            <input 
                                type="text" 
                                id='name' 
                                className={!changeDetails ? 'profileName' : 'profileNameActive'} 
                                disabled={!changeDetails}
                                value={name}
                                onChange={handleProfileInputChange}
                            />
                            <input 
                                type="email" 
                                id='email' 
                                className={!changeDetails ? 'profileEmail' : 'profileEmailActive'} 
                                disabled={!changeDetails}
                                value={email}
                                onChange={handleProfileInputChange}
                            />
                        </form>
                    </div>
                </main>
            </div>
        </div>
    )
}

export default Profile;