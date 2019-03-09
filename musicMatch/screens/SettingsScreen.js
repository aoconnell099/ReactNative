import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { Button, Icon } from 'react-native-elements';
import firebase from 'firebase';
import { connect } from 'react-redux';

import * as actions from '../actions';

class SettingsScreen extends Component {
    onButtonPress = () => { 
        this.props.logout( () => this.props.navigation.navigate('auth') );
    }
    render() {
        return (
            <View>
                <Button 
                    large
                    title="Log out"
                    backgroundColor="#3b5998"
                    icon={{ type: 'zocial', name: 'facebook' }}
                    onPress={this.onButtonPress}
                    buttonStyle={{ top: 55, left: 10, right: 10 }}
                />
            </View>
        );
    }
}

export default connect(null, actions)(SettingsScreen);