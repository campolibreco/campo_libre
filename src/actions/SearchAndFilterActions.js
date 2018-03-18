import {
    FILTER_CRITERIA_UPDATED,
    FILTER_CRITERIA_RESET
} from './types';


export const checkboxWasClicked = ({filterKey}) => {
    return {
        type: FILTER_CRITERIA_UPDATED,
        payload: {filterKey}
    }
};

export const resetAllFilters = () => {
    return {
        type: FILTER_CRITERIA_RESET
    }
};