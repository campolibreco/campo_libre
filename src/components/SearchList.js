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
       {
         sites.map(site => {
            const {id, title, description} = site
                     return (
          <Card
             key={id}
               >
               <ImageBackground
                  key={id}
                  source={require('../../assets/fireStarter.jpg')}
                  style={styles.heroContainer}>

                 <View style={styles.overlayContainer}>
                   <View>
                           <Text style={styles.textStyle}>{title}</Text>

                   </View>
</View>
                 </ImageBackground>
               <Text style={styles.descriptionStyle}>
                {description}
               </Text>
               <View style ={styles.buttonContainer}>
               <View>
                 <Button
                    large
                    transparent
                    icon={{name: 'search', type: 'font-awesome'}}
                    title={'more'}
                    buttonStyle={styles.facebookStyle}
                    rounded={true}
                />
                </View>
             </View>
           </Card>
          // <ImageBackground
          //    key={id}
          //    source={require('../../assets/fireStarter.jpg')}
          //    style={styles.heroContainer}>
          //
          //   <View style={styles.overlayContainer}>
          //     <View>
          //             <Text style={styles.textStyle}>{title}</Text>
          //
          //     </View>
          //     <View style={styles.descriptionContainer}>
          //
          //
          //             <Text style={styles.descriptionStyle}> {description}</Text>
          //     </View>
          //

          //    </View>
          //   </ImageBackground>

           );
         })
       }
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
          height:100,
          width:'100%',
          shadowOffset:{  width: 2,  height: 2,  },
          shadowColor: 'black',
          shadowOpacity: 0.1,
      },
      textStyle:{
        height:100,
        color: headerWhite,
        fontSize:28,
        padding: 20,
        paddingLeft: 40,
        paddingRight:40,
        backgroundColor:headerWhiteMediumTransparent
      },
      descriptionStyle:{
        padding: 20,
        color: 'black',
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
