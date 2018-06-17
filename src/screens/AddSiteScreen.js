import React, {Component} from 'react';
import {TouchableOpacity, View, Platform, ScrollView, ActivityIndicator} from 'react-native';
import {connect} from 'react-redux';

import _ from 'lodash';

import {Icon, Overlay, Text, Card} from 'react-native-elements';
import {
    linkColorBlue,
    facebookBlueButtonTransparent,
    grayBlueDark,
    navyBlueButton,
    errorRed,
    sunsetOrange
} from '../styles';
import {campsite, common, login} from '../locale.en';

import CampsiteListItem from '../components/CampsiteListItem';
import {LargeButton} from '../components/common';


import {connection_type, effective_connection_type, navKeys, site_form_type, tokens} from '../constants';
import {add_site_screen} from '../locale.en';

const {title, header_title, must_log_in_detail, no_pending_sites_header, no_pending_sites_detail, pending_sites_header, pending_upload_sites_header, pending_upload_sites_description, pending_upload_sites_waiting, pending_sites_description} = add_site_screen;

import {
    getPendingCampsites,
    logUserIntoFacebook,
    getPendingSiteDetail,
    setUpConnectionListener,
    attemptToUploadNewSite,
    checkCurrentConnectionInfo
} from '../actions';

class AddSiteScreen extends Component {

    connectionIsStrongEnough = (props) => {
        const {connectionInfo: {type, effectiveType}} = props;

        const connectionIsWifi = type === connection_type.WIFI;
        const connectionIsStrongCell = type === connection_type.CELL && effectiveType === effective_connection_type.FOUR_G;

        return connectionIsWifi || connectionIsStrongCell;
    };

    thereAreSitesToUpload = ({pendingUploadSites}) => {
        return !!pendingUploadSites && pendingUploadSites.length > 0;
    };

    attemptToUploadNewSiteIfNecessary = ({pendingUploadSites, uploadInProgress, props}) => {
        const thereAreSitesToUpload = this.thereAreSitesToUpload({pendingUploadSites});
        const connectionIsStrongEnough = this.connectionIsStrongEnough(props);

        if (thereAreSitesToUpload && !uploadInProgress && connectionIsStrongEnough) {
            const {navigation: {navigate, goBack}, currentUser} = this.props;

            const siteToUpload = _.first(pendingUploadSites);
            this.props.attemptToUploadNewSite(siteToUpload, {navigate, goBack}, {currentUser});
        }

    };

    componentWillMount() {
        const {currentUser} = this.props;

        this.props.getPendingCampsites({currentUser});
        this.props.setUpConnectionListener();
    }

    componentDidMount() {
        const {currentUser, navigation: {setParams}, pendingUploadSites, uploadInProgress} = this.props;

        setParams({currentUser});

        this._sub = this.props.navigation.addListener('didFocus', info => {
            const thereAreSitesToUpload = this.thereAreSitesToUpload({pendingUploadSites});

            if (thereAreSitesToUpload) {
                this.props.checkCurrentConnectionInfo();
            }
        });
    }

    componentWillUnmount() {
        this._sub.remove();
    }


    componentWillReceiveProps(nextProps) {
        const {pendingUploadSites, uploadInProgress} = nextProps;

        this.attemptToUploadNewSiteIfNecessary({pendingUploadSites, uploadInProgress, props: nextProps});
    }

    static renderRightNavButton = ({navigate, params}) => {
        const {topRightIconStyle} = styles;
        const {currentUser} = params;

        if (!currentUser || currentUser.name === tokens.GUEST) {
            return null;
        }

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
        const {navigation: {navigate, state: {params = {}}}} = props;

        return {
            title: title,
            headerTitle: header_title,
            headerLeft: null,
            headerRight: AddSiteScreen.renderRightNavButton(({navigate, params})),
            tabBarIcon: ({focused, tintColor}) => (
                <Icon type='material-community' name={focused ? 'tent' : 'tent'} size={25} color={tintColor}/>)
        }
    };

    renderPendingSites = ({sites, getPendingSiteDetail, navigate}) => {
        return _.map(sites, (site, index) => {
            return (
                <CampsiteListItem
                    key={index}
                    site={site}
                    getSiteDetail={getPendingSiteDetail}
                    navigate={navigate}
                />
            );
        });
    };

    onPressFacebookLogin = () => {
        const {navigation: {navigate}} = this.props;

        this.props.logUserIntoFacebook({navigate});
    };

