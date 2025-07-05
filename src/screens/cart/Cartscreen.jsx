// src/screens/Cartscreen.js
import { SafeAreaView, StyleSheet, Text, View, ScrollView, TouchableOpacity } from 'react-native';
import React from 'react';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Checkoutitemcard, DonationCard, GiftBanner } from '../../component/Cards';
import { CheckoutAppbar } from '../../component/Appbar';
import Orderbutton from '../../component/Orderbutton'; // Import Orderbutton
import { useCart } from '../../context/Cartcontext';

const Cartscreen = () => {
    const { cartItems, increaseQuantity, decreaseQuantity, removeFromCart } = useCart();

    const calculateTotals = () => {
        let itemsTotal = 0;
        let totalOriginalPriceSum = 0;

        cartItems.forEach(item => {
            const priceNum = parseFloat(item.price) || 0;
            const originalUnitPriceNum = parseFloat(item.originalUnitPrice || 0);
            const quantity = item.quantity || 1;

            itemsTotal += priceNum;
            totalOriginalPriceSum += (originalUnitPriceNum * quantity);
        });

        const explicitDeliverySaving = 25;
        const handlingCharge = 2; // This is the fixed ₹2 you want to add

        const potentialSavingsFromOriginal = totalOriginalPriceSum - itemsTotal;
        const netSavings = explicitDeliverySaving + Math.max(0, potentialSavingsFromOriginal);

        // grandTotal already includes handlingCharge
        const grandTotal = itemsTotal + handlingCharge;

        return { itemsTotal, savings: netSavings, deliveryCharge: 0, handlingCharge, grandTotal };
    };

    const { itemsTotal, savings, deliveryCharge, handlingCharge, grandTotal } = calculateTotals();

    // --- NEW: Determine if the cart is empty ---
    const isCartEmpty = cartItems.length === 0;

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
            <CheckoutAppbar />

            <View style={styles.checkoutheadingwrapper}>
                <Text style={styles.checkoutheading}>Deliver in 8 minutes</Text>
            </View>

            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollViewContent}>
                {cartItems.length > 0 ? (
                    cartItems.map((item, index) => (
                        <Checkoutitemcard
                            key={item.title || index}
                            imageSource={item.productImage || item.imageSource}
                            title={item.title}
                            originalPrice={item.originalUnitPrice}
                            price={item.price}
                            weight={item.weight || 'N/A'}
                            quantity={item.quantity}
                            onIncrease={() => handleIncreaseQuantity(item.title)}
                            onDecrease={() => handleDecreaseQuantity(item.title)}
                            onDelete={() => handleDeleteButton(item.title)}
                        />
                    ))
                ) : (
                    <Text style={styles.emptyCartText}>Your cart is empty. Add some items!</Text>
                )}

                <GiftBanner onPressSelect={handleselectgift} />

                <View style={styles.billContainer}>
                    <Text style={styles.billHeaderText}>Bill details</Text>

                    <View style={styles.billRow}>
                        <View style={styles.billRowLeft}>
                            <MaterialCommunityIcons name="file-document-outline" size={18} color="#333" style={styles.billIcon} />
                            <Text style={styles.billRowLabel}>Items total</Text>
                            {savings > 0 && <Text style={styles.billSavedText}>Saved ₹{savings.toFixed(0)}</Text>}
                        </View>
                        <View style={styles.billRowRight}>
                            <Text style={styles.billPriceText}>₹{itemsTotal.toFixed(0)}</Text>
                        </View>
                    </View>

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

                    <View style={styles.billGrandTotalRow}>
                        <Text style={styles.billGrandTotalLabel}>Grand total</Text>
                        <Text style={styles.billGrandTotalPrice}>₹{grandTotal.toFixed(0)}</Text>
                    </View>

                    {savings > 0 && (
                        <View style={styles.billSavingsContainer}>
                            <Text style={styles.billSavingsText}>Your total savings</Text>
                            <Text style={styles.billSavingsAmount}>₹{savings.toFixed(0)}</Text>
                        </View>
                    )}
                    <Text style={styles.billSavingsIncludesText}>
                        Includes ₹25 savings through free delivery
                    </Text>

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
                <DonationCard />
            </ScrollView>
            {/* Pass the grandTotal AND the new isCartEmpty prop to the Orderbutton */}
            <Orderbutton totalPrice={grandTotal.toFixed(0)} isCartEmpty={isCartEmpty} />
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
        color: '#52B788',
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
        color: '#52B788',
    },
    billDivider: {
        height: 1,
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
        backgroundColor: '#E0F7FA',
        borderRadius: 8,
        padding: 10,
        marginBottom: 5,
    },
    billSavingsText: {
        fontSize: 14,
        color: '#007B8A',
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
        backgroundColor: '#F5F5F5',
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
        backgroundColor: '#EBF5FB',
        justifyContent: 'center',
        alignItems: 'center',
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