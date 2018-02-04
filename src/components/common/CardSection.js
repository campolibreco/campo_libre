import React from 'react';
import {View} from 'react-native';


const CardSection = ({children, style}) => {
    return (
        <View
            style={[styles.containerStyle, style]}
        >
            {children}
        </View>
    );
};

const styles = {
    containerStyle: {
      backgroundColor:'#fff',
      padding: 15,
      margin:10,
      borderRadius: 5,
      shadowColor: '#C9D1DB',
      shadowRadius: 5,
      shadowOpacity: 0.3,
    }
};

export  {CardSection};
