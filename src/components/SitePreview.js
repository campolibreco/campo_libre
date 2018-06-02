// 3rd party libraries - core
import React from 'react';
import {View, StyleSheet, Dimensions, ImageBackground, TouchableOpacity} from 'react-native';
import {Icon, Text} from 'react-native-elements';
import _ from 'lodash';

// 3rd party libraries - additional

// styles and language
import {campsite} from '../locale.en';

const {campsite_form: {accessibility_options}} = campsite;

import {featureIconDetails, facilityIconDetails, tokens} from "../constants";

const SCREEN_WIDTH = Dimensions.get('window').width;

const SitePreview = ({navigate, siteToPreview, getSiteDetail, isFavorite, toggleSiteFavorite, currentUser}) => {

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

    const renderFavoriteIcon = () => {
        if (currentUser.name === tokens.GUEST) {
            return;
        }

        return (
            <Icon type='ionicon'
                  name={isFavorite ? 'ios-heart' : 'ios-heart-outline'}
                  size={40}
                  color={'white'}
                  onPress={() => toggleSiteFavorite({siteToToggle: siteToPreview})}
            />
        );
    };

    const renderSelectedSitePreview = () => {
        if (siteToPreview && !_.isEmpty(siteToPreview)) {
            const {title, accessibility, siteImageData, features, facilities} = siteToPreview;
            const {sitePreviewContainerStyle, touchableMainContainerStyle, mainInnerContainerStyle, topRowInfoStyle, titleRowStyle, bottomRowInfoStyle, bottomRowText, closeIconStyle, IconContainer} = styles;

            return (
                <ImageBackground
                    pointerEvents="none"
                    source={siteImageData ? {uri: `data:image/png;base64,${siteImageData}`} : require('../../assets/starTent.jpg')}
                    style={sitePreviewContainerStyle}
                >
                    <TouchableOpacity style={touchableMainContainerStyle}
                                      onPress={() => getSiteDetail({selectedSite: siteToPreview, navigate})}>
                        <View style={mainInnerContainerStyle}>
                            <View style={topRowInfoStyle}>
                                <Icon style={closeIconStyle}
                                      type='ionicon'
                                      name='md-close-circle'
                                      size={40}
                                      color={'white'}
                                      onPress={() => getSiteDetail({selectedSite: null})}
                                />

                                {renderFavoriteIcon()}

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
        } else {
            return null;
        }
    };

    return renderSelectedSitePreview();
};

const styles = StyleSheet.create({
    sitePreviewContainerStyle: {
        display: 'flex',
        width: SCREEN_WIDTH,
        height: 200,
        alignContent: 'center',
        justifyContent: 'center',
        paddingBottom: 50
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
    bottomRowInfoStyle: {
        margin: 10,
        // marginBottom: 180
    },
    bottomRowText: {
        color: 'white',
        fontWeight: 'bold',
        alignSelf: 'center',
        textShadowColor: 'rgba(0, 0, 0, 0.75)',
        textShadowOffset: {width: 1, height: 1},
        textShadowRadius: 3
    },
    IconContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap'
    }
});

export default SitePreview;