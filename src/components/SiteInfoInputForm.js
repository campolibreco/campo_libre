import React, {Component} from 'react';
import {Alert, Picker, Platform, ScrollView, View, Image, Switch, TextInput} from 'react-native';
import {connect} from 'react-redux';
import {Icon, Text, CheckBox, Input} from 'react-native-elements';

import _ from 'lodash';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

import {LargeButton, SmallButton} from './common';
import {getUserCreditName} from '../services/SiteInfoService';

import {
    updateLatitudeText,
    updateLongitudeText,
    updateSiteTitleText,
    updateSiteDescriptionText,
    updateSiteDirectionsText,
    updateSiteNearestTownText,
    updateAccessibilityOption,
    updatePriceOption,
    promptForLocationServicesPermission,
    promptForGalleryPermission,
    launchPhotoGallery,
    launchCamera,
    promptForCameraPermission,
    getCurrentUserLocation,
    checkIfSiteIsReadyForUpload,
    attemptToUploadNewSite,
    attemptToEditExistingSite,
    siteDetailCheckboxWasClicked,
    updateAlternateSitesText,
    updateCellProviderOption,
    updateCellStrengthOption,
    updateCountyOption,
    updateForestOption,
    updateMVUMOption,
    newSiteToEditAvailable,
    giveMeCreditToggleUpdated,
    addNewSiteToPendingUploadQueue,
    attemptToAcceptSubmittedSite,
    attemptToRejectSite
} from '../actions';

import {campsite, submit_form, common, more_screen, counties, mvum_names, forest_names} from '../locale.en';

const {
    campsite_form: {
        reset,
        site_image,
        latitude, longitude,
        longitude_placeholder, latitude_placeholder,
        add_site_title, site_info,
        description, description_placeholder,
        directions, directions_placeholder,
        optional,
        alternate_sites, alternate_sites_placeholder,
        nearest_town, nearest_town_placeholder,
        here_now,
        accessibility, facilities, price, features, cell_service, county, forest, mvum,
        accessibility_options,
        facilities_options,
        features_options,
        price_options,
        cell_provider_options,
        cell_strength_options
    }
} = campsite;

const {submit, give_me_credit_title, give_me_credit_detail, give_me_credit_example, uploaded_by_title} = submit_form;

const {title, location} = common;

import {approval_state, map, navKeys, permissionResponses, site_form_type} from '../constants';

const {GRANTED, DENIED, UNDETERMINED} = permissionResponses;

import {navyBlueButton, grey, darkBlue, inputLabel, approveGreen, rejectRed} from '../styles';

class SiteInfoInputForm extends Component {

    componentWillMount() {
        const {siteFormType} = this.props;

        this.props.checkIfSiteIsReadyForUpload({siteFormType});

        if (siteFormType === site_form_type.EDIT) {
            const {siteToEdit} = this.props;

            this.props.newSiteToEditAvailable({siteToEdit});
        }
    }

