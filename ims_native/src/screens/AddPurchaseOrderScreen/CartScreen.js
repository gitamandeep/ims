import {
  View,
  Text,
  StyleSheet,
  Image,
  Dimensions,
  FlatList,
} from "react-native";
import React, { useState, useEffect } from "react";
import { useCart } from "../../context/CartContext";
import { TouchableOpacity } from "react-native-gesture-handler";
import { AntDesign } from "@expo/vector-icons";
import CustomButton from "../../components/Button";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import api from "../../api/axiosConfig"
import serverUrl from "../../api/urls";
import { useNavigation } from "@react-navigation/native";
import { FontAwesome } from '@expo/vector-icons';
export default function CartScreen() {
  const { cart, removeFromCart, decreaseQuantity, increaseQuantity } =
    useCart();

  const Navigation = useNavigation();
  console.log(cart);
  const placeOrder = async () => {
    console.log(cart);
    try {
      const userString = await AsyncStorage.getItem("user");
      const user = JSON.parse(userString).godownId;
      console.log(cart.Quantity);
      // Prepare data in the required format
      const requestData = {
        godownId: Number(user), // Replace with the appropriate godownId
        supplierId: cart[0].supplierId, // Replace with the appropriate supplierId
        purchaseQuantity: cart.reduce(
          (total, product) => total + parseInt(product.Quantity),
          0
        ),
        totalCostPrice: calculateTotalCost(cart), // Implement calculateTotalCost function to calculate total cost
        products: cart.map((item) => ({
          productName: item.ProductName,
          purchaseQuantity: item.Quantity, // Ensure Quantity is converted to integer
          costPrice: parseFloat(item.Price), // Ensure Price is converted to float
          productVolume: parseFloat(item.productVolume), // Ensure productVolume is converted to float
          productType: parseFloat(item.productType), // Ensure productType is converted to float
          productCategory: item.Category,
        })),
      };
      console.log("hellow");
      console.log("hellooo");
      console.log(requestData);

      // Make POST request to the API endpoint
      const response = await api.post(`${serverUrl.createPurchaseOrder}`, requestData);
      Navigation.navigate('Purchase');

      // console.log(response.data); // Log response from the API
    } catch (error) {
      console.error("Error placing order:", error);
    }
  };

  const calculateTotalCost = (cart) => {
    return cart.reduce((total, item) => {
      return total + parseFloat(item.Price) * parseInt(item.Quantity);
    }, 0);
  };
  const renderItems = ({ item }) => (
    <View style={styles.itemView}>
      <View style={styles.leftContainer}>
        <Text style={styles.nameText}>{item.ProductName}</Text>
        <Text style={styles.priceText}><FontAwesome name="inr" size={14} color="rgb(100,105,110)" />{item.Price}</Text>
      </View>
      <View style={styles.rightContainer}>
      <View style={styles.qtyContainer}>
        <TouchableOpacity onPress={() => decreaseQuantity(item.ProductName)}>
          <Text style={styles.btn}>-</Text>
        </TouchableOpacity>
        <Text style={styles.quantity}>{item.Quantity}</Text>
        <TouchableOpacity onPress={() => increaseQuantity(item.ProductName)}>
          <Text style={styles.plusbtn}>+</Text>
        </TouchableOpacity>
        </View>
        <TouchableOpacity onPress={() => removeFromCart(item.ProductName)}>
          <AntDesign name="delete" size={24} color="rgb(198,0,1)" />
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
    <View style={styles.heading}>
    <Text style={styles.headingtxt}>Review Items</Text>
    </View>
      <View style={styles.cartItems}>
      <FlatList
        data={cart}
        renderItem={renderItems}
        keyExtractor={(item) => item.ProductName}
      />
      </View>
      <View style={styles.placeOrderbtn}>
      <CustomButton 
        title="Place Order"
        // loading={loading}
        onSubmit={() => placeOrder(cart)
        }
      />
      </View>
      
    </View>
  );
}

const styles = StyleSheet.create({
  container: {

    backgroundColor:'#fff',
    flex:1
  },
  itemView: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 10,
    backgroundColor: "#fff",
    borderRadius: 10,
    height: 60,
    borderBottomWidth:1,
    borderColor:'rgb(236,236,235)'
    

  },
  leftContainer: {
    flex: 1,
    marginLeft: 10,
  },
  rightContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: 10,
  },
  nameText: {
    fontSize: 17,
    fontWeight: "500",
  },
  btn: {
    fontSize: 30,
    paddingHorizontal: 12,
    color:'green'
  },
  plusbtn: {
    fontSize: 20,
    paddingHorizontal: 12,
    color:'green'
  },
  qtyContainer:{
    width:80,
    flexDirection: "row",
    alignItems: "center",
    marginRight: 10,
    borderWidth:1,
    borderColor:'rgb(236,236,235)',
    borderRadius:10,
    justifyContent:'space-around'
  },
  priceText: {
    fontSize: 15,
    color:'rgb(100,105,110)'
  },
  cartItems:{
    marginLeft:10,
    marginRight:10,
    borderWidth:1,
    borderRadius:10,
    borderColor:'rgb(236,236,235)',
    
  },
  heading:{
    alignItems:'flex-start',
    margin:12
  },
  headingtxt:{
    fontSize:19,
    fontWeight:'600'
  },
  placeOrderbtn:{
    position:'absolute',

    width:'50%',
    bottom:0,
    right: Dimensions.get('window').width * 0.25,
  }


});
