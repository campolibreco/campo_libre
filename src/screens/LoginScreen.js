// 3rd part libraries - core
import {AppLoading} from 'expo';
import React, {Component} from 'react';
import {View, Text, ImageBackground} from 'react-native';
import {connect} from 'react-redux';
import {Button} from 'react-native-elements'
// 3rd party libraries - additional
import _ from 'lodash';

// actions
import {checkAndSetToken, setGuestToken, logUserIntoFacebook} from '../actions/index';

// language and styles
import { facebookBlueButtonTransparent, grayblue, navyBlueButtonTransparent, headerWhiteTransparent, overlayBlue, headerWhite} from '../styles/index';
import {login} from '../locale.en';

const {campo_libre, tagline, login_as_guest, login_with_facebook} = login;

// our components - core
// our components - additional

class LoginScreen extends Component {

    componentWillMount() {
        const {token, navigation: {navigate}} = this.props;

        this.props.checkAndSetToken({token, navigate});
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
        const { heroContainer, overlayContainer, top, header, buttonContainer, facebookStyle, buttonStyle} = styles;

        return (
          <ImageBackground
             source={require('../../assets/fireStarter.jpg')}
             style={heroContainer}>

            <View style={overlayContainer}>
              <View style={top}>
                      <Text style={header}>{campo_libre}</Text>
              </View>

                <View style ={buttonContainer}>
                  <Button
                     large
                     transparent
                     icon={{name: 'facebook', type: 'font-awesome'}}
                     title={login_with_facebook}
                     buttonStyle={facebookStyle}
                     onPress={this.onPressFacebookLogin}
                     rounded={true}
                 />
                 <Button
                     onPress={this.onPressContinueAsGuest}
                     large
                     buttonStyle={buttonStyle}
                     icon={{name: 'envira', type: 'font-awesome'}}
                     title={login_as_guest}
                     rounded={true}
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
            return <AppLoading />

        }

        return (
            <View style={fillScreen}>
                {this.renderPage()}
            </View>
        );
    }
}

const styles = {
    fillScreen: {
        flex: 1
    },
    overlayContainer: {
      flex:1,
      backgroundColor: overlayBlue
    },
    heroContainer: {
        flex: 1,
        width: '100%',
        height:'100%'
    },
    top:{
      height:'50%',
      alignItems: 'center',
      justifyContent:'center'
    },
    header:{
      color: headerWhite,
      fontSize:28,
      borderColor:headerWhite,
      borderWidth:2,
      padding: 20,
      paddingLeft: 40,
      paddingRight:40,
      backgroundColor:headerWhiteTransparent
    },
    buttonContainer:{
      height:'22%',
      justifyContent: 'space-between'
    },
    facebookStyle: {
        backgroundColor: facebookBlueButtonTransparent,
        marginTop: 5
    },
    buttonStyle: {
        backgroundColor: navyBlueButtonTransparent
    }
};

const mapStateToProps = (state, ownProps) => {
    const {token, appReady} = state.auth;

    return {token, appReady};
};

export default connect(mapStateToProps, {checkAndSetToken, setGuestToken, logUserIntoFacebook})(LoginScreen);
