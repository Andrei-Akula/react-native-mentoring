import React from 'react';
import {
  Text, TextInput, View, Image, Button, Animated,
  ActivityIndicator, AsyncStorage, Vibration
} from 'react-native';
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
    isPasswordAutoFilled: false,
  };

  shakeAnim = new Animated.Value(0);

  markLoginError = () => {
    this.setState({ isLoginError: true });
  }

  clearLoginError = () => {
    this.setState({ isLoginError: false });
  }

  clearAutoFilled = () => {
    this.setState({ isPasswordAutoFilled: false });
  }

  startLogging = () => {
    this.setState({ isLogging: true });
  }

  stopLogging = () => {
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

  loadCredentials = (username) => {
    return AsyncStorage.getItem(username);
  }

  saveCredentials = (username, password) => {
    return AsyncStorage.setItem(username, password);
  }

  onPressLogin = () => {
    const { inputUsername, inputPassword } = this.state;
    const areFieldsReady = inputUsername.length && inputPassword.length;
    // if triggered by onSubmitEditing
    if (!areFieldsReady) {
      return;
    }

    this.startLogging();
    DoLogin(inputUsername, inputPassword)
      .then(authenticated => {
        this.stopLogging();
        if (authenticated) {
          this.saveCredentials(inputUsername, inputPassword);
          this.props.navigation.navigate('AppStack');
        } else {
          this.markLoginError();
          Vibration.vibrate(1000)
          this.shake();
        }
      });
  };

  onUsernameChange = text => {
    this.setState({ inputUsername: text });
    this.clearLoginError();
    this.clearAutoFilled();
  };

  onPasswordChange = text => {
    this.setState({ inputPassword: text });
    this.clearLoginError();
    this.clearAutoFilled();
  };

  onUsernameBlur = () => {
    this.loadCredentials(this.state.inputUsername)
      .then(password => {
        if (password) {
          this.setState({
            inputPassword: password,
            isPasswordAutoFilled: true,
          });
        }
      });
  }

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
    let inputStyles = [styles.input];
    if (isLoginError) {
      inputStyles = [...inputStyles, styles.inputError];
    } else if (this.state.isPasswordAutoFilled) {
      inputStyles = [...inputStyles, styles.inputAutoFilled];
    }

    return (
      <View style={styles.mainContainer}>
        <View style={styles.iamgeContainer}>
          <Image source={require('../../assets/images/shopping-black-fr.png')} style={styles.iamge} />
        </View>
        <View style={styles.textContainer}>
          <Text style={[globalStyles.text, styles.textCaption]}>Friday's shop</Text>
          <Animated.View style={[styles.inputContainer, shakeAnimated]}>
            <TextInput
              value={inputUsername}
              placeholder='Your username'
              textContentType='username'
              style={inputStyles}
              onChangeText={this.onUsernameChange}
              autoComplete='username'
              autoCorrect={false}
              onBlur={this.onUsernameBlur}
            />
            <TextInput
              value={this.state.inputPassword}
              placeholder='Your password'
              textContentType='password'
              style={inputStyles}
              onChangeText={this.onPasswordChange}
              secureTextEntry
              autoComplete='off'
              autoCorrect={false}
              onSubmitEditing={this.onPressLogin}
              editable={!!inputUsername.length}
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