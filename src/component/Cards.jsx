// src/component/Cards.js
import { StyleSheet, Text, View, Image, TouchableOpacity, Linking } from 'react-native';
import React from 'react';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';




// Import your image assets for the "Diwali Sale" cards
import imgdiya from '../../assets/images/imgdiya.png';
import imgchoco from '../../assets/images/imgchoco.png';
import imgps5 from '../../assets/images/imgps5.png';
import imghome from '../../assets/images/imghome&living.png';

// Helper function to generate a random weight
const generateRandomWeight = () => {
    const units = ['gm', 'kg', 'pack', 'ml', 'L']; // Added ml and L for more variety
    const randomUnit = units[Math.floor(Math.random() * units.length)];
    let value;

    switch (randomUnit) {
        case 'gm':
            value = Math.floor(Math.random() * (1000 - 50) + 50); // 50-999 gm
            return `${value} ${randomUnit}`;
        case 'kg':
            value = (Math.random() * (5 - 0.1) + 0.1).toFixed(1); // 0.1-5.0 kg
            return `${value} ${randomUnit}`;
        case 'pack':
            value = Math.floor(Math.random() * (10 - 1) + 1); // 1-9 packs
            return `${value} ${randomUnit}`;
        case 'ml':
            value = Math.floor(Math.random() * (1000 - 100) + 100); // 100-999 ml
            return `${value} ${randomUnit}`;
        case 'L':
            value = (Math.random() * (5 - 0.5) + 0.5).toFixed(1); // 0.5-5.0 L
            return `${value} ${randomUnit}`;
        default:
            return '1 unit'; // Fallback
    }
};

// --- Cards Component (Default Export) ---
// This component is for the "Diwali Sale" cards (e.g., Lights, Diyas & Candles)
const Cards = ({ content, imgkey, children }) => {
    const imagemap = {
        diya: imgdiya,
        choco: imgchoco,
        ps5: imgps5,
        home: imghome
    };

    return (
        <View style={styles.card}>
            <Text style={styles.text}>{content}</Text>
            <Image
                source={imagemap[imgkey]}
                style={styles.images}
            />
            {/* Defensive: Render children only if they are valid React elements */}
            {React.Children.map(children, child =>
                typeof child === 'string' ? <Text>{child}</Text> : child
            )}
        </View>
    );
};
// ===========================================================================================
// --- ItemCard Component (Named Export) ---
// This component is for the product cards with price, delivery time, and ADD button
export const ItemCard = ({
    productImage,
    title,
    deliveryTime,
    price,
    onAddPress,
}) => {
    return (
        <View style={styles.itemCardContainer}>
            <View style={styles.imageWrapper}>
                <Image source={productImage} style={styles.productImage} />

                {/* ADD Button */}
                <TouchableOpacity style={styles.addButton} onPress={onAddPress}>
                    <Text style={styles.addButtonText}>ADD</Text>
                </TouchableOpacity>
            </View>

            {/* Product Info */}
            <View style={styles.detailsContainer}>
                <Text style={styles.titleText} numberOfLines={2}>{title}</Text>

                <View style={styles.deliveryTimeContainer}>
                    <MaterialCommunityIcons
                        name="clock-time-four-outline"
                        size={14}
                        color="#555"
                    />
                    <Text style={styles.deliveryTimeText}>{deliveryTime}</Text>
                </View>

                <Text style={styles.priceText}>{price}</Text>
            </View>
        </View>
    );
};
// ==========================================================================================
// grocery cards
export const GroceryCard = ({ imageSource, title }) => {
    return (
        <View style={styles.grocerycard}>
            <Image source={imageSource} style={styles.groceryimage} resizeMode="contain" />
            <Text style={styles.grocerytitle}>{title}</Text>
        </View>
    );
};
// =========================================================================================
//  checkoutitemcard
export const Checkoutitemcard = ({ imageSource, title, weight, price, originalPrice, quantity, onIncrease, onDecrease, onDelete }) => {
    // Determine the weight to display: use provided weight or generate a random one
    const displayWeight = weight && weight !== 'N/A' ? weight : generateRandomWeight();

    return (
        <View style={styles.checkoutcard}>
            {/* Left Image */}
            <Image source={imageSource} style={styles.checkoutimage} />

            {/* Right Content */}
            <View style={styles.infoSection}>
                <Text style={styles.checkouttitleText} numberOfLines={2}>{title}</Text>
                <Text style={styles.checkoutweightText}>{displayWeight}</Text> {/* Use displayWeight here */}

                {/* Wishlist (optional) */}
                <Text style={styles.wishlistText}>Move to wishlist</Text>

                {/* Bottom row: Price + Quantity Control */}
                <View style={styles.bottomRow}>
                    <View style={styles.priceSection}>
                        {/* Display originalPrice struck out if it's different from the current price */}
                        {originalPrice && (parseFloat(originalPrice) || 0) !== (parseFloat(price) || 0) ? (
                            <Text style={styles.originalPrice}>₹{originalPrice}</Text>
                        ) : null}
                        {/* Display "Free" if price is 0 or undefined, else show actual price */}
                        <Text style={styles.checkoutprice}>
                            {(parseFloat(price) || 0) === 0 ? "Free" : `₹${price}`}
                        </Text>
                    </View>

                    <View style={styles.quantityControls}>
                        {/* Delete Button */}
                        <TouchableOpacity style={styles.qtyButton} onPress={onDelete}>
                            <MaterialCommunityIcons name="delete-outline" size={18} color="white" />
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.qtyButton} onPress={onDecrease}>
                            <Text style={styles.qtyText}> - </Text>
                        </TouchableOpacity>
                        <Text style={styles.qtyValue}>{quantity || 1}</Text> {/* This will now display the actual quantity */}
                        <TouchableOpacity style={styles.qtyButton} onPress={onIncrease}>
                            <Text style={styles.qtyText}>+</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </View>
    );
};

