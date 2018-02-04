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
            const thingToReturn = {...state, viewStyle: payload};

            console.log("VIEW_STYLE_UPDATE", thingToReturn);

            return {...state, viewStyle: payload};

        case MAP_READY:
            const thingToReturn2 = {...state, mapLoaded: true};

            console.log("MAP_READY_DISPATCH", thingToReturn2);
            return thingToReturn2;

        case MAP_REGION_CHANGE:
            const thingToReturn3 = {...state, region: payload};

            console.log("REGION_CHANGE DISPATCH", thingToReturn3);
            return {...state, region: payload};;

        default:
            return state;
    }
};
