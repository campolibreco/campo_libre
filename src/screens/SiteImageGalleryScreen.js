import React, {Component} from 'react';
import {StyleSheet} from 'react-native';
import {connect} from 'react-redux';
import Gallery from 'react-native-image-gallery';

import _ from 'lodash';

class SiteImageGalleryScreen extends Component {

    render() {
        const {fillScreen} = styles;
        const {selectedSite: {siteImageData}} = this.props;

        return (
            <Gallery
                style={{flex: 1, backgroundColor: 'black'}}
                images={[
                    {source: {uri: `data:image/png;base64,${siteImageData}`}}
                ]}
            />
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

export default connect(mapStateToProps, {})(SiteImageGalleryScreen);
