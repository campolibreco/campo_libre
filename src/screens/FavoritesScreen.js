import React, {Component} from 'react';
import {View, ScrollView, StyleSheet} from 'react-native';
import {connect} from 'react-redux';
import {Icon, Text, Card} from 'react-native-elements';

import _ from 'lodash';

import CampsiteListItem from '../components/CampsiteListItem';
import {LargeButton} from '../components/common';


import {getSiteDetail, logUserIntoFacebook} from '../actions';

import {tokens} from '../constants';
import {facebookBlueButtonTransparent, navyBlueButton} from '../styles';
import {common, favorites, login} from '../locale.en';

const {no_favorites_header, no_favorites_detail, must_log_in_detail} = favorites;

class FavoritesScreen extends Component {

    componentDidMount() {
        this._sub = this.props.navigation.addListener('didFocus', () => {
            this.props.getSiteDetail({selectedSite: null});
        });
    }

    componentWillUnmount() {
        this._sub.remove();
    }

    static navigationOptions = () => {

        return {
            title: 'Favorites',
            headerTitle: 'Your Favorite Campsites',
            headerLeft: null,
            tabBarIcon: ({focused, tintColor}) => (
                <Icon type='ionicon' name={focused ? 'ios-heart' : 'ios-heart-outline'} size={25} color={tintColor}/>)
        }

    };

    onPressFacebookLogin = () => {
        const {navigation: {navigate}} = this.props;

        this.props.logUserIntoFacebook({navigate});
    };

    renderFavorites = ({sites, getSiteDetail, navigate}) => {
        return _.map(sites, (site, index) => {
            return (
                <CampsiteListItem
                    key={index}
                    site={site}
                    getSiteDetail={getSiteDetail}
                    navigate={navigate}
                />
            );
        });
    };

    renderFavoritesScreen = () => {
        const {currentUser} = this.props;
        const {headerTitleStyle, infoTextStyle, facebookStyle} = styles;

        if (!currentUser || currentUser.name === tokens.GUEST) {
            return (
                <Card>
                    <Text style={headerTitleStyle}>{common.must_log_in}</Text>
                    <Text style={infoTextStyle}>{must_log_in_detail}</Text>

                    <LargeButton
                        title={login.login_with_facebook}
                        iconType={'font-awesome'}
                        iconName={'facebook'}
                        iconColor={'white'}
                        buttonStyleOverride={facebookStyle}
                        onPress={this.onPressFacebookLogin}
                    />
                </Card>
            );
        }
        else if (currentUser && currentUser.favorites && currentUser.favorites.length > 0) {
            const {navigation: {navigate}} = this.props;
            const {fillScreen} = styles;

            return (
                <View style={fillScreen}>
                    <ScrollView>

                        {this.renderFavorites({
                            sites: currentUser.favorites,
                            getSiteDetail: this.props.getSiteDetail,
                            navigate
                        })}
                    </ScrollView>
                </View>
            );
        } else {
            return (
                <Card>
                    <Text style={headerTitleStyle}>{no_favorites_header}</Text>
                    <Text style={infoTextStyle}>{no_favorites_detail}</Text>
                </Card>
            );
        }
    };

    render() {
        const {fillScreen} = styles;

        return (
            <View style={fillScreen}>
                {this.renderFavoritesScreen()}
            </View>
        );
    }
}

const styles = StyleSheet.create({
    fillScreen: {
        flex: 1,
    },
    headerTitleStyle: {
        fontSize: 30,
        marginBottom: 20,
        color: navyBlueButton,
        alignSelf: 'center'
    },
    infoTextStyle: {
        fontSize: 15
    },
    facebookStyle: {
        backgroundColor: facebookBlueButtonTransparent,
        margin: 0,
        marginTop: 40
    },
});

function mapStateToProps(state) {
    const {currentUser} = state.auth;

    return {currentUser};
}

export default connect(mapStateToProps, {getSiteDetail, logUserIntoFacebook})(FavoritesScreen);
