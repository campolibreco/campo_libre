// 3rd part libraries - core
import {AppLoading} from 'expo';
import React, {Component} from 'react';
import {connect} from 'react-redux';

// actions

// language and styles

// our components - core
// our components - additional

class AuthScreen extends Component {
    static navigationOptions = (props) => {

        return {
            header: null
        }
    };

    render() {
        return <AppLoading/>
    }
}

const styles = {};

const mapStateToProps = (state, ownProps) => {

    return {};
};

export default connect(mapStateToProps, {})(AuthScreen);
