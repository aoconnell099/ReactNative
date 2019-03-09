import { AsyncStorage } from 'react-native';
import { Facebook } from 'expo';
import firebase from 'firebase';
import { 
    FETCH_PICTURES,
    EMPTY_FETCH_PICTURES,
    UPDATE_PICTURES
 } from './types';
import axios from 'axios';


export const fetchPictures = (user) => async dispatch => { // Returning a single statement allows for removal of curly braces after first arrow. Single parameter of dispatch allows for removal of parens
    try {
        let { pictures } = await firebase.database().ref(`/users/${user.uid}`) //
            .on('value', snapshot => {
                console.log('fetchPictures snapshot val');
                console.log(snapshot.child('pictures').val());
                if (snapshot.child('pictures').val()) {
                    console.log('if snapshot.child(pictures).val() is true');
                    dispatch({ type: FETCH_PICTURES, payload: pictures }); 
                } else {
                    console.log('if snapshot.child(pictures).val() is false');
                    dispatch({ type: EMPTY_FETCH_PICTURES });
                }
                
                
                //dispatch({ type: FETCH_PICTURES, payload: snapshot.child('pictures').val() });
                //return snapshot.child('pictures').val();
                
                // let pictures = snapshot.child('pictures').val();
                // console.log(pictures);
                // // Take care of individual pictures here
                // snapshot.child('pictures').val().map(picture => {
                //     console.log('map');
                //     console.log(picture);
                // })
                // return {pictures};
            }); 
        console.log('result of let pictures = await firebase');
        console.log(pictures);
        // if (pictures) {
        //     console.log('if pictures is true');
        //     dispatch({ type: FETCH_PICTURES, payload: pictures }); 
        // } else {
        //     console.log('if pictures is false');
        //     dispatch({ type: EMPTY_FETCH_PICTURES });
        // }
        
        
    } catch(e) {
        console.error(e);
    }
};

export const updatePictures = (user, pictures) => async (dispatch) => {
    try {
        console.log('updatePictures');
        console.log(pictures);
        await firebase.database().ref(`/users/${user.uid}`).child('pictures')
                .set(pictures);
            return dispatch({ type: UPDATE_PICTURES, payload: [pictures] });
    } catch(e) {
        console.error(e);
    }
};