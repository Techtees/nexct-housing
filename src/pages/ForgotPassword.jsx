import {useState} from 'react'
import {Link} from 'react-router-dom'
import {getAuth, sendPasswordResetEmail} from 'firebase/auth'
import {toast} from 'react-toastify'
import {ReactComponent as ArrowrightIcon} from '../assets/svg/keyboardArrowRightIcon.svg'

function ForgotPassword() {
    const [email, setEmail] = useState('')

    const handleChange = (e) => {
        setEmail(e.target.value)
    }

    const handleSubmit = async(e) => {
        e.preventDefault()

        try {
            const auth = getAuth()
            await sendPasswordResetEmail(auth, email)
            toast.success("Email Was sent")

        } catch (error) {
            toast.error('Could not send rest email')
        }
        
    }
    return ( 
        <div className='pageContainer'>
            <header>
                <p className="pageHeader">Forgot Password</p>

                <main>
                    <form action="" onSubmit={handleSubmit}>
                        <input
                            type="text" 
                            className="emailInput"
                            placeholder='Email'
                            id='email'
                            value={email}
                            onChange = {handleChange}
                         />

                         <Link className='forgotPasswordLink' to='/sign-in'>Sign In</Link>

                         <div className="signInBar">
                            <div className="signInText">Send Reset Link</div>
                            <button className='signInButton'>
                                <ArrowrightIcon fill='#fff'width='34px' height='34px' />
                            </button>
                         </div>
                    </form>
                </main>
            </header>
        </div>
     );
}

export default ForgotPassword;