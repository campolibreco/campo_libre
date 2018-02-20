import React, {Component} from 'react';
import { Alert, Picker, ScrollView, Modal, View} from 'react-native';

import { Button, FormLabel, FormInput, Input, Icon, Overlay, Text } from 'react-native-elements';

import { campsite, submit_form, common} from '../locale.en';

const{ site_description, upload,
                 campsite_form:{
                 latitude, longitude,
                 longitude_placeholder, latitude_placeholder,
                 add_site_title,site_info,
                 description,description_placeholder,
                 directions,directions_placeholder,
                 nearest_town,nearest_town_placeholder,
                 here_now, add_site,
                 accessibility,facilities,
                 accessibility_options,
                 facilities_options,}} = campsite;

const { submit, submitted } = submit_form;

const{ title, location } = common;

import { navyBlue, grey, darkBlue, lightwhiteblue } from '../styles/index';
import { CardSection, Card, largeFormElement } from '../components/common/index';

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

  accessibilityOptions(){
  return Object.keys(accessibility_options).map((key)=> {
        return <Picker.Item key={key} label={accessibility_options[key]} value={accessibility_options[key]}/>;
        })
  }

  facilitiesOptions(){
  return Object.keys(facilities_options).map((key) => {
        return <Picker.Item key={key} label={facilities_options[key]} value={facilities_options[key]}/>;
        })
  }

    render(){
        const { buttonStyle, headerTitle, largeTextInput } = styles;

        return(
          <View>
            <CardSection>
              <Text>
              {site_description}
              </Text>
            </CardSection>
            <Button
              onPress={() => this.openModal()}
              title="Open modal"
              large
              rounded={true}
              buttonStyle={buttonStyle}
              icon={{name: 'plus', type: 'font-awesome'}}
              title={add_site}
            >
                {upload}
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
                              <Text h2
                                  style={headerTitle}
                                  >{location}</Text>
                                  <FormLabel>{latitude}</FormLabel>
                                    <FormInput
                                      placeholder={latitude_placeholder} required />
                                    <FormLabel>{longitude}</FormLabel>
                                    <FormInput
                                      placeholder={longitude_placeholder} required
                                    />
                                      <Text h3
                                          style={headerTitle}
                                         >- or -</Text>
                                    <Button
                                        large
                                        rounded={true}
                                        onPress={()=> alert(submitted)}
                                        buttonStyle={buttonStyle}
                                        icon={{name: 'bullseye', type: 'font-awesome'}}
                                        title={here_now}
                                    >
                                              {campsite.upload}
                                          </Button>
                                  <Text h2
                                      style={headerTitle}>
                                      {site_info}
                                  </Text>
                                  <FormLabel>{title}</FormLabel>
                                    <FormInput
                                      placeholder={add_site_title} />
                                    <FormLabel>{description}</FormLabel>
                                    <FormInput
                                      placeholder={description_placeholder}
                                      containerStyle={largeTextInput}
                                      multiline={true}
                                      maxLength={40}
                                      maxHeight={50}
                                      editable={true}
                                       />
                                     <FormLabel>{directions_placeholder}</FormLabel>
                                    <FormInput
                                      placeholder={directions_placeholder}
                                      containerStyle={largeTextInput}
                                      multiline={true}
                                      maxLength={40}
                                      maxHeight={50}
                                      editable={true}
                                       />

                                     <FormLabel>{nearest_town}</FormLabel>
                                    <FormInput
                                      placeholder={nearest_town_placeholder}
                                      editable={true}
                                      />
                                    <FormLabel>{accessibility}</FormLabel>
                                      <Picker>
                                        {this.accessibilityOptions()}
                                      </Picker>
                                    <FormLabel>{facilities}</FormLabel>
                                      <Picker>
                                        {this.facilitiesOptions()}
                                      </Picker>

                                      <Button
                                        onPress={()=> alert('submitted')}
                                        title="Open modal"
                                        large
                                        rounded={true}
                                        buttonStyle={buttonStyle}
                                        icon={{name: 'plus', type: 'font-awesome'}}
                                        title={submit}
                                      >  {submit}
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
