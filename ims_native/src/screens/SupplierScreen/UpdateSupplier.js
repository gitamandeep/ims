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

const UpdateSupplier = ({route}) => {
    const [loading, setLoading] = useState(false);
    const navigation = useNavigation();
    
    const { supplierData } = route.params;
    
    const { control, handleSubmit, formState: { errors } } = useForm({
        defaultValues: {
            name: supplierData.supplierName,
            address: supplierData.address,
            contact: supplierData.contactNumber
        }
    });

    
   
    const onSubmit = async(data) => {
        setLoading(true);
        try {
            const newData = {
                supplierId: supplierData.supplierId,
                supplierName: data.name,
                contactNumber: data.contact,
              address: data.address,
            };
            const response = await instance.put(serverUrl.updateSupplier, newData);

            Alert.alert('Success', JSON.stringify(response.data));
            navigation.navigate('Supplier')
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
        navigation.navigate('Supplier')
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
                                label={"Name"}
                                placeholder={"Enter supplier's name"}
                                value={value}
                                onChangeText={onChange}
                                error={errors.name && errors.name.message}
                                icon={"account"}
                                position={"left"}
                            />
                        )}
                        name="name"
                        rules={{ required: 'Name is required' }}
                    />

                    <Controller
                        control={control}
                        render={({ field: { onChange, onBlur, value } }) => (
                            <CustomTextInput
                                label={"Address"}
                                placeholder={"Enter supplier's address"}
                                value={value}
                                onChangeText={onChange}
                                error={errors.address && errors.address.message}
                                icon={"map-marker"}
                                position={"left"}
                            />
                        )}
                        name="address"
                        rules={{ required: 'Address is required' }}
                    />

                    <Controller
                        control={control}
                        render={({ field: { onChange, onBlur, value } }) => (
                            <CustomTextInput
                                label={"Contact No."}
                                placeholder={"Enter supplier's contact no."}
                                value={value}
                                onChangeText={onChange}
                                error={errors.contact && errors.contact.message}
                                icon={"phone"}
                                position={"left"}
                            />
                        )}
                        name="contact"
                        rules={{ required: 'Contact No. is required' }}
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

export default UpdateSupplier;
