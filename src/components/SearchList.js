// 3rd party libraries - core
import React from 'react';
import {View, Text, StyleSheet, ScrollView, ImageBackground} from 'react-native';
import {Card, ListItem, Button, Tile, List, Image, Badge, Icon} from 'react-native-elements';
// 3rd party libraries - additional
// styles and language
import { badgeGreen, limeGreenTitle} from '../styles/index';
// our components - additional


const SearchList = ({sites}) => {
  const{textStyle, IconContainer, subtitleView,siteAvatarStyle, siteAvatarContainerStyle, titleView, nearestTownStyle, badgeWrapperStyle, badgeContainerStyle} = styles
  if(!sites){
    return( <Text> No Sites Available </Text>)
  }else{
    return (
  <ScrollView>
     <List>
       {
         sites.map(site => {
            const {id, title, description, nearestTown} = site
            return (
                <ListItem
                  key={id}
                  title={
                         <View>
                           <View style={IconContainer}>
                            <Icon
                              name='image-inverted'
                              type="entypo"
                              color='purple' />
                              <Icon
                               name='air'
                               type="entypo"
                                color='#f50' />
                              <Icon
                                name='drop'
                                type="entypo"
                                color='#7C9EC2' />
                                <Icon
                                name='leaf'
                                type="entypo"
                                color='orange' />
                             </View>
                              <Badge
                                wrapperStyle={badgeWrapperStyle}
                                containerStyle={badgeContainerStyle}
                                >
                                  <Text style={nearestTownStyle}>{nearestTown}</Text>
                              </Badge>

                            <Text style={titleView}>{title}</Text>
                          </View>
                        }
                  subtitle={
                            <View style={subtitleView}>
                                <Text>{description}</Text>
                            </View>
                           }
                  avatar={require('../../assets/starTent.jpg')}
                  avatarContainerStyle={siteAvatarContainerStyle}
                  avatarStyle={siteAvatarStyle}
                />
               );
             })
           }
       </List>
     </ScrollView>
    );
  }
};


    const styles = StyleSheet.create({
      IconContainer:{
        flexDirection:'row',
        paddingLeft:10
      },
      badgeWrapperStyle:{
        width:'50%',
         marginLeft:10
      },
      badgeContainerStyle:{
         backgroundColor: badgeGreen
      },
      siteAvatarStyle:{
        height:'100%',
        width:'100%'
      },
      siteAvatarContainerStyle:{
         height:150,
         width:'30%'
       },
       nearestTownStyle:{
           color: 'white'
        },
        subtitleView: {
        flexDirection: 'row',
        paddingLeft: 10,
        paddingTop: 5
        },
        titleView: {
         fontSize:17,
         fontWeight: '600',
         color:limeGreenTitle,
         flexDirection: 'row',
         paddingLeft: 10,
         paddingTop: 5
        },
    });

export default SearchList;
