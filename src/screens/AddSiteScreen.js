import React, {Component} from 'react';
import {Text, Picker, ScrollView, Modal, View} from 'react-native';

import { Button, FormLabel, FormInput, Input, Icon, Overlay } from 'react-native-elements';

import {campsite} from '../locale.en';
import {navyBlue, grey, darkBlue, lightwhiteblue} from '../styles/index';

import {CardSection, Card} from '../components/common/index';

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
        const { buttonStyle } = styles;
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
      backgroundColor: navyBlue
    }
}

export default AddSiteScreen;
