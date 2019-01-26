import React from 'react';
import { Text, FlatList, View, ScrollView, TouchableOpacity, Button } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import ModalMessage from '../../components/modal-message';
import { globalStyles } from '../../styles';
import { styles } from './styles';

const productsUrl = 'http://ecsc00a02fb3.epam.com/rest/V1/products';
const pageSize = 20;

function fetchData({ page }) {
  const url = `${productsUrl}?searchCriteria[pageSize]=${pageSize}&searchCriteria[currentPage]=${page}`;
  return fetch(url).then(response => response.json());
}

class ProductListItem extends React.PureComponent {
  onPress = () => {
    this.props.onPressItem(this.props.product);
  };

  render() {
    const { name } = this.props.product;
    return (
      <TouchableOpacity onPress={this.onPress}>
        <View style={styles.listItem}>
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
  state = {
    products: [],
    currentPage: 1,
    totalCount: 0,
    refreshing: true,
    isModalVisible: false,
  };

  pageTryingToFetch = 1;

  fetchProducts = (page) => {
    pageTryingToFetch = page;

    fetchData({ page })
      .then(data => {
        const products = page > 1 ? [...this.state.products, ...data.items] : data.items;

        this.setState({
          products,
          currentPage: page,
          totalCount: data.total_count,
          refreshing: false,
        });
      })
      .catch(() => {
        this.showModal();
      });
  }

  fetchMoreProducts = () => {
    const maxPage = Math.ceil(this.state.totalCount / pageSize);
    if (this.state.currentPage < maxPage) {
      this.fetchProducts(this.state.currentPage + 1);
    }
  }

  componentDidMount() {
    this.fetchProducts(1);
  }

  showModal = () => {
    this.setState({ isModalVisible: true });
  }

  closeModal = (result) => {
    this.setState({ isModalVisible: false });
    if (result === 'again') {
      this.fetchProducts(this.pageTryingToFetch);
    }
  }

  onPressItem = product => {
    this.props.navigation.navigate('ProductDetails', { product });
  };

  keyExtractor = item => `${item.id}`;

  renderProduct = ({item}) => <ProductListItem product={item} onPressItem={this.onPressItem} />;

  refresh = () => {
    this.setState({ refreshing: true });
    this.fetchProducts(1);
  };

  renderSeparator = () => <View style={styles.listItemSeparator} />;

  render() {
    return (
      <View style={styles.mainContainer}>
        <View style={styles.listContainer}>
          <FlatList
            data={this.state.products}
            keyExtractor={this.keyExtractor}
            renderItem={this.renderProduct}
            ItemSeparatorComponent={this.renderSeparator}
            onRefresh={this.refresh}
            refreshing={this.state.refreshing}
            onEndReached={this.fetchMoreProducts}
            onEndReachedThreshold={0}
          />
        </View>
        <ModalMessage
          visible={this.state.isModalVisible}
          onClose={this.closeModal}
          title='Network error'
          type='error-and-try'
        >
          Error ocurred while fetching data
        </ModalMessage>
      </View>
    )
  }
};