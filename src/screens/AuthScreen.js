// 3rd part libraries - core
import {AppLoading} from 'expo';
import React, {Component} from 'react';
import { ImageBackground } from 'react-native';
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
        return (
          <ImageBackground
             source={require('../../assets/starTent.jpg')}
             style={styles.heroContainer}>
          </ImageBackground>
        )
    }
}

const styles = {
  heroContainer: {
      flex: 1,
      width: '100%',
      height:'100%'
  },

};

const mapStateToProps = (state, ownProps) => {

    return {};
};

export default connect(mapStateToProps, {})(AuthScreen);
