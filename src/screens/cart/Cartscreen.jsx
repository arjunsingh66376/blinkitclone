import { SafeAreaView, StyleSheet, Text, View, ScrollView, TouchableOpacity } from 'react-native';
import React from 'react';
// Import MaterialCommunityIcons and Ionicons as they are used in the inline bill details section
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Checkoutitemcard, DonationCard, GiftBanner } from '../../component/Cards'; // Assuming these are also from Cards.js or similar

import img360 from '../../../assets/images/img360.png';
import img300 from '../../../assets/images/img300.png';
import img310 from '../../../assets/images/img310.png';
import { CheckoutAppbar } from '../../component/Appbar';
import Orderbutton from '../../component/Orderbutton';


const Cartscreen = () => {

  const handleincreasebtn = () => console.log("item is increased");
  const handledecreasebtn = () => console.log("item is decreased");
  const handleselectgift = () => console.log('item is selected');
  const handletitlepress = () => console.log('title   banener   is pressed');
  const handledonationaddpress = () => console.log(' add btn   is pressed');

  return (
    <SafeAreaView style={{ flex: 1, padding: 10, backgroundColor: 'white' }}>
      {/* checkout app bar   */}
      <CheckoutAppbar/>

      {/* checkout title ======================================================================= */}
      <View style={styles.checkoutheadingwrapper}>
        {/* FIX: Wrapped "Deliver in 8 minutes" */}
        <Text style={styles.checkoutheading}>Deliver in 8 minutes</Text>
      </View>

      {/* Main Scrollable Content */}
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollViewContent}>
        {/* Checkout item cards */}
        <Checkoutitemcard imageSource={img360} title={'coco-cola soft drinks'} originalPrice={"40"} price={"30"} quantity={"2"} onIncrease={handleincreasebtn} onDecrease={handledecreasebtn} />
        <Checkoutitemcard imageSource={img300} title={'Oats & Muslie'} originalPrice={"100"} price={"50"} quantity={"1"} onIncrease={handleincreasebtn} onDecrease={handledecreasebtn} />
        <Checkoutitemcard imageSource={img310} title={'Mixer Grinder'} originalPrice={"1000"} price={"300"} quantity={"5"} onIncrease={handleincreasebtn} onDecrease={handledecreasebtn} />

        {/* make a gift banner =================================================================== */}
        <GiftBanner onPressSelect={handleselectgift} />

        {/* bill details section =================================================================== */}
        {/* Using styles directly from the StyleSheet defined below */}
        <View style={styles.billContainer}>
          {/* Bill details header */}
          {/* FIX: Wrapped "Bill details" */}
          <Text style={styles.billHeaderText}>Bill details</Text>

          {/* Items total row */}
          <View style={styles.billRow}>
            <View style={styles.billRowLeft}>
              <MaterialCommunityIcons name="file-document-outline" size={18} color="#333" style={styles.billIcon} />
              {/* FIX: Wrapped "Items total" */}
              <Text style={styles.billRowLabel}>Items total</Text>
              {/* FIX: Wrapped "Saved ₹51" */}
              <Text style={styles.billSavedText}>Saved ₹51</Text>
            </View>
            <View style={styles.billRowRight}>
              {/* FIX: Wrapped "₹529" */}
              <Text style={styles.billStrikethroughText}>₹529</Text>
              {/* FIX: Wrapped "₹478" */}
              <Text style={styles.billPriceText}>₹478</Text>
            </View>
          </View>

          {/* Delivery charge row */}
          <View style={styles.billRow}>
            <View style={styles.billRowLeft}>
              <MaterialCommunityIcons name="truck-outline" size={18} color="#333" style={styles.billIcon} />
              {/* FIX: Wrapped "Delivery charge" */}
              <Text style={styles.billRowLabel}>Delivery charge</Text>
            </View>
            <View style={styles.billRowRight}>
              {/* FIX: Wrapped "₹25" */}
              <Text style={styles.billStrikethroughText}>₹25</Text>
              {/* FIX: Wrapped "FREE" */}
              <Text style={styles.billFreeText}>FREE</Text>
            </View>
          </View>

          {/* Handling charge row */}
          <View style={styles.billRow}>
            <View style={styles.billRowLeft}>
              <MaterialCommunityIcons name="bag-personal-outline" size={18} color="#333" style={styles.billIcon} />
              {/* FIX: Wrapped "Handling charge" */}
              <Text style={styles.billRowLabel}>Handling charge</Text>
            </View>
            <View style={styles.billRowRight}>
              {/* FIX: Wrapped "₹2" */}
              <Text style={styles.billPriceText}>₹2</Text>
            </View>
          </View>

          {/* Wavy divider - Placeholder for a more complex SVG or custom drawing */}
          <View style={styles.billDivider} />

          {/* Grand total row */}
          <View style={styles.billGrandTotalRow}>
            {/* FIX: Wrapped "Grand total" */}
            <Text style={styles.billGrandTotalLabel}>Grand total</Text>
            {/* FIX: Wrapped "₹480" */}
            <Text style={styles.billGrandTotalPrice}>₹480</Text>
          </View>

          {/* Savings section */}
          <View style={styles.billSavingsContainer}>
            {/* FIX: Wrapped "Your total savings" */}
            <Text style={styles.billSavingsText}>Your total savings</Text>
            {/* FIX: Wrapped "₹76" */}
            <Text style={styles.billSavingsAmount}>₹76</Text>
          </View>
          {/* This text is already wrapped in <Text> */}
          <Text style={styles.billSavingsIncludesText}>
            Includes ₹25 savings through free delivery
          </Text>

          {/* Add GSTIN section */}
          <TouchableOpacity style={styles.billGstinButton}>
            <View style={styles.billGstinLeft}>
              <View style={styles.billGstinIconWrapper}>
                <MaterialCommunityIcons name="percent" size={20} color="#3498db" />
              </View>
              <View>
                {/* FIX: Wrapped "Add GSTIN" */}
                <Text style={styles.billGstinMainText}>Add GSTIN</Text>
                {/* FIX: Wrapped "Claim GST input credit up to 28% on your order" */}
                <Text style={styles.billGstinSubText}>
                  Claim GST input credit up to 28% on your order
                </Text>
              </View>
            </View>
            <Ionicons name="chevron-forward-outline" size={20} color="#888" />
          </TouchableOpacity>
        </View>
        {/* ============================================================================ */}
        {/* donation card */}
        <DonationCard/>
        {/* ============================================================================= */}
        {/* order placed   buttton */}
      </ScrollView>
        <Orderbutton />
    </SafeAreaView>
  );
};

