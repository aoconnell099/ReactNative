import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { Button, Icon } from 'react-native-elements';
import firebase from 'firebase';
import { connect } from 'react-redux';
import * as actions from '../actions';
import { Tutorial } from './Tutorial';

class AuthScreen extends Component {

    componentWillMount() {
        // Watches for a change in authentication state so it handles users who were previously logged in re opening the app and staying logged in
        firebase.auth().onAuthStateChanged( (user) => {
            console.log('authStateChange');
            if (user) {
                firebase.database().ref(`/users/${user.uid}`)
                    .on('value', snapshot => {
                        console.log(snapshot.child('isNewUser').val())
                        if (snapshot.child('isNewUser').val()) {
                            // Must take care of setting isNewUser to false. Profile might be a better place to do this
                            this.props.navigation.navigate('profile');
                        }
                        else if (!snapshot.child('isNewUser').val()) {
                            this.props.navigation.navigate('swipe');
                        }
                    });
            }
        });
    }

    onButtonPress = async () => {
        await this.props.doFacebookLogin(); // auth_action
    }

    renderError() {
        if (this.props.error) {
            return (
                <View style={{backgroundColor: 'white' }}>
                    <Text style={styles.errorTextStyle}>
                        {this.props.error}
                    </Text>
                </View>
            );
        }
    }

    showTutorial() {
        // Figure out logic to show only on the first load
    }

    render() {
        return (
            <View>
                {this.renderError()}
                <Button 
                    large
                    title="Log in with Facebook"
                    backgroundColor="#3b5998"
                    icon={{ type: 'zocial', name: 'facebook' }}
                    onPress={this.onButtonPress}
                    buttonStyle={{ top: 55, left: 10, right: 10 }}
                />
            </View>
        );
    }
}

const styles = {
    errorTextStyle: {
        fontSize: 20, 
        alignSelf: 'center',
        color: 'red'
    }
}

function mapStateToProps({ auth }) {
    return { token: auth.token, user: auth.user, isNewUser: auth.isNewUser, error: auth.error };
}

export default connect(mapStateToProps, actions)(AuthScreen);