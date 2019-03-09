import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import firebase from 'firebase';
import SignUpForm from './components/SignUpForm';
import SignInForm from './components/SignInForm';

export default class App extends React.Component {
  componentDidMount() {
    const config = {
      apiKey: "AIzaSyDO62ERS2JuLazffO91uqDARwXLUx7iZWw",
      authDomain: "one-time-password-9246a.firebaseapp.com",
      databaseURL: "https://one-time-password-9246a.firebaseio.com",
      projectId: "one-time-password-9246a",
      storageBucket: "one-time-password-9246a.appspot.com",
      messagingSenderId: "169529629398"
    };
    firebase.initializeApp(config);
  }
  
  render() {
    return (
      <View style={styles.container}>
        <SignUpForm />
        <SignInForm />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
});
