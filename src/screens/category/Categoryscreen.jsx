// src/screens/Categoryscreen.js
import { SafeAreaView, StyleSheet, Text, View,TouchableOpacity } from 'react-native';
import React from 'react';
import Appbar from '../../component/Appbar'; // Import Appbar
import { GroceryCard } from '../../component/Cards';
import { ScrollView } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native'; // <--- NEW: Import useNavigation
import { ALL_PRODUCTS } from '../../data/Product'; // <--- NEW: Import ALL_PRODUCTS for potential future use

// other imports (images are now handled by ALL_PRODUCTS, but keep if still used directly)
import img200 from '../../../assets/images/img200.png';
import img210 from '../../../assets/images/img210.png';
import img220 from '../../../assets/images/img220.png';
import img230 from '../../../assets/images/img230.png';
import img240 from '../../../assets/images/img240.png';
import img250 from '../../../assets/images/img250.png';
import img260 from '../../../assets/images/img260.png';
import img270 from '../../../assets/images/img270.png';
import img300 from '../../../assets/images/img300.png';
import img310 from '../../../assets/images/img310.png';
import img320 from '../../../assets/images/img320.png';
import img330 from '../../../assets/images/img330.png';
import img340 from '../../../assets/images/img340.png';
import img350 from '../../../assets/images/img350.png';
import img360 from '../../../assets/images/img360.png';
import img400 from '../../../assets/images/img400.png';
import img410 from '../../../assets/images/img410.png';
import img420 from '../../../assets/images/img420.png';
import img430 from '../../../assets/images/img430.png';
import img440 from '../../../assets/images/img440.png';
import img450 from '../../../assets/images/img450.png';
import img460 from '../../../assets/images/img460.png';
import img500 from '../../../assets/images/img500.png';
import img510 from '../../../assets/images/img510.png';
import img520 from '../../../assets/images/img520.png';
import img530 from '../../../assets/images/img530.png';
import img540 from '../../../assets/images/img540.png';
import img550 from '../../../assets/images/img550.png';
import img560 from '../../../assets/images/img560.png';


const Categoryscreen = () => {
  const navigation = useNavigation(); // <--- NEW: Get navigation object

  // <--- NEW: Function to handle search submission from Appbar
  const handleSearchSubmit = (query) => {
    navigation.navigate('Search', { searchQuery: query });
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      {/* <--- Pass the new onSearchSubmit prop to Appbar */}
      <Appbar bgcolor={"#F7CB45"} color={"black"} circlebgcolor={"white"} onSearchSubmit={handleSearchSubmit} />
      <View style={styles.bgcover}>
        <ScrollView showsVerticalScrollIndicator={false}>
          {/* grocery heading */}
          <Text style={styles.grocerytext}>Grocery & Kitchen</Text>

          {/* grocery first row */}
          <View style={styles.groceryfirstrow}>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              {/* You might want to map from ALL_PRODUCTS here for consistency */}
              <GroceryCard imageSource={img200} title='Vegetables & Fruits' />
              <GroceryCard imageSource={img210} title='Atta, Dal & Rice' />
              <GroceryCard imageSource={img220} title='Oil, Ghee & Masala ' />
              <GroceryCard imageSource={img230} title='Dairy, Bread & Milk ' />
              <GroceryCard imageSource={img240} title='Cucumbers ' />
              <GroceryCard imageSource={img250} title=' Apples' />
              <GroceryCard imageSource={img260} title='Chocolates ' />
              <GroceryCard imageSource={img270} title=' Kurkure' />
            </ScrollView>
          </View>

          {/* grocery second row */}
          <View style={styles.grocerysecondrow}>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              <GroceryCard imageSource={img300} title='Dry Fruits & Cereals' />
              <GroceryCard imageSource={img310} title='Kitchen & Appliances' />
              <GroceryCard imageSource={img320} title='Tea & Coffees ' />
              <GroceryCard imageSource={img330} title='Ice Creams & much more ' />
              <GroceryCard imageSource={img340} title='Noodles & Packet Food ' />
              <GroceryCard imageSource={img350} title=' Apples' />
              <GroceryCard imageSource={img360} title='Chocolates ' />
            </ScrollView>

          </View>

          {/* next category */}
          <Text style={styles.snacks}>Snacks & Drinks</Text>
          {/* snacks  first row  */}
          <View style={styles.snackfirstrow}>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              <GroceryCard imageSource={img400} title='Kitchen & Appliances' />
              <GroceryCard imageSource={img410} title='Tea & Coffees ' />
              <GroceryCard imageSource={img420} title='Ice Creams & much more ' />
              <GroceryCard imageSource={img430} title='Noodles & Packet Food ' />
              <GroceryCard imageSource={img440} title=' Apples' />
              <GroceryCard imageSource={img450} title='Chocolates ' />
              <GroceryCard imageSource={img460} title=' Kurkure' />
            </ScrollView>
          </View>

          {/* another  category */}
          <Text style={styles.household}>Household Essentials</Text>
          <View style={styles.householdfirstrow}>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              <GroceryCard imageSource={img500} title='Dry Fruits & Cereals' />
              <GroceryCard imageSource={img510} title='Kitchen & Appliances' />
              <GroceryCard imageSource={img520} title='Tea & Coffees ' />
              <GroceryCard imageSource={img530} title='Ice Creams & much more ' />
              <GroceryCard imageSource={img540} title='Noodles & Packet Food ' />
              <GroceryCard imageSource={img550} title=' Apples' />
              <GroceryCard imageSource={img560} title='Chocolates ' />
            </ScrollView>
          </View>

        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default Categoryscreen;

const styles = StyleSheet.create({
  bgcover: {
    flex: 1,
    backgroundColor: "white",
    paddingVertical: 20,
    paddingHorizontal: 20
  },
  grocerytext: {
    fontSize: 15,
    fontWeight: "bold",
    marginBottom: 15
  },
  groceryfirstrow: {
    height: "auto",
    width: "100%",
    marginBottom: 10,
    display: 'flex',
    flexDirection: 'row'
  },
  grocerysecondrow: {
    height: "auto",
    width: "100%",
    marginBottom: 15
  },
  snacks: {
    fontSize: 14,
    fontWeight: "bold",
    marginBottom: 15
  },
  snackfirstrow: {
    height: "auto",
    width: "100%",
    marginBottom: 15
  },
  household: {
    fontSize: 14,
    fontWeight: "bold",
    marginBottom: 15
  },
});