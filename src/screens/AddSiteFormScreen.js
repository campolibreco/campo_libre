import React, {Component} from 'react';
import {Alert, Picker, Platform, ScrollView, View, Image} from 'react-native';
import {connect} from 'react-redux';
import {Icon, Text, CheckBox, Input} from 'react-native-elements';

import _ from 'lodash';

import LargeButton from '../components/common/LargeButton';
import NavbarButton from '../components/common/NavbarButton';

import {inputLabel} from '../styles/index';

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
    promptForGalleryPermission,
    launchPhotoGallery,
    launchCamera,
    promptForCameraPermission,
    getCurrentUserLocation,
    checkIfSiteIsReadyForUpload,
    attemptToUploadSite,
    siteDetailCheckboxWasClicked
} from '../actions';

import {campsite, submit_form, common, more_screen} from '../locale.en';

const {
    campsite_form: {
        reset,
        site_image,
        latitude, longitude,
        longitude_placeholder, latitude_placeholder,
        add_site, add_a_campsite, add_site_title, site_info,
        description, description_placeholder,
        directions, directions_placeholder,
        nearest_town, nearest_town_placeholder,
        here_now,
        accessibility, facilities, price, features,
        accessibility_options,
        facilities_options,
        features_options,
        price_options
    }
} = campsite;

const {submit} = submit_form;

const {title, location} = common;

import {map, permissionResponses} from '../constants';

const {GRANTED, DENIED, UNDETERMINED} = permissionResponses;

import {navyBlueButton, grey, darkBlue} from '../styles/index';

class AddSiteFormScreen extends Component {

    componentDidMount() {
        const {navigation: {setParams}} = this.props;

        setParams({onClickReset: this.onClickReset});
    }

