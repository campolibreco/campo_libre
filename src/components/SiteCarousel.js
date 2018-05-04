// 3rd party libraries - core
import React, {Component} from 'react';
import {View, StyleSheet, ActivityIndicator, Dimensions, ImageBackground, TouchableOpacity} from 'react-native';
import {Icon, Card, Text} from 'react-native-elements';
import Swiper from 'react-native-swiper';
import _ from 'lodash';

import SitePreview from './SitePreview';

// 3rd party libraries - additional

// styles and language
import {campsite} from '../locale.en';
import {attemptToAddFavorite, attemptToRemoveFavorite, getSiteDetail} from "../actions";
import {connect} from "react-redux";

const {campsite_form: {accessibility_options}} = campsite;

const SCREEN_WIDTH = Dimensions.get('window').width;


class SiteCarousel extends Component {

    constructor(props) {
        super(props);
        this.state = {}
    }

    componentWillMount() {
        const {displaySites, selectedSite} = this.props;

        if(displaySites.length === 0){
            return;
        }

        const currentSiteIndex = _.findIndex(displaySites, site => site.id === selectedSite.id);

        this.setState({
            initialIndex: currentSiteIndex > -1 ? currentSiteIndex : 0
        });
    }

    componentWillReceiveProps(nextProps) {
        const {selectedSite} = this.props;

        if(nextProps.displaySites.length === 0){
            return;
        }

        if(selectedSite.id !== nextProps.selectedSite.id){
            let currentSiteIndex = _.findIndex(nextProps.displaySites, site => site.id === nextProps.selectedSite.id);

            this.setState({
                initialIndex: currentSiteIndex > -1 ? currentSiteIndex : 0
            });
        }
    }

    selectedSiteIsFavorite = () => {
        const {currentUser, selectedSite} = this.props;

        return !!_.find(currentUser.favorites, favorite => favorite.id === selectedSite.id);
    };

    toggleSiteFavorite = ({siteToToggle}) => {
        const {currentUser} = this.props;

        if (!this.selectedSiteIsFavorite()) {
            this.props.attemptToAddFavorite({favoriteSiteToAdd: siteToToggle, currentUser});
        } else {
            this.props.attemptToRemoveFavorite({favoriteSiteToRemove: siteToToggle, currentUser});
        }
    };

    setNextSelectedSite = (newIndex) => {
        const {displaySites} = this.props;

        const newSelectedSite = displaySites[newIndex];

        this.props.getSiteDetail({selectedSite: newSelectedSite});
    };


    renderSlides = () => {
        const {navigate, displaySites} = this.props;

        return _.map(displaySites, site => {
            return (
                <SitePreview
                    key={site.key}
                    navigate={navigate}
                    siteToPreview={site}
                    getSiteDetail={this.props.getSiteDetail}
                    isFavorite={this.selectedSiteIsFavorite()}
                    toggleSiteFavorite={this.toggleSiteFavorite}
                />
            );
        });

    };

    render() {
        const {selectedSite} = this.props;

        if (!selectedSite || _.isEmpty(selectedSite)) {
            return null;
        }

        const {carouselContainerStyle, swipeButtonRowStyle} = styles;
        return (
            <View style={carouselContainerStyle}>
                <Swiper
                    showsButtons={true}
                    buttonWrapperStyle={swipeButtonRowStyle}
                    index={this.state.initialIndex}
                    onIndexChanged={this.setNextSelectedSite}
                    loop={false}
                >
                    {this.renderSlides()}
                </Swiper>
            </View>
        );
    }

};

const styles = StyleSheet.create({
    carouselContainerStyle: {
        position: 'absolute',
        bottom: 0,
        height: 200,
        width: SCREEN_WIDTH
    },
    swipeButtonRowStyle: {
        alignItems: 'flex-end'
    }
});


function mapStateToProps(state) {
    const {displaySites, selectedSite} = state.map;
    const {currentUser} = state.auth;

    return {currentUser, displaySites, selectedSite};
}

export default connect(mapStateToProps, {
    getSiteDetail,
    attemptToAddFavorite,
    attemptToRemoveFavorite
})(SiteCarousel);