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
import api from "../../api/axiosConfig";
import serverUrl from "../../api/urls";
import { useNavigation } from "@react-navigation/native";

export default function CartScreen2() {
  const { cart2, removeFromCart2, decreaseQuantity2, increaseQuantity2 } =
    useCart();

  const Navigation = useNavigation();
  console.log("cardtScreen2");
  console.log("--------" + JSON.stringify(cart2));
  const placeOrder = async () => {
    try {
      const userString = await AsyncStorage.getItem("user");
      const user = JSON.parse(userString).godownId;
      // Prepare data in the required format
      const requestData = {
        // godownId: Number(user), // Replace with the appropriate godownId
        orderQuantity: cart2[0].Quantity,
        // customerId: cart2[0].customerId,
        // customerName: cart2[0].customerName,
        // customerAddress: cart2[0].customerAddress,
        // customerNo: cart2[0].customerNo,

        // tax: cart2[0].tax,
        // godownHeadName: cart2[0].godownHeadName,
        // godownAddress: cart2[0].godownAddress,

        totalSellPrice: calculateTotalSell(cart2), // Implement calculateTotalCost function to calculate total cost
        products: cart2.map((item) => ({
          productName: item.ProductName,
          orderQuantity: item.Quantity, // Ensure Quantity is converted to integer
          sellPrice: parseFloat(item.SellPrice), // Ensure Price is converted to float
          taxPercentage: 18, // Ensure productVolume is converted to float
          tax: item.tax,
        })),
      };
      console.log("hellow");
      console.log("hellooo");
      console.log(requestData);

      // Make POST request to the API endpoint
      console.log(`${serverUrl.placeOrder}` + cart2[0].customerId, requestData);
      const response = await api.post(
        `${serverUrl.placeOrder}` + cart2[0].customerId,
        requestData
      );
      Navigation.navigate("Delivery");

      // console.log(response.data); // Log response from the API
    } catch (error) {
      console.error("Error placing order:", error);
    }
  };

  const calculateTotalSell = (cart2) => {
    let amount = 0;
    cart2.map((item) => {
      amount = amount + parseFloat(item.SellPrice) * parseInt(item.Quantity);
    });
    return amount;
  };
  const renderItems = ({ item }) => (
    <View style={styles.itemView}>
      <View style={styles.leftContainer}>
        <Text style={styles.nameText}>{item.ProductName}</Text>
      </View>
      <View style={styles.rightContainer}>
        <TouchableOpacity onPress={() => decreaseQuantity2(item.ProductName)}>
          <Text style={styles.btn}>-</Text>
        </TouchableOpacity>
        <Text style={styles.quantity}>{item.Quantity}</Text>
        <TouchableOpacity onPress={() => increaseQuantity2(item.ProductName)}>
          <Text style={styles.btn}>+</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => removeFromCart2(item.ProductName)}>
          <AntDesign name="delete" size={24} color="black" />
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={{ fontSize: 15, textAlign: "center" }}>My Cart</Text>
      <FlatList
        data={cart2}
        renderItem={renderItems}
        keyExtractor={(item) => item.ProductName}
      />

      <CustomButton
        title="Place Order"
        // loading={loading}
        onSubmit={() => placeOrder(cart2)}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 5,
    marginBottom: Dimensions.get("window").width * 0.18,
  },
  itemView: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 10,
    backgroundColor: "#fff",
    elevation: 4,
    marginVertical: 10,
    borderRadius: 10,
    height: 60,
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
    fontSize: 18,
    fontWeight: "700",
  },
  btn: {
    fontSize: 28,
    paddingHorizontal: 12,
  },
});
