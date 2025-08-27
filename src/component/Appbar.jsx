import { StyleSheet, Text, View, Image, TouchableOpacity, Modal, TextInput as RNTextInput, Pressable } from 'react-native';
import React, { useState } from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import Ionicons from 'react-native-vector-icons/Ionicons';

const Appbar = ({ bgcolor, color, circlebgcolor, onSearchSubmit = () => {} }) => {
  const [query, setQuery] = useState('');

  // State for Address Management
  const [showAddressModal, setShowAddressModal] = useState(false);
  const [currentAddress, setCurrentAddress] = useState("Arjun Singh, Ratanada, Jodhpur (Raj)");
  const [tempAddress, setTempAddress] = useState(currentAddress); // Temporary state for modal input

  // Logic for mic button in app bar
  const handlemic = () => {
    console.log("mic is pressed");
  };

  // Handle search submission
  const handleSearch = () => {
    if (query.trim()) {
      onSearchSubmit(query.trim());
    }
  };

  // Address Modal Handlers
  const handleOpenAddressModal = () => {
    setTempAddress(currentAddress); // Set temp address to current before opening
    setShowAddressModal(true);
  };

  const handleSaveAddress = () => {
    setCurrentAddress(tempAddress); // Update current address with temp
    setShowAddressModal(false);
  };

  const handleCancelAddressEdit = () => {
    setShowAddressModal(false); // Just close the modal without saving
  };

  return (
    // app bar bg
    <View style={[styles.bg, { backgroundColor: bgcolor }]}>

      <Text style={[styles.txt1, { color: color }]}>Blinkit in</Text>
      <View style={styles.txt2wrapper}>
        <Text style={[styles.txt2, { color: color }]}>16 minutes</Text>

        {/* user image - Reverted to a simple View, no longer TouchableOpacity */}
        <View style={[styles.circle, { backgroundColor: circlebgcolor }]}>
          <Image source={require('../../assets/images/user_black.png')} style={styles.userimg} />
        </View>
      </View>
      {/* TouchableOpacity for address dropdown */}
      <TouchableOpacity onPress={handleOpenAddressModal} style={styles.txt3wrapper}>
        <Text style={[styles.txt3, { color: color }]}>HOME -</Text>
        <Text style={[styles.txt4, { color: color }]} numberOfLines={1} ellipsizeMode="tail">{currentAddress}</Text>
        <Icon name="caret-down" size={20} color={color} />
      </TouchableOpacity>

      {/* search bar */}
      <View style={styles.searchbar}>
        <TouchableOpacity onPress={handleSearch}>
          <Ionicons name="search" size={18} color={color} />
        </TouchableOpacity>
        <RNTextInput
          style={styles.textinput}
          placeholder='Search For Items ...'
          placeholderTextColor="#9C9C9C"
          value={query}
          onChangeText={setQuery}
          onSubmitEditing={handleSearch}
          returnKeyType="search"
        />
        <TouchableOpacity onPress={handlemic}>
          <Icon name='microphone' size={18} color={color} />
        </TouchableOpacity>
      </View>

      {/* Address Edit Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={showAddressModal}
        onRequestClose={handleCancelAddressEdit}
      >
        <Pressable style={styles.centeredView} onPress={handleCancelAddressEdit}>
          <View style={styles.modalView} onStartShouldSetResponder={() => true}>
            <Text style={styles.modalTitle}>Edit Delivery Address</Text>
            <Text style={styles.modalCurrentAddressLabel}>Current Address:</Text>
            <RNTextInput
              style={styles.modalTextInput}
              onChangeText={setTempAddress}
              value={tempAddress}
              multiline
              numberOfLines={3}
              placeholder="Enter new address"
              placeholderTextColor="#888"
            />
            <Text style={styles.modalHintText}>All addresses are saved locally on your device.</Text>
            <View style={styles.modalButtonContainer}>
              <TouchableOpacity
                style={[styles.modalButton, styles.buttonCancel]}
                onPress={handleCancelAddressEdit}
              >
                <Text style={styles.textStyle}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.modalButton, styles.buttonSave]}
                onPress={handleSaveAddress}
              >
                <Text style={styles.textStyle}>Save</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Pressable>
      </Modal>

    </View>
  );
};

export default Appbar;

// =========================================================================================
// app bar for checkout
export const CheckoutAppbar = ({ onBackPress, onSharePress }) => {
  return (
    <View style={styles.appbarContainer}>
      <TouchableOpacity onPress={onBackPress} style={styles.backButton}>
        <Ionicons name="arrow-back" size={32} color="#333" />
      </TouchableOpacity>

      <Text style={styles.checkouttitleText}>Checkout</Text>

      <TouchableOpacity onPress={onSharePress} style={styles.shareButton}>
        <Ionicons name="cart-outline" size={24} color="#52B788" />
        <Text style={styles.shareText}>Share</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  bg: {
    width: '100%',
    height: 175,
    paddingHorizontal: 10,
    paddingVertical: 20
  },
  txt1: {
    fontSize: 12,
    fontWeight: "bold",
  },
  txt2wrapper: {
    display: 'flex',
    flexDirection: "row",
    justifyContent: 'space-between',
    marginTop: 3
  },
  txt2: {
    fontSize: 20,
    fontWeight: "bold",
  },
  circle: {
    borderRadius: 16,
    display: 'flex',
    alignItems: "center",
    justifyContent: "center",
    height: 32,
    width: 32,
    marginRight: 20
  },
  userimg: {
    height: 15,
    width: 15,
    alignSelf: 'center'
  },
  txt3wrapper: {
    display: 'flex',
    flexDirection: 'row',
    marginBottom: 15,
    alignItems: 'center',
  },
  txt3: {
    fontSize: 12,
    fontWeight: "bold",
    marginTop: 4,
    marginRight: 5,
  },
  txt4: {
    fontSize: 12,
    marginTop: 4,
    flexShrink: 1,
    marginRight: 10
  },
  searchbar: {
    width: '100%',
    height: 40,
    borderRadius: 11,
    backgroundColor: "white",
    borderWidth: 1,
    borderColor: '#C5C5C5',
    display: 'flex',
    justifyContent: "space-around",
    alignItems: "center",
    flexDirection: 'row',
    paddingHorizontal: 10,
    marginTop: 5
  },
  textinput: {
    flex: 1,
    paddingHorizontal: 10,
  },
  appbarContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 15,
    paddingVertical: 10,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#EEEEEE',
    height: 60,
  },
  backButton: {
    padding: 5,
  },
  checkouttitleText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    flex: 1,
    textAlign: 'center',
    marginLeft: -24,
  },
  shareButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 5,
  },
  shareText: {
    fontSize: 16,
    color: '#52B788',
    marginLeft: 5,
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 25,
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
    maxHeight: '60%',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 15,
    color: '#333',
  },
  modalCurrentAddressLabel: {
    fontSize: 14,
    color: '#666',
    marginBottom: 5,
    alignSelf: 'flex-start',
  },
  modalTextInput: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 10,
    width: '100%',
    marginBottom: 20,
    textAlignVertical: 'top',
    fontSize: 16,
    color: '#333',
  },
  modalHintText: {
    fontSize: 12,
    color: '#999',
    marginBottom: 15,
    textAlign: 'center',
  },
  modalButtonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
  },
  modalButton: {
    borderRadius: 8,
    padding: 12,
    elevation: 2,
    flex: 1,
    marginHorizontal: 5,
    alignItems: 'center',
  },
  buttonSave: {
    backgroundColor: '#EC0505',
  },
  buttonCancel: {
    backgroundColor: '#888',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  }
});