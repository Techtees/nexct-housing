
import {useNavigate, Link} from 'react-router-dom'
import {getAuth} from 'firebase/auth'
import {useEffect, useState} from 'react'

function Profile() {
    const navigate = useNavigate()
    const auth = getAuth()
    // const [user, setUser] = useState(null)
    const {formData, setFormData} = useState({
        name: auth.currentUser.displayName,
        email: auth.currentUser.email
    })

    // useEffect(()=> {
    //     setUser(auth.currentUser)
    // }, [])


    const handleLogOut = () => {
        auth.signOut()
        navigate('/sign-in')
    }

    return (
        <div>
            <div className="profile">
                <div className="profileHeader">
                    <p className="pageHeader">My Profile</p>
                    <button  type="button" className="logOut" onClick={handleLogOut}>Logout</button>
                </div>
            </div>
        </div>
    )
}

export default Profile;