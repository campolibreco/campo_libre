import _ from 'lodash';

import {site_form_type} from "../constants";
import {submit_form} from '../locale.en';

const {anonymous_user} = submit_form;

export const getUserCreditName = ({uploadedBy, siteFormType, giveCredit}) => {

    if (!giveCredit || (siteFormType === site_form_type.EDIT && uploadedBy.giveCredit === false)) {
        return anonymous_user;
    }

    const [firstName, lastName] = _.split(uploadedBy.name, ' ', 2);
    const lastNameLetter = lastName ? lastName[0] : '';
    const creditName = `${firstName} ${lastNameLetter}.`;

    return creditName;
};