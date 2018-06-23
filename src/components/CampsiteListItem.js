// 3rd party libraries - core
import React, {Component} from 'react';
import {connect} from "react-redux";
import {View, Text, StyleSheet, Image} from 'react-native';
import {ListItem, Badge, Icon} from 'react-native-elements';
// 3rd party libraries - additional

import _ from 'lodash';

// styles and language
import {featureIconDetails, facilityIconDetails} from '../constants';
import {
    boogerGreen,
    grayBlueDark,
    gradientDarkBlue,
    blueGreenNav,
    bloodOrange
} from '../styles';

import {campsite} from '../locale.en'
import {returnImageForSiteKey} from "../services/SiteInfoService";


const renderIcons = ({features, facilities}) => {
    const featureIcons = _.map(features, feature => {
        return (
            <Icon
                containerStyle={{marginRight: -2, marginTop: -1}}
                key={feature}
                color={boogerGreen}
                reverse
                size={11}
                name={featureIconDetails[feature].name}
                type={featureIconDetails[feature].type}
            />
        )
    });

    const facilityIcons = _.map(facilities, facility => {
        return (
            <Icon
                containerStyle={{marginRight: -2, marginTop: -1}}
                key={facility}
                color={boogerGreen}
                reverse
                size={11}
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
        const {mainContainerStyle, contentContainerStyle, IconContainer, subtitleView, titleContainerStyle, siteAvatarContainerStyle, titleView, nearestTownStyle, badgeWrapperStyle, badgeContainerStyle, accessibilityStyle} = styles;
        const {campsite_form: {accessibility_options}} = campsite;
        const {title, description, nearestTown, accessibility, features, facilities} = this.props.site;
        const preparedDescription = description && description.length > 48 ? `${description.substring(0, 48)}...` : description;

        return (
            <ListItem
                scaleProps={{
                    friction: 90,
                    tension: 100,
                    activeScale: .98,
                }}
                linearGradientProps={{
                    colors: [gradientDarkBlue, grayBlueDark],
                    start: [1, 0],
                    end: [0.2, 0],
                }}
                containerStyle={mainContainerStyle}
                titleStyle={contentContainerStyle}
                bottomDivider={true}
                chevron
                chevronColor="white"
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
                            <Text style={{color: 'white'}}>{preparedDescription}</Text>
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
        marginLeft: -15,

    },
    IconContainer: {
        flexDirection: 'row',
        marginLeft: -15
    },
    badgeWrapperStyle: {
        marginLeft: 10,
        width: 135,
        marginBottom: 8
    },
    badgeContainerStyle: {
        borderWidth: 2,
        backgroundColor: blueGreenNav,
        borderColor: 'white'

    },
    siteAvatarContainerStyle: {
        margin: 0,
        padding: 0,
        borderRadius: 3,
        paddingLeft: 0,
        height: 175,
        width: 125
    },
    nearestTownStyle: {
        color: 'white'
    },
    subtitleView: {
        flexDirection: 'row',
        marginLeft: 10,
        marginBottom: 8
    },
    titleView: {
        fontSize: 18,
        fontWeight: '600',
        color: 'white',
        flexDirection: 'row',
        paddingLeft: 10,
        marginBottom: 8
    },
    accessibilityStyle: {
        color: bloodOrange,
        borderStyle: 'solid',
        fontWeight: '600',
    },
});


function mapStateToProps(state, ownProps) {
    const {site, getSiteDetail, navigate} = ownProps;

    return {site, getSiteDetail, navigate};
}

export default connect(mapStateToProps, {})(CampsiteListItem);
