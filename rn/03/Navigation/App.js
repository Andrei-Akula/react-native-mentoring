import React from 'react';
import { createSwitchNavigator, createStackNavigator, createAppContainer } from "react-navigation";
import LoginScreen from './screens/login';
import ProductList from './screens/product-list';
import ProductDetails from './screens/product-details';

const AppStack = createStackNavigator({
  ProductList: {
    screen: ProductList,
    navigationOptions: {
      title: 'All Products'
    }
  },
  ProductDetails: {
    screen: ProductDetails,
    navigationOptions: ({ navigation }) => ({
      title: navigation.getParam('product', { name: 'Details' }).name
    })
  }
});
const AuthStack = createStackNavigator({
  Login: {
    screen: LoginScreen,
    navigationOptions: {
      title: 'Welcome'
    }
  }
});

export default createAppContainer(createSwitchNavigator({ AuthStack, AppStack }));