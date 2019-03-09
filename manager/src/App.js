import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import firebase from 'firebase';
import ReduxThunk from 'redux-thunk';
import reducers from './reducers';
import LoginForm from './components/LoginForm';
import Router from './Router';

class App extends Component {
    componentWillMount() {
        const config = {
            apiKey: 'AIzaSyCOW2SkoNkQ_v_DbokLJXY_Jka7fIEZf6A',
            authDomain: 'manager-528af.firebaseapp.com',
            databaseURL: 'https://manager-528af.firebaseio.com',
            projectId: 'manager-528af',
            storageBucket: 'manager-528af.appspot.com',
            messagingSenderId: '715949961432'
          };

        firebase.initializeApp(config);
    }

    render() {
        const store = createStore(reducers, {}, applyMiddleware(ReduxThunk));
        return (
            <Provider store={store}> 
                <Router />
            </Provider> 
        );
    }
}

export default App;