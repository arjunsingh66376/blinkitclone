import { StyleSheet, Text, View, Image, TouchableOpacity, Linking } from 'react-native';
import React from 'react';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';

// ...existing code...
import imgdiya from '../../assets/images/imgdiya.png';
import imgchoco from '../../assets/images/imgchoco.png';
import imgps5 from '../../assets/images/imgps5.png';
import imghome from '../../assets/images/imghome&living.png';
// ...existing code...

const generateRandomWeight = () => {
    const units = ['gm', 'kg', 'pack', 'ml', 'L'];
    const randomUnit = units[Math.floor(Math.random() * units.length)];
    let value;

    switch (randomUnit) {
        case 'gm':
            value = Math.floor(Math.random() * (1000 - 50) + 50);
            return `${value} ${randomUnit}`;
        case 'kg':
            value = (Math.random() * (5 - 0.1) + 0.1).toFixed(1);
            return `${value} ${randomUnit}`;
        case 'pack':
            value = Math.floor(Math.random() * (10 - 1) + 1);
            return `${value} ${randomUnit}`;
        case 'ml':
            value = Math.floor(Math.random() * (1000 - 100) + 100);
            return `${value} ${randomUnit}`;
        case 'L':
            value = (Math.random() * (5 - 0.5) + 0.5).toFixed(1);
            return `${value} ${randomUnit}`;
        default:
            return '1 unit';
    }
};

// --- Cards Component (Default Export) ---
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
            <Image source={imagemap[imgkey]} style={styles.images} />
            {/* Defensive: ensure primitive children are wrapped in <Text> */}
            {React.Children.map(children, (child, idx) => {
                if (child == null) return null;
                if (React.isValidElement(child)) return child;
                // Wrap primitives (string/number/boolean) in Text to avoid "text must be rendered in <Text>" errors
                if (typeof child === 'string' || typeof child === 'number' || typeof child === 'boolean') {
                    return <Text key={idx}>{String(child)}</Text>;
                }
                return child;
            })}
        </View>
    );
};
// ===========================================================================================
// --- ItemCard Component (Named Export) ---
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
                <TouchableOpacity style={styles.addButton} onPress={onAddPress}>
                    <Text style={styles.addButtonText}>ADD</Text>
                </TouchableOpacity>
            </View>

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
    const displayWeight = weight && weight !== 'N/A' ? weight : generateRandomWeight();

    return (
        <View style={styles.checkoutcard}>
            <Image source={imageSource} style={styles.checkoutimage} />
            <View style={styles.infoSection}>
                <Text style={styles.checkouttitleText} numberOfLines={2}>{title}</Text>
                <Text style={styles.checkoutweightText}>{displayWeight}</Text>
                <Text style={styles.wishlistText}>Move to wishlist</Text>

                <View style={styles.bottomRow}>
                    <View style={styles.priceSection}>
                        {originalPrice && (parseFloat(originalPrice) || 0) !== (parseFloat(price) || 0) ? (
                            <Text style={styles.originalPrice}>₹{originalPrice}</Text>
                        ) : null}
                        <Text style={styles.checkoutprice}>
                            {(parseFloat(price) || 0) === 0 ? "Free" : `₹${price}`}
                        </Text>
                    </View>

                    <View style={styles.quantityControls}>
                        <TouchableOpacity style={styles.qtyButton} onPress={onDelete}>
                            <MaterialCommunityIcons name="delete-outline" size={18} color="white" />
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.qtyButton} onPress={onDecrease}>
                            <Text style={styles.qtyText}>-</Text>
                        </TouchableOpacity>
                        <Text style={styles.qtyValue}>{quantity || 1}</Text>
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
            <Image
                source={require('../../assets/images/shoppingbag.png')}
                style={styles.giftBagImage}
            />

            <View style={styles.textContainer}>
                <Text style={styles.mainText}>Make this a gift!</Text>
                <Text style={styles.subText}>
                    Get your items in a special gift bag for just <Text style={styles.priceText}>₹30</Text>
                </Text>
            </View>

            <TouchableOpacity style={styles.selectButton} onPress={onPressSelect}>
                <Text style={styles.selectButtonText}>Select</Text>
            </TouchableOpacity>
        </View>
    );
};
// =====================================================================================
// donation banner card
export const DonationCard = () => {
    const donationUrl = 'https://khushii.org/donate-2/?source=ICS_GA_GrantG&gad_source=1&gad_campaignid=19204904773&gbraid=0AAAAADKsY86-vis0b6lI0iqVlRBg7L51&gclid=Cj0KCQjwmqPDBhCAARIsADorxIYfFeax9SmWKR-6tBfzJFElLsExluU8UXq5YUwq1an9Z_KeHkEG-jIaAooQEALw_wcB';

    const handleTapHerePress = async () => {
        try {
            await Linking.openURL(donationUrl);
        } catch (error) {
            console.error("An error occurred while trying to open the URL:", error);
        }
    };

    return (
        <View style={styles.donationcard}>
            <View style={styles.leftContent}>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Text style={styles.donationtitle}>Donate to </Text>
                    <Text style={[styles.donationtitle, { fontWeight: 'bold' }]}>Feeding India</Text>
                    <Ionicons name="arrow-forward" size={14} color="#333" style={{ marginLeft: 6 }} />
                </View>

                <Text style={styles.donationsubtitle}>
                    Your continued support will help us serve daily meals to children
                </Text>

                <Text style={styles.donationLabel}>Donation Now</Text>

                <TouchableOpacity style={styles.donationbtn} onPress={handleTapHerePress}>
                    <Text style={styles.taptext}>Tap Here</Text>
                </TouchableOpacity>
            </View>

            <Image
                source={require('../../assets/images/children.jpg')}
                style={styles.childrenImage}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    // ...existing styles...
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
    // itemCard styles...
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
    checkoutcard: {
        flexDirection: 'row',
        padding: 12,
        backgroundColor: '#fff',
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
    bannerContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#F7E7D9',
        borderRadius: 10,
        padding: 15,
        marginHorizontal: 15,
        marginVertical: 10,
        elevation: 2,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
        marginTop: 30
    },
    giftBagImage: {
        width: 60,
        height: 60,
        resizeMode: 'contain',
        marginRight: 15,
    },
    textContainer: {
        flex: 1,
        marginRight: 10,
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
    selectButton: {
        backgroundColor: '#FFFFFF',
        borderColor: '#52B788',
        borderWidth: 1,
        borderRadius: 20,
        paddingVertical: 8,
        paddingHorizontal: 18,
        justifyContent: 'center',
        alignItems: 'center',
    },
    selectButtonText: {
        fontSize: 14,
        fontWeight: 'bold',
        color: '#52B788',
    },
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
        width: 200,
        height: 100,
        resizeMode: 'cover',
        borderRadius: 10,
    },
});

export default Cards;