// =========================================================================================
// gift banner  card
export const GiftBanner = ({ onPressSelect }) => {
    return (
        <View style={styles.bannerContainer}>
            {/* Gift Bag Image */}
            <Image
                source={require('../../assets/images/shoppingbag.png')} // You'll need to replace this with your actual gift bag image path
                style={styles.giftBagImage}
            />

            {/* Text Content */}
            <View style={styles.textContainer}>
                <Text style={styles.mainText}>Make this a gift!</Text>
                <Text style={styles.subText}>
                    Get your items in a special gift bag for just
                    <Text style={styles.priceText}>₹30</Text>
                </Text>
            </View>

            {/* Select Button */}
            <TouchableOpacity style={styles.selectButton} onPress={onPressSelect}>
                <Text style={styles.selectButtonText}>Select</Text>
            </TouchableOpacity>
        </View>
    );
};
// =====================================================================================
// donation banner card
export const DonationCard = () => {
    // Define the URL for the donation page
    const donationUrl = 'https://khushii.org/donate-2/?source=ICS_GA_GrantG&gad_source=1&gad_campaignid=19204904773&gbraid=0AAAAADKsY86-vis0b6lI0iqVlRBg7L51&gclid=Cj0KCQjwmqPDBhCAARIsADorxIYfFeax9SmWKR-6tBfzJFElLsExluU8UXq5YUwq1an9Z_KeHkEG-jIaAooQEALw_wcB';

    // Function to handle opening the URL
    const handleTapHerePress = async () => {
        try {
            // Directly attempt to open the URL without checking canOpenURL()
            // For standard http/https links, this is often more reliable
            await Linking.openURL(donationUrl);
        } catch (error) {
            console.error("An error occurred while trying to open the URL:", error);
            // Optionally, show an alert to the user that the link couldn't be opened
            // import { Alert } from 'react-native'; at the top if you use Alert
            // Alert.alert('Error', "Could not open the donation link. Please try again later.");
        }
    };

    return (
        <View style={styles.donationcard}>
            {/* Left content section */}
            <View style={styles.leftContent}>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Text style={styles.donationtitle}>Donate to </Text>
                    <Text style={[styles.donationtitle, { fontWeight: 'bold' }]}>Feeding India</Text>
                    <Ionicons name="arrow-forward" size={14} color="#333" style={{ marginLeft: 6 }} />
                </View>

                <Text style={styles.donationsubtitle}>
                    Your continued support will help us serve daily meals to children
                </Text>
                {/* FIX: Ensure "Donation Now" is wrapped in <Text> */}
                <Text style={styles.donationLabel}>Donation Now</Text> 
                {/* Apply the onPress handler here */}
                <TouchableOpacity style={styles.donationbtn} onPress={handleTapHerePress}>
                    <Text style={styles.taptext}>Tap Here</Text>
                </TouchableOpacity>
            </View>

            {/* Right image */}
            <Image
                source={require('../../assets/images/children.jpg')}
                style={styles.childrenImage}
            />
        </View>
    );
};


