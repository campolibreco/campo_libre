// 3rd part libraries - core
import React, {Component} from 'react';
import {View, Text, Keyboard} from 'react-native';
import {connect} from 'react-redux';
import { Button, FormInput, FormLabel } from 'react-native-elements'
// 3rd party libraries - additional

// actions

// language and styles
// // import {textDark, lightwhiteblue, facebookBlue, grayblue, navyBlue} from '../styles/index';
// import {login} from '../locale.en';


// our components - core
// our components - additional
import {  Input, Card, CardSection, PasswordInput} from './common/index';


class Form extends Component {
render(){
return (
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

          

          <Button
              onPress={}
              large
              buttonStyle={buttonStyle}
              icon={{name: 'envira', type: 'font-awesome'}}
              title='Sign in'
              rounded={true}
          >

          </Button>

        </CardSection>
  </View>
)}



}

export default Form
