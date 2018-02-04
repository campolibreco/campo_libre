import _ from 'lodash';

import {
    INITIALIZE_MAP,
    MAP_READY,
    MAP_NOT_READY,
    MAP_REGION_CHANGE,
    VIEW_STYLE_UPDATE
} from './types';


export const initializeMap = () => {

    return {
        type: INITIALIZE_MAP
    }
};

export const updateViewStyle = (newViewStyle) => {
    const thingToReturn = {
        type: VIEW_STYLE_UPDATE,
        payload: newViewStyle

    };

    console.log("UpdateViewStyle payload", thingToReturn);
    return thingToReturn;
};

export const mapLoaded = () => {
    return {
        type: MAP_READY
    }
};

export const updateRegion = (newRegion) => {
    return {
        type: MAP_REGION_CHANGE,
        payload: newRegion
    }
};