import React from 'react';
import { Text, TextInput, View, Image, Button } from 'react-native';
import { Buffer } from 'buffer';
import ModalMessage from '../../components/modal-message';
import { globalStyles } from '../../styles';
import { styles } from './styles';


function DoLogin(username, password) {
  return fetch('https://api.github.com', {
    headers: {
      'Host': 'api.github.com',
      'Authorization': 'Basic ' + new Buffer(username + ':' + password).toString('base64')
    }
  })
    .then(response => response.status === 200)
    .catch(() => false);
}
export default class LoginScreen extends React.Component {
  state = {
    inputUsername: '',
    inputPassword: '',
    isModalVisible: false,
  };

  showModal = () => {
    this.setState({ isModalVisible: true });
  }

  closeModal = () => {
    this.setState({ isModalVisible: false });
  }


  onPressLogin = () => {
    DoLogin(this.state.inputUsername, this.state.inputPassword)
      .then(authenticated => {
        if (authenticated) {
          this.props.navigation.navigate('AppStack');
        } else {
          this.showModal();
        }
      });
  };

  onUsernameChange = text => {
    this.setState({ inputUsername: text });
  };

  onPasswordChange = text => {
    this.setState({ inputPassword: text });
  };

  render() {
    const areFieldsReady = this.state.inputUsername.length && this.state.inputPassword.length; 
    return (
      <View style={styles.mainContainer}>
        <View style={styles.iamgeContainer}>
          <Image source={require('../../assets/images/shopping-black-fr.png')} style={styles.iamge} />
        </View>
        <View style={styles.textContainer}>
          <Text style={[globalStyles.text, styles.textCaption]}>Friday's shop</Text>
          <View style={styles.inputContainer}>
            <TextInput
              value={this.state.inputUsername}
              placeholder='Your username'
              textContentType='username'
              style={styles.input}
              onChangeText={this.onUsernameChange}
            />
            <TextInput
              value={this.state.inputPassword}
              placeholder='Your password'
              textContentType='password'
              style={styles.input}
              onChangeText={this.onPasswordChange}
              secureTextEntry
            />
          </View>
          <Button title='Login' onPress={this.onPressLogin} disabled={!areFieldsReady} />
        </View>
        <ModalMessage
          visible={this.state.isModalVisible}
          onClose={this.closeModal}
          title='Authorization error'
          type='error'
        >
          Your credentials are invalid. Please check you Github username and password.
        </ModalMessage>
      </View>
    );
  }
};