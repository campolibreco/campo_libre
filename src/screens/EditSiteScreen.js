import React, {Component} from 'react';
import {Platform} from 'react-native';
import {connect} from 'react-redux';
import {Icon} from 'react-native-elements';

import _ from 'lodash';

import {NavbarButton} from '../components/common/';
import SiteInfoInputForm from '../components/SiteInfoInputForm';

import {campsite} from '../locale.en';

import {getSiteToShow} from '../services/SiteInfoService';

const {
    campsite_form: {
        reset,
        edit_site, edit_campsite
    }
} = campsite;

import {site_form_type} from '../constants';

import {navyBlueButton} from '../styles';

import {resetScreenFields} from '../actions';

class EditSiteScreen extends Component {

    componentDidMount() {
        const {navigation: {setParams}} = this.props;
        const siteToShow = getSiteToShow(this.props);

        setParams({onClickReset: this.onClickReset, siteToShow});
    }

    onClickReset = () => {
        this.props.resetScreenFields({siteFormType: site_form_type.EDIT});
    };

    static renderRightNavButton = ({onClickReset}) => {

        if (Platform.OS === 'ios') {
            return (
                <NavbarButton
                    title={reset}
                    onPress={onClickReset}
                />
            );
        } else if (Platform.OS === 'android') {
            // android-specific code for navigation here
            return (
                <NavbarButton
                    title={reset}
                    onPress={onClickReset}
                />
            );
        }
    };

    static navigationOptions = (props) => {
        const {navigation: {state: {params = {}}}} = props;
        const {siteToShow} = params;

        return {
            title: edit_site,
            headerTitle: !!siteToShow && !_.isEmpty(siteToShow) ? edit_campsite[siteToShow.approvalState] : '',
            headerRight: EditSiteScreen.renderRightNavButton(params),
            tabBarIcon: ({focused, tintColor}) => (
                <Icon type='material-community' name={focused ? 'tent' : 'tent'} size={25} color={tintColor}/>)
        }
    };

    render() {
        const {navigation: {navigate, goBack}} = this.props;
        const siteToShow = getSiteToShow(this.props);

        return (
            <SiteInfoInputForm
                siteFormType={site_form_type.EDIT}
                siteToEdit={siteToShow}
                navigate={navigate}
                goBack={goBack}
            />
        );
    }
}

function mapStateToProps(state) {
    const {selectedSite, selectedPendingSite} = state.map;

    return {selectedSite, selectedPendingSite}
}


export default connect(mapStateToProps, {resetScreenFields})(EditSiteScreen);
