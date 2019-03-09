import React from 'react';
import { View, StyleSheet } from 'react-native';

const Card = (props) => {
  let shadowStyle = {
    shadowColor: 'grey',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: .5,
    shadowRadius: 12,
    elevation: 1,
  }
  if (props.noShadow) {
    shadowStyle = {}
  }
  return (
    <View style={[styles.containerStyle, props.style, shadowStyle]}>
      {props.children}
    </View>
  );
};


const styles = {
  containerStyle: {
    padding: 0,
    marginHorizontal: 0,
    //backgroundColor: 'black',
    borderRadius: 3,
  }
}

export { Card };