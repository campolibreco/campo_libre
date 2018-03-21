// 3rd party libraries - core
import React from 'react';
import {View, Text, StyleSheet, ScrollView, ImageBackground} from 'react-native';
import {Card, ListItem, Button, Tile, List, Image, Badge, Icon} from 'react-native-elements';
// 3rd party libraries - additional
// styles and language
import {badgeGreen, limeGreenTitle, RoyalBlueHighlight, blueGreenNav} from '../styles/index';
import {campsite} from '../locale.en'
import _ from 'lodash';


const CampsiteListItem = ({site, getSiteDetail, navigate}) => {
    const {textStyle, IconContainer, subtitleView, siteAvatarStyle, siteAvatarContainerStyle, titleView, nearestTownStyle, badgeWrapperStyle, badgeContainerStyle, accessibilityStyle} = styles
    const {campsite_form: {accessibility_options}} = campsite;
    const {id, title, description, nearestTown, accessibility, siteImageData} = site;
    return (
        <ListItem
            onPress={() => getSiteDetail({selectedSite: site, navigate})}
            avatar={siteImageData ? {uri: `data:image/png;base64,${siteImageData}`} : require('../../assets/starTent.jpg')}
            avatarContainerStyle={siteAvatarContainerStyle}
            avatarStyle={siteAvatarStyle}
            title={
                <View>
                    <Text style={titleView}>{title}</Text>
                    <Badge
                        wrapperStyle={badgeWrapperStyle}
                        containerStyle={badgeContainerStyle}
                    >
                        <Text style={nearestTownStyle}>{nearestTown}</Text>
                    </Badge>
                    <View style={subtitleView}>
                        <Text>{description}</Text>
                    </View>
                    <View style={subtitleView}>

                        <Text style={accessibilityStyle}>{accessibility_options[accessibility]}</Text>
                    </View>
                </View>
            }
            subtitle={
                <View style={IconContainer}>
                    <Icon
                        name='image-inverted'
                        type="entypo"
                        color='purple'/>
                    <Icon
                        name='air'
                        type="entypo"
                        color='#f50'/>
                    <Icon
                        name='drop'
                        type="entypo"
                        color='#7C9EC2'/>
                    <Icon
                        name='leaf'
                        type="entypo"
                        color='orange'/>
                </View>
            }
        />
    )
};

const styles = StyleSheet.create({
    IconContainer: {
        flexDirection: 'row',
        paddingLeft: 10,
        paddingTop: 5
    },
    badgeWrapperStyle: {
        width: 100,
        marginLeft: 10
    },
    badgeContainerStyle: {
        backgroundColor: blueGreenNav
    },
    siteAvatarStyle: {
        flex: 1,
        width: 120
    },
    siteAvatarContainerStyle: {
        height: 150,
        width: 120
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
