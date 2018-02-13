import {
    APP_READY,
    FACEBOOK_LOGIN_SUCCESS,
    FACEBOOK_LOGIN_FAILURE,
    FACEBOOK_LOGOUT_COMPLETE,
    GUEST_TOKEN_SET
} from '../actions/types';

const INITIAL_STATE = {
    appLoaded: false,
    token: null
};

export default (state = INITIAL_STATE, action) => {
    const {type, payload} = action;

    switch (type) {

        case APP_READY:
            return({...state, appReady: true});

        case GUEST_TOKEN_SET:
            return({...state, token: payload.token, appReady: payload.appReady});

        case FACEBOOK_LOGIN_SUCCESS:
            return({...state, token: payload.token, appReady: payload.appReady});

        case FACEBOOK_LOGIN_FAILURE:
            return ({...state, token: null});

        case FACEBOOK_LOGOUT_COMPLETE:
            return ({...state, token: null, appReady: false});

        default:
            return state;
    }
}