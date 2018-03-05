import {
    INITIALIZE_MAP,
    VIEW_STYLE_UPDATE,
    MAP_READY,
    MAP_REGION_CHANGE, FACEBOOK_LOGOUT_COMPLETE

} from '../actions/types';

import {map} from "../constants";

const sampleSiteMarkers = [
    {
        id: 1,
        title: 'Twin Lakes Hidden Spot',
        description: 'Beautiful view of Twin Lakes off this hidden forest road.',
        coordinate: {
            longitude: -106.391015,
            latitude: 39.085855
        }
    },
    {
        id: 2,
        title: 'Lily Lake',
        description: 'Nice view of the lilypads in this secluded spot, but a pretty tough road to reach it.',
        coordinate: {
            longitude: -106.368051,
            latitude: 39.351661
        }
    },
    {
        id: 3,
        title: 'Slide Lake',
        description: 'Pretty riverside camping, but a REALLY nasty road to get there.',
        coordinate: {
            longitude: -106.389204,
            latitude: 39.372171
        }
    }
];

const INITIAL_STATE = {
    lastKnownRegion: {
        longitude: -105.727939,
        latitude: 39.695168,
        longitudeDelta: 1,
        latitudeDelta: 1
    },
    mapLoaded: false,
    viewStyle: map.SearchOptions.MAP,
    sites: sampleSiteMarkers
};



export default (state = INITIAL_STATE, action) => {
    const {type, payload} = action;

    switch (type) {

        case INITIALIZE_MAP:
            return payload ? {...INITIAL_STATE, lastKnownRegion: payload} : INITIAL_STATE;

        case VIEW_STYLE_UPDATE:
            return {...state, viewStyle: payload};

        case MAP_READY:
            return {...state, mapLoaded: true};

        case MAP_REGION_CHANGE:
            return {...state, lastKnownRegion: payload};

        case FACEBOOK_LOGOUT_COMPLETE:
            return INITIAL_STATE;

        default:
            return state;
    }
};
