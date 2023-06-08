import {
    DISPLAY_ALERT, CLEAR_ALERT,
    SETUP_USER_BEGIN, SETUP_USER_SUCCESS, SETUP_USER_ERROR,
    SHOW_ME_USER_BEGIN, SHOW_ME_USER_SUCCESS, SHOW_ME_USER_ERROR,
    LOGOUT_USER,
    HANDLE_CHANGE, CLEAR_VALUES,
} from './actions'

const reducer = (state, action) => {
    switch (action.type) {
        case DISPLAY_ALERT:
            return {
                ...state,
                showAlert: true,
                alertType: 'danger',
                alertText: 'Please provide all values!',
            }
            break;
        case CLEAR_ALERT:
            return {
                ...state,
                showAlert: false,
                alertType: '',
                alertText: '',
            }
            break;

        case SETUP_USER_BEGIN:
            return {
                ...state,
                isLoading: true,
            }
            break;
        case SETUP_USER_SUCCESS:
            return {
                ...state,
                isLoading: false,
                showAlert: true,
                alertType: 'success',
                alertText: action.payload.alertText,
                user: action.payload.user,
            }
            break;
        case SETUP_USER_ERROR:
            return {
                ...state,
                isLoading: false,
                showAlert: false,
                alertType: 'danger',
                alertText: action.payload.msg,
            }
            break;
        case LOGOUT_USER:
            return {
                ...state,
                userLoading: false,
            }
            break;

        case SHOW_ME_USER_BEGIN:
            return {
                ...state,
                userLoading: true,
                showAlert: false,
            }
            break;
        case SHOW_ME_USER_SUCCESS:
            return {
                ...state,
                userLoading: false,
                user: action.payload.user,
            }
            break;
        
        default:
            throw Error('Unknown action: ' + action.type)
            break;
    }
}

export default reducer