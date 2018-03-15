import React, {Component} from 'react';
import {Alert, Picker, ScrollView, Modal, View} from 'react-native';
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

import {permissionResponses} from '../constants';

const {GRANTED, DENIED, UNDETERMINED} = permissionResponses;

import {navyBlueButton, grey, darkBlue} from '../styles/index';

class AddSiteFormScreen extends Component {

    static navigationOptions = (props) => {
        const {navigation: {navigate}} = props;
        return {
            title: 'Add a Site',
            headerTitle: 'Add a Campsite',
            tabBarIcon: ({focused, tintColor}) => (
                <Icon type='material-community' name={focused ? 'tent' : 'tent'} size={25} color={tintColor}/>)
        }
    };

    componentWillMount() {
        this.props.checkIfSiteIsReadyForUpload();
    }

    componentWillReceiveProps(nextProps) {
        this.props.checkIfSiteIsReadyForUpload();
    }

    accessibilityOptions() {
        return Object.keys(accessibility_options).map((key) => {
            return <Picker.Item key={key} label={accessibility_options[key]} value={accessibility_options[key]}/>;
        })
    }

    facilitiesOptions() {
        return Object.keys(facilities_options).map((key) => {
            return <Picker.Item key={key} label={facilities_options[key]} value={facilities_options[key]}/>;
        })
    }

    priceOptions() {
        return Object.keys(price_options).map((key) => {
            return <Picker.Item key={key} label={price_options[key]} value={price_options[key]}/>;
        })
    }

    onClickOpenModal = () => {
        this.props.openSiteUploadModal();
    };

    onClickCloseModal = () => {
        this.props.closeSiteUploadModal();
    };

    onUpdateLatitudeText = (newLatText) => {
        this.props.updateLatitudeText({latitudeText: newLatText})
    };

    onUpdateLongitudeText = (newLongText) => {
        this.props.updateLongitudeText({longitudeText: newLongText})
    };

    onUpdateSiteTitleText = (newTitleText) => {
        this.props.updateSiteTitleText({siteTitleText: newTitleText})
    };

    onUpdateSiteDescriptionText = (newDescriptionText) => {
        this.props.updateSiteDescriptionText({siteDescriptionText: newDescriptionText})
    };

    onUpdateSiteDirectionsText = (newDirectionsText) => {
        this.props.updateSiteDirectionsText({siteDirectionsText: newDirectionsText})
    };

    onUpdateSiteNearestTownText = (newNearestTownText) => {
        this.props.updateSiteNearestTownText({siteNearestTownText: newNearestTownText})
    };

    onUpdateAccessibilityOption = (newAccessibilityOption) => {
        this.props.updateAccessibilityOption({accessibilityOption: newAccessibilityOption})
    };

    onUpdateFacilitiesOption = (newFacilitiesOption) => {
        this.props.updateFacilitiesOption({facilitiesOption: newFacilitiesOption})
    };

    onUpdatePriceOption = (newPriceOption) => {
        this.props.updatePriceOption({priceOption: newPriceOption})
    };

    onClickReset = () => {
        this.props.resetAddScreenFields();
    };

    onClickIAmHere = () => {
        const {locationServicesPermission} = this.props;

        if (locationServicesPermission === GRANTED) {
            this.props.getCurrentUserLocation();
        } else {
            this.props.promptForLocationServicesPermission();
        }
    };

    onClickSubmit = () => {
        const newSite = {
            title: this.props.siteTitleText,
            description: this.props.siteDescriptionText,
            directions: this.props.siteDirectionsText,
            nearestTown: this.props.siteNearestTownText,
            accessibility: this.props.accessibilityOption,
            facilities: this.props.facilitiesOption,
            price: this.props.priceOption,
            coordinate: {
                longitude: this.props.readyLongitude,
                latitude: this.props.readyLatitude
            }
        };

        this.props.attemptToUploadSite(newSite);
    };

    renderSubmitButton = () => {
        const {siteReadyForUpload} = this.props;
        const {buttonStyle, lastElementStyle} = styles;

        if (siteReadyForUpload) {
            return (
                <Button
                    onPress={this.onClickSubmit}
                    large
                    rounded={true}
                    buttonStyle={[buttonStyle, lastElementStyle]}
                    icon={{name: 'plus', type: 'font-awesome'}}
                    title={submit}
                >  {submit}
                </Button>
            );
        } else {
            return (
                <View style={lastElementStyle}>

                </View>
            )
        }
    };

