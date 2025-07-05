import { Image, SafeAreaView, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Appbar from '../../component/Appbar'
import Cards, { CategoryCard, GroceryCard, ItemCard } from '../../component/Cards'
import img110 from '../../../assets/images/img110.png';
import img120 from '../../../assets/images/img120.png';
import img130 from '../../../assets/images/img130.png';
import img140 from '../../../assets/images/img140.png';
import img150 from '../../../assets/images/img150.png';
import img160 from '../../../assets/images/img160.png';
import img170 from '../../../assets/images/img170.png';
import img200 from '../../../assets/images/img200.png';
import img210 from '../../../assets/images/img210.png';
import img220 from '../../../assets/images/img220.png';
import img230 from '../../../assets/images/img230.png';
import img240 from '../../../assets/images/img240.png';
import img250 from '../../../assets/images/img250.png';
import img260 from '../../../assets/images/img260.png';
import img270 from '../../../assets/images/img270.png';

import { ScrollView } from 'react-native-gesture-handler';

const Homescreen = () => {
  const handleadditem =()=>{
    console.log('item added to cart');
    
  }
  return (
    <SafeAreaView style={{flex:1,backgroundColor:"white"}}>
{/* app bar custom component */}
    <Appbar bgcolor={"#EC0505"} color={"white"} circlebgcolor={"white"} />

    {/* offer banner  */}
    <View style={styles.offerbg}>
      {/* first row */}
      <View style={styles.offerheadingrow}>
        {/* image1 wrapper and images  */}
        <View style={styles.img1wrapper}>
          <Image source={require('../../../assets/images/bigimg1.png')} style={styles.img1big}  />
          <Image source={require('../../../assets/images/smallimg1.png')} style={styles.img2small}  />
        </View>
        {/* heading */}
        <Text style={styles.heading}>Mega Diwali Sale 20%off</Text>
        {/* image2 wrapper and images */}
        <View style={styles.img2wrapper}>
          <Image source={require('../../../assets/images/smallimg1.png')} style={styles.img3small}  />
          <Image source={require('../../../assets/images/bigimg1.png')}  style={styles.img4big}/>
        </View>
      </View>

    {/* second row */}
    <View style={styles.cardrow}>
      {/* card one  */}
     <Cards content='Lights, Diyas & Candles' imgkey='diya'>
     </Cards>
     {/* card two */}
     <Cards content='Diwali Gifts' imgkey='choco'>
     </Cards>
     {/* card three */}
     <Cards content='Appliances & Gadgets' imgkey='ps5'>
     </Cards>
     {/* card four */}
     <Cards content='Home & Living' imgkey='home'>
     </Cards>
    </View>

    </View>

{/* ========================================================================================== */}
    {/*   hero section  from here */}
    <View style={styles.herosectionbg}>
      <ScrollView  showsVerticalScrollIndicator={false}>
<View style={styles.Itemcardwrapper}>
  <ScrollView horizontal showsHorizontalScrollIndicator={false}>
    <ItemCard  title="Golden Glass Wooden Lid Candle (Oudh)" deliveryTime="16 Mins"  price="₹ 79"  productImage={img110} onAddPress={handleadditem} />
    <ItemCard  title="Royal Gulab Jamun By Bikano" deliveryTime="10 Mins"  price="₹ 49"  productImage={img120} onAddPress={handleadditem} />
    <ItemCard  title="Bikaji Bhujia" deliveryTime="30 Mins"  price="₹ 119"  productImage={img130} onAddPress={handleadditem} />
    <ItemCard  title="Millineans" deliveryTime="2 Mins"  price="₹ 10"  productImage={img140} onAddPress={handleadditem} />
    <ItemCard  title=" Montex Pens" deliveryTime="7 Mins"  price="₹ 200"  productImage={img150} onAddPress={handleadditem} />
    <ItemCard  title="Bansiram Gulab Jamun" deliveryTime="30 Mins"  price="₹ 32"  productImage={img160} onAddPress={handleadditem} />
    <ItemCard  title="Durex Condem" deliveryTime="15 Mins"  price="₹ 450"  productImage={img270} onAddPress={handleadditem} />
    </ScrollView>
</View>

{/* grocery text */}
<Text style={styles.grocerytext}>Grocery & Kitchen</Text>
{/* grocery wrapper  */}
<View style={styles.grocerywrapper}>
  <ScrollView horizontal  showsHorizontalScrollIndicator={false}>
    <GroceryCard imageSource={img200} title='Vegetables & Fruits'   />
    <GroceryCard imageSource={img210} title= 'Atta, Dal & Rice' />
    <GroceryCard imageSource={img220}title= 'Oil, Ghee & Masala' />
    <GroceryCard imageSource={img230} title='Dairy, Bread & Milk'  />
    <GroceryCard imageSource={img240} title='Cucumbers'  />
    <GroceryCard imageSource={img250} title= 'Apples' />
    <GroceryCard imageSource={img260}title= 'Chocolates'  />
    <GroceryCard imageSource={img170} title='Kurkure'  />
  </ScrollView>

</View> 
   
</ScrollView>
    </View>
    </SafeAreaView>
  )
}

export default Homescreen

const styles = StyleSheet.create({
  offerbg:{
    height:200,
    width:'100%',
    backgroundColor:'#EC0505',
    paddingHorizontal:10
    
   
  },
  offerheadingrow:{
    width:'100%',
    height:60,
    display:'flex',
    flexDirection:'row',
    justifyContent:'space-between',
    
  },
  img1wrapper:{
    width:100,
    height:59,
    display:'flex',
    flexDirection:'row'
  },
  img1big:{
    width:50,
    height:58
  },
  img2small:{
    width:50,
    height:47
  },
  heading:{
    fontSize:20,
    fontWeight:'bold',
    alignSelf:'center',
    color:"white"
  },

  img2wrapper:{
    width:100,
    height:59,
    display:'flex',
    flexDirection:'row'
  },
  img3small:{
    width:50,
    height:47
  },
  img4big:{
    width:50,
    height:58
  },
  cardrow:{
    flex:1,
    width:'100%',
    display:'flex',
    flexDirection:'row',
    justifyContent:'space-around',
  },
  // hero section  start from here 
  herosectionbg:{
    flex:1,
    backgroundColor:"white",
    padding:10
  },
 Itemcardwrapper:{
  height:300,
  display:'flex',
  flexDirection:"row",
  marginRight:20,
  marginTop:20

  
 },
 grocerytext:{
  fontSize:17,
  fontWeight:"bold",
  paddingHorizontal:20,
  
 },
 grocerywrapper:{
   flex:1,
   marginVertical:15,
   display: 'flex',
   flexDirection:"row",

 },
 

  
})