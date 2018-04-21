import React, {Component} from 'react';
import {StyleSheet, WebView, View} from 'react-native';
import {connect} from 'react-redux';
import Gallery from 'react-native-image-gallery';

import _ from 'lodash';

class MVUMInspectorScreen extends Component {

    render() {
        const {fillScreen} = styles;
        const {selectedSite: {mvum}} = this.props;
        console.log(mvum);

        return (
            <View style={fillScreen}>
                <WebView
                    bounces={false}
                    scrollEnabled={false}
                    source={{ uri: `./${mvum}.pdf` }} />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    fillScreen: {
        flex: 1
    }
});

function mapStateToProps(state) {
    const {selectedSite} = state.map;

    return {selectedSite};
}

export default connect(mapStateToProps, {})(MVUMInspectorScreen);
