import React, {Component} from 'react';
import {View, StyleSheet, ScrollView, Platform, TouchableOpacity, Image} from 'react-native';
import {Card, Text, ListItem} from 'react-native-elements';
import {Icon} from 'react-native-elements';
import {connect} from 'react-redux';
import {MapView} from 'expo';

const {Marker} = MapView;

import _ from 'lodash';

import {SmallButton} from '../components/common';

import {attemptToAddFavorite, attemptToRemoveFavorite} from '../actions';

import {linkColorBlue, navyBlueButton, hyperlinkBlue} from '../styles/index';

import {navKeys, facilityIconDetails, featureIconDetails, map, tokens, mvum_links, external_links} from '../constants';
import {site_detail_screen, campsite, common, counties, forest_names, mvum_names} from '../locale.en';
import {campsiteIcon} from "../styles";

const {campsite_form, admin_options} = campsite;
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

            if (willBeFavorite !== params.isFavorite) {
                setParams({isFavorite: willBeFavorite});
            }
        }
    }

    toggleSiteFavorite = ({isFavorite, selectedSite, currentUser}) => {

        if (!isFavorite) {
            this.props.attemptToAddFavorite({favoriteSiteToAdd: selectedSite, currentUser});
        } else {
            this.props.attemptToRemoveFavorite({favoriteSiteToRemove: selectedSite, currentUser});
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

    renderAlternateSites = () => {
        const {selectedSite} = this.props;
        const {sectionTitleStyle, textStyle, bottomMargin} = styles;

        if (selectedSite && selectedSite.alternateSites) {
            return (
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

    renderMVUMInfo = () => {
        const {selectedSite, navigation: {navigate}} = this.props;
        const {sectionTitleStyle, textStyle, bottomMargin, hyperlinkStyle} = styles;

        if (selectedSite && selectedSite.mvum) {
            return (
                <View>
                    <Text style={sectionTitleStyle}>
                        {campsite_form.mvum}
                    </Text>
                    <TouchableOpacity
                        onPress={() => Expo.WebBrowser.openBrowserAsync(mvum_links[selectedSite.mvum])}
                        // onPress={() => navigate(navKeys.MVUM_INSPECTOR)}
                    >
                        <Text style={[textStyle, bottomMargin, hyperlinkStyle]}>
                            {mvum_names[selectedSite.mvum]}
                        </Text>
                    </TouchableOpacity>
                </View>
            );
        }

    };

    renderCountyInfo = () => {
        const {selectedSite} = this.props;
        const {sectionTitleStyle, textStyle, bottomMargin, hyperlinkStyle, countyInlineStyle} = styles;

        if (selectedSite && selectedSite.county) {
            return (
                <View>
                    <Text style={sectionTitleStyle}>
                        {campsite_form.county}
                    </Text>
                    <View style={countyInlineStyle}>
                        <Text style={[textStyle, bottomMargin]}>
                            {counties[selectedSite.county]}
                        </Text>
                        <Text>
                            {' - '}
                        </Text>
                        <TouchableOpacity
                            onPress={() => Expo.WebBrowser.openBrowserAsync(external_links.co_fire_bans_url)}
                        >
                            <Text style={hyperlinkStyle}>
                                {campsite_form.fire_ban_info}
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>
            );
        }

    };

    renderForestInfo = () => {
        const {selectedSite} = this.props;
        const {sectionTitleStyle, textStyle, bottomMargin, hyperlinkStyle, countyInlineStyle} = styles;

        if (selectedSite && selectedSite.forest) {
            return (
                <View>
                    <Text style={sectionTitleStyle}>
                        {campsite_form.forest}
                    </Text>
                    <View style={countyInlineStyle}>
                        <Text style={[textStyle, bottomMargin]}>
                            {forest_names[selectedSite.forest]}
                        </Text>
                    </View>
                </View>
            );
        }
    };

    renderCellProvider = ({cellProvider}) => {
        if (cellProvider) {
            const {textStyle, bottomMargin} = styles;

            return (
                <Text style={[textStyle, bottomMargin]}>
                    {campsite_form.cell_provider_options[cellProvider]}
                </Text>
            );
        }
    };

    renderCellStrength = ({cellProvider, cellStrength}) => {
        if (cellStrength) {
            const {textStyle, bottomMargin, leftPad} = styles;
            const stylesList = cellProvider ? [textStyle, bottomMargin, leftPad] : [textStyle, bottomMargin];

            return (
                <Text style={stylesList}>
                    {campsite_form.cell_strength_options[cellStrength]}
                </Text>
            );
        }
    };

    renderCellCoverageInfo = () => {
        const {selectedSite} = this.props;

        if (selectedSite) {
            const {cellProvider, cellStrength} = selectedSite;
            if (cellProvider || cellStrength) {
                const {sectionTitleStyle, cellServiceContainerStyle} = styles;

                return (
                    <View>
                        <Text style={sectionTitleStyle}>
                            {campsite_form.cell_service}
                        </Text>
                        <View style={cellServiceContainerStyle}>
                            {this.renderCellProvider({cellProvider})}
                            {this.renderCellStrength({cellProvider, cellStrength})}
                        </View>
                    </View>
                );
            }

        }
    };

    renderAdminEditButton = () => {

        return (
            <Icon
                reverse={true}
                name='edit'
                size={30}
                color={navyBlueButton}
                onPress={() => console.log('Clicked!')}
            />
        );

    };

    renderAdminOptions = () => {
        const {sectionTitleStyle, adminOptionsButtonContainerStyle} = styles;
        const {currentUser} = this.props;

        if (!currentUser || !currentUser.isAdmin) {
            return null;
        }

        return (
            <View>
                <Text style={sectionTitleStyle}>
                    {admin_options}
                </Text>

                <View style={adminOptionsButtonContainerStyle}>
                    {this.renderAdminEditButton()}
                </View>
            </View>
        )
    };

    onClickSiteDetailMapThumb = () => {
        const {navigation: {navigate}} = this.props;

        navigate(navKeys.SITE_DETAIL_MAP_VIEW);
    };

    onClickSiteImage = () => {
        const {navigation: {navigate}} = this.props;

        navigate(navKeys.SITE_IMAGE_GALLERY);
    };

    renderSiteDetailScreen = () => {
        const {textStyle, sectionTitleStyle, mainTitleStyle, locationMainContainerStyle, mapThumbnailStyle, bottomMargin, topMargin, cardContainerStyle, contentContainerStyle, siteImageStyle, touchableContainerStyle} = styles;
        const {selectedSite} = this.props;
        const {accessibility, coordinate, description, directions, facilities, features, nearestTown, price, siteImageData, title, county} = selectedSite;

        if (selectedSite) {
            return (
                <ScrollView>
                    <Card
                        title={title}
                        titleStyle={mainTitleStyle}
                        containerStyle={cardContainerStyle}
                        dividerStyle={{
                            margin: 0, padding: 0,
                            borderBottomWidth: 0
                        }}
                    >

                        <TouchableOpacity
                            style={touchableContainerStyle}
                            onPress={this.onClickSiteImage}
                        >
                            <Image
                                style={siteImageStyle}
                                resizeMode={'cover'}
                                source={siteImageData ? {uri: `data:image/png;base64,${siteImageData}`} : require('../../assets/starTent.jpg')}
                            />
                        </TouchableOpacity>

                        <View style={contentContainerStyle}>
                            <Text style={[textStyle, bottomMargin, topMargin]}>
                                {description}
                            </Text>

                            <Text style={sectionTitleStyle}>
                                {campsite_form.price}
                            </Text>
                            <Text style={[textStyle, bottomMargin]}>
                                {campsite_form.price_options[price]}
                            </Text>

                            <Text style={sectionTitleStyle}>
                                {campsite_form.accessibility}
                            </Text>
                            <Text style={[textStyle, bottomMargin]}>
                                {campsite_form.accessibility_options[accessibility]}
                            </Text>

                            {this.renderForestInfo()}

                            <Text style={sectionTitleStyle}>
                                {campsite_form.nearest_town}
                            </Text>
                            <Text style={[textStyle, bottomMargin]}>
                                {nearestTown}
                            </Text>

                            {this.renderCountyInfo()}

                            <Text style={sectionTitleStyle}>
                                {campsite_form.directions}
                            </Text>
                            <Text style={[textStyle, bottomMargin]}>
                                {directions}
                            </Text>

                            <Text style={sectionTitleStyle}>
                                {location}
                            </Text>
                            <View style={[bottomMargin, locationMainContainerStyle]}>
                                <View>
                                    <Text style={textStyle}>
                                        {campsite_form.latitude}: {coordinate.latitude.toFixed(5)}
                                    </Text>
                                    <Text style={[textStyle, bottomMargin]}>
                                        {campsite_form.longitude}: {coordinate.longitude.toFixed(5)}
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

                            {this.renderMVUMInfo()}

                            {this.renderAlternateSites()}

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

                            {this.renderCellCoverageInfo()}

                            {this.renderAdminOptions()}

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
    topMargin: {
        marginTop: 20
    },
    cardContainerStyle: {
        padding: 0,
        marginBottom: 20
    },
    mainTitleStyle: {
        fontWeight: 'bold',
        fontSize: 30,
        color: navyBlueButton,
        marginTop: 15,
        borderBottomWidth: 0,
        paddingLeft: 5,
        paddingRight: 5
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
    },
    cellServiceContainerStyle: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignContent: 'center'
    },
    leftPad: {
        marginLeft: 10
    },
    siteImageStyle: {
        height: 250
    },
    contentContainerStyle: {
        paddingLeft: 15,
        paddingRight: 15,
        marginBottom: 20
    },
    touchableContainerStyle: {
        marginTop: -15
    },
    hyperlinkStyle: {
        color: hyperlinkBlue,
        textDecorationLine: 'underline'
    },
    countyInlineStyle: {
        flexDirection: 'row'
    },
    adminOptionsButtonContainerStyle: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'flex-end'
    }
});

function mapStateToProps(state) {
    const {selectedSite} = state.map;
    const {currentUser} = state.auth;

    return {selectedSite, currentUser};
}

export default connect(mapStateToProps, {attemptToAddFavorite, attemptToRemoveFavorite})(SiteDetailScreen);
