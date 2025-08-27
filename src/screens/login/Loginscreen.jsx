import { View, Text, StyleSheet, Image, TouchableOpacity, Modal, TextInput, ActivityIndicator, Alert } from 'react-native';
import React, { useState, useEffect } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';

// Firebase Imports - Using modular SDK
import { getAuth, onAuthStateChanged, signInWithPhoneNumber } from '@react-native-firebase/auth';
import { initializeApp } from '@react-native-firebase/app'; // Import initializeApp if you initialize Firebase here

// Assuming you have a Firebase config somewhere, e.g., in a separate file or passed as props
// For demonstration, let's assume a dummy config if not already initialized globally.
// In a real app, Firebase should be initialized once, likely in App.js or similar.
// const firebaseConfig = {
//   apiKey: "YOUR_API_KEY",
//   authDomain: "YOUR_AUTH_DOMAIN",
//   projectId: "YOUR_PROJECT_ID",
//   storageBucket: "YOUR_STORAGE_BUCKET",
//   messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
//   appId: "YOUR_APP_ID"
// };

// Initialize Firebase app if not already initialized globally (e.g., in App.js)
// This part might be redundant if your main App.js already does this.
// try {
//   initializeApp(firebaseConfig);
// } catch (e) {
//   console.log("Firebase already initialized or config missing:", e);
// }

