import { ActivityIndicator, Text } from "react-native-paper";
import Container from "../../components/Container";
import { Dimensions, StyleSheet, View } from "react-native";
import { useContext, useState, useEffect } from "react";
import CustomTextInput from "../../components/TextInput";
import CustomButton from "../../components/Button";
import { useNavigation } from "@react-navigation/native";
import { Context as UserContext } from "../../context/UserContext";
import { Controller, useForm } from "react-hook-form";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { showMessage } from "react-native-flash-message";
import { AntDesign } from "@expo/vector-icons";
import api from "../../api/axiosConfig";
import serverUrl from "../../api/urls";
import { Dropdown } from "react-native-element-dropdown";
import { TouchableOpacity } from "react-native-gesture-handler";
import React from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useCart } from "../../context/CartContext";
import { Entypo } from "@expo/vector-icons";

const AddPurchaseOrderScreen = () => {
  const [loading, setLoading] = useState(false);
  const Navigation = useNavigation();
  const { state, updateUser } = useContext(UserContext);
  const [items, setItems] = useState([]);
  const [selectedValue, setSelectedValue] = useState("");
  const [selectedValue2, setSelectedValue2] = useState("");
  const { addToCart } = useCart();
  const{itemCount} = useCart();
  const {id} = useCart();
  const [GodownId,setGodownId] = useState("");
  
  const dummyData = [
    { label: "2 KW", value: "2 KW" },
    { label: "3.3 KW", value: "3.3 KW" },
    { label: "5 KW", value: "5 KW" },
    { label: "8 KW", value: "8 KW" },
    { label: "12 KW", value: "12 KW" },
    // Add more dummy data as needed
  ];

  

  const getSuppliers = async () => {
    try {
      const response = await api.get(`${serverUrl.getAllSuppliers}`);
      const dropdownItems = response.data.map((supplier, index) => ({
        label: supplier.supplierName,
        value: supplier.supplierId, // Assuming each godown has an id
      }));
      const userString = await AsyncStorage.getItem('user');
      const user = (JSON.parse(userString)).godownId;
      setGodownId(user);
      // console.log(userString);
      
      setItems(dropdownItems);
    } catch (error) {
      console.error("Error fetching data:" + error);
    }
    // console.log(items);
  };

  useEffect(() => {
    const fetchData = async () => {
      await getSuppliers(); // Wait for getSuppliers to complete
    };

    fetchData();
  }, []);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({});

  const onSubmit = (data) => {
    const trimmedData = {
      ...data,
      supplier: data.supplier.label,
      supplierId: data.supplier.value,
      ProductName: data.ProductName.trim(),
      productVolume: data.productVolume.trim(),
      Price: data.Price.trim(),
      Quantity: data.Quantity.trim(),
      Category: data.Category.trim(),
      productType: data.productType.label,
      godownId:GodownId,
    };
    // console.log(trimmedData);
    addToCart(trimmedData);
    // console.log(cart);
    // setLoading(true);
    // updateUser(trimmedData)
    //   .then((response) => {
    //     navigation.goBack();
    //     showMessage({
    //       message: "Success",
    //       description: response,
    //       type: "success",
    //     });
    //   })
    //   .catch((error) => {
    //     showMessage({
    //       message: "Failed",
    //       description: error,
    //       type: "danger",
    //     });
    //   })
    //   .finally(() => setLoading(false));
  };

  return (
    <KeyboardAwareScrollView contentContainerStyle={styles.container}>
      <View style={styles.formContainer}>
        <Container>
          <Controller
            name="supplier" // The name of the field in the form
            control={control} // The form control object from useForm
            render={({ field }) => (
              <Dropdown
                label="Select Supplier"
                placeholder="Select Supplier"
                data={items}
                value={selectedValue}
                onChange={(item) => setSelectedValue(item.value)}
                style={{
                  borderColor: "black",
                  borderWidth: 0.168,
                  borderRadius: 10,
                  height: 50,
                  paddingLeft: "5%",
                }}
                labelField="label"
                valueField="value"
                error={errors.ProductName && errors.ProductName.message}
                {...field} // Spread the field props provided by Controller
              />
            )}
          />
          <Controller
            control={control}
            render={({ field: { onChange, onBlur, value } }) => (
              <CustomTextInput
                label={"Product Name"}
                placeholder={"Enter Product Name"}
                value={value}
                keyboardType={"default"}
                secureTextEntry={false}
                onChangeText={(value) => onChange(value)}
                error={errors.ProductName && errors.ProductName.message}
                icon={"email"}
                position={"left"}
              />
            )}
            name="ProductName"
            rules={{
              required: "Product Name is required",
            }}
          />

          <Controller
            control={control}
            render={({ field: { onChange, onBlur, value } }) => (
              <CustomTextInput
                label={"Product Volume"}
                placeholder={"Enter Product Volume"}
                value={value}
                keyboardType={"numeric"}
                secureTextEntry={false}
                onChangeText={(value) => onChange(value)}
                error={errors.productVolume && errors.productVolume.message}
                icon={"phone"}
                position={"left"}
              />
            )}
            name="productVolume"
            rules={{
              required: "Product Volume is required",
            }}
          />

          <Controller
            control={control}
            render={({ field: { onChange, onBlur, value } }) => (
              <CustomTextInput
                label={"Price"}
                placeholder={"Enter Price"}
                value={value}
                keyboardType={"numeric"}
                secureTextEntry={false}
                onChangeText={(value) => onChange(value)}
                error={errors.Price && errors.Price.message}
                icon={"map-marker"}
                position={"left"}
              />
            )}
            name="Price"
            rules={{ required: "Price is required" }}
          />
          <Controller
            control={control}
            render={({ field: { onChange, onBlur, value } }) => (
              <CustomTextInput
                label={"Quantity"}
                placeholder={"Enter Product Quantity"}
                value={value}
                keyboardType={"numeric"}
                secureTextEntry={false}
                onChangeText={(value) => onChange(value)}
                error={errors.Quantity && errors.Quantity.message}
                icon={"map-marker"}
                position={"left"}
              />
            )}
            name="Quantity"
            rules={{ required: "Quantity is required" }}
          />
          <Controller
            control={control}
            render={({ field: { onChange, onBlur, value } }) => (
              <CustomTextInput
                label={"Product Category"}
                placeholder={"Enter Product Category"}
                value={value}
                keyboardType={"default"}
                secureTextEntry={false}
                onChangeText={(value) => onChange(value)}
                error={errors.Category && errors.Category.message}
                icon={"map-marker"}
                position={"left"}
              />
            )}
            name="Category"
            rules={{ required: "Category is required" }}
          />

          <Controller
            name="productType" // The name of the field in the form
            control={control} // The form control object from useForm
            render={({ field }) => (
              <Dropdown
                label="Select Product Type"
                placeholder="Select Product Type"
                data={dummyData}
                value={selectedValue2}
                onChange={(item) => setSelectedValue2(item.value)}
                style={{
                  borderColor: "black",
                  borderWidth: 0.168,
                  borderRadius: 10,
                  height: 47,
                  marginTop: 9,
                  paddingLeft: "5%",
                }}
                labelField="label"
                valueField="value"
                {...field} // Spread the field props provided by Controller
              />
            )}
          />

          <CustomButton
            title="Add to cart"
            loading={loading}
            onSubmit={handleSubmit(onSubmit)}
          />

          <View style={styles.icon}>
            <TouchableOpacity
              onPress={() => {
                Navigation.navigate("Cart");
              }}
            >
              <AntDesign name="shoppingcart" size={24} color="black" />
              {itemCount > 0 && <Text style={styles.itemCount}>{itemCount}</Text>}
            </TouchableOpacity>
          </View>

          {/* {cart.map((item, index) => (
            <Text key={index}>{item.productName}</Text>
          ))} */}

          {/* <CartIcon /> */}
        </Container>
      </View>
    </KeyboardAwareScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    alignItems: "center",
    backgroundColor: "white",
  },

  formContainer: {
    width: Dimensions.get("window").width * 1,
  },
  icon: {
    flex: 1,
    alignItems: "center",
  },
  itemCount:{
    textAlign:'center'
    
  }
});

export default AddPurchaseOrderScreen;
