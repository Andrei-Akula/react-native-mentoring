import React from 'react';
import { Text, TextInput, View, Image, Button } from 'react-native';
import { globalStyles } from '../../styles';
import { styles } from './styles';

export default class LoginScreen extends React.Component {
  state = {
    inputEmail: '',
    inputPassword: '',
  };

  onPressLogin = () => {
    this.props.onLoginSuccess();
  };

  onEmailChange = text => {
    this.setState({ inputEmail: text });
  };

  onPasswordChange = text => {
    this.setState({ inputPassword: text });
  };

  render() {
    const areFieldsReady = this.state.inputEmail.length && this.state.inputPassword.length; 
    return (
      <View style={styles.mainContainer}>
        <View style={styles.iamgeContainer}>
          <Image source={require('../../assets/images/shopping-black-fr.png')} style={styles.iamge} />
        </View>
        <View style={styles.textContainer}>
          <Text style={[globalStyles.text, styles.textCaption]}>Friday's shop</Text>
          <View style={styles.inputContainer}>
            <TextInput
              value={this.state.inputEmail}
              placeholder='Your email'
              textContentType='emailAddress'
              style={styles.input}
              onChangeText={this.onEmailChange}
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
          <Button title="Login" onPress={this.onPressLogin} disabled={!areFieldsReady} />
        </View>
      </View>
    );
  }
};