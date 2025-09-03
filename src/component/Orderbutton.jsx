import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import React from 'react';
import LinearGradient from 'react-native-linear-gradient';

const Orderbutton = ({ totalPrice, isCartEmpty, onPress }) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.9}
      disabled={isCartEmpty}
    >
      <LinearGradient
        colors={['#1FAA59', '#38B000']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        style={[styles.buttonContainer, isCartEmpty && styles.disabledButton]}
      >
        <Text style={styles.buttonText}>
          {isCartEmpty
            ? "Add items to cart"
            : `Total ₹${String(totalPrice)} | Place Order`} 
            {/* Explicitly convert to string */}
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
    backgroundColor: '#cccccc',
    shadowColor: '#999999',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
