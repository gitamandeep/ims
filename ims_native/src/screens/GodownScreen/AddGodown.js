import React, { useState } from 'react';
import { StyleSheet, View, Alert, Dimensions } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { useForm, Controller } from 'react-hook-form';
import Container from '../../components/Container';
import serverUrl from '../../api/urls';
import instance from '../../api/axiosConfig';
import CustomTextInput from '../../components/TextInput';
import CustomButton from '../../components/Button';

export default function AddGodown({ navigation }) {
  const { handleSubmit, control, formState: { errors } } = useForm();
  const [loading, setLoading] = useState(false);

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      const newData = {
        address: data.address,
        volume: data.volume,
      };
      const response = await instance.post(serverUrl.createGodown, newData);
      Alert.alert('Success', JSON.stringify(response.data));
      navigation.navigate('Add Godownhead');
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
              required: 'Address is required',
            }}
            render={({ field: { onChange, onBlur, value } }) => (
              <CustomTextInput
                label={"Address"}
                placeholder={"Enter godown address"}
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                icon={"map-marker"}
                position={"left"}
                error={errors.address && errors.address.message}
              />
            )}
            name="address"
          />

          <Controller
            control={control}
            rules={{
              required: 'Volume is required',
              pattern: {
                value: /^\d+$/,
                message: 'Numbers only'
              }
            }}
            render={({ field: { onChange, onBlur, value } }) => (
              <CustomTextInput
                label={"Volume"}
                error={errors.volume && errors.volume.message}
                placeholder="Enter godown volume"
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                icon={"cube"}
                position={"left"}
                keyboardType="numeric"
              />
            )}
            name="volume"
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
