// 3rd part libraries - core
import React, {Component} from 'react';
import {View, Text, Keyboard} from 'react-native';
import {connect} from 'react-redux';
import { Button, FormInput, FormLabel } from 'react-native-elements'
// 3rd party libraries - additional

// actions
import {emailChanged, passwordChanged, loginUser} from '../actions/index';

// language and styles
import {textDark, lightwhiteblue, facebookBlue, grayblue, navyBlue} from '../styles/index';
import {login} from '../locale.en';


// our components - core
// our components - additional
import {  Input, Card, CardSection, PasswordInput} from '../components/common/index';
import ListScreen from "../components/SearchList";
import MapScreen from "../components/SearchMap";


class LoginScreen extends Component {
    state = {
        hidden: true
    };

    componentWillReceiveProps(nextProps) {
        const {token, navigation: {navigate}} = nextProps;
        if (token) {
            Keyboard.dismiss();
            navigate('map');
        }
    }

    onLoginPress = () => {
        const {email, password} = this.props;

        this.props.loginUser({email, password});
    };

    onPressFacebookLogin = () => {
        // FB login code will go here
        // for right now, it's just a shortcut past the loginScreen

        const {navigation: {navigate}} = this.props;
        navigate('main');
    };

    static navigationOptions = (props) => {
        const {navigation: {navigate}} = props;

        return {
            header: null
        }
    };

    render() {
        const {containerStyle, textStyle, innerContainerstyle, buttonStyle, facebookStyle, loginContainer } = styles;
        const {email, password} = this.props;
        const{ hidden } = this.state
        return (
            <Card style={containerStyle}>
                <View style={innerContainerstyle}>
                    <View >
                      <CardSection>
                          <FormLabel>Email</FormLabel>
                            <FormInput
                                label={login.email}
                                placeholder={login.email_placeholder}
                                secureTextEntry={false}
                                value={email}
                                onChangeText={this.props.emailChanged}
                            />

                            <FormLabel>Password</FormLabel>
                            <PasswordInput
                                label={login.password}
                                placeholder={login.password_placeholder}
                                value={password}
                                onChangeText={this.props.passwordChanged}
                                onPress={() => this.setState({hidden: !hidden})}
                                hidden={this.state.hidden}
                            />

                            <Button
                                onPress={this.onLoginPress}
                                large
                                buttonStyle={buttonStyle}
                                icon={{name: 'envira', type: 'font-awesome'}}
                                title='Sign in'
                                rounded={true}
                            >
                                {login.login}
                            </Button>

                          </CardSection>
                    </View>

                    <Button
                       large
                       transparent
                       icon={{name: 'facebook', type: 'font-awesome'}}
                       title='Sign in with Facebook'
                       buttonStyle={facebookStyle}
                       onPress={this.onPressFacebookLogin}
                       rounded={true}
                    >
                     {login.login_with_facebook}
                    </Button>
                 </View>
            </Card>
        );
    }
}

const styles = {
    containerStyle: {
        backgroundColor: '#fff',
        flex: 1
    },
    innerContainerstyle: {
        flex: 1,
        marginTop: 40,
        backgroundColor: grayblue,
        justifyContent: 'space-around'
    },
    textStyle: {
        color: '#fff',
        fontSize: 20,
        alignSelf: 'center'
    },
    facebookStyle:{
      backgroundColor:facebookBlue,
      marginTop: 5
    },
    buttonStyle:{
      marginTop: 10,
      backgroundColor: navyBlue
    },
    loginContainer:{
      backgroundColor:'#fff',
      padding: 15,
      margin:10,
      borderRadius: 10,
      shadowColor: grayblue,
      shadowRadius: 5,
      shadowOpacity: 0.3,

    }
};

const mapStateToProps = (state, ownProps) => {
    const {email, password, token} = state.auth;

    return {email, password, token};
};

export default connect(mapStateToProps, {emailChanged, passwordChanged, loginUser})(LoginScreen);
