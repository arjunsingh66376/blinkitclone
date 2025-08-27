import { SafeAreaView, StyleSheet, Text, View, ScrollView, TouchableOpacity, Modal, ActivityIndicator, Pressable } from 'react-native';
import React, { useState } from 'react';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Checkoutitemcard, DonationCard, GiftBanner } from '../../component/Cards';
import { CheckoutAppbar } from '../../component/Appbar';
import Orderbutton from '../../component/Orderbutton';
import { useCart } from '../../context/Cartcontext';
import { useNavigation } from '@react-navigation/native';
import Toast from 'react-native-toast-message';
import RazorpayCheckout from 'react-native-razorpay'; // NEW: Import RazorpayCheckout

const Cartscreen = () => {
    const { cartItems, increaseQuantity, decreaseQuantity, removeFromCart, clearCart } = useCart();
    const navigation = useNavigation();

    const [isGiftSelected, setIsGiftSelected] = useState(false);
    const [showPaymentModal, setShowPaymentModal] = useState(false);
    const [paymentProcessing, setPaymentProcessing] = useState(false);
    const [paymentError, setPaymentError] = useState('');

    const calculateTotals = () => {
        let itemsTotal = 0;
        let totalOriginalPriceSum = 0;

        cartItems.forEach(item => {
            const priceNum = parseFloat(item.price) || 0;
            const originalUnitPriceNum = parseFloat(item.originalUnitPrice || 0);
            const quantity = item.quantity || 1;

            itemsTotal += priceNum * quantity;
            totalOriginalPriceSum += (originalUnitPriceNum * quantity);
        });

        const explicitDeliverySaving = 25;
        const handlingCharge = 2;
        const giftWrappingCharge = isGiftSelected ? 30 : 0;

        const potentialSavingsFromOriginal = totalOriginalPriceSum - itemsTotal;
        const netSavings = explicitDeliverySaving + Math.max(0, potentialSavingsFromOriginal);

        const grandTotal = itemsTotal + handlingCharge + giftWrappingCharge;

        return { itemsTotal, savings: netSavings, deliveryCharge: 0, handlingCharge, grandTotal, giftWrappingCharge };
    };

    const { itemsTotal, savings, deliveryCharge, handlingCharge, grandTotal, giftWrappingCharge } = calculateTotals();

    const isCartEmpty = cartItems.length === 0;

    const handleIncreaseQuantity = (title) => {
        increaseQuantity(title);
    };
    const handleDecreaseQuantity = (title) => {
        decreaseQuantity(title);
    };
    const handleDeleteButton = (title) => {
        removeFromCart(title);
    };

    const handleselectgift = () => {
        const newState = !isGiftSelected;
        setIsGiftSelected(newState);

        if (newState) {
            Toast.show({
                type: 'success',
                text1: 'Gift Option Selected!',
                text2: 'Your item will be packed in a special gift bag.',
                visibilityTime: 3000,
                autoHide: true,
                topOffset: 30,
            });
        } else {
            Toast.show({
                type: 'info',
                text1: 'Gift Option Removed!',
                text2: 'Gift wrapping has been deselected.',
                visibilityTime: 2000,
                autoHide: true,
                topOffset: 30,
            });
        }
    };

    const handleBackPress = () => {
        navigation.goBack();
    };

    const handleProceedToPayment = () => {
        if (isCartEmpty) {
            Toast.show({
                type: 'error',
                text1: 'Cart is Empty!',
                text2: 'Please add items to your cart before proceeding to payment.',
                visibilityTime: 3000,
                autoHide: true,
                topOffset: 30,
            });
            return;
        }
        if (!isFinite(grandTotal) || grandTotal <= 0) {
            Toast.show({
                type: 'error',
                text1: 'Invalid Amount!',
                text2: 'Total amount must be greater than zero to proceed with payment.',
                visibilityTime: 3000,
                autoHide: true,
                topOffset: 30,
            });
            return;
        }
        setShowPaymentModal(true);
        setPaymentError('');
    };

    const initiateRazorpayPayment = async () => {
        setPaymentProcessing(true);
        setPaymentError('');

        const amountPaise = Math.round((Number(grandTotal) || 0) * 100);

        const options = {
            description: 'Payment for your Blinkit order',
            image: require('../../../assets/images/splashimage.png'),
            currency: 'INR',
            key: 'rzp_test_Q1l5veFa2pHJFF', // replace with real key in production
            amount: amountPaise,
            name: 'Blinkit Clone',
            prefill: {
                email: 'customer@example.com',
                contact: '9999999999',
                name: 'Blinkit User'
            },
            theme: { color: '#F7CB45' }
        };

        try {
            const data = await RazorpayCheckout.open(options);
            Toast.show({
                type: 'success',
                text1: 'Payment Successful!',
                text2: `Payment ID: ${data.razorpay_payment_id}. Order Confirmed!`,
                visibilityTime: 4000,
                autoHide: true,
                topOffset: 30,
            });
            clearCart();
            setTimeout(() => {
                setShowPaymentModal(false);
            }, 1000);
        } catch (error) {
            // safer error handling if ErrorCode is undefined
            let errorMessage = 'Payment was cancelled or failed.';
            try {
                const ErrorCode = RazorpayCheckout && RazorpayCheckout.ErrorCode;
                if (ErrorCode && error.code === ErrorCode.VALIDATION_ERROR) {
                    errorMessage = `Validation Error: ${error.description || ''}`;
                } else if (ErrorCode && error.code === ErrorCode.NETWORK_ERROR) {
                    errorMessage = `Network Error: ${error.description || ''}`;
                } else if (error.description) {
                    errorMessage = error.description;
                }
            } catch (e) {
                if (error && error.message) errorMessage = error.message;
            }

            setPaymentError(errorMessage);
            Toast.show({
                type: 'error',
                text1: 'Payment Failed!',
                text2: errorMessage,
                visibilityTime: 4000,
                autoHide: true,
                topOffset: 30,
            });
        } finally {
            setPaymentProcessing(false);
        }
    };

    return (
        <SafeAreaView style={{ flex: 1, padding: 10, backgroundColor: 'white' }}>
            <CheckoutAppbar onBackPress={handleBackPress} />

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

                <GiftBanner onPressSelect={handleselectgift} isSelected={isGiftSelected} />

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

                    {isGiftSelected && (
                        <View style={styles.billRow}>
                            <View style={styles.billRowLeft}>
                                <MaterialCommunityIcons name="gift-outline" size={18} color="#333" style={styles.billIcon} />
                                <Text style={styles.billRowLabel}>Gift wrapping</Text>
                            </View>
                            <View style={styles.billRowRight}>
                                <Text style={styles.billPriceText}>₹{giftWrappingCharge.toFixed(0)}</Text>
                            </View>
                        </View>
                    )}

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

            <Orderbutton
                totalPrice={String(Math.round(grandTotal || 0))}
                isCartEmpty={isCartEmpty}
                onPress={handleProceedToPayment}
            />

            <Modal
                animationType="slide"
                transparent={true}
                visible={showPaymentModal}
                onRequestClose={() => setShowPaymentModal(false)}
            >
                <Pressable style={styles.paymentCenteredView} onPress={() => setShowPaymentModal(false)}>
                    <View style={styles.paymentModalView} onStartShouldSetResponder={() => true}>
                        <Text style={styles.paymentModalTitle}>Proceed to Payment</Text>
                        <Text style={styles.paymentModalAmount}>Total Amount: ₹{grandTotal.toFixed(0)}</Text>

                        {paymentProcessing ? (
                            <View style={styles.loadingContainer}>
                                <ActivityIndicator size="large" color="#EC0505" />
                                <Text style={styles.loadingText}>Opening Razorpay Checkout...</Text>
                            </View>
                        ) : (
                            <>
                                {paymentError ? <Text style={styles.errorText}>{paymentError}</Text> : null}
                                <TouchableOpacity
                                    style={styles.payButton}
                                    onPress={initiateRazorpayPayment}
                                    disabled={paymentProcessing}
                                >
                                    <Text style={styles.payButtonText}>Pay with Razorpay</Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    style={styles.cancelButton}
                                    onPress={() => setShowPaymentModal(false)}
                                >
                                    <Text style={styles.cancelButtonText}>Cancel</Text>
                                </TouchableOpacity>
                            </>
                        )}
                    </View>
                </Pressable>
            </Modal>

            <Toast />
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
    paymentCenteredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.6)',
    },
    paymentModalView: {
        margin: 20,
        backgroundColor: 'white',
        borderRadius: 15,
        padding: 25,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 8,
        elevation: 10,
        width: '90%',
        maxWidth: 400,
    },
    paymentModalTitle: {
        fontSize: 22,
        fontWeight: 'bold',
        marginBottom: 10,
        color: '#333',
    },
    paymentModalAmount: {
        fontSize: 18,
        fontWeight: '600',
        color: '#38B000',
        marginBottom: 20,
    },
    payButton: {
        backgroundColor: '#EC0505',
        borderRadius: 10,
        paddingVertical: 15,
        width: '100%',
        alignItems: 'center',
        marginTop: 10,
        elevation: 3,
    },
    payButtonText: {
        color: 'white',
        fontSize: 18,
        fontWeight: 'bold',
    },
    cancelButton: {
        marginTop: 10,
        paddingVertical: 10,
    },
    cancelButtonText: {
        color: '#666',
        fontSize: 16,
    },
    loadingContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 30,
    },
    loadingText: {
        marginTop: 15,
        fontSize: 16,
        color: '#555',
    },
    errorText: {
        color: '#EC0505',
        fontSize: 14,
        marginBottom: 10,
        textAlign: 'center',
    },
});
