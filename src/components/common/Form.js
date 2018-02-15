// 3rd part libraries - core
import React, {Component} from 'react';
import {Text, Picker, ScrollView, Modal, View} from 'react-native';
import {connect} from 'react-redux';
import { Button, FormLabel, FormInput, Input, Icon, Overlay } from 'react-native-elements';
// 3rd party libraries - additional

// actions

// language and styles
// // import {textDark, lightwhiteblue, facebookBlue, grayblue, navyBlue} from '../styles/index';
// import {login} from '../locale.en';


// our components - core
// our components - additional
import {  Card, CardSection, PasswordInput} from './common/index';


class Form extends Component {
render(){
return (
  <ScrollView>
        <CardSection>
          <Icon
              type='font-awesome'
              name='times-circle'
              onPress={() => this.closeModal()}
          />
                <Button
                  small
                  rounded={true}
                  buttonStyle={buttonStyle}
                  icon={{name: 'plus', type: 'font-awesome'}}
                  title='I am here now'
                >
                    {campsite.upload}
                </Button>

                  <Text h2>Location</Text>
                  <FormLabel>Latitude</FormLabel>
                    <FormInput />
                  <FormLabel>Longitude</FormLabel>
                    <FormInput />
                  <FormLabel>Title</FormLabel>
                    <FormInput />
                  <FormLabel>Description</FormLabel>
                    <FormInput />
                  <FormLabel>Directions</FormLabel>
                    <FormInput />
                  <FormLabel>Nearest Town</FormLabel>
                    <FormInput />
                  <FormLabel>Accessiblitiy</FormLabel>
                          <Picker>
                            <Picker.Item label="Paved Road" value="paved_road" />
                            <Picker.Item label="Dirt Road " value="dirt_road" />
                            <Picker.Item label="Uneven Terrain" value="uneven_terrain" />
                            <Picker.Item label="4x4(recommended)" value="4x4" />
                            <Picker.Item label="4X4 Drive High Clearance" value="high_clearence" />
                            <Picker.Item label="Hike" value="hike" />
                          </Picker>
                        </CardSection>
                        </ScrollView>
)}



}

export default Form
