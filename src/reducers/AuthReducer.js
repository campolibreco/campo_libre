import {
    FACEBOOK_LOGIN_SUCCESS,
    FACEBOOK_LOGIN_FAILURE,
    FACEBOOK_LOGIN_LOGOUT
} from '../actions/types';

const INITIAL_STATE = {
    token: ''
};

export default (state = INITIAL_STATE, action) => {
    const {type, payload} = action;

    switch (type) {


        default:
            return state;
    }
}