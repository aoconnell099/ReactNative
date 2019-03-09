import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { FormLabel, FormInput, Button } from 'react-native-elements';
import axios from 'axios';

const ROOT_URL = 'https://us-central1-one-time-password-9246a.cloudfunctions.net';

class SignUpForm extends Component {
    state = { phone: '' }; // Dont need constructor because all you do is set state. This is less code

    handleSubmit = async () => { // Making this an arrow function removes the need to bind it to 'this' for the button onPress
        try {
            await axios.post(`${ROOT_URL}/createUser`, { phone: this.state.phone }) // Await causes the promise made by the axios.post to get resolved before beginning next line of code. Essentially tells everything to wait until this line's requests are finished and responded to
            await axios.post(`${ROOT_URL}/requestOneTimePassword`, { phone: this.state.phone })
        } catch (err) {
            console.log(err);
        }
    }

/*  What handle submit looked like before async await refactor

    handleSubmit = () => { // Making this an arrow function removes the need to bind it to 'this' for the button onPress
        axios.post(`${ROOT_URL}/createUser`, {
            phone: this.state.phone
        })
            .then(() => {
                axios.post(`${ROOT_URL}/requestOneTimePassword`, { phone: this.state.phone })
            })
    }
*/

    render() {
        return (
            <View>
                <View style={{ marginBottom: 10 }}>
                    <FormLabel>Enter Phone Number</FormLabel>
                    <FormInput 
                        value={this.state.phone}
                        onChangeText={phone => this.setState({ phone })}
                    />
                </View>
                <Button onPress={this.handleSubmit} title="Submit" />
            </View>
            
        );
    }
}

export default SignUpForm;