const styles = StyleSheet.create({
    // --- Styles for the 'Cards' component (Diwali Sale cards) ---
    card: {
        width: 90,
        height: 120,
        borderRadius: 10,
        backgroundColor: '#F9F6EE',
        paddingHorizontal: 5,
        paddingTop: 10,
        marginHorizontal: 5,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    text: {
        fontWeight: '600',
        fontSize: 10,
        letterSpacing: -0.3,
        textAlign: 'center',
        marginBottom: 5,
    },
    images: {
        width: 70,
        height: 70,
        resizeMode: 'contain',
        margin: 5,
    },
    // ===========================================================================================
    // --- Styles for the 'ItemCard' component (Product cards with price) ---
    itemCardContainer: {
        width: 155,
        backgroundColor: '#fff',
        borderRadius: 12,
        marginHorizontal: 10,
        marginBottom: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,

        overflow: 'hidden',
    },

    imageWrapper: {
        position: 'relative',
        width: '100%',
        height: 170,
        borderRadius: 14,
        overflow: 'hidden',
    },

    productImage: {
        width: '100%',
        height: '100%',
        resizeMode: 'cover',
    },

    addButton: {
        position: 'absolute',
        bottom: 8,
        right: 8,
        backgroundColor: '#E6F4EA',
        borderColor: '#28a745',
        borderWidth: 1,
        borderRadius: 5,
        paddingHorizontal: 12,
        paddingVertical: 3,
    },

    addButtonText: {
        color: '#28a745',
        fontSize: 12,
        fontWeight: 'bold',
    },

    detailsContainer: {
        paddingHorizontal: 10,
        paddingVertical: 8,
    },

    titleText: {
        fontSize: 13,
        fontWeight: '600',
        color: '#222',
        marginBottom: 4,
        lineHeight: 18,
    },

    deliveryTimeContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 4,
    },

    deliveryTimeText: {
        fontSize: 12,
        color: '#666',
        marginLeft: 4,
    },

    priceText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#000',
    },


    // ========================================================================================
    //  style for grocerycard
    grocerycard: {
        width: 110,
        height: 140,
        backgroundColor: '#E8F5FD',
        borderRadius: 15,
        padding: 10,
        marginRight: 10,
        alignItems: 'center',
        justifyContent: 'center',
    },
    groceryimage: {
        width: 90,
        height: 60,
        marginBottom: 10,
    },
    grocerytitle: {
        fontSize: 12,
        fontWeight: '500',
        textAlign: 'center',
        color: '#000',
    },
    // =================================================================================================
    // styling for  checkout item card
    checkoutcard: {
        flexDirection: 'row',
        padding: 12,
        // marginBottom: 12, // Commented out as per original
        backgroundColor: '#fff',
        // borderRadius: 10, // Commented out as per original
        // elevation: 2, // Commented out as per original
        // shadowColor: '#000', // Commented out as per original
        // shadowOpacity: 0.1, // Commented out as per original
        // shadowOffset: { width: 0, height: 1 }, // Commented out as per original
        // shadowRadius: 3, // Commented out as per original
    },
    checkoutimage: {
        minWidth: 70,
        minHeight: 70,
        maxHeight: 80,
        maxWidth: 80,
        resizeMode: 'contain',
        marginRight: 12,
    },
    infoSection: {
        flex: 1,
        justifyContent: 'space-between',
    },
    checkouttitleText: {
        fontSize: 14,
        fontWeight: '600',
        color: '#111',
    },
    checkoutweightText: {
        fontSize: 13,
        color: '#555',
        marginTop: 2,
    },
    wishlistText: {
        fontSize: 12,
        color: '#999',
        marginTop: 4,
    },
    bottomRow: {
        flexDirection: 'row',
        marginTop: 8,
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    priceSection: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    originalPrice: {
        fontSize: 13,
        color: '#999',
        textDecorationLine: 'line-through',
        marginRight: 5,
    },
    checkoutprice: {
        fontSize: 15,
        fontWeight: 'bold',
        color: '#000',
    },
    quantityControls: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#4CAF50',
        borderRadius: 6,
        overflow: 'hidden',
    },
    qtyButton: {
        paddingHorizontal: 10,
        paddingVertical: 4,
    },
    qtyText: {
        fontSize: 16,
        color: 'white',
        fontWeight: 'bold',
    },
    qtyValue: {
        backgroundColor: 'white',
        paddingHorizontal: 8,
        paddingVertical: 2,
        fontSize: 14,
        fontWeight: 'bold',
        color: '#000',
    },
    // ======================================================================================
    // shopping bag  styling  start from here
    bannerContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#F7E7D9', // Light orange/cream background from screenshot
        borderRadius: 10,
        padding: 15,
        marginHorizontal: 15, // Add some margin from screen edges
        marginVertical: 10, // Space above/below the banner
        elevation: 2, // Android shadow
        shadowColor: '#000', // iOS shadow
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
        marginTop: 30
    },
    giftBagImage: {
        width: 60, // Adjust size as needed
        height: 60, // Adjust size as needed
        resizeMode: 'contain',
        marginRight: 15,
    },
    textContainer: {
        flex: 1, // Allows text to take up available space
        marginRight: 10, // Space before the button
    },
    mainText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#333333',
        marginBottom: 4,
    },
    subText: {
        fontSize: 13,
        color: '#666666',
    },
    priceText: {
        fontWeight: 'bold',
        color: '#000000', // Black for the price
    },
    selectButton: {
        backgroundColor: '#FFFFFF', // White background for the button
        borderColor: '#52B788', // Green border
        borderWidth: 1,
        borderRadius: 20, // More rounded corners
        paddingVertical: 8,
        paddingHorizontal: 18,
        justifyContent: 'center',
        alignItems: 'center',
    },
    selectButtonText: {
        fontSize: 14,
        fontWeight: 'bold',
        color: '#52B788', // Green text
    },
    // =======================================================================================
    // donation  banner styling
    donationcard: {
        backgroundColor: '#F2D2BD',
        borderRadius: 16,
        padding: 16,
        marginHorizontal: 16,
        marginTop: 20,
        marginVertical: 10,
        position: 'relative',
        overflow: 'hidden',
    },
    leftContent: {
        marginBottom: 20,
    },
    donationtitle: {
        fontSize: 14,
        fontWeight: 'bold',
        color: '#000',
    },
    donationsubtitle: {
        marginTop: 6,
        fontSize: 13,
        color: '#4f4f4f',
        lineHeight: 18,

    },
    donationLabel: {
        marginTop: 16,
        fontSize: 13,
        fontWeight: '700',
        color: '#222',
    },
    rightBox: {
        position: 'absolute',
        bottom: 16,
        right: 16,
        backgroundColor: '#fff',
        borderRadius: 8,
        paddingVertical: 6,
        paddingHorizontal: 10,
        borderWidth: 1,
        borderColor: '#dadada',
        alignItems: 'center',
        justifyContent: 'center',
    },
    donationbtn: {
        width: 100,
        height: 40,
        backgroundColor: "#CD7F32",
        borderRadius: 20,
        marginTop: 10,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",


    },
    taptext: {
        color: "white",
        fontWeight: "bold"
    },
    childrenImage: {
        position: 'absolute',
        bottom: 10,
        right: 10,
        width: 120,
        height: 80,
        resizeMode: 'cover',
        borderRadius: 10,
        width: 200,
        height: 100
    },
});

export default Cards;
