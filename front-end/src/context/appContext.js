import React, {useReducer, createContext, useEffect, useContext} from 'react'
import reducer from './reducer'
import axios from 'axios'
import {
  DISPLAY_ALERT, CLEAR_ALERT,
  SETUP_USER_BEGIN, SETUP_USER_SUCCESS, SETUP_USER_ERROR,
  SHOW_ME_USER_BEGIN, SHOW_ME_USER_SUCCESS, SHOW_ME_USER_ERROR,
  LOGOUT_USER,
  HANDLE_CHANGE, CLEAR_VALUES,
} from './actions'

const initialState = {
  showAlert: false,
  alertText: 'coucou - text',
  alertType: 'coucou - type',
  user: null,
  isLoading: false,
  userLoading: false,
}

const AppContext = createContext(null)

const AppProvider = ({children}) => {
  const [state, dispatch] = useReducer(reducer, initialState)

  const displayAlert = () => {
    dispatch({type: DISPLAY_ALERT})
    clearAlert()
  }

  const clearAlert = () => {
    setTimeout(()=>{
      dispatch({type: CLEAR_ALERT})
    }, 3000)
  }

  const setupUser = async ({currentUser, endPoint, alertText}) => {
    dispatch({type: SETUP_USER_BEGIN})
    try {
      const {data} = await axios.post(`/api/v1/auth/${endPoint}`, currentUser)
      console.log('data', data)
      const {user} = data

      dispatch({type: SETUP_USER_SUCCESS,
                payload: {user, alertText},
      })
    } catch (error) {
      dispatch({type: SETUP_USER_ERROR,
        payload: {msg: error.reponse.data.msg},
      })
    }
    clearAlert()
  }

  const logoutUser = async () => {
    await axios.delete('api/v1/auth/logout');
    dispatch({ type: LOGOUT_USER });
  }

  const showMe = async () => {
    dispatch({type: SHOW_ME_USER_BEGIN})
    try {
      const {data} = await axios.get(`/api/v1/auth/show-me`)
      const {user} = data
      console.log('begin ', user);
      dispatch({type: SHOW_ME_USER_SUCCESS,
                payload: {user},
      })
    } catch (error) {
      if(error.response.status === 401) return
      console.log(error)
    }
  }

  useEffect(()=>{
    showMe()
  }, [])

  return (
    <AppContext.Provider
      value={{
        ...state,
        displayAlert,
        setupUser,
        logoutUser,
        showMe,
      }}
    >
      {children}
    </AppContext.Provider>
  )
}

const useAppContext = () => {
  return useContext(AppContext)
}

export {AppProvider, initialState, useAppContext}
