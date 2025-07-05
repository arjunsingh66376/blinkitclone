import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import LinearGradient from 'react-native-linear-gradient';
const Orderbutton = () => {
  return (
    <TouchableOpacity onPress={console.log(' ordr placed')} activeOpacity={0.9}>
      <LinearGradient
        colors={['#1FAA59', '#38B000']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        style={styles.buttonContainer}
      >
        <Text style={styles.buttonText}>Total ₹300 | Place Order</Text>
      </LinearGradient>
    </TouchableOpacity>

  );
};

export default Orderbutton

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
      buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
      },
})