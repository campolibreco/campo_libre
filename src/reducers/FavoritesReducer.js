import {
    FAVORITE_ADDED,
    FAVORITE_ADD_FAILED,
    FAVORITE_REMOVED,
    FAVORITE_REMOVE_FAILED
} from '../actions/types';

const INITIAL_STATE = {
};

import {favorites} from '../locale.en';
const {add_favorite_error, remove_favorite_error} = favorites;

export default (state = INITIAL_STATE, action) => {
    const {type, payload} = action;

    switch (type) {

        case FAVORITE_ADD_FAILED:
            alert(add_favorite_error);
            return ({...state});

        case FAVORITE_REMOVE_FAILED:
            alert(remove_favorite_error);
            return ({...state});

        default:
            return state;
    }
}