    onClickReset = () => {
        this.props.resetAddScreenFields();
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

    componentWillMount() {
        this.props.checkIfSiteIsReadyForUpload();
    }

    componentWillReceiveProps(nextProps) {
        this.props.checkIfSiteIsReadyForUpload();
    }

    accessibilityOptions() {
        return Object.keys(accessibility_options).map((key) => {
            return <Picker.Item key={key} label={accessibility_options[key]} value={key}/>;
        })
    }

    priceOptions() {
        return Object.keys(price_options).map((key) => {
            return <Picker.Item key={key} label={price_options[key]} value={key}/>;
        })
    }

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

    onUpdatePriceOption = (newPriceOption) => {
        this.props.updatePriceOption({priceOption: newPriceOption})
    };

    onClickCheckbox = (key) => {
        this.props.siteDetailCheckboxWasClicked({siteDetailCheckboxKey: key})
    };

    renderCheckedState = (key) => {
        const {siteDetailCheckboxesKeys} = this.props;
        const flatSiteDetailCheckboxesList = _(siteDetailCheckboxesKeys)
            .map(categoryKeys => {
                return _.map(categoryKeys, innerKey => innerKey)
            })
            .flatten()
            .valueOf();

        return _.includes(flatSiteDetailCheckboxesList, key);
    };

    renderCheckboxes = (checkboxObject) => {
        const {addSiteCheckboxRowStyle} = styles;

        return _.map(checkboxObject, (value, key) => {
            return (
                <CheckBox
                    containerStyle={addSiteCheckboxRowStyle}
                    key={key}
                    title={value}
                    checked={this.renderCheckedState(key)}
                    onPress={() => this.onClickCheckbox(key)}
                />
            );
        })
    };

    renderSiteImage = () => {
        const {siteImageData} = this.props;
        const {siteImageContainerStyle, siteImageStyle} = styles;

        if (siteImageData) {
            const fullURI = `data:image/png;base64,${siteImageData}`;
            return (
                <View style={siteImageContainerStyle}>
                    <Image
                        style={siteImageStyle}
                        source={{uri: fullURI}}
                    />
                </View>
            );
        }
    };

    onClickCameraButton = () => {
        this.props.promptForCameraPermission();
    };

    onClickGalleryButton = () => {
        this.props.promptForGalleryPermission();
    };

    onClickIAmHere = () => {
        this.props.promptForLocationServicesPermission();
    };

    onClickSubmit = () => {
        const {navigation: {navigate}} = this.props;

        const newSite = {
            title: this.props.siteTitleText,
            description: this.props.siteDescriptionText,
            directions: this.props.siteDirectionsText,
            nearestTown: this.props.siteNearestTownText,
            accessibility: this.props.accessibilityOption,
            facilities: this.props.siteDetailCheckboxesKeys.facilities,
            features: this.props.siteDetailCheckboxesKeys.features,
            price: this.props.priceOption,
            coordinate: {
                longitude: this.props.readyLongitude,
                latitude: this.props.readyLatitude
            },
            siteImageData: this.props.siteImageData
        };

        this.props.attemptToUploadSite(newSite, navigate);
    };

    renderSubmitButton = () => {
        const {siteReadyForUpload} = this.props;
        const {submitButtonStyle, lastElementStyle} = styles;

        if (siteReadyForUpload) {
            return (
                <LargeButton
                    title={submit}
                    iconType={'font-awesome'}
                    iconName={'plus'}
                    iconColor={'white'}
                    buttonStyleOverride={submitButtonStyle}
                    onPress={this.onClickSubmit}
                />
            );
        } else {
            return (
                <View style={lastElementStyle}>

                </View>
            )
        }
    };

    render() {
        const {iAmHereButtonStyle, headerTitle, largeTextInput, modalStyle, imageRowStyle, labelStyle, formInputStyle, pickerStyle} = styles;
        const {latitudeText, longitudeText, siteTitleText, siteDescriptionText, siteDirectionsText, siteNearestTownText, accessibilityOption, facilitiesOption, priceOption} = this.props;

        return (
            <View>
                <ScrollView style={modalStyle}>
                    <Text h2
                          style={headerTitle}
                    >
                        {site_image}
                    </Text>
                    {this.renderSiteImage()}
                    <View style={imageRowStyle}>

                        <Icon
                            reverse
                            type='font-awesome'
                            name='camera'
                            size={25}
                            color={navyBlueButton}
                            onPress={this.onClickCameraButton}
                        />

                        <Icon
                            reverse
                            type='font-awesome'
                            name='photo'
                            size={25}
                            color={navyBlueButton}
                            onPress={this.onClickGalleryButton}
                        />

                    </View>

                    <Text h2
                          style={headerTitle}
                    >
                        {location}
                    </Text>

                    <LargeButton
                        title={here_now}
                        iconType={'font-awesome'}
                        iconName={'bullseye'}
                        iconColor={'white'}
                        buttonStyleOverride={iAmHereButtonStyle}
                        onPress={this.onClickIAmHere}
                    />

                    <Text h3
                          style={headerTitle}
                    >- or -</Text>

                    <Text style={labelStyle}>{latitude}</Text>
                    <Input
                        containerStyle={formInputStyle}
                        placeholder={latitude_placeholder}
                        value={latitudeText}
                        onChangeText={this.onUpdateLatitudeText}
                        required
                    />

                    <Text style={labelStyle}>{longitude}</Text>
                    <Input
                        containerStyle={formInputStyle}
                        placeholder={longitude_placeholder}
                        value={longitudeText}
                        onChangeText={this.onUpdateLongitudeText}
                        required
                    />

                    <Text h2
                          style={headerTitle}>
                        {site_info}
                    </Text>

                    <Text style={labelStyle}>{title}</Text>
                    <Input
                        autoCapitalize={'words'}
                        containerStyle={formInputStyle}
                        placeholder={add_site_title}
                        value={siteTitleText}
                        onChangeText={this.onUpdateSiteTitleText}
                    />

                    <Text style={labelStyle}>{description}</Text>
                    <Input
                        containerStyle={formInputStyle}
                        placeholder={description_placeholder}
                        value={siteDescriptionText}
                        onChangeText={this.onUpdateSiteDescriptionText}
                        containerStyle={largeTextInput}
                        blurOnSubmit={true}
                        multiline={true}
                        autoGrow={true}
                        editable={true}
                    />

                    <Text style={labelStyle}>{directions}</Text>
                    <Input
                        containerStyle={formInputStyle}
                        placeholder={directions_placeholder}
                        value={siteDirectionsText}
                        onChangeText={this.onUpdateSiteDirectionsText}
                        containerStyle={largeTextInput}
                        blurOnSubmit={true}
                        multiline={true}
                        autoGrow={true}
                        editable={true}
                    />

                    <Text style={labelStyle}>{nearest_town}</Text>
                    <Input
                        containerStyle={formInputStyle}
                        placeholder={nearest_town_placeholder}
                        value={siteNearestTownText}
                        onChangeText={this.onUpdateSiteNearestTownText}
                        editable={true}
                    />

                    <Text style={labelStyle}>{accessibility}</Text>
                    <Picker
                        style={[formInputStyle, pickerStyle]}
                        selectedValue={accessibilityOption}
                        onValueChange={this.onUpdateAccessibilityOption}
                    >
                        {this.accessibilityOptions()}
                    </Picker>

                    <Text style={labelStyle}>{price}</Text>
                    <Picker
                        style={[formInputStyle, pickerStyle]}
                        selectedValue={priceOption}
                        onValueChange={this.onUpdatePriceOption}
                    >
                        {this.priceOptions()}
                    </Picker>

                    <Text style={labelStyle}>{facilities}</Text>
                    <View style={formInputStyle}>
                        {this.renderCheckboxes(facilities_options)}
                    </View>

                    <Text style={labelStyle}>{features}</Text>
                    <View style={formInputStyle}>
                        {this.renderCheckboxes(features_options)}
                    </View>

                    {this.renderSubmitButton()}
                </ScrollView>
            </View>
        );
    }
}

const styles = {
    formInputStyle: {
        marginBottom: 30
    },
    labelStyle: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#86939e'
    },
    descriptionStyle: {
        color: darkBlue,
        fontSize: 15
    },
    sectionStyle: {
        backgroundColor: grey
    },
    submitButtonStyle: {
        marginTop: 10,
        marginBottom: 10,
        backgroundColor: navyBlueButton,
        marginBottom: 100
    },
    iAmHereButtonStyle: {
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
        paddingTop: 60,
        display: 'flex',
        flexDirection: 'column',
        alignContent: 'center'
    },
    lastElementStyle: {
        marginBottom: 100
    },
    exitOrResetStyle: {
        paddingLeft: 20,
        paddingRight: 20,
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    addSiteCheckboxRowStyle: {
        margin: 0
    },
    siteImageContainerStyle: {
        alignSelf: 'center',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignContent: 'center',
        height: 300,
        width: 300
    },
    siteImageStyle: {
        flex: 1,
        resizeMode: Image.resizeMode.contain
    },
    imageRowStyle: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-around'
    },
    pickerStyle: {
        width: 250,
        alignSelf: 'center'
    }

};

function mapStateToProps(state) {
    const {latitudeText, longitudeText, siteTitleText, siteDescriptionText, siteDirectionsText, siteNearestTownText, accessibilityOption, facilitiesOption, priceOption, siteReadyForUpload, readyLatitude, readyLongitude, siteDetailCheckboxesKeys, siteImageData} = state.addSite;
    const {locationServicesPermission, cameraPermission, cameraRollPermission} = state.permissions;


    return {
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
        readyLongitude,
        siteDetailCheckboxesKeys,
        siteImageData
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
    promptForGalleryPermission,
    launchPhotoGallery,
    launchCamera,
    promptForCameraPermission,
    getCurrentUserLocation,
    checkIfSiteIsReadyForUpload,
    attemptToUploadSite,
    siteDetailCheckboxWasClicked
})(AddSiteFormScreen);
