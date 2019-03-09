import React, { Component } from 'react';
import { View, Text, ScrollView } from 'react-native';
import firebase from 'firebase';
import { Header, Button, Spinner, Card } from './components/common'
import LoginForm from './components/LoginForm';

class App extends Component {
    state = { loggedIn: null };

    componentWillMount() {
        firebase.initializeApp({
            apiKey: 'AIzaSyCdsQSVjZyBhwqua5KNnekP7sBeb3T9gIc',
            authDomain: 'authentication-86c2d.firebaseapp.com',
            databaseURL: 'https://authentication-86c2d.firebaseio.com',
            projectId: 'authentication-86c2d',
            storageBucket: 'authentication-86c2d.appspot.com',
            messagingSenderId: '386003322806'
        });

        firebase.auth().onAuthStateChanged((user) => {
            if (user) {
                this.setState({ loggedIn: true });
            } else {
                this.setState({ loggedIn: false });
            }
        });
    }

    renderContent() {
        switch (this.state.loggedIn) {
            case true:
                return ( 
                    <Button onPress={() => firebase.auth().signOut()}>
                        Log Out
                    </Button>                 
                );
            case false:
                return <LoginForm />;
            default:
                return <Spinner size="large" />;
        }
    }

    render() {
        return (
            <View>
                <View>
                    <Header headerText="Authentication" />
                </View>
                <View style={{ height: 50 }}>
                    {this.renderContent()}
                </View>
            </View>
        );
    }
}

export default App;
