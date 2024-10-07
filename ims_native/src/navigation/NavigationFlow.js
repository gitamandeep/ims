import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import { NavigationContainer, useFocusEffect } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/authContext";
import HistoryScreen from "../screens/HistoryScreen/HistoryScreen";
import SupplierScreen from "../screens/SupplierScreen/SupplierScreen";
import HomeScreen from "../screens/HomeScreen/HomeScreen";
import ProductListSceen from "../screens/ProductListScreen/ProductListScreen";
import ProfileScreen from "../screens/ProfileScreen/ProfileScreen";
import LoginScreen from "../screens/LoginScreen/LoginScreen";
import AdminScreen from "../screens/AdminScreen/AdminScreen";
import ForgotPasswordScreen from "../screens/LoginScreen/ForgotPasswordScreen";
import AddProduct from "../screens/ProductListScreen/AddProduct";
import Purchase from "../screens/HistoryScreen/Components/Purchase";
import CartScreen2 from "../screens/AddDeliveryOrderScreen/CartScreen2";
import Delivery from "../screens/HistoryScreen/Components/Delivery";
import {
  AntDesign,
  Ionicons,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
import AddDeliveryOrderScreen from "../screens/AddDeliveryOrderScreen/AddDeliveryOrderScreen";
import GodownDetails from "../screens/GodownScreen/GodownDetails";
import DeliveryDetails from "../screens/HistoryScreen/DeliveryDetails";
import PurchaseDetails from "../screens/HistoryScreen/PurchaseDetails";
import AsyncStorage from "@react-native-async-storage/async-storage";
import OTPVerificationScreen from "../screens/LoginScreen/OTPVerificationScreen";
import AddSupplier from "../screens/SupplierScreen/AddSupplier";
import AddPurchaseOrderScreen from "../screens/AddPurchaseOrderScreen/AddPurchaseOrderScreen";

import ChangePasswordScreen from "../screens/ChangePasswordScreen/ChangePasswordScreen";
import ResetPasswordScreen from "../screens/LoginScreen/ResetPasswordScreen";
import EditProfileScreen from "../screens/EditProfileScreen/EditProfileScreen";
import TopBar from "../components/Topbar";
import ProductListScreen from "../screens/ProductListScreen/ProductListScreen";
import Godowns from "../screens/GodownScreen/Components/Godowns";
import CustomerScreen from "../screens/CustomerScreen/CustomerScreen";
import GodownScreen from "../screens/GodownScreen/GodownScreen";
import React from "react";
import AddProducts from "../screens/ProductListScreen/AddProduct";

import DeliveryOrderBill from "../screens/HistoryScreen/Components/DeliveryOrderBill";

import AddCustomer from "../screens/CustomerScreen/AddCustomer";
import AddGodown from "../screens/GodownScreen/AddGodown";
import AddGodownHead from "../screens/GodownScreen/AddGodownhead";
import UpdateCustomer from "../screens/CustomerScreen/UpdateCustomer";
import UpdateSupplier from "../screens/SupplierScreen/UpdateSupplier";
import UpdateProduct from "../screens/ProductListScreen/UpdateProduct";

import CartScreen from "../screens/AddPurchaseOrderScreen/CartScreen";
const Stack = createStackNavigator();

const BottomStack = createMaterialBottomTabNavigator();


const AuthStack = () => {
  return (
    <Stack.Navigator initialRouteName="LoginScreen">
      <Stack.Screen
        name="LoginScreen"
        component={LoginScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="ForgotPassword"
        component={ForgotPasswordScreen}
       
      />
      <Stack.Screen
        name="OtpVerification"
        component={OTPVerificationScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="ResetPasswordScreen"
        component={ResetPasswordScreen}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};


const AppBottomStack = () => {
    const {role}  = useContext(AuthContext);
    // console.log("navigation : "+role);
    return (
        <BottomStack.Navigator >

            <BottomStack.Screen
                name="Home"
                component={role=="admin"?AdminScreen:HomeScreen}
                options={{
                    title: 'Home',
                    tabBarIcon: ({ color, size }) => (
                        <Ionicons name="home-outline" color={color} size={20} />
                    ),
                }}
            />


            <BottomStack.Screen
                name="History"
                component={HistoryScreen}
                options={{
                    tabBarIcon: ({ color, size }) => (
                        <MaterialCommunityIcons name="history" color={color} size={20} />
                    ),
                }}
            />
            {/* <BottomStack.Screen
                name="Supplier"
                component={SupplierScreen}
                options={{
                    tabBarIcon: ({ color, size }) => (
                        <MaterialCommunityIcons
                            name="truck-cargo-container"
                            color={color}
                            size={20}
                        />
                    ),
                }}
            /> */}
      <BottomStack.Screen
        name="Profile"
        component={ProfileStack}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="person-circle-outline" color={color} size={20} />
          ),
        }}
      />
    </BottomStack.Navigator>
  );
};

const ProfileStack = () => {
    return (
        <Stack.Navigator >
            <Stack.Screen name="ProfileScreen" component={ProfileScreen} options={{ headerShown: false }} />
            <Stack.Screen name="EditProfile" component={EditProfileScreen} />
            <Stack.Screen name="ChangePassword" component={ChangePasswordScreen} />
        </Stack.Navigator>
    );

}

const HistoryStack = () => {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>

        </Stack.Navigator>
    );

}

const NavigationFlow = ({ navigation }) => {

    const { auth } = useContext(AuthContext);
  
    return (
        <NavigationContainer >
            <Stack.Navigator options={{ headerShown: false }} >
                {!auth ? <Stack.Screen name="Auth" component={AuthStack} options={{headerShown:false}} /> : <Stack.Screen name="IMS" component={AppBottomStack} options={{ headerShown: false }} />}
                <Stack.Screen name="Add Supplier" component={AddSupplier} />
                <Stack.Screen name="Add Customer" component={AddCustomer} />


                <Stack.Screen name="Supplier" component={SupplierScreen} />
                <Stack.Screen name="Product" component={ProductListScreen} />
                <Stack.Screen name="Invoice" component={DeliveryOrderBill} />
                <Stack.Screen name="PurchaseDetails" component={PurchaseDetails} />
                <Stack.Screen name="Update Customer" component={UpdateCustomer} />
                <Stack.Screen name="Update Supplier" component={UpdateSupplier} />
                <Stack.Screen name="Add Product" component={AddProducts} />
                <Stack.Screen name="Add P/O" component={AddPurchaseOrderScreen} />
            <Stack.Screen name="Add Delivery Order" component={AddDeliveryOrderScreen}/>
                {/* <Stack.Screen name="Add D/O" component={ProductListScreen} /> */}
                <Stack.Screen name="Add Godown" component={AddGodown} />
                <Stack.Screen name="Add Godownhead" component={AddGodownHead} />
                <Stack.Screen name="Cart" component={CartScreen} />
            <Stack.Screen name="Cart2" component={CartScreen2}/>

                <Stack.Screen name="Godown" component={GodownScreen} />
                <Stack.Screen name="Customer" component={CustomerScreen} />
                <Stack.Screen name="GodownDetails" component={GodownDetails} />
                <Stack.Screen name="Purchase" component={Purchase} />
            <Stack.Screen name="Delivery" component={Delivery} />


            </Stack.Navigator>

    </NavigationContainer>
  );
};

export default NavigationFlow;
