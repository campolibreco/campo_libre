
import {
    EMAIL_CHANGED,
    PASSWORD_CHANGED,
    LOGIN_SUCCESS,
    LOGIN_AUTH_ERROR,
    LOGIN_USER_START,
    LOGIN_USER_COMPLETE
} from '../actions/types';

const INITIAL_STATE = {
    email: '',
    password: ''
};

export default (state = INITIAL_STATE, action) => {
    const {type, payload} = action;

    switch (type) {
        case EMAIL_CHANGED:
            return {...state, email: payload};

        case PASSWORD_CHANGED:
            return {...state, password: payload};

        case LOGIN_SUCCESS:
            return {...state, token: payload};

        default:
            return state;
    }
}