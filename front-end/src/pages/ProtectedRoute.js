import React, { useEffect } from 'react'
import { useAppContext } from '../context/appContext'
import {Navigate} from 'react-router-dom'

const ProtectedRoute = ({children}) => {
    const {user, userLoading} = useAppContext()

    if(!user){
        return <Navigate to='/' />
    }
  return children
}

export default ProtectedRoute