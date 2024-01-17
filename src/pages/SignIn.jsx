import {useState} from 'react'
import {Link, useNavigate} from 'react-router-dom'
import {getAuth, signInWithEmailAndPassword} from 'firebase/auth'
import {ReactComponent as ArrowRightIcon} from '../assets/svg/keyboardArrowRightIcon.svg'
import visibilityIcon from '../assets/svg/visibilityIcon.svg'
function SignIn() {

    const [showPassword, setShowPassword] = useState(false)
    const [formData, setFormData] = useState({
        email:'',
        password:'',
    })
    
    const {email, password } = formData


    const handleInputChange = (e) =>  {
        setFormData( (prevState) => {
          return {...prevState, [e.target.id]: e.target.value}
        })

    }

    const handleSubmit = async (e) => {
        e.preventDefault()

       try{
            const auth = getAuth()

            const userCredential = await signInWithEmailAndPassword(auth, email , password)

            if(userCredential.user) {
                navigate('/')
            }
        } catch(error) {
            console.log(error)
        }
    }

    const navigate = useNavigate()

    return ( 
        <>
            <div className="pageContainer">
                <header>
                    <p className="pageHeader">Welcome Back!</p>

                    <form onSubmit={handleSubmit}>
                        <input 
                            type="email"  placeholder="Email"
                            className="emailInput"
                            id="email"
                            value={email} 
                            onChange={handleInputChange} 
                            />
                        <div className="passwordInputDiv">
                            <input 
                                type={showPassword ? 'text' : 'password'}  className="passwordInput" placeholder="password"
                                value={password}
                                id="password"
                                onChange={handleInputChange}
                            />
                            <img 
                                src={visibilityIcon} alt="show password" className="showPassword"
                                onClick={()=> {setShowPassword((prevState) => !prevState)}}
                            /> 
                        </div>
                        <Link to='/forgot-password' className='forgotPasswordLink' >
                            Forgot Password
                        </Link>

                        <div className="signInBar">
                            <p className="signInText">
                                Sign In
                            </p>
                            <button                         className="signInButton">
                                <ArrowRightIcon fill="#fff" width='34px' height='34px' />
                            </button>
                        </div>
                        <Link to='/sign-up' className='registerLink'>Sign Up</Link>
                    </form>
                </header>
            </div>
        </>
     );
}

export default SignIn;