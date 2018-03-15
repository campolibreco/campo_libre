// 3rd party libraries - core
import React from 'react';
import {View, Text, StyleSheet, ScrollView, ImageBackground} from 'react-native';
import {Card, ListItem, Button, Tile, List, Image, Badge} from 'react-native-elements';
// 3rd party libraries - additional

// styles and language
import { facebookBlueButtonTransparent, grayblue,overlayMediumGray, headerWhiteMediumTransparent, navyBlueButtonTransparent, headerWhiteTransparent, overlayBlue, headerWhite, darkBlue } from '../styles/index';
// our components - core
import SiteCard from './SiteCard'
// our components - additional



const SearchList = ({sites}) => {
  const{textStyle, cardButtonStyle, heroContainer, descriptionStyle, descriptionContainer, overlayContainer, nearestTownStyle, ratingText, subtitleView, titleView} = styles
  if(!sites){
    return( <Text> No Sites available </Text>)

  }else{
    return (
      <ScrollView>
      <ImageBackground
      source={require('../../assets/maps.jpg')}
      style={{flex:1}}
      >
      <View style={styles.overlayContainer}>
  <List>
       {
         sites.map(site => {
            const {id, title, description, nearestTown} = site
            return (
                <ListItem
                  key={id}
                  title={
                  <View>
                    <Badge
                      wrapperStyle={{width:'40%', marginLeft:10}}

                  containerStyle={{ backgroundColor: '#1B6E65'}}>
                    <Text style={{ color: 'white'}}>{nearestTown}</Text>
                  </Badge>
                    <Text style={titleView}>{title}</Text>

                  </View>
                  }
                  subtitle={
                    <View style={subtitleView}>
                       <Text>{description}</Text>
                    </View>
                   }
              avatar={require('../../assets/icon.png')}
                />
           );
         })
       }
       </List>
         </View>
       </ImageBackground>
     </ScrollView>
    );
  }
};









    const styles = StyleSheet.create({
      overlayContainer: {
        flex:1,
        backgroundColor: overlayMediumGray
      },

      heroContainer: {
          padding:10
      },
       nearestTownStyle:{
          padding: 10,
          color: 'red',
          fontSize:15,
          backgroundColor:'white',

        },
        subtitleView: {
        flexDirection: 'row',
        paddingLeft: 10,
        paddingTop: 5
  },
        titleView: {
         fontSize:16,
         fontWeight: '600',
         color:'#B8BB5A',
         flexDirection: 'row',
         paddingLeft: 10,
         paddingTop: 5

 },


    });

export default SearchList;
