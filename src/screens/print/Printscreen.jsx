import { SafeAreaView, StyleSheet, Text, View, TouchableOpacity, Image, Alert, ScrollView } from 'react-native';
import React, { useState } from 'react';
import Appbar from '../../component/Appbar';
import Entypo from 'react-native-vector-icons/Entypo';

// Imports for document and image pickers
import { pick } from '@react-native-documents/picker';
import { launchImageLibrary } from 'react-native-image-picker';

const Printscreen = () => {
  // State holds an array of selected files (objects with name and key)
  const [selectedFiles, setSelectedFiles] = useState([]);

  // Add new files avoiding duplicates by name
  const addSelectedFile = (name) => {
    setSelectedFiles((prev) => {
      if (prev.find(f => f.name === name)) return prev;
      return [...prev, { name, key: Math.random().toString() }];
    });
  };

  // Remove file by key
  const removeSelectedFile = (key) => {
    setSelectedFiles((prev) => prev.filter(f => f.key !== key));
  };

  // Upload files handler
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
                const fileName = result.assets[0].fileName || 'Photo Selected';
                addSelectedFile(fileName);
                Alert.alert('Success', 'Photo selected: ' + fileName);
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
              const results = await pick({ type: ['*/*'], allowMultiSelection: true });
              results.forEach(file => {
                addSelectedFile(file.name || 'Document Selected');
              });
              Alert.alert('Success', `${results.length} document(s) selected`);
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

  // Print document handler placeholder
  const handlePrintDocuments = () => {
    if (selectedFiles.length === 0) {
      Alert.alert('No Files', 'Please upload files before printing.');
      return;
    }
    Alert.alert('Print', `Printing ${selectedFiles.length} document(s)... your documents will be delivered shortly.`);
    // Add actual printing logic here
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

              {/* Render all selected file names with remove button */}
              <ScrollView style={{ marginTop: 12, maxHeight: 150 }}>
                {selectedFiles.map((file, index) => (
                  <View key={file.key} style={styles.fileItem}>
                    <Text style={styles.fileName}>{index + 1}. {file.name}</Text>
                    <TouchableOpacity onPress={() => removeSelectedFile(file.key)} style={styles.removeButton}>
                      <Text style={styles.removeButtonText}>×</Text>
                    </TouchableOpacity>
                  </View>
                ))}
              </ScrollView>
            </View>

            {/* Right image */}
            <Image
              source={require('../../../assets/images/print.png')}
              style={styles.image}
            />
          </View>
        </View>

        {/* Print Document button */}
        <TouchableOpacity style={styles.printButton} onPress={handlePrintDocuments}>
          <Text style={styles.buttonText}>Print Document</Text>
        </TouchableOpacity>

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
  printButton: {
    marginTop: 20,
    backgroundColor: '#28A745',
    paddingVertical: 12,
    paddingHorizontal: 40,
    borderRadius: 6,
    alignSelf: 'center',
  },
  buttonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 14,
    textAlign: 'center',
  },
  image: {
    width: 60,
    height: 60,
    resizeMode: 'contain',
  },
  fileItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 6,
    backgroundColor: '#F0F0F0',
    borderRadius: 4,
    paddingHorizontal: 10,
    paddingVertical: 4,
  },
  fileName: {
    fontSize: 14,
    color: '#4B4B4B',
    flexShrink: 1,
  },
  removeButton: {
    marginLeft: 10,
    backgroundColor: '#cccccc',
    borderRadius: 12,
    width: 24,
    height: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  removeButtonText: {
    fontSize: 18,
    lineHeight: 18,
    color: '#333',
    fontWeight: 'bold',
  },
});
