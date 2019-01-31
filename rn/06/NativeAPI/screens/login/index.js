import React from 'react';
import { Text, TextInput, View, Image, Button, Animated, ActivityIndicator } from 'react-native';
import { Buffer } from 'buffer';
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
    isLoginError: false,
    isLogging: false,
  };

  shakeAnim = new Animated.Value(0);

  markLoginError = () => {
    this.setState({ isLoginError: true });
  }

  clearLoginError = () => {
    this.setState({ isLoginError: false });
  }

  startLogging() {
    this.setState({ isLogging: true });
  }

  stopLogging() {
    this.setState({ isLogging: false });
  }

  shake = () => {
    this.shakeAnim.setValue(0);
    Animated.spring(this.shakeAnim, {
      toValue: 1,
      friction: 3,
      tension: 10,
      useNativeDriver: true,
    }).start(() => {
      this.shakeAnim.setValue(0);
    });
  };

  onPressLogin = () => {
    this.startLogging();
    DoLogin(this.state.inputUsername, this.state.inputPassword)
      .then(authenticated => {
        this.stopLogging();
        if (authenticated) {
          this.props.navigation.navigate('AppStack');
        } else {
          this.markLoginError();
          this.shake();
        }
      });
  };

  onUsernameChange = text => {
    this.setState({ inputUsername: text });
    this.clearLoginError();
  };

  onPasswordChange = text => {
    this.setState({ inputPassword: text });
    this.clearLoginError();
  };



  render() {
    const shakeAnimated = {
      transform: [
        {
          translateY: this.shakeAnim.interpolate({
            inputRange: [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1],
            outputRange: [0, 5, -7, 6, -4, 9, -7, 5, -5, 5, 0],
          }),
        },
        {
          translateX: this.shakeAnim.interpolate({
            inputRange: [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1],
            outputRange: [0, 3, -4, 5, -5, 4, -4, 5, -6, 3, 0],
          }),
        },
      ],
    };

    const { inputUsername, inputPassword, isLoginError } = this.state;

    const areFieldsReady = inputUsername.length && inputPassword.length;
    const inputStyles = isLoginError ? [styles.input, styles.inputError] : styles.input;

    return (
      <View style={styles.mainContainer}>
        <View style={styles.iamgeContainer}>
          <Image source={require('../../assets/images/shopping-black-fr.png')} style={styles.iamge} />
        </View>
        <View style={styles.textContainer}>
          <Text style={[globalStyles.text, styles.textCaption]}>Friday's shop</Text>
          <Animated.View style={[styles.inputContainer, shakeAnimated]}>
            <TextInput
              value={this.state.inputUsername}
              placeholder='Your username'
              textContentType='username'
              style={inputStyles}
              onChangeText={this.onUsernameChange}
            />
            <TextInput
              value={this.state.inputPassword}
              placeholder='Your password'
              textContentType='password'
              style={inputStyles}
              onChangeText={this.onPasswordChange}
              secureTextEntry
            />
          </Animated.View>
          {this.state.isLogging ?
            <View style={styles.loggingIndicator}><ActivityIndicator /></View>
            :
            <Button title='Login' onPress={this.onPressLogin} disabled={!areFieldsReady} />
          }
        </View>
      </View>
    );
  }
};