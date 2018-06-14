// 3rd party libraries - core
import React, {Component} from 'react';
import {View, StyleSheet, Dimensions, ImageBackground, TouchableOpacity} from 'react-native';
import {connect} from 'react-redux';
import {Icon, Text} from 'react-native-elements';
import _ from 'lodash';

import {returnImageForSiteKey} from '../services/SiteInfoService';

// styles and language
import {campsite} from '../locale.en';

const {campsite_form: {accessibility_options}} = campsite;

import {featureIconDetails, facilityIconDetails, tokens, general} from "../constants";
import {badgeGreen, limeGreenTitle, RoyalBlueHighlight, bloodOrange, boogerGreen} from '../styles';

const SCREEN_WIDTH = Dimensions.get('window').width;

class SitePreview extends Component {

    constructor(props) {
        super(props);
        this.state = {
            siteImageData: require(`../../assets/defaultSiteImage.jpg`)
        }
    }

    renderIcons = ({features, facilities}) => {
        const featureIcons = _.map(features, feature => {
            return (
                <Icon
                   containerStyle={{marginRight:-2}}
                    key={feature}
                    color={boogerGreen}
                    reverse
                    size={13}
                    name={featureIconDetails[feature].name}
                    type={featureIconDetails[feature].type}
                />
            )
        });

        const facilityIcons = _.map(facilities, facility => {
            return (
                <Icon
                   containerStyle={{marginRight:-2}}
                    key={facility}
                    reverse
                    color={boogerGreen}
                    size={13}
                    name={facilityIconDetails[facility].name}
                    type={facilityIconDetails[facility].type}
                />
            );
        });

        return _.concat(featureIcons, facilityIcons);
    };

    renderFavoriteIcon = () => {
        if (this.props.currentUser.name === tokens.GUEST) {
            return;
        }

        return (
            <Icon type='ionicon'
                  name={this.props.isFavorite ? 'ios-heart' : 'ios-heart-outline'}
                  size={40}
                  color={bloodOrange}
                  onPress={() => this.props.toggleSiteFavorite({siteToToggle: this.props.siteToPreview})}
                  underlayColor={'rgba(0, 0, 0, 0)'}
            />
        );
    };

    replaceImageData = () => {
        returnImageForSiteKey({siteKey: this.props.siteToPreview.id})
            .then(imageData => {
                this.setState({
                    siteImageData: {uri: `data:image/png;base64,${imageData}`}
                })
            });
    };


    renderSelectedSitePreview = () => {
        if (this.props.siteToPreview && !_.isEmpty(this.props.siteToPreview)) {
            const {title, accessibility, features, facilities} = this.props.siteToPreview;
            const {sitePreviewContainerStyle, touchableMainContainerStyle, mainInnerContainerStyle, topRowInfoStyle, titleRowStyle, bottomRowInfoStyle, bottomRowText, IconContainer, closeIconContainerStyle} = styles;

            return (
                <ImageBackground
                    pointerEvents="none"
                    source={this.state.siteImageData}
                    style={sitePreviewContainerStyle}
                    onLoadStart={this.replaceImageData}
                >
                    <TouchableOpacity style={touchableMainContainerStyle}
                                      onPress={() => this.props.getSiteDetail({
                                          selectedSite: this.props.siteToPreview,
                                          navigate: this.props.navigate
                                      })}>
                        <View style={mainInnerContainerStyle}>
                            <View style={topRowInfoStyle}>
                                <Icon
                                    type='ionicon'
                                    name='md-close'
                                    size={30}
                                    color={'black'}
                                    onPress={() => this.props.getSiteDetail({selectedSite: null})}
                                    containerStyle={closeIconContainerStyle}
                                />

                                {this.renderFavoriteIcon()}

                            </View>

                            <View style={bottomRowInfoStyle}>
                                <View style={titleRowStyle}>
                                    <Text h4 style={bottomRowText}>{title}</Text>
                                    <Text style={bottomRowText}> - </Text>
                                    <Text style={bottomRowText}>{accessibility_options[accessibility]}</Text>
                                </View>

                                <View style={IconContainer}>
                                    {this.renderIcons({features, facilities})}
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

    render() {
        return (
            <View>
                {this.renderSelectedSitePreview()}
            </View>
        )
    }
}

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
        flexWrap: 'wrap',
        justifyContent:'center'
    },
    bottomRowInfoStyle: {
        margin: 10,
        justifyContent:'center'
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
        flexWrap: 'wrap',
        justifyContent:'center'
    },
    closeIconContainerStyle: {
        backgroundColor: 'white', borderRadius: 80, height: 30, width: 30, marginTop: 5
    }
});

function mapStateToProps(state, ownProps) {
    const {navigate, siteToPreview, getSiteDetail, isFavorite, toggleSiteFavorite, currentUser} = ownProps;

    return {navigate, siteToPreview, getSiteDetail, isFavorite, toggleSiteFavorite, currentUser};
}

export default connect(mapStateToProps, {})(SitePreview);