    renderWaitingOnConnectionIfNecessary() {
        const {pendingUploadSites} = this.props;
        const {infoTextStyle, errorTextStyle, waitingSignalRowStyle, leftMargin, padSides} = styles;

        const thereAreSitesToUpload = this.thereAreSitesToUpload({pendingUploadSites});
        const connectionIsStrongEnough = this.connectionIsStrongEnough(this.props);

        if (thereAreSitesToUpload && !connectionIsStrongEnough) {
            return (
                <View style={[waitingSignalRowStyle, padSides]}>
                    <ActivityIndicator size='large'/>
                    <Text style={[infoTextStyle, errorTextStyle, leftMargin]}>{pending_upload_sites_waiting}</Text>
                </View>
            );
        } else {
            return null;
        }
    }

    renderPendingUploadSites() {
        const {pendingUploadSites} = this.props;
        const {headerTitleStyle, infoTextStyle} = styles;

        if (pendingUploadSites.length > 0) {
            const {navigation: {navigate}} = this.props;
            const {listContainerStyle, marginBottom, padSides} = styles;

            return (
                <View style={listContainerStyle}>
                    <Text style={headerTitleStyle}>{pending_upload_sites_header}</Text>
                    <Text style={[infoTextStyle, padSides]}>{pending_upload_sites_description}</Text>
                    {this.renderWaitingOnConnectionIfNecessary()}

                    {this.renderPendingSites({
                        sites: pendingUploadSites,
                        getPendingSiteDetail: this.props.getPendingSiteDetail,
                        navigate
                    })}
                </View>
            );
        } else {
            return null;
        }
    }

    renderPendingApprovalSites() {
        const {pendingSites} = this.props;
        const {headerTitleStyle, infoTextStyle} = styles;

        if (pendingSites.length > 0) {
            const {navigation: {navigate}} = this.props;
            const {listContainerStyle, padSides} = styles;

            return (
                <View style={listContainerStyle}>
                    <Text style={headerTitleStyle}>{pending_sites_header}</Text>
                    <Text style={[infoTextStyle, padSides]}>{pending_sites_description}</Text>

                    {this.renderPendingSites({
                        sites: pendingSites,
                        getPendingSiteDetail: this.props.getPendingSiteDetail,
                        navigate
                    })}
                </View>
            );
        } else {
            return null;
        }
    }

    renderAllPendingSites() {
        const {navigation: {navigate}} = this.props;
        const {fillScreen} = styles;

        return (
            <ScrollView style={fillScreen}>
                {this.renderPendingUploadSites()}
                {this.renderPendingApprovalSites()}
            </ScrollView>
        );


    }

    renderAddSiteScreen() {
        const {currentUser, pendingSites, pendingUploadSites} = this.props;
        const {fillScreen, headerTitleStyle, infoTextStyle, textSize, facebookStyle} = styles;

        if (!currentUser || currentUser.name === tokens.GUEST) {
            return (
                <Card>
                    <Text style={headerTitleStyle}>{common.must_log_in}</Text>
                    <Text style={textSize}>{must_log_in_detail}</Text>

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
        else if (!pendingSites || !pendingUploadSites || (pendingSites.length === 0 && pendingUploadSites.length === 0)) {
            return (
                <Card>
                    <Text style={headerTitleStyle}>{no_pending_sites_header}</Text>
                    <Text style={infoTextStyle}>{no_pending_sites_detail}</Text>
                </Card>
            );
        } else {
            return (
                <View style={fillScreen}>
                    {this.renderAllPendingSites()}
                </View>
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
        marginBottom: 20,
        color: navyBlueButton,
        alignSelf: 'center'
    },
    infoTextStyle: {
        fontSize: 15,
        marginBottom: 10
    },
    padSides: {
      paddingLeft: 20,
      paddingRight: 20
    },
    textSize: {
        fontSize: 15,
    },
    errorTextStyle: {
        color: errorRed,
        fontWeight: 'bold'
    },
    facebookStyle: {
        backgroundColor: facebookBlueButtonTransparent,
        margin: 0,
        marginTop: 40
    },
    listContainerStyle: {
        flex: 1,
        marginTop: 20,
        paddingLeft: 0,
        paddingRight: 0
    },
    waitingSignalRowStyle: {
        flexDirection: 'row'
    },
    leftMargin: {
        marginLeft: 20
    },
    marginBottom: {
        marginBottom: 30
    }

};

const mapStateToProps = (state, ownProps) => {
    const {currentUser} = state.auth;
    const {pendingSites} = state.map;
    const {connectionInfo, pendingUploadSites, uploadInProgress} = state.network;

    return {currentUser, pendingSites, connectionInfo, pendingUploadSites, uploadInProgress};
};

export default connect(mapStateToProps, {
    getPendingCampsites,
    logUserIntoFacebook,
    getPendingSiteDetail,
    setUpConnectionListener,
    attemptToUploadNewSite,
    checkCurrentConnectionInfo
})(AddSiteScreen);
