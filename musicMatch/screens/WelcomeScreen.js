import _ from 'lodash';
import React, { Component } from 'react';
import { View, Text, AsyncStorage } from 'react-native';
import { AppLoading } from 'expo';
import firebase from 'firebase';
import Slides from '../components/Slides';
import { connect } from 'react-redux';


const SLIDE_DATA = [
    { text: 'Welcome to JobApp', color: '#03A9F4' },
    { text: 'Use this to get a job', color: '#009688'},
    { text: 'Set your location, then swipe away', color: '#03A9F4'}
]

class WelcomeScreen extends Component {
    // state = { token: null };

    // async componentWillMount() { // Can use action creators and redux. This case can be done in the screen
    //     let token = await AsyncStorage.getItem('fb_token');

    //     if (token) {
    //         this.props.navigation.navigate('map');
    //         this.setState({ token });
    //     } else {
    //         this.setState({ token: false });
    //     }
    // }

    componentWillMount() {
        // // If user successfully signed in and is a new user take them to the profile page to complete their profile
        // if (props.token && props.isNewUser) {
        //     this.props.navigation.navigate('profile');
        // // If the user successfully signed in and is not a new user take them to the swipe screen
        // } else if (props.token && !props.isNewUser) {
        //     this.props.navigation.navigate('swipe');
        // // If the sign in failed display a message and return to auth page
        // } else {
        //     this.props.navigation.navigate('auth');
        // }
        //console.log(this.props.token);
        firebase.auth().onAuthStateChanged( (user) => {
            if (user) {
                firebase.database().ref(`/users/${user.uid}`)
                    .on('value', snapshot => {
                        console.log(snapshot);
                        console.log(snapshot.child('isNewUser').val());
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

    onSlidesComplete = () => {
        this.props.navigation.navigate('auth');
    }

    render() {
        // if (_.isNull(this.state.token)) {
        //     return <AppLoading />
        // }
        return (
            <Slides data={SLIDE_DATA} onComplete={this.onSlidesComplete} /> // Arrow function removes need to .bind(this)
        );
    }
}

function mapStateToProps({ auth }) {
    return { token: auth.token, user: auth.user, isNewUser: auth.isNewUser, error: auth.error };
}

export default connect(mapStateToProps)(WelcomeScreen);