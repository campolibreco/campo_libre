import React, {Component} from 'react';
import {Alert, Picker, ScrollView, Modal, View} from 'react-native';
import {connect} from 'react-redux';

import {Button, FormLabel, FormInput, Input, Icon, Overlay, Text, Card} from 'react-native-elements';

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
        accessibility, facilities,
        accessibility_options,
        facilities_options,
    }
} = campsite;

const {submit, submitted} = submit_form;

const {title, location} = common;

import {navyBlue, grey, darkBlue} from '../styles/index';

import {
    updateLatitudeText,
    updateLongitudeText,
    updateSiteTitleText,
    updateSiteDescriptionText,
    updateSiteDirectionsText,
    updateSiteNearestTownText,
    updateAccessibilityOption,
    updateFacilitiesOption,
    resetAddScreenFields
} from '../actions';

class AddSiteScreen extends Component {
    state = {
        modalVisible: false,
    };

    openModal() {
        this.setState({modalVisible: true});
    }

    closeModal() {
        this.setState({modalVisible: false});
    }

    static navigationOptions = (props) => {
        const {navigation: {navigate}} = props;
        return {
            title: 'Add a Site',
            headerTitle: 'Add a Campsite',
            headerLeft: null,
            tabBarIcon: ({focused, tintColor}) => (
                <Icon type='material-community' name={focused ? 'tent' : 'tent'} size={25} color={tintColor}/>)
        }
    };

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

    onClickReset = () => {
        this.props.resetAddScreenFields();
    };

    render() {
        const {buttonStyle, headerTitle, largeTextInput, modalStyle, lastButtonStyle, exitOrResetStyle} = styles;
        const {latitudeText, longitudeText, siteTitleText, siteDescriptionText, siteDirectionsText, siteNearestTownText, accessibilityOption, facilitiesOption} = this.props;

        return (
            <View>
                <Card>
                    <Text>
                        {site_description}
                    </Text>
                </Card>
                <Button
                    onPress={() => this.openModal()}
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
                    visible={this.state.modalVisible}
                    animationType={'slide'}
                    onRequestClose={() => this.closeModal()}
                >
                    <ScrollView style={modalStyle}>
                        <View style={exitOrResetStyle}>
                            <Icon
                                type='font-awesome'
                                name='times-circle'
                                onPress={() => this.closeModal()}
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

                        <Text h3
                              style={headerTitle}
                        >- or -</Text>
                        <Button
                            large
                            rounded={true}
                            onPress={() => alert(submitted)}
                            buttonStyle={buttonStyle}
                            icon={{name: 'bullseye', type: 'font-awesome'}}
                            title={here_now}
                        >
                            {campsite.upload}
                        </Button>


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

                        <FormLabel>{directions_placeholder}</FormLabel>
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

                        <Button
                            onPress={() => alert('submitted')}
                            title="Open modal"
                            large
                            rounded={true}
                            buttonStyle={[buttonStyle, lastButtonStyle]}
                            icon={{name: 'plus', type: 'font-awesome'}}
                            title={submit}
                        >  {submit}
                        </Button>
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
        backgroundColor: navyBlue
    },
    headerTitle: {
        flex: 1,
        marginTop: 20,
        color: navyBlue,
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
    lastButtonStyle: {
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
    const {latitudeText, longitudeText, siteTitleText, siteDescriptionText, siteDirectionsText, siteNearestTownText, accessibilityOption, facilitiesOption} = state.addSite;


    return {
        latitudeText,
        longitudeText,
        siteTitleText,
        siteDescriptionText,
        siteDirectionsText,
        siteNearestTownText,
        accessibilityOption,
        facilitiesOption
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
    resetAddScreenFields
})(AddSiteScreen);
