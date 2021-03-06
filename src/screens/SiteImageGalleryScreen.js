import React, {Component} from 'react';
import {StyleSheet} from 'react-native';
import {connect} from 'react-redux';
import Gallery from 'react-native-image-gallery';

import _ from 'lodash';
import {getSiteToShow, returnImageForSiteKey} from "../services/SiteInfoService";

class SiteImageGalleryScreen extends Component {

    constructor(props) {
        super(props);
        this.state = {
            siteImageData: require(`../../assets/defaultSiteImage.jpg`),
            realImageReady: false
        }
    }

    render() {
        const siteToShow = getSiteToShow(this.props);

        returnImageForSiteKey({siteKey: siteToShow.id})
            .then(imageData => {
                this.setState({
                    siteImageData: {uri: `data:image/png;base64,${imageData}`},
                    realImageReady: true
                })
            });

        const {galleryStyle} = styles;

        return (
            <Gallery
                style={galleryStyle}
                images={[
                    {source: this.state.siteImageData}
                ]}
            />
        );
    }

}

const styles = StyleSheet.create({
    galleryStyle: {
        flex: 1,
        backgroundColor: 'black'
    }
});

function mapStateToProps(state) {
    const {selectedSite, selectedPendingSite} = state.map;

    return {selectedSite, selectedPendingSite};
}

export default connect(mapStateToProps, {})(SiteImageGalleryScreen);
