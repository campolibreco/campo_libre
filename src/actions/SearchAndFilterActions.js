import {
    FILTER_CRITERIA_UPDATED,
    FILTER_TOGGLE_LOGIC_UPDATED,
    FILTER_CRITERIA_RESET
} from './types';


export const checkboxWasClicked = ({filterKey}) => {
    return {
        type: FILTER_CRITERIA_UPDATED,
        payload: {filterKey}
    }
};

export const filterToggleLogicUpdated = ({filterToggleKey}) => {
    return {
        type: FILTER_TOGGLE_LOGIC_UPDATED,
        payload: {filterToggleKey}
    }
};

export const resetAllFilters = () => {
    return {
        type: FILTER_CRITERIA_RESET
    }
};