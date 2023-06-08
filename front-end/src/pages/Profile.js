import React, {useEffect, useState} from 'react'
import { useAppContext } from '../context/appContext'
import axios from 'axios'

const Profile = () => {
    const {user} = useAppContext
    const [name, setName] = useState(user?.name)
    const [id, setId] = useState(user?.userId)
    const [role, setRole] = useState(user?.role)

    const showMe = async () => {
        try {
          const {data} = await axios.get(`/api/v1/auth/show-me`)
          const {user} = data
          const {name, userId, role} = user
          setName(name)
          setId(userId)
          setRole(role)
          console.log('show me started', user)
        } catch (error) {
          console.log(error)
          logoutUser()
        }
      }

      const logoutUser = async () => {
        await axios.delete('api/v1/auth/logout');
      }

    const handleLogoutUser = () => {
        logoutUser()
    }

    useEffect(()=>{
        showMe()
    }, [])

  return (
    <div>
        <h1>User Profile</h1>
        <ul>
        <li>Name - {name}</li>
        <li>Id - {id}</li>
        <li>role - {role}</li>
      </ul>
      <button 
        className="w-100 bg-[#2cb1bc] hover:bg-[#19838b] text-white font-bold py-2 px-4 mt-2 rounded-full"
        onClick={logoutUser}
        >
        Logout
      </button>
    </div>
  )
}

export default Profile