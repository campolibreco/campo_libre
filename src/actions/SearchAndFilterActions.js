import {
    FILTER_CRITERIA_UPDATED
} from './types';


export const checkboxWasClicked = ({filterKey}) => {
    return{
        type: FILTER_CRITERIA_UPDATED,
        payload: {filterKey}
    }
};
