import React, { Component } from 'react';
import { View, Text, Image, Button, Dimensions } from 'react-native';
import { Avatar } from 'react-native-elements';
import { Permissions, ImagePicker } from 'expo';
import { connect } from 'react-redux';
import * as actions from '../actions';
import { Card } from '../components/Card';

const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT = Dimensions.get('window').height;

class PictureSelectScreen extends Component {
  state = {
      pictures: [],
  };

  // componentWillMount() {
  //   console.log('picture select component will mount');
  //   this.props.updatePictures(this.props.user, this.state.pictures);
  // }
  componentDidMount() {
    console.log('picture select comp did mount');
    //this.setState({ pictures: this.props.pictures });
  }

  // componentWillReceiveProps(nextProps) {
  //   if (nextProps.pictures !== this.props.pictures) { // Doesn't compare actual data, checks if they are the exact same array in memory
  //       this.setState({ ...state, index: 0});
  //   }
  // }

  _pickImage = async () => {
    const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
    if (status === 'granted') {
        let result = await ImagePicker.launchImageLibraryAsync({
            allowsEditing: true,
            aspect: [4, 3],
          });
      
          console.log(result);
      
          if (!result.cancelled) {
            this.setState({ pictures: [...this.state.pictures, result.uri] });
            //this.props.updatePictures(this.props.user, this.state.pictures);
          }
    }
  };

  renderIconPicture() {
    console.log('rendericonPic')
    if (this.state.pictures.length === 0 || (this.state.pictures.length > 0 && this.state.pictures.length < 6 )) {
      return (
          <Avatar 
            size="large"
            icon={{ name: 'add' }} 
            containerStyle={styles.cardStyle}
            />
      );
    }
  }
  
  renderPictures() {
    if (this.state.pictures) {
      console.log('if this.state.pictures is true');
      if (this.state.pictures.length > 0 && this.state.pictures.length < 7) {
        return this.state.pictures.map((picture, i) => {
          console.log('picture');
          console.log(i);
          console.log(picture);
          if (i === this.state.pictures.length-1) {
            return (
              <Card key={i} style={styles.cardStyle}>
                <Image key={picture} source={{ uri: picture }} style={styles.cardStyle} />
              </Card>        
            );
          } 
          else if (i < this.state.pictures.length-1) {
            return (
              <Card key={i} style={styles.cardStyle}>
                <Image key={i} source={{ uri: picture }} style={styles.cardStyle} />
              </Card>
            );
          }
        });
      } 
      else {
        console.log('if pictures.length > 0 false');
        //return this.renderIconPicture();
      }
    }else{
      console.log('if(this.state.pictures) is false');
      //this.setState({ pictures: [] });
      //this.renderIconPicture();
    }
  }
  
  render() {
    console.log('picture select state inside of render');
    console.log(this.state);
    return (
      <View style={{ flex: 1, flexDirection: 'column', justifyContent: 'center'}}>
        <View style={styles.imageListStyle}>
          {this.renderPictures()}
          {this.renderIconPicture()}
        </View>
        <View>
          <Button
            title="Pick an image from camera roll"
            onPress={this._pickImage}
          />
        </View>
      </View>
      
    );
  }
}

function mapStateToProps(state) {
    return { 
        token: state.auth.token, 
        user: state.auth.user, 
        pictures: state.prof.pictures 
    };
}

const styles = {
  imageListStyle: {
    flex: 1, 
    flexDirection: 'row', 
    flexWrap: 'wrap'
  },
  cardStyle: {
    height: SCREEN_HEIGHT/4, 
    width: SCREEN_WIDTH/3
  }
};

export default connect(mapStateToProps, actions)(PictureSelectScreen);