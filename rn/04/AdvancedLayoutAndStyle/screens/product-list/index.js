import React from 'react';
import { Text, FlatList, View, ScrollView, TouchableOpacity, Button } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
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
    this.props.navigation.navigate('ProductDetails', { product });
  };

  keyExtractor = (item, index) => `${item.id}`;

  renderProduct = ({item}) => <ProductListItem product={item}
    onPressItem={this.onPressItem} />

  render() {
    return (
      <ScrollView>
        <View style={styles.mainContainer}>
          <View style={styles.titleContainer}>
            <Text style={[globalStyles.text, styles.title]}>Products</Text>
          </View>
          <View style={styles.listContainer}>
            <FlatList
              data={products}
              keyExtractor={this.keyExtractor}
              renderItem={this.renderProduct}
            />
          </View>
        </View>
      </ScrollView>
    )
  }
};