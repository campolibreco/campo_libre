// 3rd party libraries - core
import React from 'react';
import {View, Text, StyleSheet, ScrollView} from 'react-native';
import CampsiteListItem from './CampsiteListItem';
// 3rd party libraries - additional
// styles and language


// our components - additional
import _ from 'lodash';

const renderCampsiteListItemList = ({sites, getSiteDetail, navigate}) => {
    return _.map(sites, (site, index) => {
        return (
            <CampsiteListItem
                key={index}
                site={site}
                getSiteDetail={getSiteDetail}
                navigate={navigate}
            />
        );
    });
};

const SearchList = ({sites, getSiteDetail, navigate}) => {

    if (!sites) {
        return (<Text> No Sites Available </Text>)
    } else {
        return (
            <ScrollView>
                <View>
                    {renderCampsiteListItemList({sites, getSiteDetail, navigate})}
                </View>
            </ScrollView>
        );
    }
};


export default SearchList;
