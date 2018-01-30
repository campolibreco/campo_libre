// 3rd part libraries - core
import React, {Component} from 'react';
import {View, Text, Keyboard} from 'react-native';
import {connect} from 'react-redux';
// 3rd party libraries - additional

// actions
import {emailChanged, passwordChanged, loginUser} from '../actions/index';

// language and styles
import {textDark, backgroundLight} from '../styles/index';
import {login} from '../locale.en';

// our components - core
// our components - additional
import {Button, Input, Card, CardSection, PasswordInput} from '../components/common/index';
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
        const {containerStyle, textStyle, innerContainerstyle} = styles;
        const {email, password} = this.props;

        return (
            <Card style={containerStyle}>
                <View style={innerContainerstyle}>
                    <View>
                        <CardSection>
                            <Input
                                label={login.email}
                                placeholder={login.email_placeholder}
                                secureTextEntry={false}
                                value={email}
                                onChangeText={this.props.emailChanged}
                            />
                        </CardSection>

                        <CardSection>
                            <PasswordInput
                                label={login.password}
                                placeholder={login.password_placeholder}
                                value={password}
                                onChangeText={this.props.passwordChanged}
                                onPress={() => this.setState({hidden: !this.state.hidden})}
                                hidden={this.state.hidden}
                            />
                        </CardSection>

                        <CardSection>
                            <Button
                                onPress={this.onLoginPress}
                            >
                                {login.login}
                            </Button>

                        </CardSection>
                    </View>

                    <CardSection>
                        <Button
                            onPress={this.onPressFacebookLogin}
                        >
                            {login.login_with_facebook}
                        </Button>

                    </CardSection>
                </View>
            </Card>
        );
    }
}

const styles = {
    containerStyle: {
        backgroundColor: backgroundLight,
        flex: 1
    },
    innerContainerstyle: {
        flex: 1,
        marginTop: 40,
        justifyContent: 'space-around'
    },
    textStyle: {
        color: textDark,
        fontSize: 18,
        alignSelf: 'center'
    }
};

const mapStateToProps = (state, ownProps) => {
    const {email, password, token} = state.auth;

    return {email, password, token};
};

export default connect(mapStateToProps, {emailChanged, passwordChanged, loginUser})(LoginScreen);