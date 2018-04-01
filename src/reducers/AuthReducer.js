import _ from 'lodash';

import {
    APP_READY,
    FACEBOOK_LOGIN_SUCCESS,
    FACEBOOK_LOGIN_FAILURE,
    FACEBOOK_LOGOUT_COMPLETE,
    GUEST_TOKEN_SET,
    MAP_READY,
    FAVORITE_ADDED
} from '../actions/types';

const INITIAL_STATE = {
    appLoaded: false,
    token: null,
    currentUser: {}
};

export default (state = INITIAL_STATE, action) => {
    const {type, payload} = action;

    switch (type) {

        case APP_READY:
            return ({...state, appReady: true});

        case MAP_READY:
            return ({...state, appReady: true});

        case GUEST_TOKEN_SET:
            const guestUser = {name: payload.token};
            return ({...state, token: payload.token, currentUser: guestUser, appReady: payload.appReady});

        case FACEBOOK_LOGIN_SUCCESS:
            return ({...state, token: payload.token, currentUser: payload.currentUser, appReady: payload.appReady});

        case FACEBOOK_LOGIN_FAILURE:
            return ({...state, token: null});

        case FACEBOOK_LOGOUT_COMPLETE:
            return (INITIAL_STATE);

        case FAVORITE_ADDED:
            const favoriteToAdd = payload.favoriteToAdd;
            let updatedUser = _.cloneDeep(state.currentUser);
            updatedUser.favorites = _.concat(updatedUser.favorites, favoriteToAdd);

            return ({...state, currentUser: updatedUser});

        default:
            return state;
    }
}