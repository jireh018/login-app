import React, { useEffect, useState } from 'react'
import { useAppContext } from '../context/appContext'
import { Link, Navigate, useNavigate } from 'react-router-dom'
import axios from 'axios'

const Landing = () => {
  const navigate = useNavigate()
  const {user} = useAppContext()
  
  return (
    <React.Fragment>
      {user && <Navigate to='/profile' />}
      <div>
        <h1>Landing Page</h1>
        <p>Welcome Please login to have access to the profile page</p>
        <button
          className="w-100 bg-[#2cb1bc] hover:bg-[#19838b] text-white font-bold py-2 px-4 mt-2 rounded-full"
        >
          <Link to='/register'>Rgister or Login</Link>
        </button>
      </div>
    </React.Fragment>
  )
}

export default Landing
