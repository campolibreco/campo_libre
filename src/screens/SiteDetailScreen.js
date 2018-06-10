import React, {Component} from 'react';
import {View, StyleSheet, ScrollView,  Platform, TouchableOpacity, Image, ImageBackground} from 'react-native';
import {Card, Text, ListItem, Badge} from 'react-native-elements';
import {Icon} from 'react-native-elements';
import {connect} from 'react-redux';
import {MapView, LinearGradient} from 'expo';

const {Marker} = MapView;

import {LargeButton} from '../components/common';

import _ from 'lodash';

import {attemptToAddFavorite, attemptToRemoveFavorite, attemptToUploadNewSite} from '../actions';

import {linkColorBlue, navyBlueButton,mossGreen,grayBlueDark,headerSemiWhiteTransparent,headerWhiteMediumTransparent, headerWhite, overlayBlue, headerWhiteTransparent, hyperlinkBlue, campsiteIcon, bloodOrange, sunsetOrange, boogerGreen,navBarBlue, eggShellWhite} from '../styles';

import {
    navKeys, facilityIconDetails, featureIconDetails, map, tokens, mvum_links, external_links,
    approval_state, site_form_type
} from '../constants';
import {submit_form, campsite, common, counties, forest_names, mvum_names, site_detail_screen} from '../locale.en';

const {campsite_form, admin_options} = campsite;
const {location} = common;

import {getUserCreditName, getSiteToShow, returnImageForSiteKey} from '../services/SiteInfoService';

class SiteDetailScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            siteImageData: require(`../../assets/defaultSiteImage.jpg`)
        }
    }


    componentDidMount() {
        const {selectedSite, selectedPendingSite, currentUser, navigation: {setParams}} = this.props;

        if (currentUser.name === tokens.GUEST) {
            return;
        }

        const isFavorite = !!_.find(currentUser.favorites, favorite => favorite.id === selectedSite.id);

        setParams({
            selectedSite,
            selectedPendingSite,
            isFavorite,
            currentUser,
            toggleSiteFavorite: this.toggleSiteFavorite
        });
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

    static renderRightNavButton = ({selectedSite, selectedPendingSite, isFavorite, currentUser, toggleSiteFavorite}) => {
        if (!currentUser || !selectedSite || _.isEmpty(selectedSite)) {
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
        const {selectedPendingSite} = params;

        return {
            headerTitle: !!selectedPendingSite && !_.isEmpty(selectedPendingSite) ? site_detail_screen[selectedPendingSite.approvalState] : '',
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
        const siteToShow = getSiteToShow(this.props);

        const {sectionTitleStyle, textStyle, bottomMargin} = styles;

        if (siteToShow && siteToShow.alternateSites) {
            return (
                <View>
                    <Text style={sectionTitleStyle}>
                        {campsite_form.alternate_sites}
                    </Text>
                    <Text style={[textStyle, bottomMargin]}>
                        {siteToShow.alternateSites}
                    </Text>
                </View>
            );
        }

    };

    renderMVUMInfo = () => {
        const siteToShow = getSiteToShow(this.props);
        const {sectionTitleStyle, textStyle, bottomMargin, hyperlinkStyle} = styles;

        if (siteToShow && siteToShow.mvum && mvum_names[siteToShow.mvum]) {
            return (
                <View>
                    <Text style={sectionTitleStyle}>
                        {campsite_form.mvum}
                    </Text>
                    <TouchableOpacity
                        onPress={() => Expo.WebBrowser.openBrowserAsync(mvum_links[siteToShow.mvum])}
                        // onPress={() => navigate(navKeys.MVUM_INSPECTOR)}
                    >
                        <Text style={[textStyle, bottomMargin, hyperlinkStyle]}>
                            {mvum_names[siteToShow.mvum]}
                        </Text>
                    </TouchableOpacity>
                </View>
            );
        }

    };

    renderCountyInfo = () => {
        const siteToShow = getSiteToShow(this.props);
        const {sectionTitleStyle, textStyle, bottomMargin, hyperlinkStyle, countyInlineStyle} = styles;

        if (siteToShow && siteToShow.county && counties[siteToShow.county]) {
            return (
                <View>
                    <Text style={sectionTitleStyle}>
                        {campsite_form.county}
                    </Text>
                    <View style={countyInlineStyle}>
                        <Text style={[textStyle, bottomMargin]}>
                            {counties[siteToShow.county]}
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

    renderReservationLinkIfNecessary = () => {
        const siteToShow = getSiteToShow(this.props);
        const {textStyle, bottomMargin, hyperlinkStyle, reservationInfoStyle} = styles;

        if (siteToShow && campsite_form.price_options[siteToShow.price] === campsite_form.price_options.paid_reservable) {
            return (
                    <View style={reservationInfoStyle}>
                        <Text style={[textStyle, bottomMargin]}>
                            {campsite_form.reserve_now}
                        </Text>
                        <TouchableOpacity
                            onPress={() => Expo.WebBrowser.openBrowserAsync(external_links.rec_dot_gov_reservations_url)}
                        >
                            <Text style={hyperlinkStyle}>
                                {campsite_form.rec_dot_gov}
                            </Text>
                        </TouchableOpacity>
                    </View>
            );
        }

    };

    renderForestInfo = () => {
        const siteToShow = getSiteToShow(this.props);
        const {sectionTitleStyle, textStyle, bottomMargin, hyperlinkStyle, countyInlineStyle} = styles;

        if (siteToShow && siteToShow.forest && forest_names[siteToShow.forest]) {
            return (
                <View>
                    <Text style={sectionTitleStyle}>
                        {campsite_form.forest}
                    </Text>
                    <View style={countyInlineStyle}>
                        <Text style={[textStyle, bottomMargin]}>
                            {forest_names[siteToShow.forest]}
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
        const siteToShow = getSiteToShow(this.props);

        if (siteToShow) {
            const {cellProvider, cellStrength} = siteToShow;
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
        const {navigation: {navigate}} = this.props;
        const siteToShow = getSiteToShow(this.props);

        return (
            <Icon
                reverse={true}
                name='edit'
                size={30}
                color={navyBlueButton}
                onPress={() => navigate(navKeys.EDIT_SITE)}
            />
        );

    };

    onClickForceSubmit = () => {
        const {currentUser, navigation: {navigate, goBack}} = this.props;
        const siteToShow = getSiteToShow(this.props);

        this.props.attemptToUploadNewSite(siteToShow, {navigate, goBack}, {currentUser});
    };

    renderAdminForceSubmitButton = () => {
        const {navigation: {navigate}} = this.props;
        const siteToShow = getSiteToShow(this.props);

        const {submitButtonStyle} = styles;

        return (
            <LargeButton
                title={submit_form.force_submit}
                iconName={'file-upload'}
                iconColor={'white'}
                buttonStyleOverride={submitButtonStyle}
                onPress={this.onClickForceSubmit}
            />
        );

    };

    renderUserCreditIfApplicable = () => {
        const {sectionTitleStyle, textStyle, bottomMargin} = styles;
        const siteToShow = getSiteToShow(this.props);

        if (!siteToShow || _.isEmpty(siteToShow)) {
            return null;
        } else {
            const uploadedBy = siteToShow.uploadedBy;
            const giveCredit = siteToShow.uploadedBy.giveCredit;

            return (
                <View>
                    <Text style={sectionTitleStyle}>
                        {submit_form.uploaded_by_title}
                    </Text>
                    <Text style={[textStyle, bottomMargin]}>
                        {getUserCreditName({uploadedBy, giveCredit})}
                    </Text>
                </View>
            );
        }


    };

    renderAdminButtons = () => {
        const siteToShow = getSiteToShow(this.props);
        const {approvalState} = siteToShow;

        const {adminOptionsButtonContainerStyle} = styles;

        if (approvalState === approval_state.APPROVED || approvalState === approval_state.PENDING_APPROVAL) {
            return (
                <View style={adminOptionsButtonContainerStyle}>
                    {this.renderAdminEditButton()}
                </View>
            );

        } else if (approvalState === approval_state.PENDING_UPLOAD) {
            return this.renderAdminForceSubmitButton();

        } else {
            return null;
        }

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

                {this.renderAdminButtons()}
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

    replaceImageData = () => {
        const siteToShow = getSiteToShow(this.props);

        returnImageForSiteKey({siteKey: siteToShow.id})
            .then(imageData => {
                this.setState({
                    siteImageData: {uri: `data:image/png;base64,${imageData}`}
                })
            });
    };

    renderSiteDetailScreen = () => {
        const {textStyle, sectionTitleStyle,overlayContainer,header, descriptionText, top, mainTitleStyle,  locationMainContainerStyle, mapThumbnailStyle, bottomMargin, topMargin, cardContainerStyle, contentContainerStyle, siteImageStyle, touchableContainerStyle} = styles;
        const siteToShow = getSiteToShow(this.props);

        if (!siteToShow) {
            return null;
        }

        const {accessibility, coordinate, description, directions, facilities, features, nearestTown, price, title, county} = siteToShow;

        if (siteToShow) {
            return (
                <ScrollView>


                        <TouchableOpacity
                            style={touchableContainerStyle}
                            onPress={this.onClickSiteImage}
                        >
                            <ImageBackground
                                style={siteImageStyle}
                                resizeMode={'cover'}
                                source={this.state.siteImageData}
                                onLoadStart={this.replaceImageData}
                            >

                            <View style={overlayContainer}>
                                <View style={top}>
                                    <Text style={header}>{title}</Text>
                                </View>
                                </View>
                            </ImageBackground>
                        </TouchableOpacity>

                        <View style={contentContainerStyle}>
                                <LinearGradient
                                          colors={['rgba(0,0,0,0.8)', 'transparent']}
                                          style={{
                                            position: 'absolute',
                                            left: 0,
                                            right: 0,
                                            top: 0,
                                            height: 1000,
                          }}
                        />
                            <Text style={descriptionText}>
                                {description}
                            </Text>



                            <Badge
                                  containerStyle={{ backgroundColor: bloodOrange,
                                  paddingLeft:10, paddingRight:10,marginBottom:10, marginTop:10}}
                                  value={campsite_form.facilities}
                                  textColor="white"
                                  maxWidth={150}
                                  textStyle={{fontSize:18}}
                            >

                                      </Badge>
                            <View>
                                {this.renderFacilities(facilities)}
                            </View>

                            <Text style={sectionTitleStyle}>
                                {campsite_form.features}
                            </Text>
                            <View>
                                {this.renderFeatures(features)}
                            </View>

                            <Text style={sectionTitleStyle}>
                                {campsite_form.price}
                            </Text>
                            <Text style={[textStyle, bottomMargin]}>
                                {campsite_form.price_options[price]}
                            </Text>
                            {this.renderReservationLinkIfNecessary()}

                            <Text style={sectionTitleStyle}>
                                {campsite_form.accessibility}
                            </Text>
                            <Text style={[textStyle, bottomMargin]}>
                                {campsite_form.accessibility_options[accessibility]}
                            </Text>

                            {this.renderCellCoverageInfo()}

                            {this.renderForestInfo()}

                            {this.renderCountyInfo()}

                            <Text style={sectionTitleStyle}>
                                {campsite_form.nearest_town}
                            </Text>
                            <Text style={[textStyle, bottomMargin]}>
                                {nearestTown}
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

                                        <Icon type='material-community' name='tent' size={25} color={sunsetOrange}/>

                                    </Marker>
                                </MapView>
                            </View>

                            <Text style={sectionTitleStyle}>
                                {campsite_form.directions}
                            </Text>
                            <Text style={[textStyle, bottomMargin]}>
                                {directions}
                            </Text>

                            {this.renderMVUMInfo()}

                            {this.renderAlternateSites()}

                            {this.renderUserCreditIfApplicable()}

                            {this.renderAdminOptions()}

                        </View>


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
        flex: 1,
        backgroundColor:grayBlueDark
    },
    descriptionText:{
      alignItems: 'center',
      justifyContent: 'center',
      paddingLeft: 10,
      paddingRight: 10,
      paddingTop:10,
      paddingBottom:10,
      marginTop:5,
      color:'white',
      fontSize:16,

    },
    textStyle: {
        fontSize: 15,
        color:'white'
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
        color: 'white',

        borderBottomWidth: 0,
        paddingLeft: 5,
        paddingRight: 5,
        backgroundColor:boogerGreen
    },
    sectionTitleStyle: {
        fontWeight: 'bold',
        fontSize: 25,
        color: bloodOrange
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
        height: 300
    },
    contentContainerStyle: {
        paddingLeft: 15,
        paddingRight: 15,
        marginBottom: 20,
        backgroundColor:sunsetOrange
    },
    touchableContainerStyle: {
        marginTop: -15,
        backgroundColor:grayBlueDark
    },
    hyperlinkStyle: {
        color: hyperlinkBlue,
        textDecorationLine: 'underline'
    },
    countyInlineStyle: {
        flexDirection: 'row'
    },
    reservationInfoStyle: {
        flexDirection: 'row',
        marginTop: -15
    },
    overlayContainer: {
        flex: 1,
    },
    top: {
        margin:20,
        height: '30%',
        alignItems: 'center',
        justifyContent: 'center',
        borderColor: headerWhiteMediumTransparent,
        borderWidth: 2,
        paddingLeft: 10,
        paddingRight: 10,
        paddingTop:10,
        paddingBottom:10,
        backgroundColor: headerSemiWhiteTransparent,
    },
    header: {
      color: 'white',
      alignSelf: 'center',
      textShadowColor: 'rgba(0, 0, 0, 0.55)',
      textShadowOffset: {width: 1, height: 1},
      textShadowRadius: 3,
      fontSize: 24,
      textAlign:'center'

    },
    adminOptionsButtonContainerStyle: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'flex-end'
    },
    submitButtonStyle: {
        marginTop: 10,
        marginBottom: 10,
        backgroundColor: sunsetOrange,
        marginBottom: 100
    },
});

function mapStateToProps(state) {
    const {selectedSite, selectedPendingSite} = state.map;
    const {currentUser} = state.auth;

    return {selectedSite, selectedPendingSite, currentUser};
}

export default connect(mapStateToProps, {attemptToAddFavorite, attemptToRemoveFavorite, attemptToUploadNewSite})(SiteDetailScreen);
