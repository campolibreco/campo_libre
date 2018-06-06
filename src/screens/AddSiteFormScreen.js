import React, {Component} from 'react';
import {Platform} from 'react-native';
import {connect} from 'react-redux';
import {Icon} from 'react-native-elements';

import {NavbarButton} from '../components/common/';
import SiteInfoInputForm from '../components/SiteInfoInputForm';

import {campsite, submit_form, common} from '../locale.en';

const {
    campsite_form: {
        reset,
        add_site, add_a_campsite
    }
} = campsite;

import {site_form_type} from '../constants';

import {navyBlueButton, grey, darkBlue, inputLabel} from '../styles';

import {resetScreenFields} from '../actions';

class AddSiteFormScreen extends Component {

    componentDidMount() {
        const {navigation: {setParams}} = this.props;

        setParams({onClickReset: this.onClickReset});
    }

    onClickReset = () => {
        this.props.resetScreenFields({siteFormType: site_form_type.ADD});
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
            title: add_site,
            headerTitle: add_a_campsite,
            headerRight: AddSiteFormScreen.renderRightNavButton(params),
            tabBarIcon: ({focused, tintColor}) => (
                <Icon type='material-community' name={focused ? 'tent' : 'tent'} size={25} color={tintColor}/>)
        }
    };

    render() {
        const {navigation: {navigate}} = this.props;

        return (
            <SiteInfoInputForm
                siteFormType={site_form_type.ADD}
                navigate={navigate}
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


export default connect(null, {resetScreenFields})(AddSiteFormScreen);
