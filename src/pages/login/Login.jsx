import { useState, useEffect, React, useRef } from 'react'
import { useDispatch } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import BackgroundImg from '../../utils/images/IMG_6229.png'
import './login.scss'
import { login } from '../../redux/apiCalls'
import { ToastContainer } from 'react-toastify'
import { BsEye, BsFillEyeSlashFill } from 'react-icons/bs'

const Register = () => {
  // MISCELLANEOUS
  const toastId = useRef(null)
  const dispatch = useDispatch()

  // PASSWORD VISIBILITY
  const [showPassword, setShowPassword] = useState(false)

  // FUNCTION FOR PASSWORD TOGGLE
  const handlePasswordToggle = () => {
    setShowPassword((prev) => !prev)
  }

  // USER LOGIN DETAILS
  const [user, setUser] = useState({
    email: '',
    password: '',
  })
  const [userDetails, setUserDetails] = useState({
    name: '',
    role: '',
  })

  const [btnDisabled, setBtnDisabled] = useState(true)
  const navigate = useNavigate()

  //   FUNCTIONs FOR SETTING BUTTON STATE

  const handleSetUser = (event, inputType) => {
    setUser({ ...user, [inputType]: event.target.value })
  }
  const setBtnState = () => {
    if (user.email && user.password) {
      setBtnDisabled(false)
    } else {
      setBtnDisabled(true)
    }
  }
  //   END OF FUNCTIONs FOR SETTING BUTTON STATE

  // FUNCTION FOR ONCLICK LOGIN BUTTON
  const handleLogin = (e) => {
    e.preventDefault()
    login(dispatch, user, navigate, toastId)
  }
  // END OF FUNCTION FOR ONCLICK LOGIN BUTTON

  //   USE EFFECT FOR SETTING BUTTON STATE
  useEffect(() => {
    setBtnState(user, setBtnDisabled)
    sessionStorage.setItem('user', JSON.stringify(user))
  }, [user])

  return (
    <>
      <div className='loginWrapper'>
        <div className='loginWrapperLeft'>
          <img
            // src='blob:https://web.whatsapp.com/6cdf605b-5634-4bc1-9711-a671a348523c'
            src={BackgroundImg}
            // src={require('../../utils/images/BiopathLogo2.jpeg')}
            // src={require('../../utils/images/medicalimg.jpg')}
            alt=''
            // className='loginWrapperLeftImg'
            className='biopathImg'
          />
        </div>
        <div className='loginWrapperRight'>
          <form className='loginFormWrapper'>
            {/* <div className='loginTest'>Trying to test, click</div> */}
            <div className='loginHeading'>Log in</div>
            <div className='loginInputs'>
              <label htmlFor=''>Email</label>
              <input
                type='email'
                className='loginEmailInput loginInput'
                placeholder='example@****.com'
                data-testid='emailTestId'
                onChange={(e) => handleSetUser(e, 'email')}
              />
              <label htmlFor=''>Password</label>
              <div className='passwordWrapper'>
                <input
                  type={showPassword ? 'text' : 'password'}
                  className='loginPasswordInput loginInput'
                  placeholder='Password'
                  onChange={(e) => handleSetUser(e, 'password')}
                  data-testid='passwordTestId'
                />
                <span onClick={handlePasswordToggle}>
                  {showPassword ? <BsEye /> : <BsFillEyeSlashFill />}
                </span>
              </div>
              <Link to={'/getToken'}>
                <div className='forgotPassword'>Forgotten your password?</div>
              </Link>
            </div>

            <button
              className='loginBtn'
              type={'submit'}
              disabled={btnDisabled}
              data-testid='loginBtn'
              onClick={handleLogin}
            >
              Login
            </button>
          </form>
        </div>
      </div>
    </>
  )
}

export default Register
