import { 
    FACEBOOK_LOGIN_SUCCESS, 
    FACEBOOK_LOGIN_FAIL,
    LOGOUT,
    UPDATE_NEW_USER
} from '../actions/types';
import { REHYDRATE } from 'redux-persist';

const INITIAL_STATE = {
    token: null,
    user: null,
    isNewUser: false,
    error: ''
}
export default function(state = INITIAL_STATE, action) {
    switch (action.type) {
        // case REHYDRATE:
        //     return { ...state };
        case FACEBOOK_LOGIN_SUCCESS:
            return { token: action.payload.token, user: action.payload.user, isNewUser: action.payload.isNewUser, error: ''  };
        case FACEBOOK_LOGIN_FAIL:
            return { ...INITIAL_STATE, error: 'Login Failed. Please try again.'};
        case LOGOUT:
            return { INITIAL_STATE };
        case UPDATE_NEW_USER:
            return { ...state, isNewUser: false}
        default:
            return state;
    }
}