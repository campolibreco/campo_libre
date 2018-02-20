// 3rd party libraries - core
import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {Card} from 'react-native-elements';
// 3rd party libraries - additional

// styles and language

// our components - core
// our components - additional

const SearchList = ({sites}) => {

    return (
        <Card>
            <Text>
                List Results of Sites
            </Text>
        </Card>
    );

};

const styles = StyleSheet.create({
    fillScreen: {
        flex: 1
    },
    spinnerContainerStyle: {
        justifyContent: 'center'
    }
});

export default SearchList;