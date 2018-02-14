import React, {Component} from 'react';
import { Alert, Picker, ScrollView, Modal, View} from 'react-native';

import { Button, FormLabel, FormInput, Input, Icon, Overlay, Text } from 'react-native-elements';

import {campsite} from '../locale.en';
import {navyBlue, grey, darkBlue, lightwhiteblue} from '../styles/index';

import {CardSection, Card, largeFormElement} from '../components/common/index';

class AddSiteScreen extends Component {
  state = {
    modalVisible: false,
  };

  openModal() {
    this.setState({modalVisible:true});
  }

  closeModal() {
    this.setState({modalVisible:false});
  }


    static navigationOptions = (props) => {
        const {navigation: {navigate}} = props;
        return {
            title: 'Add a Site',
            headerTitle: 'Add a Campsite',
            headerLeft: null,
            tabBarIcon: ({focused, tintColor }) => (<Icon type='material-community' name={focused ? 'tent' : 'tent'} size={25} color={tintColor} />)
        }
    };

    render(){
        const { buttonStyle, headerTitle, largeTextInput } = styles;
        return(
          <View>
            <CardSection>
                    <Text>
                        {campsite.description}
                     </Text>
            </CardSection>
            <Button
              onPress={() => this.openModal()}
              title="Open modal"
              large
              rounded={true}
              buttonStyle={buttonStyle}
              icon={{name: 'plus', type: 'font-awesome'}}
              title='Add A Site'
            >
                {campsite.upload}
               </Button>
            <Modal
                  visible={this.state.modalVisible}
                  animationType={'slide'}
                  onRequestClose={() => this.closeModal()}
            >
                  <ScrollView>
                        <CardSection  >
                          <Icon
                              type='font-awesome'
                              name='times-circle'
                              onPress={() => this.closeModal()}
                           />
                                  <Text h2
                                    style={headerTitle}
                                    >Location</Text>
                                  <FormLabel>Latitude</FormLabel>
                                    <FormInput
                                      placeholder="add your Latitude" required />
                                  <FormLabel>Longitude</FormLabel>
                                    <FormInput
                                      placeholder="add your Longitude" required
                                      />
                                      <Text h3
                                          style={headerTitle}
                                          >- or -</Text>
                                    <Button
                                        large
                                        rounded={true}
                                        onPress={()=> alert('submitted')}
                                        buttonStyle={buttonStyle}
                                        icon={{name: 'bullseye', type: 'font-awesome'}}
                                        title='I am here now'
                                    >
                                              {campsite.upload}
                                          </Button>
                                  <Text h2
                                      style={headerTitle}
                                      >Site info</Text>
                                  <FormLabel>Title</FormLabel>

                                    <FormInput
                                      placeholder="add site title" />
                                  <FormLabel>Description</FormLabel>
                                    <FormInput
                                      placeholder="enter a description of the site"
                                      containerStyle={largeTextInput}
                                      multiline={true}
                                      maxLength={40}
                                      maxHeight={50}
                                       />
                                  <FormLabel>Directions</FormLabel>
                                    <FormInput
                                      placeholder="enter descriptive directions"
                                      containerStyle={largeTextInput}
                                      multiline={true}
                                      maxLength={40}
                                      maxHeight={50}
                                      required={true}
                                       />

                                  <FormLabel>Nearest Town</FormLabel>
                                    <FormInput
                                      placeholder="enter nearest/closest town"
                                      />
                                  <FormLabel>Accessiblitiy</FormLabel>
                                          <Picker>
                                            <Picker.Item label="Paved Road" value="paved_road" />
                                            <Picker.Item label="Dirt Road " value="dirt_road" />
                                            <Picker.Item label="Uneven Terrain" value="uneven_terrain" />
                                            <Picker.Item label="4x4(recommended)" value="4x4" />
                                            <Picker.Item label="4X4 Drive High Clearance" value="high_clearence" />
                                            <Picker.Item label="Hike" value="hike" />
                                          </Picker>
                                    <FormLabel>Facilities</FormLabel>
                                      <Picker>
                                        <Picker.Item label="Full Service" value="full_service" />
                                        <Picker.Item label="Some " value="some" />
                                        <Picker.Item label="None" value="none" />
                                        <Picker.Item label="Permit" value="permit" />
                                        <Picker.Item label="Paid" value="paid" />
                                        <Picker.Item label="Free" value="free" />
                                      </Picker>

                                      <Button
                                        onPress={()=> alert('submitted')}
                                        title="Open modal"
                                        large
                                        rounded={true}
                                        buttonStyle={buttonStyle}
                                        icon={{name: 'plus', type: 'font-awesome'}}
                                        title='Add A Site'
                                      >  Submit
                                       </Button>
                                        </CardSection>
                                        </ScrollView>
                                </Modal>
                              </View>
                            );
                          }
                        }




const styles = {
    descriptionStyle: {
        color: darkBlue,
        fontSize: 15
    },
    sectionStyle: {
        backgroundColor: grey
    },
    buttonStyle:{
      marginTop: 10,
      marginBottom: 10,
      backgroundColor: navyBlue
    },
    headerTitle:{
      flex: 1,
      marginTop: 20,
      color: navyBlue,
       justifyContent: 'center',
       alignSelf:'center',
    },
    largeTextInput: {
      height: 100
    }

}

export default AddSiteScreen;
