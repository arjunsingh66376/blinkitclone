// src/component/Orderbutton.js
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React from 'react';
import LinearGradient from 'react-native-linear-gradient';

// Accept totalPrice, isCartEmpty, and the new 'onPress' prop
const Orderbutton = ({ totalPrice, isCartEmpty, onPress }) => { // <--- NEW: Add onPress to props
  return (
    // Use the 'onPress' prop passed from the parent component
    <TouchableOpacity onPress={onPress} activeOpacity={0.9} disabled={isCartEmpty}> {/* <--- NEW: Use onPress prop, add disabled */}
      <LinearGradient
        colors={['#1FAA59', '#38B000']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        style={[styles.buttonContainer, isCartEmpty && styles.disabledButton]} // Apply disabled style
      >
        {/* Conditionally display the text based on isCartEmpty */}
        <Text style={styles.buttonText}>
          {isCartEmpty ? "Add items to cart" : `Total ₹${totalPrice} | Place Order`} {/* <--- NEW: Change text for empty cart */}
        </Text>
      </LinearGradient>
    </TouchableOpacity>
  );
};

export default Orderbutton;

const styles = StyleSheet.create({
  buttonContainer: {
    width: '100%',
    paddingVertical: 14,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 10,
    shadowColor: '#1FAA59',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 5,
  },
  disabledButton: {
    backgroundColor: '#cccccc', // Grey out button when disabled
    shadowColor: '#999999',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
