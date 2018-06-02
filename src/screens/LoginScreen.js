// 3rd part libraries - core
import {AppLoading} from 'expo';
import React, {Component} from 'react';
import {View, Text, ImageBackground, StyleSheet} from 'react-native';
import {connect} from 'react-redux';
import {Button, Icon} from 'react-native-elements'
// 3rd party libraries - additional
import _ from 'lodash';

// actions
import {checkAndSetToken, setGuestToken, logUserIntoFacebook, logUserOutOfFacebook} from '../actions/index';

// language and styles
import {
    facebookBlueButtonTransparent,
    grayblue,
    navyBlueButtonTransparent,
    headerWhiteTransparent,
    overlayBlue,
    headerWhite
} from '../styles/index';
import {login} from '../locale.en';
import {campsiteIcon} from "../styles";

const {campo_libre, tagline, login_as_guest, login_with_facebook} = login;

// our components - core
// our components - additional
import {LargeButton} from '../components/common';

class LoginScreen extends Component {

    componentWillMount() {
        const {token, currentUser, navigation: {navigate}} = this.props;

        this.props.checkAndSetToken({token, currentUser, navigate});
    }

    onPressContinueAsGuest = () => {
        const {navigation: {navigate}} = this.props;

        this.props.setGuestToken({navigate});
    };

    onPressFacebookLogin = () => {
        const {navigation: {navigate}} = this.props;

        this.props.logUserIntoFacebook({navigate});
    };

    static navigationOptions = (props) => {

        return {
            header: null
        }
    };

    renderPage() {
        const {heroContainer, overlayContainer, top, header, buttonContainer, facebookStyle, buttonStyle, guestStyle} = styles;

        return (
            <ImageBackground
                source={require('../../assets/fireStarter.jpg')}
                style={heroContainer}>

                <View style={overlayContainer}>
                    <View style={top}>
                        <Text style={header}>{campo_libre}</Text>
                    </View>

                    <View style={buttonContainer}>
                        <LargeButton
                            title={login_with_facebook}
                            iconType={'font-awesome'}
                            iconName={'facebook'}
                            iconColor={'white'}
                            buttonStyleOverride={facebookStyle}
                            onPress={this.onPressFacebookLogin}
                        />

                        <LargeButton
                            title={login_as_guest}
                            iconType={'font-awesome'}
                            iconName={'envira'}
                            iconColor={'white'}
                            buttonStyleOverride={guestStyle}
                            onPress={this.onPressContinueAsGuest}
                        />
                    </View>
                </View>
            </ImageBackground>
        );
    }

    render() {
        const {fillScreen} = styles;
        const {appReady} = this.props;

        if (!appReady) {
            return <AppLoading/>

        }

        return (
            <View style={fillScreen}>
                {this.renderPage()}
            </View>
        );
    }
}

const styles = StyleSheet.create({
    fillScreen: {
        flex: 1
    },
    overlayContainer: {
        flex: 1,
        backgroundColor: overlayBlue
    },
    heroContainer: {
        flex: 1
    },
    top: {
        height: '50%',
        alignItems: 'center',
        justifyContent: 'center'
    },
    header: {
        color: headerWhite,
        fontSize: 28,
        borderColor: headerWhite,
        borderWidth: 2,
        padding: 20,
        paddingLeft: 40,
        paddingRight: 40,
        backgroundColor: headerWhiteTransparent
    },
    buttonContainer: {
        height: '22%',
        justifyContent: 'space-between'
    },
    buttonStyle: {
        margin: 30,
        height: 70,
        borderRadius: 40
    },
    facebookStyle: {
        backgroundColor: facebookBlueButtonTransparent,
        marginTop: 5
    },
    guestStyle: {
        backgroundColor: navyBlueButtonTransparent,
    }
});

const mapStateToProps = (state, ownProps) => {
    const {token, appReady, currentUser} = state.auth;

    return {token, appReady, currentUser};
};

export default connect(mapStateToProps, {checkAndSetToken, setGuestToken, logUserIntoFacebook, logUserOutOfFacebook})(LoginScreen);
