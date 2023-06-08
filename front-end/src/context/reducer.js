import {
    DISPLAY_ALERT, CLEAR_ALERT,
    SETUP_USER_BEGIN, SETUP_USER_SUCCESS, SETUP_USER_ERROR,
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
        default:
            throw Error('Unknown action: ' + action.type)
            break;
    }
}

export default reducer