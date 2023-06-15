import React, { useEffect, useState } from 'react'
import {Link, useSearchParams} from 'react-router-dom'
import { useAppContext } from '../context/appContext'

const VerifyEmail = () => {
    const {verifyEmail, alertText, emailVerified} = useAppContext()
    const [searchParams, setSearchParams] = useSearchParams();
    const [verificationToken, setVerificationToken] = useState(searchParams.get("token"))
    const [email, setEmail] = useState(searchParams.get("email"))

    const verify = () => {
        const verificationInfo = {verificationToken, email}
        verifyEmail({
            verificationInfo
        })
    }

  return (
    <div className='h-screen flex items-center justify-center'>
        <div className='flex'>
        {/* <img src={errorImg} alt='not found' /> */}
            <div className='flex-row text-center'>
                <h3 className='uppercase font-bold'>{emailVerified? alertText : 'Verify your Email'}</h3>
                {!emailVerified &&
                <button 
                    onClick={verify}
                    class="bg-[#2cb1bc] hover:bg-[#19838b] text-white font-bold py-2 px-4 mt-2 rounded-full"
                >
                Click to verify your email
                </button>}
                {emailVerified && <button class="bg-[#2cb1bc] hover:bg-[#19838b] text-white font-bold py-2 px-4 mt-2 rounded-full">
                <Link to='/'>Go To HomePage</Link>
                </button>}
            </div>
        </div>
    </div>
  )
}

export default VerifyEmail