// src/data/products.js

// Import all necessary images here
import img110 from '../../assets/images/img110.png';
import img120 from '../../assets/images/img120.png';
import img130 from '../../assets/images/img130.png';
import img140 from '../../assets/images/img140.png';
import img150 from '../../assets/images/img150.png';
import img160 from '../../assets/images/img160.png';
import img170 from '../../assets/images/img170.png';
import img200 from '../../assets/images/img200.png';
import img210 from '../../assets/images/img210.png';
import img220 from '../../assets/images/img220.png';
import img230 from '../../assets/images/img230.png';
import img240 from '../../assets/images/img240.png';
import img250 from '../../assets/images/img250.png';
import img260 from '../../assets/images/img260.png';
import img270 from '../../assets/images/img270.png';
import img300 from '../../assets/images/img300.png';
import img310 from '../../assets/images/img310.png';
import img320 from '../../assets/images/img320.png';
import img330 from '../../assets/images/img330.png';
import img340 from '../../assets/images/img340.png';
import img350 from '../../assets/images/img350.png';
import img360 from '../../assets/images/img360.png';
import img400 from '../../assets/images/img400.png';
import img410 from '../../assets/images/img410.png';
import img420 from '../../assets/images/img420.png';
import img430 from '../../assets/images/img430.png';
import img440 from '../../assets/images/img440.png';
import img450 from '../../assets/images/img450.png';
import img460 from '../../assets/images/img460.png';
import img500 from '../../assets/images/img500.png';
import img510 from '../../assets/images/img510.png';
import img520 from '../../assets/images/img520.png';
import img530 from '../../assets/images/img530.png';
import img540 from '../../assets/images/img540.png';
import img550 from '../../assets/images/img550.png';
import img560 from '../../assets/images/img560.png';