const Loginscreen = ({ navigation, onDirectLoginSuccess }) => {
  // Get the auth instance
  const auth = getAuth(); // Use getAuth() from modular SDK

  // State for modal visibility and input fields
  const [modalVisible, setModalVisible] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState('');
  const [otp, setOtp] = useState('');
  const [confirmResult, setConfirmResult] = useState(null); // To store the confirmation result for OTP verification
  const [loading, setLoading] = useState(false);
  const [isOtpSent, setIsOtpSent] = useState(false); // To toggle between phone input and OTP input

  // Effect to check authentication status on component mount
  useEffect(() => {
    // Use onAuthStateChanged from modular SDK
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        console.log('User already logged in:', user.uid);
        onDirectLoginSuccess(); // ✅ Update local state, App will show Bottomtabnavigation
      }
    });
    return unsubscribe;
  }, []);


  // Function to handle sending OTP
  const handleSendOtp = async () => {
    if (!phoneNumber || phoneNumber.length !== 10) {
      Alert.alert('Invalid Phone Number', 'Please enter a valid 10-digit Indian phone number.');
      return;
    }

    setLoading(true);
    const fullPhoneNumber = `+91${phoneNumber}`; // Prepend Indian country code

    try {
      // Use signInWithPhoneNumber from modular SDK
      const confirmation = await signInWithPhoneNumber(auth, fullPhoneNumber);
      setConfirmResult(confirmation); // Store the confirmation object
      setIsOtpSent(true); // Show OTP input field
      Alert.alert('OTP Sent', `OTP has been sent to ${fullPhoneNumber}`);
    } catch (error) {
      console.error('Error sending OTP:', error);
      Alert.alert('OTP Send Error', error.message);
    } finally {
      setLoading(false);
    }
  };

  // Function to handle OTP verification
  const handleVerifyOtp = async () => {
    if (!otp || otp.length !== 6) {
      Alert.alert('Invalid OTP', 'Please enter a 6-digit OTP.');
      return;
    }
    if (!confirmResult) {
      Alert.alert('Error', 'OTP not sent or confirmation object missing.');
      return;
    }

    setLoading(true);
    try {
      // Confirm the code
      await confirmResult.confirm(otp);
      // User is now signed in. The onAuthStateChanged listener in useEffect will handle navigation.
      setModalVisible(false); // Close the modal
      Alert.alert('Success', 'Logged in successfully!');
    } catch (error) {
      console.error('Error verifying OTP:', error);
      Alert.alert('OTP Verification Error', error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.bgimgcont}>
        <Image
          source={require('../../../assets/images/bgimg.png')}
          style={styles.bgimg}
        />

        <View style={styles.smalllogocont}>
          <Image
            source={require('../../../assets/images/image10.png')}
            style={styles.smalllogoimg}
          />
        </View>
        <Text style={styles.textheading}> India’s last minute app</Text>
        {/* card */}
        <View style={styles.card}>
          <Text style={styles.text1}>Username</Text>
          <Text style={styles.phonenumber}>XX-XXX-XXXX</Text>
          <TouchableOpacity style={styles.button} onPress={() => setModalVisible(true)}>
            <Text style={styles.buttontext}>Login With OTP </Text>
          </TouchableOpacity>
          <Text style={styles.address}>
            Access your saved addresses from Zomato automatically!
          </Text>
          {/* NEW: Skip Login Button */}
          <TouchableOpacity
            style={styles.buttonSkipLogin}
            onPress={() => { onDirectLoginSuccess(); }} // Corrected to Bottomtabnavigation (singular)
          >
            <Text style={styles.buttonSkipLoginText}>Skip Login</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* OTP Login Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
          setIsOtpSent(false); // Reset OTP state when modal closes
          setPhoneNumber('');
          setOtp('');
          setConfirmResult(null);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalTitle}>{isOtpSent ? 'Enter OTP' : 'Enter Phone Number'}</Text>

            {!isOtpSent ? (
              <View style={styles.inputContainer}>
                <Text style={styles.countryCode}>+91</Text>
                <TextInput
                  style={styles.textInput}
                  placeholder="Your 10-digit phone number"
                  keyboardType="phone-pad"
                  value={phoneNumber}
                  onChangeText={setPhoneNumber}
                  maxLength={10}
                />
              </View>
            ) : (
              <TextInput
                style={styles.textInput}
                placeholder="Enter 6-digit OTP"
                keyboardType="number-pad"
                value={otp}
                onChangeText={setOtp}
                maxLength={6}
              />
            )}

            <TouchableOpacity
              style={[styles.modalButton, loading && { opacity: 0.7 }]}
              onPress={isOtpSent ? handleVerifyOtp : handleSendOtp}
              disabled={loading}
            >
              {loading ? (
                <ActivityIndicator color="#fff" />
              ) : (
                <Text style={styles.modalButtonText}>
                  {isOtpSent ? 'Verify OTP' : 'Get OTP'}
                </Text>
              )}
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.modalCloseButton}
              onPress={() => {
                setModalVisible(!modalVisible);
                setIsOtpSent(false); // Reset OTP state when modal closes
                setPhoneNumber('');
                setOtp('');
                setConfirmResult(null);
              }}
            >
              <Text style={styles.modalCloseButtonText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

export default Loginscreen;

const styles = StyleSheet.create({
  bgimgcont: {
    width: '100%',
    height: '100%',
    backgroundColor: '#FFFFFF',
    padding: 25,
  },
  bgimg: { width: '100%', height: 412, backgroundColor: '#FFFFFF' },
  smalllogocont: {
    width: 200,
    height: 112,
    marginTop: 20,
    alignSelf: 'center',
  },
  smalllogoimg: { width: 200, height: 112 },
  textheading: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#000000',
    textAlign: 'center',
    marginTop: 20,
    marginBottom: 20,
  },
  // card
  card: {
    width: '100%',
    height: 230,
    backgroundColor: 'white',
    borderRadius: 10,
    marginTop: 10,
    elevation: 3,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    // Removed lineHeight as it's not a valid style for a View component
  },
  text1: {
    fontSize: 15,
    marginTop: 4,
  },
  phonenumber: {
    fontSize: 14,
    color: '#9C9C9C',
    marginTop: 4,
  },
  button: {
    width: 295,
    height: 48,
    borderRadius: 10,
    backgroundColor: '#E23744',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 5,
  },
  buttontext: {
    fontSize: 14,
    color: 'white',
    fontWeight: '700',
    marginTop: 4,
    marginRight: 5,
  },
  address: {
    fontSize: 10,
    fontWeight: '400',
    color: '#9C9C9C',
    paddingTop: 6,
  },

  // Modal Styles
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)', // Dim background
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    width: '80%',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 10,
    marginBottom: 15,
    paddingHorizontal: 10,
  },
  countryCode: {
    fontSize: 16,
    marginRight: 5,
    fontWeight: 'bold',
  },
  textInput: {
    flex: 1,
    height: 50,
    fontSize: 16,
  },
  modalButton: {
    backgroundColor: '#E23744',
    borderRadius: 10,
    padding: 15,
    elevation: 2,
    width: '100%',
    alignItems: 'center',
    marginTop: 10,
  },
  modalButtonText: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 16,
  },
  modalCloseButton: {
    marginTop: 15,
    padding: 10,
  },
  modalCloseButtonText: {
    color: '#E23744',
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 16,
  },
  // NEW: Styles for Skip Login button
  buttonSkipLogin: {
    marginTop: 10, // Adjust spacing as needed
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 10,
    // backgroundColor: '#269237', // Optional: if you want a solid green background
  },
  buttonSkipLoginText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#269237', // Green color for the text
    textDecorationLine: 'underline', // Optional: to make it look like a link
  },
});
