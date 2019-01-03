import React from 'react';
import { Text, View, Alert } from 'react-native';
import { AppLoading, Asset, Font } from 'expo';
import LoginScreen from './screens/login';
import ProductList from './screens/product-list';
import ProductDetails from './screens/product-details';
import { globalStyles } from './styles';


function cacheImages(images) {
  return images.map(image => Asset.fromModule(image).downloadAsync());
}

function cacheFonts(fonts) {
  return fonts.map(font => Font.loadAsync(font));
}

export default class App extends React.Component {
  state = {
    areResourcesLoaded: false,
    screen: 'LoginScreen',
  };

  async loadResources() {
    const images = cacheImages([require('./assets/images/shopping-black-fr.png')]);
    const fonts = cacheFonts([
      { 'vinchand': require('./assets/fonts/VINCHAND.ttf') }
    ]);

    await Promise.all([...images, ...fonts]);
  }

  onShowAllProducts = () => {
    // Alert.alert('onLoginSuccess');
    this.setState({ screen: 'ProductList' })
  };

  onShowProduct = product => {
    // Alert.alert('onShowProduct');
    this.setState({
      screen: 'ProductDetails',
      product: product,
    });
  };

  render() {
    if (!this.state.areResourcesLoaded) {
      return (
        <AppLoading
          startAsync={ this.loadResources }
          onFinish={ () => this.setState({ areResourcesLoaded: true }) }
          onError={ console.warn }
        />
      );
    }
    
    let theScreen = null;

    if (this.state.screen === 'ProductList') {
      theScreen = <ProductList onPressProduct={this.onShowProduct}  />;
    } else if (this.state.screen === 'ProductDetails' && this.state.product) {
      theScreen = <ProductDetails onPressAllProducts={this.onShowAllProducts} product={this.state.product} />;
    } else {
      theScreen = <LoginScreen onLoginSuccess={this.onShowAllProducts} />;
    }

    return (
      <View style={globalStyles.container}>
        {theScreen}
      </View>
    );
  }
}


