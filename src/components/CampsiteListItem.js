// 3rd party libraries - core
import React from 'react';
import {View, Text, StyleSheet, ScrollView, ImageBackground} from 'react-native';
import {Card, ListItem, Button, Tile, List, Image, Badge, Icon} from 'react-native-elements';
// 3rd party libraries - additional

// styles and language
import {featureIconDetails, facilityIconDetails} from '../constants';
import {badgeGreen, limeGreenTitle, RoyalBlueHighlight, blueGreenNav} from '../styles/index';
import {campsite} from '../locale.en'
import _ from 'lodash';


const renderIcons = ({features, facilities}) => {
    const featureIcons = _.map(features, feature =>{
        return(
            <Icon
                key={feature}
                name={featureIconDetails[feature].name}
                type={featureIconDetails[feature].type}
            />
        )
    });

    const facilityIcons = _.map(facilities, facility =>{
       return(
         <Icon
             key={facility}
             name={facilityIconDetails[facility].name}
             type={facilityIconDetails[facility].type}
         />
       );
    });

    return _.concat(featureIcons, facilityIcons);
};

const CampsiteListItem = ({site, getSiteDetail, navigate}) => {
    const {textStyle, IconContainer, subtitleView, titleContainerStyle, siteAvatarContainerStyle, titleView, nearestTownStyle, badgeWrapperStyle, badgeContainerStyle, accessibilityStyle} = styles
    const {campsite_form: {accessibility_options}} = campsite;
    const {id, title, description, nearestTown, accessibility, siteImageData, features, facilities} = site;
    const preparedDescription = description && description.length > 57 ?  `${description.substring(0, 57)}...` : description;

    return (
        <ListItem
            bottomDivider={true}
            onPress={() => getSiteDetail({selectedSite: site, navigate})}
            leftAvatar={{avatarStyle: siteAvatarContainerStyle, source: siteImageData ? {uri: `data:image/png;base64,${siteImageData}`} : require('../../assets/starTent.jpg')}}
            title={
                <View style={titleContainerStyle}>
                    <Text style={titleView}>{title}</Text>
                    <Badge
                        wrapperStyle={badgeWrapperStyle}
                        containerStyle={badgeContainerStyle}
                    >
                        <Text style={nearestTownStyle}>{nearestTown}</Text>
                    </Badge>
                    <View style={subtitleView}>
                        <Text>{preparedDescription}</Text>
                    </View>
                    <View style={subtitleView}>

                        <Text style={accessibilityStyle}>{accessibility_options[accessibility]}</Text>
                    </View>
                </View>
            }
            subtitle={
                <View style={IconContainer}>
                    {renderIcons({features, facilities})}
                </View>
            }
        />
    )
};

const styles = StyleSheet.create({
    titleContainerStyle:{
        paddingLeft: 65
    },
    IconContainer: {
        flexDirection: 'row',
        paddingLeft: 75,
        paddingTop: 5
    },
    badgeWrapperStyle: {
        marginLeft: 10
    },
    badgeContainerStyle: {
        backgroundColor: blueGreenNav
    },
    siteAvatarContainerStyle: {
        marginLeft: 50,
        borderRadius: 0,
        paddingLeft: 0,
        height: 150,
        width: 150
    },
    nearestTownStyle: {
        color: 'white'
    },
    subtitleView: {
        flexDirection: 'row',
        paddingLeft: 10,
        paddingTop: 5
    },
    titleView: {
        fontSize: 17,
        fontWeight: '600',
        color: limeGreenTitle,
        flexDirection: 'row',
        paddingLeft: 10,
        paddingBottom: 5
    },
    accessibilityStyle: {
        color: 'red',
        borderStyle: 'solid'
    }
});


export default CampsiteListItem
