// 3rd party libraries - core
import React from 'react';
import {View, Text, StyleSheet, ScrollView, ImageBackground} from 'react-native';
import {Card, ListItem, Button} from 'react-native-elements';
// 3rd party libraries - additional

// styles and language
import { facebookBlueButtonTransparent, grayblue,overlayMediumBlue, headerWhiteMediumTransparent, navyBlueButtonTransparent, headerWhiteTransparent, overlayBlue, headerWhite} from '../styles/index';
// our components - core
import SiteCard from './SiteCard'
// our components - additional



const SearchList = ({sites}) => {
  const{textStyle, cardButtonStyle} = styles
  if(!sites){
    return( <Text> No Sites available </Text>)

  }else{
    return (
      <ScrollView>
       <SiteCard/>
     </ScrollView>
    );
  }
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

export default SearchList;
