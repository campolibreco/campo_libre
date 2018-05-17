import React, {Component} from 'react';
import {TouchableOpacity, View, Platform, ScrollView} from 'react-native';
import {connect} from 'react-redux';

import _ from 'lodash';

import {Icon, Overlay, Text, Card} from 'react-native-elements';
import {badgeGreen, limeGreenTitle, linkColorBlue, blueGreenNav} from '../styles/index';
import {campsite, common, login} from '../locale.en';

import CampsiteListItem from '../components/CampsiteListItem';
import {LargeButton} from '../components/common';


import {navKeys, tokens} from '../constants';
import {add_site_screen} from '../locale.en';

const {title, header_title, must_log_in_detail, no_pending_sites_header, no_pending_sites_detail, pending_sites_header} = add_site_screen;

import {getPendingCampsites, getSiteDetail, logUserIntoFacebook} from '../actions';
import {facebookBlueButtonTransparent, navyBlueButton} from "../styles";

class AddSiteScreen extends Component {

    componentWillMount() {
        const {currentUser} = this.props;

        this.props.getPendingCampsites({currentUser});
    }


    static renderRightNavButton = (navigate) => {
        const {topRightIconStyle} = styles;

        if (Platform.OS === 'ios') {
            return (
                <TouchableOpacity style={topRightIconStyle} onPress={() => navigate(navKeys.ADD_SITE_FORM)}>
                    <Icon type='entypo'
                          name='add-to-list'
                          size={25}
                          color={linkColorBlue}

                    />
                </TouchableOpacity>
            );
        } else if (Platform.OS === 'android') {
            // android-specific code for navigation here
        }
    };

    static navigationOptions = (props) => {
        const {navigation: {navigate}} = props;

        return {
            title: title,
            headerTitle: header_title,
            headerLeft: null,
            headerRight: AddSiteScreen.renderRightNavButton(navigate),
            tabBarIcon: ({focused, tintColor}) => (
                <Icon type='material-community' name={focused ? 'tent' : 'tent'} size={25} color={tintColor}/>)
        }
    };

    renderPendingSites = ({sites, getSiteDetail, navigate}) => {
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

    onPressFacebookLogin = () => {
        const {navigation: {navigate}} = this.props;

        this.props.logUserIntoFacebook({navigate});
    };

    renderAddSiteScreen() {
        const {currentUser, pendingSites} = this.props;
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
        else if (pendingSites.length > 0) {
            const {navigation: {navigate}} = this.props;
            const {fillScreen} = styles;

            return (
                <View style={fillScreen}>
                    <Text style={headerTitleStyle}>{pending_sites_header}</Text>

                    <ScrollView>

                        {this.renderPendingSites({
                            sites: pendingSites,
                            getSiteDetail: this.props.getSiteDetail,
                            navigate
                        })}
                    </ScrollView>
                </View>
            );
        } else {
            return (
                <Card>
                    <Text style={headerTitleStyle}>{no_pending_sites_header}</Text>
                    <Text style={infoTextStyle}>{no_pending_sites_detail}</Text>
                </Card>
            );
        }

    }

    render() {
        const {fillScreen} = styles;

        return (
            <View style={fillScreen}>
                {this.renderAddSiteScreen()}
            </View>
        );
    }
}

const styles = {
    fillScreen: {
        flex: 1,
    },
    topRightIconStyle: {
        paddingRight: 20
    },
    headerTitleStyle: {
        fontSize: 30,
        marginTop: 20,
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

};

const mapStateToProps = (state, ownProps) => {
    const {currentUser} = state.auth;
    const {pendingSites} = state.map;

    return {currentUser, pendingSites};
};

export default connect(mapStateToProps, {getPendingCampsites, getSiteDetail, logUserIntoFacebook})(AddSiteScreen);
