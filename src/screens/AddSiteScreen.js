import React, {Component} from 'react';
import {Alert, Picker, ScrollView, Modal, View, Platform} from 'react-native';
import {connect} from 'react-redux';

import {Button, FormLabel, FormInput, Input, Icon, Overlay, Text, Card} from 'react-native-elements';

import {
    updateLatitudeText,
    updateLongitudeText,
    updateSiteTitleText,
    updateSiteDescriptionText,
    updateSiteDirectionsText,
    updateSiteNearestTownText,
    updateAccessibilityOption,
    updateFacilitiesOption,
    updatePriceOption,
    resetAddScreenFields,
    promptForLocationServicesPermission,
    getCurrentUserLocation,
    checkIfSiteIsReadyForUpload,
    attemptToUploadSite,
    openSiteUploadModal,
    closeSiteUploadModal
} from '../actions';

import {campsite, submit_form, common} from '../locale.en';

const {
    site_description, upload,
    campsite_form: {
        latitude, longitude,
        longitude_placeholder, latitude_placeholder,
        add_site_title, site_info,
        description, description_placeholder,
        directions, directions_placeholder,
        nearest_town, nearest_town_placeholder,
        here_now, add_site,
        accessibility, facilities, price,
        accessibility_options,
        facilities_options,
        price_options
    }
} = campsite;

const {submit, submitted} = submit_form;

const {title, location} = common;

import {navKeys, permissionResponses} from '../constants';

const {GRANTED, DENIED, UNDETERMINED} = permissionResponses;

import {navyBlueButton, grey, darkBlue} from '../styles/index';

class AddSiteScreen extends Component {

    static renderRightNavButton = (navigate) => {
        if (Platform.OS === 'ios') {
            return (
                <Button
                    title={'Submit a Site'}
                    onPress={() => navigate(navKeys.ADD_SITE_FORM)}
                    backgroundColor="rgba(0,0,0,0)"
                    color="rgba(0,122,255,1)"
                />
            );
        } else if (Platform.OS === 'android') {
            // android-specific code for navigation here
        }
    };

    static navigationOptions = (props) => {
        const {navigation: {navigate}} = props;

        return {
            title: 'Add a Site',
            headerLeft: null,
            headerRight: AddSiteScreen.renderRightNavButton(navigate),
            tabBarIcon: ({focused, tintColor}) => (
                <Icon type='material-community' name={focused ? 'tent' : 'tent'} size={25} color={tintColor}/>)
        }
    };

    render() {
        const {} = styles;

        return (
            <View>
                <Card>
                    <Text>
                        {site_description}
                    </Text>
                </Card>


            </View>
        );
    }
}

const styles = {

};

function mapStateToProps(state) {


    return {};
}

export default connect(mapStateToProps, {})(AddSiteScreen);
