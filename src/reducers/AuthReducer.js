import _ from 'lodash';

import {
    APP_READY,
    FACEBOOK_LOGIN_SUCCESS,
    FACEBOOK_LOGIN_FAILURE,
    FACEBOOK_LOGOUT_COMPLETE,
    GUEST_TOKEN_SET,
    MAP_READY,
    FAVORITE_ADDED,
    INITIALIZE_MAP,
    FAVORITE_REMOVED
} from '../actions/types';

const INITIAL_STATE = {
    appLoaded: false,
    token: null,
    currentUser: {}
};

import {tokens} from '../constants';

const hydrateFavorites = ({currentUser, sites}) => {
    const preparedFavorites = _.map(currentUser.favorites, favorite => {
        if (favorite.favoriteIsComplete) {
            return favorite;
        } else {
            let matchedFavorite = _.find(sites, site => site.id === favorite.id);
            matchedFavorite.favoriteIsComplete = true;

            return matchedFavorite;
        }
    });

    return preparedFavorites;
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
            const {favoriteToAdd} = payload;

            let updatedUserWithNewFavorite = _.cloneDeep(state.currentUser);
            updatedUserWithNewFavorite.favorites = _.concat(updatedUserWithNewFavorite.favorites, favoriteToAdd);

            return ({...state, currentUser: updatedUserWithNewFavorite});

        case FAVORITE_REMOVED:
            const {favoriteToRemove} = payload;
            let updatedUserWithoutFavorite = _.cloneDeep(state.currentUser);
            updatedUserWithoutFavorite.favorites = _.reject(updatedUserWithoutFavorite.favorites, favorite => favorite.id === favoriteToRemove.id);

            return ({...state, currentUser: updatedUserWithoutFavorite});

        case INITIALIZE_MAP:
            const {sites} = payload;

            if (state.currentUser && state.currentUser.name !== tokens.GUEST) {
                const hydratedFavorites = hydrateFavorites({currentUser: state.currentUser, sites});
                let userWithHydratedFavorites = _.cloneDeep(state.currentUser);
                userWithHydratedFavorites.favorites = hydratedFavorites;

                return ({...state, currentUser: userWithHydratedFavorites});
            } else {
                return state;
            }


        default:
            return state;
    }
}