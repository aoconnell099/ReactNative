import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { 
  createStackNavigator,
  createBottomTabNavigator,
  createAppContainer, 
  createDrawerNavigator,
  withNavigation
} from 'react-navigation';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import configureStore from './store';
import firebase from 'firebase';

import AuthScreen from './screens/AuthScreen';
import ConcertScreen from './screens/ConcertScreen';
import ConcertSearchScreen from './screens/ConcertSearchScreen';
import MatchesScreen from './screens/MatchesScreen';
import MessageScreen from './screens/MessageScreen';
import ProfileScreen from './screens/ProfileScreen';
import SettingsScreen from './screens/SettingsScreen';
import SwipeScreen from './screens/SwipeScreen'; 
import WelcomeScreen from './screens/WelcomeScreen';
import PictureSelectScreen from './screens/PictureSelectScreen';

export default class App extends React.Component {
  componentWillMount() {
    const config = {
      apiKey: "AIzaSyCQFVlBYAcoOdpVsv0GJFDvzSNzsvuomlw",
      authDomain: "musicmatch-53936.firebaseapp.com",
      databaseURL: "https://musicmatch-53936.firebaseio.com",
      projectId: "musicmatch-53936",
      storageBucket: "musicmatch-53936.appspot.com",
      messagingSenderId: "953588060108"
    };
    firebase.initializeApp(config);

    // Watch for change in user authentication. On app load, if user is already logged in send them to swipe
   // firebase.auth().onAuthStateChanged( (user) => {
     // console.log(user);
      
      //   if (user) {
      //     firebase.database().ref(`/users/${user.uid}`)
      //       .on('value', snapshot => {
      //         console.log(snapshot);
      //       });
      //       firebase.database().ref('/users/ahd930j')
      //       .on('value', snapshot => {
      //         console.log(snapshot);
      //       });
      //     // User is logging in for the first time
      //     if (Object.is(user.createdAt, user.lastLoginAt)) {
      //       console.log('new user');//
      //     }
      //     // User has logged in at a previous time and is still logged in at app load
      //     else {
      //       console.log('old user');
      //       withNavigation(this.props.navigation.navigate('main'));
      //     }
            
      //   } else {
      //     // No user is signed in.
      //   }
      //});
  }

  render() {
    const { persistor, store } = configureStore();
    const MainNavigator = createAppContainer(
      createBottomTabNavigator({
        //welcome: WelcomeScreen,
        auth: AuthScreen,
        main: {
          screen: createStackNavigator({
            swipeStack: {
              screen: createDrawerNavigator({
                swipe: SwipeScreen,
                profile: {
                  screen: createStackNavigator({
                    innerProfile: ProfileScreen,
                    pictureEdit: PictureSelectScreen
                  }/*NAV OPTIONS GO HERE FOR PROFILE STACK NAV*/)
                },
                search: ConcertSearchScreen, // Eventually make stack nav with concert screen inside
                matches: MatchesScreen,
                settings: SettingsScreen
              },
              {
                navigationOptions : ({ navigation }) => ({ 
                  title: 'Welcome!',
                  headerRight: <Text onPress={() => {console.log('pressed'); navigation.openDrawer()}}>Menu</Text>
                })
              })
            }
          })   
        } 
      },
      {defaultNavigationOptions: {tabBarVisible: false}}) // Could do ,{defaultNavigationOptions: {tabBarVisible: false}} here instead of setting it individually
    );
    return (
      <Provider store={store}>
        <PersistGate persistor={persistor}>
          <MainNavigator />
        </PersistGate>
      </Provider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
