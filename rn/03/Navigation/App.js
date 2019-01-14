import React from 'react';
import { Text, View, Alert } from 'react-native';
import LoginScreen from './screens/login';
import ProductList from './screens/product-list';
import ProductDetails from './screens/product-details';
import { globalStyles } from './styles';


export default class App extends React.Component {
  state = {
    areResourcesLoaded: false,
    screen: 'LoginScreen',
  };

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
    let theScreen = null;

    if (this.state.screen === 'ProductList') {
      theScreen = <ProductList onPressProduct={this.onShowProduct} />;
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


