import React from 'react'
import { useState, useEffect } from 'react'
import {useNavigate} from 'react-router-dom'
import { useAppContext } from '../context/appContext'
import {
  Alert,
  FormInput,
} from '../components'
import EyeInvisibleOutlined from '@ant-design/icons/EyeInvisibleOutlined';
import EyeOutlined from '@ant-design/icons/EyeOutlined';

const initialState = {
  name:'',
  email:'',
  password:'',
  confirmPassword:'',
  isMember:false,
  isVisible:false,
}

const Register = () => {
  const navigate = useNavigate()
  const [values, setValues] = useState(initialState)
  const {showAlert, displayAlert, isLoading, setupUser, user} = useAppContext()

  const handleChange = (e) => {
    setValues({...values, [e.target.name]: e.target.value})
    validateInput(e)
  }

  const validateInput = (e) => {
    const {name, value} = e.target
    
    switch (name) {
      case 'name':
        if(!value)
          console.log('Please enter Name!.')
        break;
      case 'email':
        if(!value)
          console.log('Please enter Email.')
        break;
      // case 'password':
      //   if(!value){
      //     console.log('Please enter Password.')
      //   }else if(values.confirmPassword && value !== values.confirmPassword){
      //     console.log('Password and Confirm Password dont match.')
      //   }
          
      //   break;
      // case 'confirmPassword':
      //   if(!value){
      //     console.log('Please enter Confirm Password.')
      //   }
      //   else if(values.password && value !== values.password){
      //     console.log('Password and Confirm Password dont match.')
      //   }
      //   break;
      default:
        break;
    }
  }

  const toggleMember = () => {
    setValues({...values, isMember:!values.isMember})
  }

  const hideShowPassword = () => {
      setValues({...values, isVisible:!values.isVisible});
  };
  
  const onSubmit = (e) => {
    e.preventDefault();
    const {name, email, password, isMember} = values

    if(isMember){
      const currentUser = {email, password}
      setupUser({
        currentUser,
        endPoint: 'login',
        alertText: 'Login Successful! Redirecting...'
      })
    }else{
      const currentUser = {name, email, password}
      setupUser({
        currentUser,
        endPoint: 'register',
        alertText: 'Success! Please check your email to verify your account'
      })
    }
    // if(!name || !password || (!isMember && !name)){
    //   displayAlert()
    //   console.log('End onSubmit')
    //   return
    // }
    

  }

  useEffect(()=>{
    if(user){
      console.log('useEffect register user ', user)
      setTimeout(()=>{
        navigate('/profile')
      }, 3000)
    }
  }, [user, navigate])

  return (
    <div>
      <section className="bg-gray-50">
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
            <div className="flex items-center mb-6 text-2xl font-semibold text-gray-900">
                <img className="w-8 h-8 mr-2" src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/logo.svg" alt="logo" />
                Login-App 
            </div>
            <div className="w-full border border-t-[#19838b] bg-white rounded-lg shadow md:mt-0 sm:max-w-md xl:p-0">
                <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                    <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl">
                        {values.isMember? 'Login' : 'Register'} 
                    </h1>
                    {showAlert && <Alert />}
                    <form className="space-y-4 md:space-y-6" onSubmit={onSubmit}>
                    
                      {/** Name Input */}
                      {
                        !values.isMember &&
                      (
                      <FormInput 
                        type='text'
                        name='name'
                        value={values.name} 
                        handleChange={handleChange}
                        validateInput={validateInput}
                        labelText='Name' 
                        placeholder='your name'
                      />
                      )
                      }

                      {/** Email Input */}
                      <FormInput 
                        type='email'
                        name='email'
                        value={values.email} 
                        handleChange={handleChange}
                        validateInput={validateInput}
                        labelText='Email' 
                        placeholder='name@company.com'
                      />

                      {/** Password Input */}
                      <FormInput 
                        type={!values.isVisible ? 'password' : 'text'}
                        name='password'
                        value={values.password} 
                        handleChange={handleChange}
                        validateInput={validateInput}
                        labelText='Password' 
                        placeholder='••••••••'
                      />

                      {/** Confirm Password Input */}
                      {
                        !values.isMember &&
                      (
                      <FormInput 
                        type={!values.isVisible ? 'password' : 'text'}
                        name='confirmPassword'
                        value={values.confirmPassword} 
                        handleChange={handleChange}
                        validateInput={validateInput}
                        labelText='Confirm password' 
                        placeholder='••••••••'
                      />
                      )
                      }

                      {/**Check box to hide and show passwords */}
                      <div className="flex items-start">
                            <div className="flex items-center h-5">
                              <input 
                              type="checkbox" 
                              className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 
                              focus:ring-primary-300"
                              onClick={hideShowPassword}
                              />
                            </div>
                            <div className="ml-3 text-sm">
                              <label htmlFor="hideshow" className="font-light text-gray-500">
                                {!values.isVisible? 'show ' : 'hide ' }
                                password
                                </label>
                            </div>
                        </div>

                      {
                        !values.isMember &&
                      (
                        <div className="flex items-start">
                            <div className="flex items-center h-5">
                              <input 
                              id="terms" 
                              aria-describedby="terms" 
                              type="checkbox" 
                              className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 
                              focus:ring-primary-300" 
                              required />
                            </div>
                            <div className="ml-3 text-sm">
                              <label htmlFor="terms" className="font-light text-gray-500">I accept the <a className="font-medium text-primary-600 hover:underline" href="#">Terms and Conditions</a></label>
                            </div>
                        </div>
                        )
                        }

                        {/**Submit button */}
                      <button 
                        className="w-full bg-[#2cb1bc] hover:bg-[#19838b] text-white font-bold py-2 px-4 mt-2 rounded-full"
                        disabled={isLoading}
                      >
                        submit
                      </button>
                      <p className="text-center text-sm font-light text-gray-500">
                        {!values.isMember? 'Already a member? ' : 'Not a member yet? '} 
                          <button 
                            className='font-medium text-primary-600 hover:underline'
                            onClick={toggleMember}
                            >
                            <span className="font-medium text-primary-600 hover:underline">
                              {!values.isMember? 'Login' : 'Register'}
                            </span>
                          </button>
                      </p>
                    </form>
                </div>
            </div>
        </div>
      </section>
    </div>
  )
}

export default Register
