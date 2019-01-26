import React from 'react';
import { Text, View, ScrollView, Button, Platform, TouchableOpacity, Linking } from 'react-native';
// import Ionicons from 'react-native-vector-icons/Ionicons';
import Foundation from 'react-native-vector-icons/Foundation';
import { globalStyles } from '../../styles';
import { styles } from './styles';

function getDescription(product) {
  const attributes = product.custom_attributes || [];
  const descriptionAttr = attributes.find(attr => attr.attribute_code === 'description');
  return descriptionAttr ? descriptionAttr.value : '';
}

function getPhoneNumber(product) {
  return '6505434800';
}

function getLocationUrl(product) {
  const prefix = Platform.OS === 'ios' ? 'http://maps.apple.com/?ll=' : 'geo:';
  const location = '37.484847,-122.148386';
  return `${prefix}${location}`;
}

export default class ProductDetails extends React.Component {
  state = {
    canOpenMap: false,
    canCall: false,
  }

  componentDidMount() {
    Linking.canOpenURL(getLocationUrl(this.props.product))
      .then(supported => {
        if (supported) {
          this.setState({ canOpenMap: true })
        }
      });

    Linking.canOpenURL(`tel:${getPhoneNumber(this.props.product)}`)
      .then(supported => {
        if (supported) {
          this.setState({ canCall: true })
        }
      });
  }

  onPressAllProducts = () => {
    this.props.navigation.goBack();
  };

  onMapPress = () => {
    const url = getLocationUrl(this.props.product);
    Linking.openURL(url);
  }

  onPhonePress = () => {
    const phoneNumber = getPhoneNumber(this.props.product);
    Linking.openURL(`tel:${phoneNumber}`);
  }

  renerDeepLinks = () => {
    return (
      <View style={styles.iconLinksContainer}>
        {this.state.canOpenMap && 
          <TouchableOpacity style={styles.iconLink} onPress={this.onMapPress}>
            <Foundation name={'map'} size={32} />
          </TouchableOpacity>
        }
        {this.state.canCall &&
          <TouchableOpacity style={styles.iconLink} onPress={this.onPhonePress}>
            <Foundation name={'telephone'} size={32} />
          </TouchableOpacity>
        }
      </View>
    );
  }

  render() {
    const { navigation } = this.props;
    const product = navigation.getParam('product', null);
    const description = getDescription(product);
    const phoneNumber = getPhoneNumber(this.props.product);
    
    if (!product) {
      return (
        <View style={styles.mainContainer}>
          <View style={styles.titleContainer}>
            <Text style={[globalStyles.text, styles.title]}>Product Details</Text>
          </View>
          <View style={styles.textContainer}>
            <Text style={[globalStyles.text, styles.description]}>No data available</Text>
          </View>
          <Button title="All Products" onPress={this.onPressAllProducts} />
        </View>
      );
    }

    return (
      <ScrollView>
        <View style={styles.mainContainer}>
          <View style={styles.textContainer}>
            <View style={styles.nameContainer}>
              <Text style={[globalStyles.text, styles.name]}>{product.name}</Text>
            </View>
            {this.renerDeepLinks()}
            <Text style={[globalStyles.text, styles.description]}>{description}</Text>
            { !this.state.canCall &&
              <Text style={[globalStyles.text, styles.description]}>Phone number: {phoneNumber}</Text>
            }
          </View>
          <Button title="All Products" onPress={this.onPressAllProducts} />
        </View>
      </ScrollView>
    );
  }
};