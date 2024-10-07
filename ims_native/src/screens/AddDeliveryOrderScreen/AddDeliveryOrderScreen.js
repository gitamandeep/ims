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

const AddDeliveryOrderScreen = ({ route }) => {
    console.log(route);
  const Navigation = useNavigation();
  const [items, setItems] = useState([]);
  const [selectedValue, setSelectedValue] = useState("");
  const { addToCart2 } = useCart();
  const { itemCount2 } = useCart();
  const { id2 } = useCart();
  const [GodownId, setGodownId] = useState("");

  const getProducts = async () => {
    try {
      const response = await api.get(`${serverUrl.singleProduct}`);
      
      if (response.data.length === 0) {
        // Handle case where no products are returned
        console.log("No products found.");
        return;
      }
      const userString = await AsyncStorage.getItem("user");
      const user = JSON.parse(userString).godownId;
      setGodownId(user);
      const dropdownItems = response.data.map(product => ({
        label: product[0],
        value: product[0], // Assuming the product name is also the value
      }));

  
      setItems(dropdownItems);
    } catch (error) {
      console.error("Error fetching data:" + error);
    }
  };
  

  useEffect(() => {
    const fetchData = async () => {
      await getProducts(); // Wait for getSuppliers to complete
    };

    fetchData();
  }, []);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({});

  const onSubmit = (data) => {
    const tax = (0.18*(data.SellPrice));
    const trimmedData = {
      ...data,
      ProductName: data.Product.value.trim(),
      productVolume: data.productVolume.trim(),
      SellPrice: data.SellPrice.trim(),
      Quantity: data.Quantity.trim(),
      godownId: GodownId,
      customerId: route.params.customerId,
      customerName: route.params.customerName,
      customerAddress: route.params.customerAddress,
      customerNo: route.params.customerNo,
      taxPercentage:18,
      tax:tax,
      godownHeadName:"Harry",
      godownAddress: "Pnb",
    };
    console.log("hello")
    console.log(trimmedData);
    addToCart2(trimmedData);
    
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
            name="Product" // The name of the field in the form
            control={control} // The form control object from useForm
            render={({ field }) => (
              <Dropdown
                label="Select Product"
                placeholder="Select Product"
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
                label={"Sell Price"}
                placeholder={"Enter SellPrice"}
                value={value}
                keyboardType={"numeric"}
                secureTextEntry={false}
                onChangeText={(value) => onChange(value)}
                icon={"map-marker"}
                position={"left"}
              />
            )}
            name="SellPrice"
            rules={{ required: "SellPrice is required" }}
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

          <CustomButton
            title="Add to cart"
            // loading={loading}
            onSubmit={handleSubmit(onSubmit)}
          />

          <View style={styles.icon}>
            <TouchableOpacity
              onPress={() => {
                Navigation.navigate("Cart2");
              }}
            >
              <AntDesign name="shoppingcart" size={24} color="black" />
              {itemCount2 > 0 && (
                <Text style={styles.itemCount}>{itemCount2}</Text>
              )}
            </TouchableOpacity>
          </View>
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
  itemCount: {
    textAlign: "center",
  },
});

export default AddDeliveryOrderScreen;
