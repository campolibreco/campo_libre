import React from 'react';
import {View, Text, StyleSheet, ScrollView, ImageBackground} from 'react-native';
import {Card, ListItem, Button} from 'react-native-elements';
// 3rd party libraries - additional

// styles and language
import { facebookBlueButtonTransparent, grayblue,overlayMediumBlue, headerWhiteMediumTransparent, navyBlueButtonTransparent, headerWhiteTransparent, overlayBlue, headerWhite} from '../styles/index';
// our components - core


const SiteCard = ({sites}) => {
  sites.map(site => {
     const {id, title, description} = site
              return (
                <ImageBackground
                   source={require('../../assets/fireStarter.jpg')}
                   style={styles.heroContainer}>

                  <View style={styles.overlayContainer}>
                    <View>
                            <Text style={styles.textStyle}>{title}</Text>

                    </View>
                    <View style={styles.descriptionContainer}>


                            <Text style={styles.descriptionStyle}> {description}</Text>
                    </View>

                      <View style ={styles.buttonContainer}>
                      <View>
                        <Button
                           large
                           transparent
                           icon={{name: 'facebook', type: 'font-awesome'}}
                           title={'login_with_facebook'}
                           buttonStyle={styles.facebookStyle}
                           rounded={true}
                       />
                       </View>
                    </View>
                   </View>
                  </ImageBackground>


    );
  })



};

const styles = StyleSheet.create({
  overlayContainer: {
    flex:1,
    backgroundColor: overlayMediumBlue
  },
  heroContainer: {
      height:250,
      margin:10,
      shadowOffset:{  width: 2,  height: 2,  },
      shadowColor: 'black',
      shadowOpacity: 0.1,
  },
  textStyle:{
    color: headerWhite,
    fontSize:28,
    padding: 20,
    paddingLeft: 40,
    paddingRight:40,
    backgroundColor:headerWhiteMediumTransparent
  },
  descriptionStyle:{
    color: headerWhite,
    fontSize:15
  },
  descriptionContainer:{
    alignItems:'center',
    padding:10
  },
  facebookStyle: {
      backgroundColor: facebookBlueButtonTransparent,
      marginTop: 5
  },

  buttonStyle: {
      backgroundColor: navyBlueButtonTransparent
  }
});

export default SiteCard;
