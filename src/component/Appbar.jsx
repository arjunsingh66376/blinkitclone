import { StyleSheet, Text, View,Image, TouchableOpacity } from 'react-native'
import {React,useState} from 'react'
import Icon from 'react-native-vector-icons/FontAwesome';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { TextInput } from 'react-native-gesture-handler';

const Appbar = ({ bgcolor,color,circlebgcolor }) => {
  const [query, setquery] = useState('')
  // logic for mic button in app bar
  const handlemic =()=>{
    console.log("mic is pressed");
    

  }
  
 
  return (
    // app bar bg 
    <View style={[styles.bg, {backgroundColor:bgcolor}]}>
    
      <Text style={[styles.txt1,{color:color}]}>Blinkit in</Text>
      <View style={styles.txt2wrapper}>
      <Text style={[styles.txt2,{color:color}]}>16 minutes</Text>
     
     {/* user image */}
        <View style={[styles.circle,{backgroundColor:circlebgcolor}]}>
          <Image source={ require('../../assets/images/user_black.png' )} style={styles.userimg}/>
        </View>

  
      </View>
      <View style={styles.txt3wrapper}>
      <Text style={[styles.txt3,{color:color}]}> HOME  -</Text>
      <Text style={[styles.txt4,{color:color}]}> Arjun Singh, Ratanada, Jodhpur (Raj)</Text>
      <Icon name="caret-down" size={20}  />
      </View>

      {/* search  bar */}
      <View style={styles.searchbar}>
       
          <Ionicons name="search" size={18} />
          <TextInput style={styles.textinput} placeholder='Search For Items  ...' placeholderTextColor="#9C9C9C" value={query} onChangeText={setquery}/>
          <TouchableOpacity onPress={handlemic}>

          <Icon name='microphone' size={18}/>
          </TouchableOpacity>
          
      

      </View>
      
    </View>
  )
}

export default Appbar
// =========================================================================================
// app bar  for checkout 
 export const CheckoutAppbar = ({ onBackPress, onSharePress }) => {
  return (
    <View style={styles.appbarContainer}>
      {/* Back Arrow */}
      <TouchableOpacity onPress={onBackPress} style={styles.backButton}>
        <Ionicons name="arrow-back" size={32} color="#333" />
      </TouchableOpacity>

      {/* Title */}
      <Text style={styles.checkouttitleText}>Checkout</Text>

      {/* Share Button with Cart Icon */}
      <TouchableOpacity onPress={onSharePress} style={styles.shareButton}>
        <Ionicons name="cart-outline" size={24} color="#52B788" /> {/* Cart icon */}
        <Text style={styles.shareText}>Share</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
    bg:{
        width:'100%',
        height:175,
        paddingHorizontal:10,
        paddingVertical:20
       
    },
    txt1:{
      fontSize:12,
      fontWeight:"bold",
      
    },
    txt2wrapper:{
      display:'flex',
      flexDirection:"row",
      justifyContent:'space-between'
    , marginTop:3
    },
    txt2:{
      fontSize:20,
      fontWeight:"bold",
      

    },
    circle:{
      borderRadius:16,
      display:'flex',
      alignItems:"center",
      justifyContent:"center",
      height:32,
      width:32,
      marginRight:20
    },
    userimg:{
      height:15,
      width:15,
      alignSelf:'center'
    },
txt3wrapper:{
  display: 'flex',
  flexDirection:'row',
marginBottom:15
},
    txt3:{
      fontSize:12,
      fontWeight:"bold",
      marginTop:4

    },
    txt4:{
      fontSize:12,
      marginRight:15,
      marginTop:4
      
    },
    searchbar:{
      width:420,
      height:40,
      borderRadius:11,
      backgroundColor:"white",
      borderWidth:1,
      borderColor:'#C5C5C5',
      display:'flex',
      justifyContent:"space-around",
      alignItems:"center",
      flexDirection:'row',
      paddingHorizontal:10,
      marginTop:5
    },
    textinput:{
      marginRight:200
    },
    // ===========================================================================================
    // checkout app bar styling 
    appbarContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingHorizontal: 15,
      paddingVertical: 10,
      backgroundColor: '#FFFFFF', // White background for the app bar
      borderBottomWidth: 1,
      borderBottomColor: '#EEEEEE', // Light border at the bottom
      height: 60, // Fixed height for the app bar
    },
    backButton: {
      padding: 5, // Add padding for easier touch
    },
    checkouttitleText: {
      fontSize: 18,
      fontWeight: 'bold',
      color: '#333',
      flex: 1, // Allow title to take remaining space
      textAlign: 'center', // Center the title
      marginLeft: -24, // Adjust to visually center due to back button
    },
    shareButton: {
      flexDirection: 'row',
      alignItems: 'center',
      padding: 5, // Add padding for easier touch
    },
    shareText: {
      fontSize: 16,
      color: '#52B788', // Green color for "Share" text
      marginLeft: 5, // Space between icon and text
    },
})