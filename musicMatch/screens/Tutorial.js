import React from 'react';
import { Text, View } from 'react-native';
import { Modal } from 'react-native-modal';

const Tutorial = () => {
    state = {
      isModalVisible: false
    };
  
    _toggleModal = () =>
      this.setState({ isModalVisible: !this.state.isModalVisible });
  
      return (
        <View style={{ flex: 1 }}>
          <Modal isVisible={this.state.isModalVisible}>
            <View style={{ flex: 1 }}>
              <Text>Hello!</Text>
              <Text>Tutorial</Text>
              <TouchableOpacity onPress={this._toggleModal}>
                <Text>Hide me!</Text>
              </TouchableOpacity>
            </View>
          </Modal>
        </View>
      );
    
  };

const styles = {
    cardSectionStyle: {
        justifyContent: 'center'
    },
    textStyle: {
        flex: 1,
        fontSize: 18,
        textAlign: 'center',
        lineHeight: 40
    },
    containerStyle: {
        backgroundColor: 'rgba(0, 0, 0, 0.75)',
        positions: 'relative',
        flex: 1,
        justifyContent: 'center'
    }
};

export default { Tutorial };