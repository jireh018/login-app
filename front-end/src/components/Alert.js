import React from 'react'
import { useAppContext } from '../context/appContext'

const Alert = () => {
  const {alertText, alertType} = useAppContext()

  return (
    <div class="bg-green-200 border-l-4 border-green-500 rounded p-4 shadow-lg shadow-slate-300" 
    role="alert">
  <p>Alert text goes here...</p>
  <p>AlertText: {alertText} - AlertType: {alertType}</p>
</div>
  )
}

export default Alert


//type of alert messages
//simple alert: easy yellow  bg-yellow-50 border-l-4 border-yellow-200
//success: green   bg-green-200 border-l-4 border-green-500
// danger: red  bg-red-200 border-l-4 border-red-500
// warning : yellow   bg-yellow-100 border-l-4 border-yellow-500