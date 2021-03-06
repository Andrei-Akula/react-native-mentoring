import React from 'react';
import { Text, FlatList, View, Alert, TouchableOpacity, Button } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { products } from '../../data/products';
import { globalStyles } from '../../styles';
import { styles } from './styles';

class ProductListItem extends React.PureComponent {
  onPress = () => {
    this.props.onPressItem(this.props.product);
  };

  render() {
    const { icon, name } = this.props.product;
    // const textColor = this.props.selected ? '#f00' : '#000';
    return (
      <TouchableOpacity onPress={this.onPress}>
        <View style={styles.listItem}>
          <Ionicons name={icon} size={32} />
          <Text style={[globalStyles.text, styles.textListItem]}>
            {name}
          </Text>
          <Ionicons name={'ios-arrow-forward'} size={24} />
        </View>
      </TouchableOpacity>
    );
  }
}

export default class ProductList extends React.Component {

  onPressItem = product => {
    // Alert.alert(`onPressItem ${product.id} ${product.name}`);
    this.props.onPressProduct(product);
  };

  keyExtractor = (item, index) => `${item.id}`;

  renderProduct = ({item}) => <ProductListItem product={item}
    onPressItem={this.onPressItem} />

  render() {
    return (
      <View style={styles.mainContainer}>
        <View style={styles.titleContainer}>
          <Text style={[globalStyles.text, styles.title]}>Product List</Text>
        </View>
        <View style={styles.listContainer}>
          <FlatList
            data={products}
            keyExtractor={this.keyExtractor}
            renderItem={this.renderProduct}
          />
        </View>
      </View>
    )
  }
};