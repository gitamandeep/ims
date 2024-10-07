import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Dimensions, Alert } from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import Container from '../../components/Container';
import { useNavigation } from "@react-navigation/native";
import CustomTextInput from '../../components/TextInput';
import CustomButton from '../../components/Button';
import { showMessage } from 'react-native-flash-message';
import instance from '../../api/axiosConfig';
import serverUrl from '../../api/urls';
import AsyncStorage from '@react-native-async-storage/async-storage';

const UpdateProduct = ({route}) => {
    const [loading, setLoading] = useState(false);
    const navigation = useNavigation();
    
    const { productData } = route.params;
    console.log(productData);

    const { control, handleSubmit, formState: { errors } } = useForm({
        defaultValues: {
            price: String(productData.price), // Convert to string
            volume: String(productData.productVolume), // Convert to string
            quantity: String(productData.totalQuantity), // Convert to string
        }
    });

    
   
    const onSubmit = async(data) => {
        setLoading(true);
        const userString = await AsyncStorage.getItem('user');
      const user = JSON.parse(userString);
        try {
            const newData = {
                productName: productData.productName,
                godownId:user.godownId,
                price: data.price,
                volume: data.volume,
              quantity: data.quantity
            };
            const response = await instance.patch(serverUrl.updateProduct, newData);

            Alert.alert('Success', JSON.stringify(response.data));
            navigation.navigate('Product')
          } catch (error) {
            console.error('Error:', error);
            Alert.alert('Error', 'An error occurred while submitting the form.');
          }
        // Your logic to update the customer goes here
        showMessage({
            message: "Success",
            description: "Customer updated successfully",
            type: "success",
        });
        navigation.navigate('Product')
        setLoading(false);
    };

    return (
        <KeyboardAwareScrollView contentContainerStyle={styles.container}>
            <View style={styles.formContainer}>
                <Container>
                    <Controller
                        control={control}
                        render={({ field: { onChange, onBlur, value } }) => (
                            <CustomTextInput
                                label={"Price"}
                                placeholder={"Enter product's cost price"}
                                value={value}
                                onChangeText={onChange}
                                error={errors.price && errors.price.message}
                                position={"left"}
                            />
                        )}
                        name="price"
                        rules={{ required: 'price is required' }}
                    />

                    <Controller
                        control={control}
                        render={({ field: { onChange, onBlur, value } }) => (
                            <CustomTextInput
                                label={"Volume"}
                                placeholder={"Enter product's volume"}
                                value={value}
                                onChangeText={onChange}
                                error={errors.volume && errors.volume.message}
                                position={"left"}
                            />
                        )}
                        name="volume"
                        rules={{ required: 'Volume is required' }}
                    />

                    <Controller
                        control={control}
                        render={({ field: { onChange, onBlur, value } }) => (
                            <CustomTextInput
                                label={"quantity"}
                            placeholder={"Enter product's quantity"}
                                value={value}
                                onChangeText={onChange}
                                error={errors.quantity && errors.quantity.message}
                                position={"left"}
                            />
                        )}
                        name="quantity"
                        rules={{ required: 'Quantity is required' }}
                    />

                    <CustomButton title="Update" loading={loading} onSubmit={handleSubmit(onSubmit)} />
                </Container>
            </View>
        </KeyboardAwareScrollView>
    );
};

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

export default UpdateProduct;
