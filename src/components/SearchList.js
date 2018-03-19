// 3rd party libraries - core
import React from 'react';
import {View, Text, StyleSheet, ScrollView, ImageBackground} from 'react-native';
import {Card, ListItem, Button, Tile, List, Image, Badge, Icon} from 'react-native-elements';
import CampsiteListItem from './CampsiteListItem';
// 3rd party libraries - additional
// styles and language





// our components - additional
import _ from 'lodash';

const SearchList = ({sites, accessibility}) => {

  if(!sites){
    return( <Text> No Sites Available </Text>)
  }else{
    return (
  <ScrollView>
     <List>
       {
         _.map(sites, (site, index) => {
            return (
        <CampsiteListItem
        key={index}
        site={site}


        />
               );
             })
           }
       </List>
     </ScrollView>
    );
  }
};



export default SearchList;