    render() {
        const {buttonStyle, headerTitle, largeTextInput, modalStyle, exitOrResetStyle} = styles;
        const {addSiteModalVisible, latitudeText, longitudeText, siteTitleText, siteDescriptionText, siteDirectionsText, siteNearestTownText, accessibilityOption, facilitiesOption, priceOption} = this.props;

        return (
            <View>
                <Card>
                    <Text>
                        {site_description}
                    </Text>
                </Card>
                <Button
                    onPress={this.onClickOpenModal}
                    title="Open modal"
                    large
                    rounded={true}
                    buttonStyle={buttonStyle}
                    icon={{name: 'plus', type: 'font-awesome'}}
                    title={add_site}
                >
                    {upload}
                </Button>

                <Modal
                    visible={addSiteModalVisible}
                    animationType={'slide'}
                    onRequestClose={this.onClickCloseModal}
                >
                    <ScrollView style={modalStyle}>
                        <View style={exitOrResetStyle}>
                            <Icon
                                type='font-awesome'
                                name='times-circle'
                                onPress={this.onClickCloseModal}
                            />

                            <Button
                                title="Reset"
                                onPress={this.onClickReset}
                                backgroundColor="rgba(0,0,0,0)"
                                color="rgba(0,122,255,1)"
                            />

                        </View>

                        <Text h2
                              style={headerTitle}
                        >
                            {location}
                        </Text>

                        <Button
                            large
                            rounded={true}
                            onPress={this.onClickIAmHere}
                            buttonStyle={buttonStyle}
                            icon={{name: 'bullseye', type: 'font-awesome'}}
                            title={here_now}
                        >
                            {campsite.upload}
                        </Button>

                        <Text h3
                              style={headerTitle}
                        >- or -</Text>

                        <FormLabel>{latitude}</FormLabel>
                        <FormInput
                            placeholder={latitude_placeholder}
                            value={latitudeText}
                            onChangeText={this.onUpdateLatitudeText}
                            required
                        />

                        <FormLabel>{longitude}</FormLabel>
                        <FormInput
                            placeholder={longitude_placeholder}
                            value={longitudeText}
                            onChangeText={this.onUpdateLongitudeText}
                            required
                        />

                        <Text h2
                              style={headerTitle}>
                            {site_info}
                        </Text>

                        <FormLabel>{title}</FormLabel>
                        <FormInput
                            placeholder={add_site_title}
                            value={siteTitleText}
                            onChangeText={this.onUpdateSiteTitleText}
                        />

                        <FormLabel>{description}</FormLabel>
                        <FormInput
                            placeholder={description_placeholder}
                            value={siteDescriptionText}
                            onChangeText={this.onUpdateSiteDescriptionText}
                            containerStyle={largeTextInput}
                            multiline={true}
                            maxLength={40}
                            maxHeight={50}
                            editable={true}
                        />

                        <FormLabel>{directions}</FormLabel>
                        <FormInput
                            placeholder={directions_placeholder}
                            value={siteDirectionsText}
                            onChangeText={this.onUpdateSiteDirectionsText}
                            containerStyle={largeTextInput}
                            multiline={true}
                            maxLength={40}
                            maxHeight={50}
                            editable={true}
                        />

                        <FormLabel>{nearest_town}</FormLabel>
                        <FormInput
                            placeholder={nearest_town_placeholder}
                            value={siteNearestTownText}
                            onChangeText={this.onUpdateSiteNearestTownText}
                            editable={true}
                        />

                        <FormLabel>{price}</FormLabel>
                        <Picker
                            selectedValue={priceOption}
                            onValueChange={this.onUpdatePriceOption}
                        >
                            {this.priceOptions()}
                        </Picker>

                        <FormLabel>{accessibility}</FormLabel>
                        <Picker
                            selectedValue={accessibilityOption}
                            onValueChange={this.onUpdateAccessibilityOption}
                        >
                            {this.accessibilityOptions()}
                        </Picker>

                        <FormLabel>{facilities}</FormLabel>
                        <Picker
                            selectedValue={facilitiesOption}
                            onValueChange={this.onUpdateFacilitiesOption}
                        >
                            {this.facilitiesOptions()}
                        </Picker>

                        {this.renderSubmitButton()}
                    </ScrollView>
                </Modal>
            </View>
        );
    }
}

const styles = {
    descriptionStyle: {
        color: darkBlue,
        fontSize: 15
    },
    sectionStyle: {
        backgroundColor: grey
    },
    buttonStyle: {
        marginTop: 10,
        marginBottom: 10,
        backgroundColor: navyBlueButton
    },
    headerTitle: {
        flex: 1,
        marginTop: 20,
        color: navyBlueButton,
        justifyContent: 'center',
        alignSelf: 'center',
    },
    largeTextInput: {
        height: 100
    },
    modalStyle: {
        padding: 20,
        paddingTop: 60
    },
    lastElementStyle: {
        marginBottom: 100
    },
    exitOrResetStyle: {
        paddingLeft: 20,
        paddingRight: 20,
        flexDirection: 'row',
        justifyContent: 'space-between'
    }

};

function mapStateToProps(state) {
    const {addSiteModalVisible, latitudeText, longitudeText, siteTitleText, siteDescriptionText, siteDirectionsText, siteNearestTownText, accessibilityOption, facilitiesOption, priceOption, siteReadyForUpload, readyLatitude, readyLongitude} = state.addSite;
    const {locationServicesPermission, cameraPermission, cameraRollPermission} = state.permissions;


    return {
        addSiteModalVisible,
        latitudeText,
        longitudeText,
        siteTitleText,
        siteDescriptionText,
        siteDirectionsText,
        siteNearestTownText,
        accessibilityOption,
        facilitiesOption,
        priceOption,
        locationServicesPermission,
        cameraPermission,
        cameraRollPermission,
        siteReadyForUpload,
        readyLatitude,
        readyLongitude
    };
}

export default connect(mapStateToProps, {
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
})(AddSiteFormScreen);
