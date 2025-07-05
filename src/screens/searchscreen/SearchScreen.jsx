// src/screens/SearchScreen.js
import React from 'react';
import { SafeAreaView, StyleSheet, Text, View, ScrollView, FlatList,TouchableOpacity } from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import { ItemCard, GroceryCard } from '../../component/Cards'; // Assuming ItemCard and GroceryCard are suitable for display
import { CheckoutAppbar } from '../../component/Appbar'; // Reusing CheckoutAppbar for back button
import { ALL_PRODUCTS } from '../../data/Product'; // Import your centralized product data
import { useCart } from '../../context/Cartcontext';
import Toast from 'react-native-toast-message';


const SearchScreen = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const { addToCart } = useCart();

  // Get the search query from navigation parameters
  const { searchQuery } = route.params || {};

  // Filter products based on the search query
  const filteredProducts = ALL_PRODUCTS.filter(product =>
    product.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleAddItem = (item) => {
    addToCart(item);
    Toast.show({
      type: 'success',
      text1: 'Item Added to Cart!',
      text2: `${item.title} has been added.`,
      visibilityTime: 2000,
      autoHide: true,
      topOffset: 30,
    });
  };

  const handleBackPress = () => {
    navigation.goBack();
  };

  const renderProductItem = ({ item }) => {
    // Decide which card component to use based on item properties
    // You might need to refine this logic based on your exact product types
    if (item.productImage && item.deliveryTime) {
      return (
        <ItemCard
          title={item.title}
          deliveryTime={item.deliveryTime}
          price={`₹ ${item.price}`}
          productImage={item.productImage}
          onAddPress={() => handleAddItem(item)}
        />
      );
    } else if (item.imageSource) {
      // For grocery items or category-like items that were added to ALL_PRODUCTS
      return (
        <TouchableOpacity onPress={() => handleAddItem(item)} style={styles.groceryCardWrapper}>
          <GroceryCard imageSource={item.imageSource} title={item.title} />
        </TouchableOpacity>
      );
    }
    return null; // Don't render if it doesn't fit a known card type
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
      <CheckoutAppbar onBackPress={handleBackPress} />

      <View style={styles.container}>
        <Text style={styles.resultsText}>
          Search Results for "{searchQuery}"
        </Text>

        {filteredProducts.length > 0 ? (
          <FlatList
            data={filteredProducts}
            keyExtractor={(item) => item.id}
            renderItem={renderProductItem}
            contentContainerStyle={styles.productList}
            numColumns={2} // Display items in two columns
          />
        ) : (
          <Text style={styles.noResultsText}>No items found for "{searchQuery}".</Text>
        )}
      </View>
    </SafeAreaView>
  );
};

export default SearchScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  resultsText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
    textAlign: 'center',
  },
  productList: {
    paddingBottom: 20, // Add some padding at the bottom
    justifyContent: 'space-around', // Distribute items evenly
  },
  noResultsText: {
    textAlign: 'center',
    marginTop: 50,
    fontSize: 16,
    color: '#888',
  },
  groceryCardWrapper: {
    margin: 5, // Add margin around grocery cards for spacing in FlatList
  },
});