// 3rd part libraries - core
import React, {Component} from 'react';
import {View, Text} from 'react-native';
import {connect} from 'react-redux';
// 3rd party libraries - additional

// actions
import {emailChanged, passwordChanged, loginUser} from '../../actions';

// language and styles
import {textDark, backgroundLight} from '../../styles';
import {login} from '../../locale.en';

// our components - core
// our components - additional
import {Button, Input, Card, CardSection, PasswordInput} from '../common';

class Login extends Component {

    state = {
        hidden: true
    };

    onLoginPress() {
        const {email, password} = this.props;

        this.props.loginUser({email, password});
    }

    render() {
        const {containerStyle, textStyle} = styles;
        const {email, password} = this.props;

        return (
            <Card style={containerStyle}>
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
                        onPress={()=> this.setState({hidden: !this.state.hidden})}
                        hidden={this.state.hidden}
                    />
                </CardSection>

                <CardSection>
                    <Button
                        onPress={this.onLoginPress.bind(this)}
                    >
                        {login.login}
                    </Button>
                </CardSection>
            </Card>
        );
    }
}

const styles = {
    containerStyle: {
        backgroundColor: backgroundLight,
        flex: 1
    },
    textStyle: {
        color: textDark,
        fontSize: 18,
        alignSelf: 'center'
    }
};

const mapStateToProps = (state, ownProps) => {
    const {email, password} = state.auth;

    return {email, password};
};

export default connect(mapStateToProps, {emailChanged, passwordChanged, loginUser})(Login);