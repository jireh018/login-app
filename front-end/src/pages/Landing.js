import React, { useEffect, useState } from 'react'
import { useAppContext } from '../context/appContext'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'

const Landing = () => {
  const navigate = useNavigate()
  const {user, showMe} = useAppContext()

  useEffect(()=> {
    showMe()
    if(user){
      setTimeout(()=>{
        navigate('/profile')
      }, 3000)
    }
  },[])

  // if(user === null){
  //   return <>
  //   <h1>No data fetched!</h1>
  //   <button
  //       className="w-100 bg-[#2cb1bc] hover:bg-[#19838b] text-white font-bold py-2 px-4 mt-2 rounded-full"
  //     >
  //       <Link to='/register'>Rgister or Login</Link>
  //     </button>
  //   </>
  // }
  
  return (
    <div>
      <h1>Landing Page</h1>
      <p>Welcome Please login to have access to the profile page</p>
      <button
        className="w-100 bg-[#2cb1bc] hover:bg-[#19838b] text-white font-bold py-2 px-4 mt-2 rounded-full"
      >
        <Link to='/register'>Rgister or Login</Link>
      </button>
    </div>
  )
}

export default Landing
