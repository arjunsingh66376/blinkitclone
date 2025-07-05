// src/screens/Cartscreen.js
import { SafeAreaView, StyleSheet, Text, View, ScrollView, TouchableOpacity } from 'react-native';
import React from 'react';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Checkoutitemcard, DonationCard, GiftBanner } from '../../component/Cards';
import { CheckoutAppbar } from '../../component/Appbar'; // Correct import path assuming it's in component/Appbar
import Orderbutton from '../../component/Orderbutton';
import { useCart } from '../../context/Cartcontext'; // Import useCart hook

const Cartscreen = () => {
    // Destructure the original function names from useCart
    const { cartItems, increaseQuantity, decreaseQuantity, removeFromCart } = useCart();

    // Calculate total price and savings
    const calculateTotals = () => {
        let itemsTotal = 0;
        let totalOriginalPriceSum = 0; // To calculate savings from original undoubled price if desired

        cartItems.forEach(item => {
            const priceNum = parseFloat(item.price) || 0; // This is the current total price for all units of this item
            const originalUnitPriceNum = parseFloat(item.originalUnitPrice || 0); // The undoubled price per unit
            const quantity = item.quantity || 1; // Get the actual quantity

            itemsTotal += priceNum; // Sum the current calculated total prices of items

            // Calculate savings based on the original unit price * quantity vs. current price
            // If an item starts at original 100, doubles to 200 (for qty 1), then qty goes to 2 (price 400).
            // Savings could be (originalUnitPrice * quantity) - currentPrice, but this would be negative.
            // Let's assume 'savings' is what you *saved* from a higher potential price.
            // The initial 'double on add' is not a saving.
            // The only explicit saving mentioned is free delivery.
            // Let's simplify and make the savings display mostly about the free delivery.
            // If you want per-item savings for items where the price drops *below* the doubled initial price,
            // we'd need another field like `discountedFromDoubledPrice`.
            totalOriginalPriceSum += (originalUnitPriceNum * quantity); // Sum original undoubled total for all items
        });

        const explicitDeliverySaving = 25; // From "Includes ₹25 savings through free delivery"
        const handlingCharge = 2; // Fixed

        // If you want "savings" to reflect the "cost" of doubling, or actual discounts later, refine this.
        // For now, let's just make sure `itemsTotal` is correct, and savings is from delivery.
        // If you still want to show `Saved ₹X` next to "Items total", let's define what 'X' is.
        // If it means "saved from original price", then:
        const potentialSavingsFromOriginal = totalOriginalPriceSum - itemsTotal;
        const netSavings = explicitDeliverySaving + Math.max(0, potentialSavingsFromOriginal); // Add item-level savings if positive

        const grandTotal = itemsTotal + handlingCharge; // Delivery is free (0)

        return { itemsTotal, savings: netSavings, deliveryCharge: 0, handlingCharge, grandTotal };
    };

    const { itemsTotal, savings, deliveryCharge, handlingCharge, grandTotal } = calculateTotals();

    // Use the original function names
    const handleIncreaseQuantity = (title) => {
        increaseQuantity(title);
        console.log("Quantity increased for:", title);
    };
    const handleDecreaseQuantity = (title) => {
        decreaseQuantity(title);
        console.log("Quantity decreased for:", title);
    };
    const handleDeleteButton = (title) => {
        removeFromCart(title);
        console.log("Item removed from cart:", title);
    };

    const handleselectgift = () => console.log('Gift selected!');

    return (
        <SafeAreaView style={{ flex: 1, padding: 10, backgroundColor: 'white' }}>
            {/* checkout app bar */}
            <CheckoutAppbar />

            {/* checkout title */}
            <View style={styles.checkoutheadingwrapper}>
                <Text style={styles.checkoutheading}>Deliver in 8 minutes</Text>
            </View>

            {/* Main Scrollable Content */}
            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollViewContent}>
                {/* Checkout item cards */}
                {cartItems.length > 0 ? (
                    cartItems.map((item, index) => (
                        <Checkoutitemcard
                            key={item.title || index} // Use title as key if unique, otherwise index
                            imageSource={item.productImage || item.imageSource}
                            title={item.title}
                            // Pass originalUnitPrice for display if you want to show it struck out
                            originalPrice={item.originalUnitPrice} // Now passing the undoubled unit price for context
                            price={item.price} // This is the total price for the current quantity of this item
                            weight={item.weight || 'N/A'}
                            quantity={item.quantity} // Pass the actual quantity from the state
                            onIncrease={() => handleIncreaseQuantity(item.title)}
                            onDecrease={() => handleDecreaseQuantity(item.title)}
                            onDelete={() => handleDeleteButton(item.title)}
                        />
                    ))
                ) : (
                    <Text style={styles.emptyCartText}>Your cart is empty. Add some items!</Text>
                )}


                {/* make a gift banner */}
                <GiftBanner onPressSelect={handleselectgift} />

                {/* bill details section */}
                <View style={styles.billContainer}>
                    <Text style={styles.billHeaderText}>Bill details</Text>

                    {/* Items total row */}
                    <View style={styles.billRow}>
                        <View style={styles.billRowLeft}>
                            <MaterialCommunityIcons name="file-document-outline" size={18} color="#333" style={styles.billIcon} />
                            <Text style={styles.billRowLabel}>Items total</Text>
                            {/* Display savings here, if calculated positively from original */}
                            {savings > 0 && <Text style={styles.billSavedText}>Saved ₹{savings.toFixed(0)}</Text>}
                        </View>
                        <View style={styles.billRowRight}>
                            <Text style={styles.billPriceText}>₹{itemsTotal.toFixed(0)}</Text>
                        </View>
                    </View>

                    {/* Delivery charge row */}
                    <View style={styles.billRow}>
                        <View style={styles.billRowLeft}>
                            <MaterialCommunityIcons name="truck-outline" size={18} color="#333" style={styles.billIcon} />
                            <Text style={styles.billRowLabel}>Delivery charge</Text>
                        </View>
                        <View style={styles.billRowRight}>
                            <Text style={styles.billStrikethroughText}>₹25</Text>
                            <Text style={styles.billFreeText}>FREE</Text>
                        </View>
                    </View>

                    {/* Handling charge row */}
                    <View style={styles.billRow}>
                        <View style={styles.billRowLeft}>
                            <MaterialCommunityIcons name="bag-personal-outline" size={18} color="#333" style={styles.billIcon} />
                            <Text style={styles.billRowLabel}>Handling charge</Text>
                        </View>
                        <View style={styles.billRowRight}>
                            <Text style={styles.billPriceText}>₹{handlingCharge.toFixed(0)}</Text>
                        </View>
                    </View>

                    <View style={styles.billDivider} />

                    {/* Grand total row */}
                    <View style={styles.billGrandTotalRow}>
                        <Text style={styles.billGrandTotalLabel}>Grand total</Text>
                        <Text style={styles.billGrandTotalPrice}>₹{grandTotal.toFixed(0)}</Text>
                    </View>

                    {/* Savings section */}
                    {savings > 0 && (
                        <View style={styles.billSavingsContainer}>
                            <Text style={styles.billSavingsText}>Your total savings</Text>
                            <Text style={styles.billSavingsAmount}>₹{savings.toFixed(0)}</Text>
                        </View>
                    )}
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
                                <Text style={styles.billGstinMainText}>Add GSTIN</Text>
                                <Text style={styles.billGstinSubText}>
                                    Claim GST input credit up to 28% on your order
                                </Text>
                            </View>
                        </View>
                        <Ionicons name="chevron-forward-outline" size={20} color="#888" />
                    </TouchableOpacity>
                </View>
                {/* donation card */}
                <DonationCard />
            </ScrollView>
            <Orderbutton />
        </SafeAreaView>
    );
};

export default Cartscreen;

const styles = StyleSheet.create({
    checkoutheadingwrapper: {
        justifyContent: "center",
        alignItems: 'flex-start',
        paddingHorizontal: 10,
        width: '100%',
        backgroundColor: '#fff',
        borderRadius: 12,
        marginHorizontal: 10,
        marginBottom: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
    },
    checkoutheading: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#333',
    },
    scrollViewContent: {
        flexGrow: 1,
        paddingBottom: 20,
    },
    emptyCartText: {
        textAlign: 'center',
        marginTop: 50,
        fontSize: 16,
        color: '#888',
    },
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