export default Cartscreen;

const styles = StyleSheet.create({
  checkoutheadingwrapper: {
    // height: 40,
    // width: '90%', // Changed to 100% for better responsiveness
    justifyContent: "center",
    alignItems: 'flex-start',
    paddingHorizontal: 10, // Added padding
    width: '100%',
      backgroundColor: '#fff',
      borderRadius: 12,
      marginHorizontal: 10,
      marginBottom: 10,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
      // overflow: 'hidden',

  },
  checkoutheading: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  scrollViewContent: {
    flexGrow: 1, // Allows content to grow and enable scrolling
    paddingBottom: 20, // Add some padding at the bottom of the scroll view
  },
  // ==========================================================================================
  // Styling for bill section - Prefixed with 'bill' to avoid conflicts
  billContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    marginHorizontal: 15,
    marginTop: 20,
    padding: 15,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  billHeaderText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 15,
  },
  billRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  billRowLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  billIcon: {
    marginRight: 10,
  },
  billRowLabel: {
    fontSize: 14,
    color: '#555',
  },
  billSavedText: {
    fontSize: 12,
    color: '#52B788', // Green color
    marginLeft: 8,
    fontWeight: '600',
  },
  billRowRight: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  billStrikethroughText: {
    fontSize: 14,
    color: '#888',
    textDecorationLine: 'line-through',
    marginRight: 5,
  },
  billPriceText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333',
  },
  billFreeText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#52B788', // Green color for FREE
  },
  billDivider: {
    height: 1, // Placeholder for the wavy line
    backgroundColor: '#EEEEEE',
    marginVertical: 15,
  },
  billGrandTotalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  billGrandTotalLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  billGrandTotalPrice: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
  },
  billSavingsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#E0F7FA', // Light blue background for savings
    borderRadius: 8,
    padding: 10,
    marginBottom: 5,
  },
  billSavingsText: {
    fontSize: 14,
    color: '#007B8A', // Darker blue/green for savings text
    fontWeight: '600',
  },
  billSavingsAmount: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#007B8A',
  },
  billSavingsIncludesText: {
    fontSize: 12,
    color: '#888',
    textAlign: 'center',
    marginBottom: 20,
  },
  billGstinButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#F5F5F5', // Light gray background
    borderRadius: 10,
    padding: 15,
    marginTop: 10,
    elevation: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
  },
  billGstinLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  billGstinIconWrapper: {
    width: 35,
    height: 35,
    borderRadius: 10,
    backgroundColor: '#EBF5FB', // Very light blue background for the icon
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  billGstinMainText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  billGstinSubText: {
    fontSize: 12,
    color: '#666',
  },
});