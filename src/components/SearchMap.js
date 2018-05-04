// 3rd party libraries - core
import React from 'react';
import {View, StyleSheet, ActivityIndicator, Dimensions, ImageBackground, TouchableOpacity} from 'react-native';
import {Icon, Card, Text} from 'react-native-elements';
import {MapView} from 'expo';

const {Marker} = MapView;
import _ from 'lodash';

import SiteCarousel from './SiteCarousel';


// styles and language
import {campsite} from '../locale.en';

const {campsite_form: {accessibility_options}} = campsite;

import {featureIconDetails, facilityIconDetails} from "../constants";

import {campsiteIcon, selectedCampsiteIcon, navyBlueButton, linkColorBlue} from '../styles';

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

                    <SiteCarousel
                        navigate={navigate}
                    />

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
    }
});

export default SearchMap;