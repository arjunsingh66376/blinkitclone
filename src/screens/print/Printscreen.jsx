import { SafeAreaView, StyleSheet, Text, View, TouchableOpacity, Image, Alert } from 'react-native';
import React, { useState } from 'react';
import Appbar from '../../component/Appbar';
import Entypo from 'react-native-vector-icons/Entypo';

// Imports for document and image pickers
import { pick } from '@react-native-documents/picker';
import { launchImageLibrary } from 'react-native-image-picker';

const Printscreen = () => {
  const [selectedFileName, setSelectedFileName] = useState(null);

  // Function to open choice dialog and pick either photo or document
  const handleUploadFiles = () => {
    Alert.alert(
      'Upload',
      'Select File Type',
      [
        {
          text: 'Photo',
          onPress: async () => {
            try {
              const result = await launchImageLibrary({ mediaType: 'photo', selectionLimit: 1 });
              if (result.assets && result.assets.length > 0) {
                setSelectedFileName(result.assets[0].fileName || 'Photo Selected');
                Alert.alert('Success', 'Photo selected: ' + (result.assets[0].fileName || ''));
              }
            } catch (error) {
              Alert.alert('Error', 'Failed to pick image: ' + error.message);
            }
          }
        },
        {
          text: 'Document',
          onPress: async () => {
            try {
              const [res] = await pick({ type: ['*/*'], allowMultiSelection: false });
              setSelectedFileName(res.name || 'Document Selected');
              Alert.alert('Success', 'Document selected: ' + (res.name || ''));
            } catch (err) {
              if (err?.code !== 'DOCUMENT_PICKER_CANCELED') {
                Alert.alert('Error', 'Failed to pick document');
              }
            }
          }
        },
        { text: 'Cancel', style: 'cancel' },
      ],
    );
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Appbar bgcolor={"#F7CB45"} color={"black"} circlebgcolor={"white"} />
      <View style={styles.bg}>
        <Text style={styles.mainheading}>Print Store</Text>
        <Text style={styles.subheading}>Blinkit ensures secure prints at every stage</Text>
        <View style={styles.card}>
          <View style={styles.card}>
            {/* Left content */}
            <View style={styles.leftContent}>
              <Text style={styles.title}>Documents</Text>

              <View style={styles.bulletRow}>
                <Entypo name="dot-single" size={18} color="#888" />
                <Text style={styles.bulletText}>Price starting at rs 3/page</Text>
              </View>

              <View style={styles.bulletRow}>
                <Entypo name="dot-single" size={18} color="#888" />
                <Text style={styles.bulletText}>Paper quality: 70 GSM</Text>
              </View>

              <View style={styles.bulletRow}>
                <Entypo name="dot-single" size={18} color="#888" />
                <Text style={styles.bulletText}>Single side prints</Text>
              </View>

              {/* Upload Files Button */}
              <TouchableOpacity style={styles.button} onPress={handleUploadFiles}>
                <Text style={styles.buttonText}>Upload Files</Text>
              </TouchableOpacity>

              {/* Show selected file name */}
              {selectedFileName && (
                <Text style={{ marginTop: 12, fontSize: 14, color: '#4B4B4B' }}>
                  Selected File: {selectedFileName}
                </Text>
              )}
            </View>

            {/* Right image */}
            <Image
              source={require('../../../assets/images/print.png')} // replace with your actual image path
              style={styles.image}
            />
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Printscreen;

const styles = StyleSheet.create({
  bg: {
    flex: 1,
    backgroundColor: '#f9ecee',
    display: 'flex',
    alignItems: 'center',
  },
  mainheading: {
    fontSize: 32,
    fontWeight: "bold",
    alignSelf: 'center',
    marginTop: 60,
  },
  subheading: {
    fontSize: 14,
    fontWeight: '900',
    alignSelf: 'center',
    color: '#9C9C9C',
  },
  card: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#fff',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#00A3FF22',
    padding: 15,
    margin: 10,
    alignItems: 'center',
    width: '90%',
  },
  leftContent: {
    flex: 1,
    paddingRight: 10,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  bulletRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 2,
  },
  bulletText: {
    fontSize: 13,
    color: '#888',
  },
  button: {
    marginTop: 10,
    backgroundColor: '#28A745',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 6,
    alignSelf: 'flex-start',
  },
  buttonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 14,
  },
  image: {
    width: 60,
    height: 60,
    resizeMode: 'contain',
  },
});