export const ALL_PRODUCTS = [
  // Items from Homescreen (ItemCard section)
  { id: 'item1', title: "Golden Glass Wooden Lid Candle (Oudh)", deliveryTime: "16 Mins", price: "79", productImage: img110, category: "Home & Living" },
  { id: 'item2', title: "Royal Gulab Jamun By Bikano", deliveryTime: "10 Mins", price: "49", productImage: img120, category: "Sweets" },
  { id: 'item3', title: "Bikaji Bhujia", deliveryTime: "30 Mins", price: "119", productImage: img130, category: "Snacks" },
  { id: 'item4', title: "Millineans", deliveryTime: "2 Mins", price: "10", productImage: img140, category: "Stationery" },
  { id: 'item5', title: "Montex Pens", deliveryTime: "7 Mins", price: "200", productImage: img150, category: "Stationery" },
  { id: 'item6', title: "Bansiram Gulab Jamun", deliveryTime: "30 Mins", price: "32", productImage: img160, category: "Sweets" },
  { id: 'item7', title: "Durex Condem", deliveryTime: "15 Mins", price: "450", productImage: img270, category: "Personal Care" },

  // Grocery & Kitchen items from Homescreen (these were categories, now treated as searchable items)
  { id: 'grocery1', title: 'Vegetables & Fruits', imageSource: img200, price: '0', weight: 'Various', category: 'Grocery & Kitchen' },
  { id: 'grocery2', title: 'Atta, Dal & Rice', imageSource: img210, price: '0', weight: 'Various', category: 'Grocery & Kitchen' },
  { id: 'grocery3', title: 'Oil, Ghee & Masala', imageSource: img220, price: '0', weight: 'Various', category: 'Grocery & Kitchen' },
  { id: 'grocery4', title: 'Dairy, Bread & Milk', imageSource: img230, price: '0', weight: 'Various', category: 'Grocery & Kitchen' },
  { id: 'grocery5', title: 'Cucumbers', imageSource: img240, price: '0', weight: '1 kg', category: 'Grocery & Kitchen' },
  { id: 'grocery6', title: 'Apples', imageSource: img250, price: '0', weight: '1 kg', category: 'Grocery & Kitchen' },
  { id: 'grocery7', title: 'Chocolates', imageSource: img260, price: '0', weight: 'Various', category: 'Grocery & Kitchen' },
  { id: 'grocery8', title: 'Kurkure', imageSource: img170, price: '0', weight: '1 pack', category: 'Snacks' },

  // Items from Categoryscreen
  { id: 'cat1', title: 'Vegetables & Fruits', imageSource: img200, category: 'Grocery & Kitchen' },
  { id: 'cat2', title: 'Atta, Dal & Rice', imageSource: img210, category: 'Grocery & Kitchen' },
  { id: 'cat3', title: 'Oil, Ghee & Masala', imageSource: img220, category: 'Grocery & Kitchen' },
  { id: 'cat4', title: 'Dairy, Bread & Milk', imageSource: img230, category: 'Grocery & Kitchen' },
  { id: 'cat5', title: 'Cucumbers', imageSource: img240, category: 'Grocery & Kitchen' },
  { id: 'cat6', title: 'Apples', imageSource: img250, category: 'Grocery & Kitchen' },
  { id: 'cat7', title: 'Chocolates', imageSource: img260, category: 'Grocery & Kitchen' },
  { id: 'cat8', title: 'Kurkure', imageSource: img270, category: 'Snacks' },
  { id: 'cat9', title: 'Dry Fruits & Cereals', imageSource: img300, category: 'Grocery & Kitchen' },
  { id: 'cat10', title: 'Kitchen & Appliances', imageSource: img310, category: 'Household Essentials' },
  { id: 'cat11', title: 'Tea & Coffees', imageSource: img320, category: 'Snacks & Drinks' },
  { id: 'cat12', title: 'Ice Creams & much more', imageSource: img330, category: 'Snacks & Drinks' },
  { id: 'cat13', title: 'Noodles & Packet Food', imageSource: img340, category: 'Snacks & Drinks' },
  { id: 'cat14', title: 'Snacks & Drinks', imageSource: img350, category: 'Snacks & Drinks' }, // Duplicate title, adjust as needed
  { id: 'cat15', title: 'Chocolates', imageSource: img360, category: 'Snacks & Drinks' }, // Duplicate title, adjust as needed
  { id: 'cat16', title: 'Kitchen & Appliances', imageSource: img400, category: 'Household Essentials' }, // Duplicate title, adjust as needed
  { id: 'cat17', title: 'Tea & Coffees', imageSource: img410, category: 'Snacks & Drinks' }, // Duplicate title, adjust as needed
  { id: 'cat18', title: 'Ice Creams & much more', imageSource: img420, category: 'Snacks & Drinks' }, // Duplicate title, adjust as needed
  { id: 'cat19', title: 'Noodles & Packet Food', imageSource: img430, category: 'Snacks & Drinks' }, // Duplicate title, adjust as needed
  { id: 'cat20', title: 'Apples', imageSource: img440, category: 'Grocery & Kitchen' }, // Duplicate title, adjust as needed
  { id: 'cat21', title: 'Chocolates', imageSource: img450, category: 'Snacks & Drinks' }, // Duplicate title, adjust as needed
  { id: 'cat22', title: 'Kurkure', imageSource: img460, category: 'Snacks & Drinks' }, // Duplicate title, adjust as needed
  { id: 'cat23', title: 'Dry Fruits & Cereals', imageSource: img500, category: 'Household Essentials' }, // Duplicate title, adjust as needed
  { id: 'cat24', title: 'Kitchen & Appliances', imageSource: img510, category: 'Household Essentials' }, // Duplicate title, adjust as needed
  { id: 'cat25', title: 'Tea & Coffees', imageSource: img520, category: 'Household Essentials' }, // Duplicate title, adjust as needed
  { id: 'cat26', title: 'Ice Creams & much more', imageSource: img530, category: 'Household Essentials' }, // Duplicate title, adjust as needed
  { id: 'cat27', title: 'Noodles & Packet Food', imageSource: img540, category: 'Household Essentials' }, // Duplicate title, adjust as needed
  { id: 'cat28', title: 'Apples', imageSource: img550, category: 'Grocery & Kitchen' }, // Duplicate title, adjust as needed
  { id: 'cat29', title: 'Chocolates', imageSource: img560, category: 'Household Essentials' }, // Duplicate title, adjust as needed
];