import React from 'react';
import { Text, View, Image, Button } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { globalStyles } from '../../styles';
import { styles } from './styles';

export default class ProductDetails extends React.Component {

  onPressAllProducts = () => {
    this.props.onPressAllProducts();
  };

  render() {
    const { product } = this.props;
    return (
      <View style={styles.mainContainer}>
        <View style={styles.titleContainer}>
          <Text style={[globalStyles.text, styles.title]}>Product Details</Text>
        </View>
        <View style={styles.textContainer}>
          <View style={styles.nameContainer}>
            <Ionicons name={product.icon} size={32} />
            <Text style={[globalStyles.text, styles.name]}>{product.name}</Text>
          </View>
          <Text style={[globalStyles.text, styles.description]}>{product.description}</Text>
        </View>
        <Button title="All Products" onPress={this.onPressAllProducts} />
      </View>
    )
  }
};