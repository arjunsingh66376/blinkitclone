// App.jsx (MODIFIED)

import React, { useEffect, useState } from 'react';
import { View, Text, ActivityIndicator, StyleSheet } from 'react-native';
import RNBootSplash from 'react-native-bootsplash';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import auth from '@react-native-firebase/auth';
import Toast from 'react-native-toast-message';

// Your screen imports
import Bottomtabnavigation from './src/navigation/Bottomtabnavigation';
import Loginscreen from './src/screens/login/Loginscreen';
import { CartProvider } from './src/context/Cartcontext';
import SearchScreen from './src/screens/searchscreen/SearchScreen'; // Ensure this path is correct

const Stack = createNativeStackNavigator();

const App = () => {
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState(null);
  const [loggedInLocally, setLoggedInLocally] = useState(false);

  function onAuthStateChanged(user) {
    setUser(user);
    if (initializing) {
      setInitializing(false);
    }
    if (user && !loggedInLocally) {
      setLoggedInLocally(true);
    }
  }

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);

    const hideSplash = async () => {
      await new Promise(resolve => setTimeout(resolve, 1000));
      RNBootSplash.hide({ fade: true });
    };

    hideSplash();

    return subscriber;
  }, []);

  if (initializing) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#E23744" />
        <Text style={styles.loadingText}>Loading App...</Text>
      </View>
    );
  }

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaProvider>
        <CartProvider>
          <NavigationContainer>
            <Stack.Navigator screenOptions={{ headerShown: false }}>
              {loggedInLocally ? (
                // User is "logged in" locally, show the main app with bottom tabs
                // AND other screens accessible from within the main app flow
                <>
                  <Stack.Screen name="Bottomtabnavigation" component={Bottomtabnavigation} />
                  {/* <--- NEW: Place SearchScreen here, accessible from anywhere within Bottomtabnavigation's children */}
                  <Stack.Screen name="Search" component={SearchScreen} />
                  {/* You might also add other full-screen modals or flows here */}
                </>
              ) : (
                // No user is "logged in" locally, show the login screen
                <Stack.Screen name="Login">
                  {props => <Loginscreen {...props} onDirectLoginSuccess={() => setLoggedInLocally(true)} />}
                </Stack.Screen>
              )}
            </Stack.Navigator>
          </NavigationContainer>
          <Toast />
        </CartProvider>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: '#333',
  },
});

export default App;