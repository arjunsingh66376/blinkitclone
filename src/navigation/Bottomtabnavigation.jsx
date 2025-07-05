import * as React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Text, View, StyleSheet } from 'react-native';
// Removed SafeAreaView import from here, as it's used inside screens now.
// Removed useSafeAreaInsets import from here, as it's used inside screens now.

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
    // --- REMOVED SafeAreaView WRAPPING THE ENTIRE NAVIGATOR ---
    // The NavigationContainer (and thus the Tab.Navigator) should fill the screen.
    // Safe area padding should be applied inside each individual screen component.
    
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconComponent; // This will hold the specific icon component (e.g., <IonIcons /> or <MaterialCommunityIcons />)
          let iconName;      // This will hold the string name of the icon

          // Determine which icon set and icon name to use based on the route name
          if (route.name === 'Home') {
            iconName = focused ? 'home' : 'home-outline';
            iconComponent = <IonIcons name={iconName} size={size} color={color} />;
          } else if (route.name === 'Cart') {
            // 'cart' and 'cart-outline' are common in MaterialCommunityIcons
            iconName = focused ? 'cart' : 'cart-outline';
            iconComponent = <MaterialCommunityIcons name={iconName} size={size} color={color} />;
          } else if (route.name === 'Category') {
            // 'shape' or 'shape-outline' are good for category in MaterialCommunityIcons
            // 'category' is a common icon name in MaterialIcons
          
            iconName = 'category'  // Using 'category' from MaterialIcons
            iconComponent = <MaterialIcons name={iconName} size={size} color={color} />;
          } else if (route.name === 'Print') {
            iconName = focused ? 'print' : 'print-outline';
            iconComponent = <IonIcons name={iconName} size={size} color={color} />;
          }

          // Render the determined icon component
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

// Define styles for the navigator itself if needed, or remove if only tabBarStyle is used.
const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        
      },
});