import * as React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Text, View, StyleSheet } from 'react-native';

// --- CORRECTED ICON IMPORTS ---
// Import each icon set with a unique alias
import IonIcons from 'react-native-vector-icons/Ionicons'; // Alias Ionicons as IonIcons
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'; // Correct import for MaterialCommunityIcons
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'; // Correct import for MaterialIcons


// Import your custom screen components
import Homescreen from '../screens/home/Homescreen';
import Cartscreen from '../screens/cart/Cartscreen';
import Categoryscreen from '../screens/category/Categoryscreen';
import Printscreen from '../screens/print/Printscreen';

const Tab = createBottomTabNavigator();

const Bottomtabnavigation = () => {

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconComponent;

          if (route.name === 'Home') {
            iconComponent = focused
              ? <IonIcons name="home" size={size} color={color} />
              : <IonIcons name="home-outline" size={size} color={color} />;
          } else if (route.name === 'Cart') {
            iconComponent = focused
              ? <IonIcons name="cart" size={size} color={color} />
              : <IonIcons name="cart-outline" size={size} color={color} />;
          } else if (route.name === 'Category') {
            iconComponent = focused
              ? <MaterialIcons name="category" size={size} color={color} />
              : <MaterialIcons name="category" size={size} color={color} />; // No outline version for MaterialIcons category
          } else if (route.name === 'Print') {
            iconComponent = focused
              ? <MaterialCommunityIcons name="printer" size={size} color={color} />
              : <MaterialCommunityIcons name="printer-outline" size={size} color={color} />;
          }

          // Ensure the icon component is returned
          return iconComponent;
        },
        tabBarActiveTintColor: '#F7CB45', // Color for the active tab's label/icon
        tabBarInactiveTintColor: 'black', // Color for inactive tabs' labels/icons
        headerShown: false, // Hide the default header for tab screens
        tabBarStyle: {
          height: 60, // Adjust tab bar height as needed
          paddingBottom: 5, // Add some padding at the bottom for better visual
          backgroundColor: '#FFFFFF', // White background for the tab bar
          borderTopWidth: 0, // Remove top border
          elevation: 10, // Android shadow
          // --- ADDED iOS SHADOW PROPERTIES ---
          shadowColor: '#000',
          shadowOffset: { width: 0, height: -2 }, // Shadow on top edge
          shadowOpacity: 0.1,
          shadowRadius: 5,
        },
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: '700',

        },
      })}
    >
      <Tab.Screen name="Home" component={Homescreen} />
      <Tab.Screen name="Cart" component={Cartscreen} />
      <Tab.Screen name="Category" component={Categoryscreen} />
      <Tab.Screen name="Print" component={Printscreen} />
    </Tab.Navigator>

  );
};

export default Bottomtabnavigation;

// Define styles for the navigator itself if needed, but typically screenOptions handles most of it.
const styles = StyleSheet.create({
  // No specific styles for Bottomtabnavigation container itself needed here,
  // as screenOptions handles tab bar styling.
});
