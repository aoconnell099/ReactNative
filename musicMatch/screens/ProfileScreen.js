import React, { Component } from 'react';
import { View, Text, Dimensions } from 'react-native';
//import { Card } from 'react-native-elements';
import { connect } from 'react-redux';
import firebase from 'firebase';
import _ from 'lodash';
import * as actions from '../actions';
import Slides from '../components/Slides';
import { Card } from '../components/Card';

const SLIDE_DATA = [
    { text: 'Welcome to JobApp', color: '#03A9F4' },
    { text: 'Use this to get a job', color: '#009688'},
    { text: 'Set your location, then swipe away', color: '#03A9F4'}
]

const SCREEN_WIDTH = Dimensions.get('window').width;

class ProfileScreen extends Component {
    componentWillReceiveProps(nextProps) {
        console.log('will receive props');
        console.log(nextProps.isNewUser);
        if (nextProps.user) {
            if (nextProps.isNewUser) {
                nextProps.updateNewUser(nextProps.user);
                //show tutorial modal
            }
            nextProps.fetchPictures(nextProps.user);
            console.log('this.props.pictures after fetch pictures inside of profile screen');
            console.log(nextProps.pictures);
        }
    }
    componentWillMount() {
        console.log('Profile comp will mount props');
        console.log(this.props);
    }
    
    onSlidesComplete = () => {
        this.props.navigation.navigate('pictureEdit');
    }
    
    render() {
        const { user, isNewUser } = this.props;
        console.log('profile');
        if (user) {
            if (isNewUser) {
                //this.props.updateNewUser(user);
                //show tutorial modal
            }
            console.log('profile props');
            console.log(this.props);
            

        }
        return (
            //render image slides() -- probably stick that card inside of the function to return 

            // Card with swipable slides inside to hold pictures of user
            <Card style={styles.containerStyle}>
                <Slides data={SLIDE_DATA} onComplete={this.onSlidesComplete} /> 
            </Card>
        );
    }
}

const styles = {
    containerStyle: {
        height: 250,
        width: SCREEN_WIDTH-30,
        alignSelf: 'center',
        borderWidth: 0,
    },
    innerStyle: {
        flexGrow: 1,
        justifyContent: 'space-between'
    }
};

function mapStateToProps(state) {
    return { 
        token: state.auth.token, 
        user: state.auth.user, 
        isNewUser: state.auth.isNewUser, 
        error: state.auth.error,
        pictures: state.prof.pictures 
    };
}

export default connect(mapStateToProps, actions)(ProfileScreen);