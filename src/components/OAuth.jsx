import {useLocation, useNavigate} from'react-router-dom'
import {getAuth, signInWithPopup, GoogleAuthProvider} from 'firebase/auth'
import {doc, setDoc, getDoc, serverTimestamp} from 'firebase/firestore'
import {db} from '../firebase.config'
import {toast} from 'react-toastify'
import googleIcon from '../assets/svg/googleIcon.svg'

function OAuth() {
    const navigate = useNavigate()
    const location = useLocation()

    const handleGoogleLogin = async () => {
        try {
            const auth = getAuth()
            const provider = new GoogleAuthProvider()
            const result = await signInWithPopup(auth, provider)

            //check for user
            const user = result.user
            const docRef = doc(db, 'users', user.uid)

            const docSnap = await getDoc(docRef)
            //if user exist
            if(!docSnap.exists()) {
                await setDoc(doc(db, 'users', user.uid), {
                    name: user.displayName,
                    email: user.email,
                    timestamp: serverTimestamp()
                })
            }
            navigate('/')

        } catch (error) {
            toast.error('COuld not authorize with Google')
        }
    }
    return ( 
        <div className='socialLogin'>
            <p>Sign {location.pathname === '/sign-up' ? 'up' : 'in'}</p>
            <button className="socialIconDiv">
                <img className='socialIconImg' src={googleIcon}onClick={handleGoogleLogin} />
            </button>
        </div>
    );
}

export default OAuth
