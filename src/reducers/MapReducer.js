import {
    INITIALIZE_MAP,
    VIEW_STYLE_UPDATE,
    MAP_READY,
    MAP_REGION_CHANGE

} from '../actions/types';

import {map} from "../constants";

const INITIAL_STATE = {
    region: {
        longitude: -105.727939,
        latitude: 39.695168,
        longitudeDelta: 1,
        latitudeDelta: 1
    },
    mapLoaded: false,
    viewStyle: map.SearchOptions.MAP
};

export default (state = INITIAL_STATE, action) => {
    const {type, payload} = action;

    switch (type) {

        case INITIALIZE_MAP:
            return INITIAL_STATE;

        case VIEW_STYLE_UPDATE:
            return {...state, viewStyle: payload};

        case MAP_READY:
            return {...state, mapLoaded: true};

        case MAP_REGION_CHANGE:
            return {...state, region: payload};

        default:
            return state;
    }
};
