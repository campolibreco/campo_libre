import {
    FACEBOOK_LOGIN_SUCCESS,
    FACEBOOK_LOGIN_FAILURE,
    FACEBOOK_LOGOUT_COMPLETE,
    GUEST_TOKEN_SET
} from '../actions/types';

const INITIAL_STATE = {
    token: null
};

export default (state = INITIAL_STATE, action) => {
    const {type, payload} = action;

    switch (type) {

        case GUEST_TOKEN_SET:
            return({...state, token: payload});

        case FACEBOOK_LOGIN_SUCCESS:
            return ({...state, token: payload});

        case FACEBOOK_LOGIN_FAILURE:
            return INITIAL_STATE;

        case FACEBOOK_LOGOUT_COMPLETE:
            return INITIAL_STATE;

        default:
            return state;
    }
}