    componentWillReceiveProps(nextProps) {
        const {siteFormType} = this.props;

        this.props.checkIfSiteIsReadyForUpload({siteFormType});
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

    countyOptions() {
        return Object.keys(counties).map((key) => {
            return <Picker.Item key={key} label={counties[key]} value={key}/>;
        })
    }

    renderCountyOptions() {
        const {labelStyle, formInputStyle, pickerStyle} = styles;
        const {countyOption, currentUser} = this.props;

        if (currentUser.isAdmin) {
            return (
                <View>
                    <Text style={labelStyle}>{county} {optional}</Text>
                    <Picker
                        style={[formInputStyle, pickerStyle]}
                        selectedValue={countyOption}
                        onValueChange={this.onUpdateCountyOption}
                    >
                        {this.countyOptions()}
                    </Picker>
                </View>
            );
        }
    }

    forestOptions() {
        return Object.keys(forest_names).map((key) => {
            return <Picker.Item key={key} label={forest_names[key]} value={key}/>;
        })
    }

    renderForestOptions() {
        const {labelStyle, formInputStyle, pickerStyle} = styles;
        const {forestOption, currentUser} = this.props;

        if (currentUser.isAdmin) {
            return (
                <View>
                    <Text style={labelStyle}>{forest} {optional}</Text>
                    <Picker
                        style={[formInputStyle, pickerStyle]}
                        selectedValue={forestOption}
                        onValueChange={this.onUpdateForestOption}
                    >
                        {this.forestOptions()}
                    </Picker>
                </View>
            );
        }
    }

    mvumOptions() {
        return Object.keys(mvum_names).map((key) => {
            return <Picker.Item key={key} label={mvum_names[key]} value={key}/>;
        })
    }

    renderMVUMOptions() {
        const {labelStyle, formInputStyle, pickerStyle} = styles;
        const {mvumOption, currentUser} = this.props;

        if (currentUser.isAdmin) {
            return (
                <View>
                    <Text style={labelStyle}>{mvum} {optional}</Text>
                    <Picker
                        style={[formInputStyle, pickerStyle]}
                        selectedValue={mvumOption}
                        onValueChange={this.onUpdateMVUMOption}
                    >
                        {this.mvumOptions()}
                    </Picker>
                </View>
            );
        }
    }

    cellProviderOptions() {
        return Object.keys(cell_provider_options).map((key) => {
            return <Picker.Item key={key} label={cell_provider_options[key]} value={key}/>;
        })
    }

    cellStrengthOptions() {
        return Object.keys(cell_strength_options).map((key) => {
            return <Picker.Item key={key} label={cell_strength_options[key]} value={key}/>;
        })
    }

    onUpdateLatitudeText = (newLatText) => {
        const {siteFormType} = this.props;

        this.props.updateLatitudeText({latitudeText: newLatText, siteFormType});
    };

    onUpdateLongitudeText = (newLongText) => {
        const {siteFormType} = this.props;

        this.props.updateLongitudeText({longitudeText: newLongText, siteFormType});
    };

    onUpdateSiteTitleText = (newTitleText) => {
        const {siteFormType} = this.props;

        this.props.updateSiteTitleText({siteTitleText: newTitleText, siteFormType});
    };

    onUpdateSiteDescriptionText = (newDescriptionText) => {
        const {siteFormType} = this.props;

        this.props.updateSiteDescriptionText({siteDescriptionText: newDescriptionText, siteFormType});
    };

    onUpdateAlternateSitesText = (newAlternateSitesText) => {
        const {siteFormType} = this.props;

        this.props.updateAlternateSitesText({siteAlternateSitesText: newAlternateSitesText, siteFormType});
    };

    onUpdateSiteDirectionsText = (newDirectionsText) => {
        const {siteFormType} = this.props;

        this.props.updateSiteDirectionsText({siteDirectionsText: newDirectionsText, siteFormType});
    };

    onUpdateSiteNearestTownText = (newNearestTownText) => {
        const {siteFormType} = this.props;

        this.props.updateSiteNearestTownText({siteNearestTownText: newNearestTownText, siteFormType});
    };

    onUpdateAccessibilityOption = (newAccessibilityOption) => {
        const {siteFormType} = this.props;

        this.props.updateAccessibilityOption({accessibilityOption: newAccessibilityOption, siteFormType});
    };

    onUpdatePriceOption = (newPriceOption) => {
        const {siteFormType} = this.props;

        this.props.updatePriceOption({priceOption: newPriceOption, siteFormType});
    };

    onUpdateCountyOption = (newCountyOption) => {
        const {siteFormType} = this.props;

        this.props.updateCountyOption({countyOption: newCountyOption, siteFormType});
    };

    onUpdateForestOption = (newForestOption) => {
        const {siteFormType} = this.props;

        this.props.updateForestOption({forestOption: newForestOption, siteFormType});
    };

    onUpdateMVUMOption = (newMVUMOption) => {
        const {siteFormType} = this.props;

        this.props.updateMVUMOption({mvumOption: newMVUMOption, siteFormType});
    };

    onUpdateCellProviderOption = (newCellProviderOption) => {
        const {siteFormType} = this.props;

        this.props.updateCellProviderOption({cellProviderOption: newCellProviderOption, siteFormType});
    };

    onUpdateCellStrengthOption = (newCellStrengthOption) => {
        const {siteFormType} = this.props;

        this.props.updateCellStrengthOption({cellStrengthOption: newCellStrengthOption, siteFormType});
    };

    onClickCheckbox = (key) => {
        const {siteFormType} = this.props;

        this.props.siteDetailCheckboxWasClicked({siteDetailCheckboxKey: key, siteFormType});
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

    onGiveMeCreditToggleChange = () => {
        const {giveCredit, siteFormType} = this.props;
        const newGiveMeCreditValue = !giveCredit;

        this.props.giveMeCreditToggleUpdated({newGiveMeCreditValue, siteFormType});
    };

    renderGiveMeCreditButton = () => {
        const {siteFormType, currentUser, giveCredit} = this.props;
        const {labelStyle, toggleContainerStyle} = styles;

        if (siteFormType === site_form_type.ADD) {
            return (
                <View>
                    <Text style={labelStyle}>{give_me_credit_title}</Text>
                    <View style={toggleContainerStyle}>
                        <Text>{give_me_credit_detail}</Text>
                        <Switch
                            onValueChange={() => this.onGiveMeCreditToggleChange()}
                            value={giveCredit}
                        />
                    </View>
                    <Text>{give_me_credit_example}{getUserCreditName({
                        uploadedBy: currentUser,
                        siteFormType,
                        giveCredit
                    })}</Text>
                </View>
            )


        } else if (siteFormType === site_form_type.EDIT) {
            const {siteToEdit: {uploadedBy}} = this.props;

            return (
                <View>
                    <Text style={labelStyle}>{uploaded_by_title}</Text>
                    <View style={toggleContainerStyle}>
                        <Text>{give_me_credit_detail}</Text>
                        <Switch
                            onValueChange={() => this.onGiveMeCreditToggleChange()}
                            value={giveCredit}
                        />
                    </View>
                    <Text>{give_me_credit_example}{getUserCreditName({uploadedBy, siteFormType, giveCredit})}</Text>
                </View>
            )

        } else {
            return null;
        }

    };

    onClickCameraButton = () => {
        const {siteFormType} = this.props;

        this.props.promptForCameraPermission({siteFormType});
    };

    onClickGalleryButton = () => {
        const {siteFormType} = this.props;

        this.props.promptForGalleryPermission({siteFormType});
    };

    onClickIAmHere = () => {
        const {siteFormType} = this.props;

        this.props.promptForLocationServicesPermission({siteFormType});
    };

    onClickSubmit = ({approveOrReject}) => {
        const {siteFormType, navigate, goBack, currentUser, siteToEdit, giveCredit} = this.props;

        let newSite = {
            title: this.props.siteTitleText,
            description: this.props.siteDescriptionText,
            directions: this.props.siteDirectionsText,
            alternateSites: this.props.siteAlternateSitesText,
            nearestTown: this.props.siteNearestTownText,
            accessibility: this.props.accessibilityOption,
            facilities: this.props.siteDetailCheckboxesKeys.facilities,
            features: this.props.siteDetailCheckboxesKeys.features,
            price: this.props.priceOption,
            coordinate: {
                longitude: this.props.readyLongitude,
                latitude: this.props.readyLatitude
            },
            siteImageData: this.props.siteImageData,
            cellProvider: this.props.cellProviderOption,
            cellStrength: this.props.cellStrengthOption,
            county: this.props.countyOption,
            forest: this.props.forestOption,
            mvum: this.props.mvumOption,
            id: this.props.id,
            uploadedBy: {}
        };

        if (siteFormType === site_form_type.ADD) {
            newSite.uploadedBy = {
                name: currentUser.name,
                email: currentUser.email,
                giveCredit
            };

            this.props.addNewSiteToPendingUploadQueue(newSite, {navigate, goBack});
        } else if (siteFormType === site_form_type.EDIT) {
            newSite.uploadedBy = siteToEdit.uploadedBy;
            newSite.uploadedBy.giveCredit = giveCredit;
            newSite.approvalState = siteToEdit.approvalState;

            if (newSite.approvalState === approval_state.APPROVED) {
                this.props.attemptToEditExistingSite(newSite, {navigate, goBack}, {currentUser});

            } else if (newSite.approvalState === approval_state.PENDING_APPROVAL) {
                if (approveOrReject === approval_state.APPROVED) {
                    this.props.attemptToAcceptSubmittedSite(newSite, {navigate, goBack}, {currentUser});

                } else if (approveOrReject === approval_state.REJECTED) {
                    this.props.attemptToRejectSite(newSite, {navigate, goBack}, {currentUser});

                }
            }
        }
    };

    renderSubmitOptions = () => {
        const {siteReadyForUpload, siteFormType, goBack, approvalState} = this.props;
        const {submitButtonStyle, lastElementStyle, adminOptionsButtonContainerStyle, iconButtonStyle, approveButtonStyle, cancelButtonStyle} = styles;

        if (siteReadyForUpload && siteFormType === site_form_type.ADD) {
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
        } else if (siteReadyForUpload && siteFormType === site_form_type.EDIT) {

            let redButtonText = '';
            let redButtonOnPress = null;
            let greenButtonText = '';
            let greenButtonOnPress = null;

            if (approvalState === approval_state.APPROVED) {
                redButtonText = campsite.cancel;
                greenButtonText = campsite.update;
                redButtonOnPress = () => goBack();
                greenButtonOnPress = this.onClickSubmit;

            } else if (approvalState === approval_state.PENDING_APPROVAL) {
                redButtonText = campsite.reject;
                greenButtonText = campsite.approve;
                redButtonOnPress = () => this.onClickSubmit({approveOrReject: approval_state.REJECTED});
                greenButtonOnPress = () => this.onClickSubmit({approveOrReject: approval_state.APPROVED});

            }

            return (
                <View style={[lastElementStyle, adminOptionsButtonContainerStyle]}>

                    <SmallButton
                        title={redButtonText}
                        iconType={'ionicon'}
                        iconName={'md-close-circle'}
                        iconColor={'white'}
                        buttonStyleOverride={cancelButtonStyle}
                        iconSizeOverride={35}
                        onPress={redButtonOnPress}
                    />

                    <SmallButton
                        title={greenButtonText}
                        iconType={'ionicon'}
                        iconName={'md-checkmark-circle'}
                        iconColor={'white'}
                        buttonStyleOverride={approveButtonStyle}
                        iconSizeOverride={35}
                        onPress={greenButtonOnPress}
                    />

                </View>
            );
        } else {
            return (
                <View style={lastElementStyle}>

                </View>
            );
        }
    };

    render() {
        const {iAmHereButtonStyle, headerTitle, textInputStyle, modalStyle, imageRowStyle, labelStyle, formInputStyle, pickerStyle, cellServiceContainerStyle, cellProviderPickerStyle, cellStrengthPickerStyle} = styles;
        const {latitudeText, longitudeText, siteTitleText, siteDescriptionText, siteDirectionsText, siteNearestTownText, accessibilityOption, priceOption, siteAlternateSitesText, cellProviderOption, cellStrengthOption} = this.props;

        return (
            <KeyboardAwareScrollView>
                <View style={modalStyle}>
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
                    <TextInput
                        style={[formInputStyle, textInputStyle]}
                        placeholder={latitude_placeholder}
                        value={latitudeText}
                        onChangeText={this.onUpdateLatitudeText}
                        required
                    />

                    <Text style={labelStyle}>{longitude}</Text>
                    <TextInput
                        style={[formInputStyle, textInputStyle]}
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
                    <TextInput
                        autoCapitalize={'words'}
                        style={[formInputStyle, textInputStyle]}
                        placeholder={add_site_title}
                        value={siteTitleText}
                        onChangeText={this.onUpdateSiteTitleText}
                    />

                    <Text style={labelStyle}>{description}</Text>
                    <TextInput
                        style={[formInputStyle, textInputStyle]}
                        placeholder={description_placeholder}
                        value={siteDescriptionText}
                        onChangeText={this.onUpdateSiteDescriptionText}
                        blurOnSubmit={true}
                        multiline={true}
                        autoGrow={true}
                        editable={true}
                    />

                    <Text style={labelStyle}>{directions}</Text>
                    <TextInput
                        style={[formInputStyle, textInputStyle]}
                        placeholder={directions_placeholder}
                        value={siteDirectionsText}
                        onChangeText={this.onUpdateSiteDirectionsText}
                        blurOnSubmit={true}
                        multiline={true}
                        autoGrow={true}
                        editable={true}
                    />

                    <Text style={labelStyle}>{nearest_town}</Text>
                    <TextInput
                        style={[formInputStyle, textInputStyle]}
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

                    <Text style={labelStyle}>{alternate_sites} {optional}</Text>
                    <TextInput
                        style={[formInputStyle, textInputStyle]}
                        placeholder={alternate_sites_placeholder}
                        value={siteAlternateSitesText}
                        onChangeText={this.onUpdateAlternateSitesText}
                        blurOnSubmit={true}
                        multiline={true}
                        autoGrow={true}
                        editable={true}
                    />

                    <Text style={labelStyle}>{cell_service} {optional}</Text>
                    <View style={cellServiceContainerStyle}>
                        <Picker
                            style={[formInputStyle, cellProviderPickerStyle]}
                            selectedValue={cellProviderOption}
                            onValueChange={this.onUpdateCellProviderOption}
                        >
                            {this.cellProviderOptions()}
                        </Picker>

                        <Picker
                            style={[formInputStyle, cellStrengthPickerStyle]}
                            selectedValue={cellStrengthOption}
                            onValueChange={this.onUpdateCellStrengthOption}
                        >
                            {this.cellStrengthOptions()}
                        </Picker>
                    </View>

                    {this.renderCountyOptions()}

                    {this.renderForestOptions()}

                    {this.renderMVUMOptions()}

                    {this.renderGiveMeCreditButton()}

                    {this.renderSubmitOptions()}
                </View>
            </KeyboardAwareScrollView>
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
        color: inputLabel
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
    textInputStyle: {
        minHeight: 40,
        fontSize: 18,
        marginLeft: 10,
        borderColor: '#86939e',
        borderBottomWidth: 1,
        width: '90%',
        paddingBottom: 5
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
    },
    cellProviderPickerStyle: {
        width: 90
    },
    cellStrengthPickerStyle: {
        width: 130
    },
    cellServiceContainerStyle: {
        width: 250,
        alignSelf: 'center',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignContent: 'center'
    },
    adminOptionsButtonContainerStyle: {
        marginTop: 20,
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-around'
    },
    iconButtonStyle: {
        margin: 20
    },
    approveButtonStyle: {
        backgroundColor: approveGreen
    },
    cancelButtonStyle: {
        backgroundColor: rejectRed
    },
    toggleContainerStyle: {
        marginTop: 20,
        marginBottom: 10,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignContent: 'center'
    }

};

function mapStateToProps(state, ownProps) {
    const {siteFormType} = ownProps;
    const {approvalState, latitudeText, longitudeText, siteTitleText, siteDescriptionText, siteDirectionsText, siteNearestTownText, accessibilityOption, priceOption, countyOption, forestOption, mvumOption, siteReadyForUpload, readyLatitude, readyLongitude, siteDetailCheckboxesKeys, siteImageData, siteAlternateSitesText, cellProviderOption, cellStrengthOption, id, giveCredit} = state.addEditSite[siteFormType];
    const {locationServicesPermission, cameraPermission, cameraRollPermission} = state.permissions;
    const {currentUser} = state.auth;

    return {
        approvalState,
        currentUser,
        latitudeText,
        longitudeText,
        siteTitleText,
        siteDescriptionText,
        siteDirectionsText,
        siteNearestTownText,
        accessibilityOption,
        priceOption,
        locationServicesPermission,
        cameraPermission,
        cameraRollPermission,
        siteReadyForUpload,
        readyLatitude,
        readyLongitude,
        siteDetailCheckboxesKeys,
        siteImageData,
        siteAlternateSitesText,
        cellProviderOption,
        cellStrengthOption,
        countyOption,
        forestOption,
        mvumOption,
        id,
        giveCredit
    };
}

const mapActions = {
    updateLatitudeText,
    updateLongitudeText,
    updateSiteTitleText,
    updateSiteDescriptionText,
    updateSiteDirectionsText,
    updateSiteNearestTownText,
    updateAccessibilityOption,
    updatePriceOption,
    promptForLocationServicesPermission,
    promptForGalleryPermission,
    launchPhotoGallery,
    launchCamera,
    promptForCameraPermission,
    getCurrentUserLocation,
    checkIfSiteIsReadyForUpload,
    attemptToUploadNewSite,
    attemptToEditExistingSite,
    siteDetailCheckboxWasClicked,
    updateAlternateSitesText,
    updateCellProviderOption,
    updateCellStrengthOption,
    updateCountyOption,
    updateForestOption,
    updateMVUMOption,
    newSiteToEditAvailable,
    giveMeCreditToggleUpdated,
    addNewSiteToPendingUploadQueue,
    attemptToAcceptSubmittedSite,
    attemptToRejectSite
};

export default connect(mapStateToProps, mapActions)(SiteInfoInputForm);
