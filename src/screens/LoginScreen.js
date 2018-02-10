// 3rd part libraries - core
import React, {Component} from 'react';
import {View, Text, Keyboard} from 'react-native';
import {connect} from 'react-redux';
import {Button, Card} from 'react-native-elements'
// 3rd party libraries - additional
import _ from 'lodash';

// actions
import {logUserIntoFacebook} from '../actions/index';

// language and styles
import {textDark, lightwhiteblue, facebookBlue, grayblue, navyBlue} from '../styles/index';
import {login} from '../locale.en';

const {campo_libre, tagline, login_as_guest, login_with_facebook} = login;


// our components - core
// our components - additional


class LoginScreen extends Component {

    componentDidMount() {
        const {token, navigation: {navigate}} = this.props;

        if (token) {
            navigate('search');
        } else {
            this.props.logUserIntoFacebook();
        }
    }

    componentWillReceiveProps(nextProps) {
        const {token, navigation: {navigate}} = nextProps;

        if (token) {
            navigate('search');
        }
    }

    onLoginPress = () => {
        const {navigation: {navigate}} = this.props;

        navigate('search');
    };

    onPressFacebookLogin = () => {
        this.props.logUserIntoFacebook();
    };

    static navigationOptions = (props) => {
        const {navigation: {navigate}} = props;

        return {
            header: null
        }
    };

    render() {
        const {containerStyle, topContainer, heroContainer, buttonContainer, buttonStyle, facebookStyle} = styles;

        return (
            <View style={containerStyle}>
                <View style={topContainer}>
                    <Card
                        style={heroContainer}
                        title={_.upperCase(campo_libre)}
                        image={require('../../assets/hero.jpg')}
                    >
                        <Text>
                            {tagline}
                        </Text>
                    </Card>
                </View>

                <View style={buttonContainer}>
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
                        onPress={this.onLoginPress}
                        large
                        buttonStyle={buttonStyle}
                        icon={{name: 'envira', type: 'font-awesome'}}
                        title={login_as_guest}
                        rounded={true}
                    />
                </View>
            </View>
        );
    }
}

const styles = {
    containerStyle: {
        flex: 1,
        marginTop: 40,
        backgroundColor: grayblue,
        justifyContent: 'space-around'
    },
    topContainer: {
        flex: 2
    },
    heroContainer: {
        flex: 1
    },
    buttonContainer: {
        flex: 1,
        justifyContent: 'space-around',
        marginBottom: 20
    },
    facebookStyle: {
        backgroundColor: facebookBlue,
        marginTop: 5
    },
    buttonStyle: {
        marginTop: 10,
        backgroundColor: navyBlue
    }
};

const mapStateToProps = (state, ownProps) => {
    const {token} = state.auth;

    return {token};
};

export default connect(mapStateToProps, {logUserIntoFacebook})(LoginScreen);
