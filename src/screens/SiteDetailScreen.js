import React, {Component} from 'react';
import {View, StyleSheet, ScrollView, Platform, TouchableOpacity, Image} from 'react-native';
import {Card, Text, ListItem} from 'react-native-elements';
import {Icon} from 'react-native-elements';
import {connect} from 'react-redux';
import {MapView} from 'expo';

const {Marker} = MapView;

import _ from 'lodash';

import {attemptToAddFavorite, attemptToRemoveFavorite} from '../actions';

import {linkColorBlue, navyBlueButton} from '../styles/index';

import {navKeys, facilityIconDetails, featureIconDetails, map, tokens} from '../constants';
import {site_detail_screen, campsite, common} from '../locale.en';
import {campsiteIcon} from "../styles";

const {campsite_form} = campsite;
const {location} = common;

class SiteDetailScreen extends Component {

    componentDidMount() {
        const {selectedSite, currentUser, navigation: {setParams}} = this.props;

        if (currentUser.name === tokens.GUEST) {
            return;
        }

        const isFavorite = !!_.find(currentUser.favorites, favorite => favorite.id === selectedSite.id);

        setParams({selectedSite, isFavorite, currentUser, toggleSiteFavorite: this.toggleSiteFavorite});
    }

    componentWillReceiveProps(nextProps) {
        const {navigation: {setParams, state: {params}}} = this.props;

        if (!_.isUndefined(params)) {
            const {currentUser, selectedSite} = nextProps;
            const willBeFavorite = !!_.find(currentUser.favorites, favorite => favorite.id === selectedSite.id);

            if(willBeFavorite !== params.isFavorite){
                setParams({isFavorite: willBeFavorite});
            }
        }
    }

    toggleSiteFavorite = ({isFavorite, selectedSite, currentUser}) => {

        if (!isFavorite) {
            this.props.attemptToAddFavorite({selectedSite, currentUser});
        } else {
            this.props.attemptToRemoveFavorite({selectedSite, currentUser});
        }

    };

    static renderRightNavButton = ({selectedSite, isFavorite, currentUser, toggleSiteFavorite}) => {
        if (!currentUser) {
            return;
        }

        const {topRightIconStyle} = styles;

        if (Platform.OS === 'ios') {
            return (
                <TouchableOpacity style={topRightIconStyle}
                                  onPress={() => toggleSiteFavorite({isFavorite, selectedSite, currentUser})}>
                    <Icon type='ionicon'
                          name={isFavorite ? 'ios-heart' : 'ios-heart-outline'}
                          size={30}
                          color={linkColorBlue}
                    />
                </TouchableOpacity>
            );
        } else if (Platform.OS === 'android') {
            // android-specific code for navigation here
        }
    };

    static navigationOptions = (props) => {
        const {navigation: {state: {params = {}}}} = props;

        return {
            headerRight: SiteDetailScreen.renderRightNavButton(params)
        }
    };

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

    renderAlternateSites = () =>{
        const {selectedSite} = this.props;
        const {sectionTitleStyle, textStyle, bottomMargin} = styles;

        if(selectedSite.alternateSites && selectedSite.alternateSites !== ''){
            return(
                <View>
                    <Text style={sectionTitleStyle}>
                        {campsite_form.alternate_sites}
                    </Text>
                    <Text style={[textStyle, bottomMargin]}>
                        {selectedSite.alternateSites}
                    </Text>
                </View>
            );
        }

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
                        imageProps={{resizeMode: 'cover'}}
                        imageStyle={{height: 250}}
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

                        {this.renderAlternateSites()}

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
                        <View>
                            {this.renderFacilities(facilities)}
                        </View>

                        <Text style={sectionTitleStyle}>
                            {campsite_form.features}
                        </Text>
                        <View>
                            {this.renderFeatures(features)}
                        </View>

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
    }, topRightIconStyle: {
        paddingRight: 20
    }
});

function mapStateToProps(state) {
    const {selectedSite} = state.map;
    const {currentUser} = state.auth;

    return {selectedSite, currentUser};
}

export default connect(mapStateToProps, {attemptToAddFavorite, attemptToRemoveFavorite})(SiteDetailScreen);
