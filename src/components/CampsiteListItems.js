// 3rd party libraries - core
import React from 'react';
import {View, Text, StyleSheet, ScrollView, ImageBackground} from 'react-native';
import {Card, ListItem, Button, Tile, List, Image, Badge, Icon} from 'react-native-elements';
// 3rd party libraries - additional
// styles and language
import { badgeGreen, limeGreenTitle} from '../styles/index';

import _ from 'lodash';

const CampsiteListItems = ({sites}) => {
    const{textStyle, IconContainer, subtitleView,siteAvatarStyle, siteAvatarContainerStyle, titleView, nearestTownStyle, badgeWrapperStyle, badgeContainerStyle} = styles
    return(
      <List>
      {
          _.map((sites, site) => {
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

    )
}



export default CampsiteListItems
