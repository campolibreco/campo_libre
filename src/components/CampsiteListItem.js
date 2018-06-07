// 3rd party libraries - core
import React, {Component} from 'react';
import {View, Text, StyleSheet, ScrollView, ImageBackground, Image} from 'react-native';
import {Card, ListItem, Button, Tile, List, Badge, Icon} from 'react-native-elements';
// 3rd party libraries - additional

// styles and language
import {featureIconDetails, facilityIconDetails} from '../constants';
import {badgeGreen, limeGreenTitle, RoyalBlueHighlight, blueGreenNav} from '../styles';
import {campsite} from '../locale.en'
import _ from 'lodash';
import {connect} from "react-redux";
import {returnImageForSiteKey} from "../services/SiteInfoService";


const renderIcons = ({features, facilities}) => {
    const featureIcons = _.map(features, feature => {
        return (
            <Icon
                key={feature}
                name={featureIconDetails[feature].name}
                type={featureIconDetails[feature].type}
            />
        )
    });

    const facilityIcons = _.map(facilities, facility => {
        return (
            <Icon
                key={facility}
                name={facilityIconDetails[facility].name}
                type={facilityIconDetails[facility].type}
            />
        );
    });

    return _.concat(featureIcons, facilityIcons);
};

class CampsiteListItem extends Component {
    constructor(props) {
        super(props);
        this.state = {
            siteImageData: require(`../../assets/defaultSiteImage.jpg`)
        }
    }

    replaceImageData = () => {
        returnImageForSiteKey({siteKey: this.props.site.id})
            .then(imageData => {
                this.setState({
                    siteImageData: {uri: `data:image/png;base64,${imageData}`}
                })
            });
    };

    render() {
        const {mainContainerStyle, contentContainerStyle, textStyle, IconContainer, subtitleView, titleContainerStyle, siteAvatarContainerStyle, titleView, nearestTownStyle, badgeWrapperStyle, badgeContainerStyle, accessibilityStyle} = styles
        const {campsite_form: {accessibility_options}} = campsite;
        const {title, description, nearestTown, accessibility, features, facilities} = this.props.site;
        const preparedDescription = description && description.length > 57 ? `${description.substring(0, 57)}...` : description;

        return (
            <ListItem
                containerStyle={mainContainerStyle}
                titleStyle={contentContainerStyle}
                bottomDivider={true}
                onPress={() => this.props.getSiteDetail({selectedSite: this.props.site, navigate: this.props.navigate})}
                leftAvatar={
                    <Image
                        source={this.state.siteImageData}
                        style={siteAvatarContainerStyle}
                        onLoadStart={this.replaceImageData}
                    />
                }
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

    }
}

const styles = StyleSheet.create({
    mainContainerStyle: {
        padding: 0,
        paddingTop: 14,
        paddingBottom: 14,
        paddingRight: 14
    },
    titleContainerStyle: {
        marginLeft: -15
    },
    IconContainer: {
        flexDirection: 'row',
        marginLeft: -5,
        paddingTop: 5
    },
    badgeWrapperStyle: {
        marginLeft: 10
    },
    badgeContainerStyle: {
        backgroundColor: blueGreenNav
    },
    siteAvatarContainerStyle: {
        margin: 0,
        padding: 0,
        borderRadius: 0,
        paddingLeft: 0,
        height: 150,
        width: 135
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


function mapStateToProps(state, ownProps) {
    const {site, getSiteDetail, navigate} = ownProps;

    return {site, getSiteDetail, navigate};
}

export default connect(mapStateToProps, {})(CampsiteListItem);
