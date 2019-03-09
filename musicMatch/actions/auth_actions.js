import { AsyncStorage } from 'react-native';
import { Facebook } from 'expo';
import firebase from 'firebase';
import {
    FACEBOOK_LOGIN_SUCCESS,
    FACEBOOK_LOGIN_FAIL,
    LOGOUT,
    UPDATE_NEW_USER
} from './types';
import axios from 'axios';


export const facebookLogin = () => async dispatch => { // Returning a single statement allows for removal of curly braces after first arrow. Single parameter of dispatch allows for removal of parens
    let token= await AsyncStorage.getItem('fb_token');

    if (token) { // If user is already logged in
        // Dispatch an action saying FB login is done
        dispatch({ type: FACEBOOK_LOGIN_SUCCESS, payload: token });
    } else {
        // Start of Fb login
        doFacebookLogin(dispatch); // function needs dispatch for login fail dispatch
    }
};

export const doFacebookLogin = () => async (dispatch) => {
    let { type, token } = await Facebook.logInWithReadPermissionsAsync(
        '283895528960728',
        { permissions: ['public_profile', 'email', 'user_birthday', 'user_location', 'user_photos'] }
    );
    if (type === 'success') {
        // Build Firebase credential with the Facebook access token.
        const credential = firebase.auth.FacebookAuthProvider.credential(token);
        // Sign in with credential from the Facebook user.
        let { user, additionalUserInfo } = await firebase.auth().signInAndRetrieveDataWithCredential(credential);
        console.log('FB auth');
        const response = await axios.get(`https://graph.facebook.com/${additionalUserInfo.profile.id}/photos/?access_token=${token}`);
        console.log(response);
        firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL);
        const { isNewUser, profile } = additionalUserInfo; // Destructure out of additionalUserinfo object
        // If user has never signed in before, create a new user in the database using retrieved FB user data
        if (isNewUser) {
            await firebase.database().ref(`/users/${user.uid}`)
                .set({ first_name: profile.first_name, last_name: profile.last_name, city: '', email: profile.email, birthday: profile.birthday, isNewUser, pictures: [], description: '', spotifyLink: '', instaLink: '', snapLink: '', recentShows: [], upcomingShows: [] });
            return dispatch({ type: FACEBOOK_LOGIN_SUCCESS, payload: { token, user, isNewUser }});
            
        }
        return dispatch({ type: FACEBOOK_LOGIN_SUCCESS, payload: { token, user, isNewUser }});
    } else {
        return dispatch({ type: FACEBOOK_LOGIN_FAIL });
    }
       
};

export const logout = (callback) => async (dispatch) => {
    try {
        await firebase.auth().signOut();
        dispatch({ type: LOGOUT });
        callback();
    } catch(e) {
        console.error(e);
    }
    
};

export const updateNewUser = (user) => async (dispatch) => {
    try {
        console.log('updateNewUser');
        await firebase.database().ref(`/users/${user.uid}`)
                .update({ isNewUser: false });
            return dispatch({ type: UPDATE_NEW_USER });
    } catch(e) {
        console.error(e);
    }
};
