import React, {Component} from 'react';
import {Platform} from 'react-native';
import {connect} from 'react-redux';
import {Icon} from 'react-native-elements';

import {NavbarButton} from '../components/common/';
import SiteInfoInputForm from '../components/SiteInfoInputForm';

import {campsite} from '../locale.en';

const {
    campsite_form: {
        reset,
        edit_site, edit_this_campsite
    }
} = campsite;

import {site_form_type} from '../constants';

import {navyBlueButton, grey, darkBlue, inputLabel} from '../styles/index';

import {resetScreenFields} from '../actions';

class EditSiteScreen extends Component {

    componentDidMount() {
        const {navigation: {setParams}} = this.props;

        setParams({onClickReset: this.onClickReset});
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
        }
    };

    static navigationOptions = (props) => {
        const {navigation: {state: {params = {}}}} = props;

        return {
            title: edit_site,
            headerTitle: edit_this_campsite,
            headerRight: EditSiteScreen.renderRightNavButton(params),
            tabBarIcon: ({focused, tintColor}) => (
                <Icon type='material-community' name={focused ? 'tent' : 'tent'} size={25} color={tintColor}/>)
        }
    };

    render() {

        return (
            <SiteInfoInputForm
                siteFormType={site_form_type.EDIT}
            />
        );
    }
}

const styles = {
    headerTitle: {
        flex: 1,
        marginTop: 20,
        color: navyBlueButton,
        justifyContent: 'center',
        alignSelf: 'center',
    }
};


export default connect(null, {resetScreenFields})(EditSiteScreen);
