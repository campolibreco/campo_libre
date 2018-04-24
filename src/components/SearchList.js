// 3rd party libraries - core
import React from 'react';
import {View, Text, StyleSheet, ScrollView, FlatList} from 'react-native';
import CampsiteListItem from './CampsiteListItem';
// 3rd party libraries - additional
// styles and language


// our components - additional
import _ from 'lodash';

const SearchList = ({sites, getSiteDetail, navigate}) => {

    if (!sites) {
        return (<Text> No Sites Available </Text>)
    } else {
        return (
            <FlatList
                data={sites}
                renderItem={({item, index}) => {
                    return (
                        <CampsiteListItem
                            site={item}
                            getSiteDetail={getSiteDetail}
                            navigate={navigate}
                        />
                    );
                }}
            />
        );
    }
};


export default SearchList;
