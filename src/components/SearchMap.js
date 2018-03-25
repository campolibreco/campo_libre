// 3rd party libraries - core
import React from 'react';
import {View, StyleSheet, ActivityIndicator, Dimensions, ImageBackground, TouchableOpacity} from 'react-native';
import {Icon, Card, Text} from 'react-native-elements';
import {MapView} from 'expo';

const {Marker} = MapView;
import _ from 'lodash';

// 3rd party libraries - additional

// styles and language
import {campsite} from '../locale.en';

const {campsite_form: {accessibility_options}} = campsite;

import {featureIconDetails, facilityIconDetails} from "../constants";

import {campsiteIcon, selectedCampsiteIcon, navyBlueButton} from '../styles';

const SCREEN_WIDTH = Dimensions.get('window').width;

const SearchMap = ({mapLoaded, lastKnownRegion, updateRegion, sites, navigate, selectedSite, getSiteDetail}) => {
    const {fillScreen, spinnerContainerStyle} = styles;

    const newRegionIsAcceptable = (newRegion) => {
        const {longitude, latitude, latitudeDelta, longitudeDelta} = newRegion;

        const zoomedTooFarOut = latitudeDelta > 60 || longitudeDelta > 60;
        const isSF = (Math.abs(Math.abs(longitude) - 122.409) < 1) && (Math.abs(Math.abs(latitude) - 37.787) < 1);

        return !isSF && !zoomedTooFarOut;
    };

    const renderSites = () => {
        const renderedSites = _.map(sites, site => {
            const {title, description, coordinate, id} = site;
            const isSelectedSite = !!selectedSite && id === selectedSite.id;

            return (
                <Marker
                    onPress={() => getSiteDetail({selectedSite: site})}
                    key={id}
                    title={title}
                    description={description}
                    coordinate={coordinate}
                >

                    <Icon type='material-community' name='tent' size={25}
                          color={isSelectedSite ? selectedCampsiteIcon : campsiteIcon}/>

                </Marker>
            );
        });

        return renderedSites;
    };

    const onRegionChange = (newRegion) => {

        if (!newRegionIsAcceptable(newRegion)) {
            return;
        }

        updateRegion(newRegion);
    };

    const renderIcons = ({features, facilities}) => {
        const featureIcons = _.map(features, feature => {
            return (
                <Icon
                    key={feature}
                    reverse
                    size={15}
                    name={featureIconDetails[feature].name}
                    type={featureIconDetails[feature].type}
                />
            )
        });

        const facilityIcons = _.map(facilities, facility => {
            return (
                <Icon
                    key={facility}
                    reverse
                    size={15}
                    name={facilityIconDetails[facility].name}
                    type={facilityIconDetails[facility].type}
                />
            );
        });

        return _.concat(featureIcons, facilityIcons);
    };

    const renderSelectedSitePreview = () => {
        if (selectedSite && !_.isEmpty(selectedSite)) {
            const {id, title, description, nearestTown, accessibility, siteImageData, features, facilities} = selectedSite;
            const {sitePreviewContainerStyle, touchableMainContainerStyle, mainInnerContainerStyle, topRowInfoStyle, topRowText, titleRowStyle, bottomRowInfoStyle, bottomRowText, closeIconStyle, IconContainer} = styles;

            return (
                <ImageBackground
                    pointerEvents="none"
                    source={siteImageData ? {uri: `data:image/png;base64,${siteImageData}`} : require('../../assets/starTent.jpg')}
                    style={sitePreviewContainerStyle}
                >
                    <TouchableOpacity style={touchableMainContainerStyle} onPress={() => getSiteDetail({selectedSite: selectedSite, navigate})}>
                        <View style={mainInnerContainerStyle}>
                            <View style={topRowInfoStyle}>
                                <View>

                                </View>
                                <Icon style={closeIconStyle} type='ionicon' name='md-close-circle' size={40}
                                      color={'white'}
                                      onPress={() => getSiteDetail({selectedSite: null})}/>
                            </View>

                            <View style={bottomRowInfoStyle}>
                                <View style={titleRowStyle}>
                                    <Text h4 style={bottomRowText}>{title}</Text>
                                    <Text style={bottomRowText}> - </Text>
                                    <Text style={bottomRowText}>{accessibility_options[accessibility]}</Text>
                                </View>

                                <View style={IconContainer}>
                                    {renderIcons({features, facilities})}
                                </View>
                            </View>
                        </View>
                    </TouchableOpacity>

                </ImageBackground>
            );
        }
    };

    const renderMap = () => {
        if (mapLoaded) {
            return (
                <View style={fillScreen}>
                    <MapView
                        style={fillScreen}
                        initialRegion={lastKnownRegion}
                        onRegionChangeComplete={onRegionChange}
                        rotateEnabled={false}
                    >

                        {renderSites()}

                    </MapView>

                    {renderSelectedSitePreview()}

                </View>
            );
        } else {
            return (
                <View style={[fillScreen, spinnerContainerStyle]}>
                    <ActivityIndicator size="large"/>
                </View>
            );
        }
    };

    return (
        <View style={fillScreen}>
            {renderMap()}
        </View>
    );

};

const styles = StyleSheet.create({
    fillScreen: {
        flex: 1
    },
    spinnerContainerStyle: {
        justifyContent: 'center'
    },
    sitePreviewContainerStyle: {
        position: 'absolute',
        bottom: 0,
        width: SCREEN_WIDTH,
        display: 'flex',
        alignContent: 'center',
        justifyContent: 'center',
        height: 200
    },
    sitePreviewStyle: {
        width: SCREEN_WIDTH,
        height: 200
    },
    touchableMainContainerStyle: {
        flex: 1
    },
    mainInnerContainerStyle: {
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        backgroundColor: 'transparent'
    },
    topRowInfoStyle: {
        margin: 5,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    titleRowStyle: {
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap'
    },
    closeIconStyle: {},
    topRowText: {
        color: 'white',
        fontWeight: 'bold'
    },
    bottomRowInfoStyle: {
        margin: 10,
    },
    bottomRowText: {
        color: 'white',
        fontWeight: 'bold',
        alignSelf: 'center'
    },
    IconContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap'
    }
});

export default SearchMap;