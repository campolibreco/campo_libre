import {
    FAVORITE_ADDED,
    FAVORITE_ADD_FAILED,
    FAVORITE_REMOVED,
    FAVORITE_REMOVE_FAILED
} from '../actions/types';

const INITIAL_STATE = {
};

export default (state = INITIAL_STATE, action) => {
    const {type, payload} = action;

    switch (type) {

        case FAVORITE_ADDED:
            return ({...state});

        case FAVORITE_ADD_FAILED:
            return ({...state});

        case FAVORITE_REMOVED:
            return ({...state});

        case FAVORITE_REMOVE_FAILED:
            return ({...state});

        default:
            return state;
    }
}