// 3rd party libraries - core
import React, {Component} from 'react';
import {View, Text} from 'react-native';
import {connect} from 'react-redux';
import {} from 'react-native-elements';
// 3rd party libraries - additional

// actions
import {someAction} from '../somewhere';

// styles and language

// our components - core
// our components - additional

class classBasedComponent extends Component {

    // constructor/state - ONLY KEEP ONE
    constructor(props) {
        super(props);

        this.state = {}
    }
    state = {};

    // life-cycle hooks
    componentWillMount() {

    }

    // methods
    methodWithNoBind = () => {
        // this method can be used directly in the JSX without having to bind(this)
    };

    //render
    render() {
        return (
            <View>
                <Text>Class-based Component</Text>
            </View>
        );

    }

}

const mapStateToProps = (state, ownProps) => {

};

const styles = {
    someStyle: {}
};

export default connect(mapStateToProps, {someAction})(classBasedComponent);

