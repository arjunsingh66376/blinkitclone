import React, { useEffect, useState } from 'react';
import { View, Text, ActivityIndicator, StyleSheet } from 'react-native'; // Added ActivityIndicator and StyleSheet
import RNBootSplash from 'react-native-bootsplash';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import auth from '@react-native-firebase/auth'; // Import Firebase auth

// Your screen imports
import Bottomtabnavigation from './src/navigation/Bottomtabnavigation';
import Loginscreen from './src/screens/login/Loginscreen'; // Import your LoginScreen

const Stack = createNativeStackNavigator();

const App = () => {
  const [initializing, setInitializing] = useState(true); // Tracks Firebase initialization
  const [user, setUser] = useState(null); // Stores the authenticated user object (Firebase's state)
  const [loggedInLocally, setLoggedInLocally] = useState(false); // NEW: Local state for direct navigation

  // Handle Firebase user state changes (still useful for general Firebase auth monitoring)
  function onAuthStateChanged(user) {
    setUser(user);
    if (initializing) {
      setInitializing(false);
    }
    // If Firebase reports a user, also set our local state to true
    if (user && !loggedInLocally) {
      setLoggedInLocally(true);
    }
  }

  useEffect(() => {
    // Subscribe to Firebase auth state changes
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);

    // Hide splash screen after initialization (Firebase or any other async task)
    const hideSplash = async () => {
      // You can add other async tasks here that need to complete before hiding splash
      await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate a delay if needed
      RNBootSplash.hide({ fade: true });
    };

    hideSplash();

    // Unsubscribe from listener when component unmounts
    return subscriber;
  }, []);

  if (initializing) {
    // While Firebase is initializing, show a loading screen or your splash screen
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
        <NavigationContainer>
          <Stack.Navigator screenOptions={{ headerShown: false }}>
            {/* Conditional rendering based on local state, which Loginscreen will update */}
            {loggedInLocally ? (
              // User is "logged in" locally, show the main app with bottom tabs
              // Corrected screen name to 'Bottomtabnavigation' (singular)
              <Stack.Screen name="Bottomtabnavigation" component={Bottomtabnavigation} />
            ) : (
              // No user is "logged in" locally, show the login screen
              // Pass the setter function to Loginscreen
              <Stack.Screen name="Login">
                {props => <Loginscreen {...props} onDirectLoginSuccess={() => setLoggedInLocally(true)} />}
              </Stack.Screen>
            )}
          </Stack.Navigator>
        </NavigationContainer>
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
