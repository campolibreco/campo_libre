import React, {Component} from 'react';
import {View, StyleSheet, ScrollView} from 'react-native';
import {Card, Text, List, ListItem} from 'react-native-elements';
import {Icon} from 'react-native-elements';
import {connect} from 'react-redux';
import {MapView} from 'expo';

const {Marker} = MapView;

import _ from 'lodash';


import {linkColorBlue, navyBlueButton} from '../styles/index';

import {navKeys, facilityIconDetails, featureIconDetails} from '../constants';
import {site_detail_screen, campsite, common} from '../locale.en';
import {campsiteIcon} from "../styles";

const {header_title} = site_detail_screen;
const {campsite_form} = campsite;
const {location} = common;

class SiteDetailScreen extends Component {
    componentWillMount() {

    }

    componentDidMount() {

    }

    componentWillReceiveProps(nextProps) {


    }

    renderFacilities = (facilities) => {
        return _.map(facilities, (facility, index) => {
            return (
                <ListItem
                    key={index}
                    title={campsite_form.facilities_options[facility]}
                    leftIcon={facilityIconDetails[facility]}
                    hideChevron={true}
                />
            );
        });
    };

    renderFeatures = (features) => {
        return _.map(features, (feature, index) => {
            return (
                <ListItem
                    key={index}
                    title={campsite_form.features_options[feature]}
                    leftIcon={featureIconDetails[feature]}
                    hideChevron={true}
                />
            );
        });
    };

    onClickSiteDetailMapThumb = () => {
        const {navigation: {navigate}} = this.props;

        navigate(navKeys.SITE_DETAIL_MAP_VIEW);
    };

    renderSiteDetailScreen = () => {
        const {textStyle, sectionTitleStyle, mainTitleStyle, locationMainContainerStyle, mapThumbnailStyle, bottomMargin} = styles;
        const {selectedSite} = this.props;
        const {accessibility, coordinate, description, directions, facilities, features, nearestTown, price, siteImageData, title} = selectedSite;

        if (selectedSite) {
            return (
                <ScrollView>
                    <Card
                        title={title}
                        titleStyle={mainTitleStyle}
                        image={siteImageData ? {uri: `data:image/png;base64,${siteImageData}`} : require('../../assets/starTent.jpg')}
                    >
                        <Text style={[textStyle, bottomMargin]}>
                            {description}
                        </Text>

                        <Text style={sectionTitleStyle}>
                            {campsite_form.accessibility}
                        </Text>
                        <Text style={[textStyle, bottomMargin]}>
                            {campsite_form.accessibility_options[accessibility]}
                        </Text>

                        <Text style={sectionTitleStyle}>
                            {campsite_form.nearest_town}
                        </Text>
                        <Text style={[textStyle, bottomMargin]}>
                            {nearestTown}
                        </Text>

                        <Text style={sectionTitleStyle}>
                            {campsite_form.price}
                        </Text>
                        <Text style={[textStyle, bottomMargin]}>
                            {campsite_form.price_options[price]}
                        </Text>

                        <Text style={sectionTitleStyle}>
                            {campsite_form.directions}
                        </Text>
                        <Text style={[textStyle, bottomMargin]}>
                            {directions}
                        </Text>

                        <Text style={sectionTitleStyle}>
                            {location}
                        </Text>
                        <View style={locationMainContainerStyle}>
                            <View>
                                <Text style={textStyle}>
                                    {campsite_form.latitude}: {coordinate.latitude}
                                </Text>
                                <Text style={[textStyle, bottomMargin]}>
                                    {campsite_form.longitude}: {coordinate.longitude}
                                </Text>
                            </View>

                            <MapView
                                style={mapThumbnailStyle}
                                cacheEnabled={true}
                                onPress={this.onClickSiteDetailMapThumb}
                                region={{
                                    longitude: coordinate.longitude,
                                    latitude: coordinate.latitude,
                                    longitudeDelta: 1,
                                    latitudeDelta: 1
                                }}
                            >
                                <Marker
                                    coordinate={coordinate}
                                >

                                    <Icon type='material-community' name='tent' size={25} color={campsiteIcon}/>

                                </Marker>
                            </MapView>
                        </View>

                        <Text style={sectionTitleStyle}>
                            {campsite_form.facilities}
                        </Text>
                        <List>
                            {this.renderFacilities(facilities)}
                        </List>

                        <Text style={sectionTitleStyle}>
                            {campsite_form.features}
                        </Text>
                        <List>
                            {this.renderFeatures(features)}
                        </List>

                    </Card>
                </ScrollView>
            );
        }

    };

    render() {
        const {fillScreen} = styles;

        return (
            <View style={fillScreen}>
                {this.renderSiteDetailScreen()}
            </View>
        );
    }
}

const styles = StyleSheet.create({
    fillScreen: {
        flex: 1
    },
    textStyle: {
        fontSize: 15
    },
    bottomMargin: {
        marginBottom: 20
    },
    mainTitleStyle: {
        fontWeight: 'bold',
        fontSize: 30,
        color: navyBlueButton
    },
    sectionTitleStyle: {
        fontWeight: 'bold',
        fontSize: 25,
        color: navyBlueButton
    },
    locationMainContainerStyle: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignContent: 'center'
    },
    mapThumbnailStyle: {
        height: 100,
        width: 100,
        borderRadius: 50
    }
});

function mapStateToProps(state) {
    const {selectedSite} = state.map;

    return {selectedSite};
}

export default connect(mapStateToProps, {})(SiteDetailScreen);
