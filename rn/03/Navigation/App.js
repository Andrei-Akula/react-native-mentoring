import React from 'react';
import { createSwitchNavigator, createStackNavigator, createAppContainer } from "react-navigation";
import LoginScreen from './screens/login';
import ProductList from './screens/product-list';
import ProductDetails from './screens/product-details';

// const AppNavigator = createStackNavigator({
//   Login: {
//     screen: LoginScreen
//   },
//   ProductList: {
//     screen: ProductList
//   },
//   ProductDetails: {
//     screen: ProductDetails
//   }
// });

// export default createAppContainer(AppNavigator);

const AppStack = createStackNavigator({
  ProductList: {
    screen: ProductList
  },
  ProductDetails: {
    screen: ProductDetails
  }
});
const AuthStack = createStackNavigator({
  Login: {
    screen: LoginScreen
  }
});

export default createAppContainer(createSwitchNavigator({ AuthStack, AppStack }));