import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Alert, Dimensions } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { useForm, Controller } from 'react-hook-form';
import Container from '../../components/Container';
import serverUrl from '../../api/urls';
import instance from '../../api/axiosConfig';
import CustomTextInput from '../../components/TextInput';
import CustomButton from '../../components/Button';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Dropdown } from 'react-native-element-dropdown';
import api from "../../api/axiosConfig"

export default function AddGodown({ navigation }) {
  const { handleSubmit, control, formState: { errors } } = useForm();
  const [loading, setLoading] = useState(false);
  const [selectedValue, setSelectedValue] = useState(false);
  const [productType, setProductType] = useState(null);


  const onSubmit = async (data) => {
    console.log("------",data)
    console.log(selectedValue);
    setLoading(true);
    try {
      const userString = await AsyncStorage.getItem('user');
      const user = JSON.parse(userString);
      console.log(user.godownId);
      const newData = {
        godownId: user.godownId,
        productName: data.productName,
        productCategory: data.productCategory,
        totalQuantity: data.totalQuantity,
        productVolume: data.productVolume,
        price: data.price,
        productType: parseFloat(data.productType.value)
      };
      console.log("++++++++++",newData)
      const response = await instance.post(serverUrl.addProduct, newData);
      Alert.alert('Success', JSON.stringify(response.data));
      navigation.navigate('Product');
    } catch (error) {
      console.error('Error:', error);
      Alert.alert('Error', 'An error occurred while submitting the form.');
    }
    setLoading(false);
  };

  return (
    <KeyboardAwareScrollView contentContainerStyle={styles.container} >
      <View style={styles.formContainer}>
        <Container>
          <Controller
            control={control}
            rules={{
              required: 'Product Name is required',
            }}
            render={({ field: { onChange, onBlur, value } }) => (
              <CustomTextInput
                label={"Product Name"}
                placeholder={"Enter Product Name"}
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                error={errors.productName && errors.productName.message}
              />
            )}
            name="productName"
          />

          <Controller
            control={control}
            rules={{
              required: 'Product Category is required',
            }}
            render={({ field: { onChange, onBlur, value } }) => (
              <CustomTextInput
                label={"Product Category"}
                placeholder={"Enter Product Category"}
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                error={errors.productCategory && errors.productCategory.message}
              />
            )}
            name="productCategory"
          />

          <Controller
            control={control}
            rules={{
              required: 'Product Type is required',
            }}
            render={({ field: { onChange, onBlur, value } }) => (
              <Dropdown
                label="Product Type"
                placeholder="Product Type"
                data={[
                  { label: '2.2 kw', value: '2.2' },
                  { label: '3.3 kw', value: '3.3' },
                  { label: '4 kw', value: '4' },
                  { label: '5 kw', value: '5' },
                  { label: '6 kw', value: '6' },
                  { label: '7 kw', value: '7' },
                  { label: '8.8 kw', value: '8.8' },
                  { label: '10 kw', value: '10' },
                  { label: '12 kw', value: '12' },
                  { label: '20 kw', value: '20' },
                  { label: '50 kw', value: '50' },
                ]}
                onBlur={onBlur}
                onChange={onChange}
                // onChangeText={(val)=>{console.log(val)}}
                value={value}
                // onChange={(item) => setSelectedValue(item.selectedValue)}
                // onChange={(item) => {
                //   onChange(item.selectedValue);
                // }}
                style={{
                  borderColor: "#D3D3D3",
                  borderWidth: 1,
                  borderRadius: 10,
                  height: 50,
                  padding: 13,
                  marginVertical: Dimensions.get("window").height * 0.02,

                }}
                labelField="label"
                valueField="value"
                error={errors.productType && errors.productType.message}
              />
            )}
            name="productType"
          />

          <Controller
            control={control}
            rules={{
              required: 'Product Quantity is required',
            }}
            render={({ field: { onChange, onBlur, value } }) => (
              <CustomTextInput
                label={"Product Quantity"}
                placeholder={"Enter Product Quantity"}
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                keyboardType="numeric"

                error={errors.totalQuantity && errors.totalQuantity.message}
              />
            )}
            name="totalQuantity"
          />


          <Controller
            control={control}
            rules={{
              required: 'Product Volume is required',
            }}
            render={({ field: { onChange, onBlur, value } }) => (
              <CustomTextInput
                label={"Product Volume"}
                placeholder={"Enter Product Volume"}
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                keyboardType="numeric"

                error={errors.productVolume && errors.productVolume.message}
              />
            )}
            name="productVolume"
          />




          <Controller
            control={control}
            rules={{
              required: 'Cost Price is required',
              pattern: {
                value: /^\d+$/,
                message: 'Numbers only'
              }
            }}
            render={({ field: { onChange, onBlur, value } }) => (
              <CustomTextInput
                label={"Cost Price"}
                error={errors.price && errors.price.message}
                placeholder="Enter Cost Price"
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                keyboardType="numeric"
              />
            )}
            name="price"
          />


          <CustomButton title={"Submit"} onSubmit={handleSubmit(onSubmit)} />
        </Container>
      </View>
    </KeyboardAwareScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    alignItems: 'center',
    backgroundColor: "white",
  },
  formContainer: {
    width: Dimensions.get("window").width * 1,
  },
});
