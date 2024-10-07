import React, { useState } from "react";
import { StyleSheet, View, Image, TouchableOpacity, Alert } from "react-native";
import { Button, TextInput as PaperInput, Text } from "react-native-paper";
import { useNavigation } from '@react-navigation/native';
import OTPVerificationScreen from "../LoginScreen/OTPVerificationScreen";
import instance from "../../api/axiosConfig";
import serverUrl from "../../api/urls";
import Container from "../../components/Container";
import CustomTextInput from "../../components/TextInput";
import CustomButton from "../../components/Button";

const ForgotPasswordScreen = () => {
  const [phone, setPhone] = useState('');
  const navigation = useNavigation();

  const handleForgotPassword = async () => {
    try {
      const response = await instance.post(serverUrl.sendOtp, { "godownheadNo": phone });
      console.log(response.data); // Assuming the backend returns the OTP

      // Display success message
      Alert.alert('Success', 'OTP has been sent to your phone number.');

      // Navigate to the OTP verification screen or handle it as per your UI flow
      navigation.navigate('OtpVerification',{phone});
    } catch (error) {
      console.error('Error sending OTP:', error);
      Alert.alert('Error', 'Failed to send OTP. Please try again.');
    }
  };

  return (
    <Container>
      {/* <View style={styles.container}> */}
      {/* <View style={styles.logoContainer}>
        <Image
          style={styles.logo}
          source={require("../../../assets/LogoPyramid.png")}
        />
      </View> */}

      <Text style={styles.welcomeText}>Forgot Password?</Text>

      {/* <View style={styles.inputView}>
        <PaperInput
          mode="outlined"
          label="Phone Number"
          value={phone}
          onChangeText={(phone) => setPhone(phone)}
          style={{ width: 290 }}
          keyboardType="phone-pad"
          autoCapitalize="none"
        />
      </View> */}

      <CustomTextInput label={"Phone Number"} value={phone} placeholder={"Enter your Phone number"} keyboardType="phone-pad"
        onChangeText={(phone) => {
          setPhone(phone)
        }} />

        

      {/* <TouchableOpacity style={styles.forgot_button} onPress={() => navigation.navigate("LoginScreen")}>
        <Text style={styles.buttonText}>
          Back to Login
        </Text>
      </TouchableOpacity> */}

      <CustomButton title={"SEND OTP"} onSubmit={handleForgotPassword} />



      {/* <TouchableOpacity style={styles.loginBtn} onPress={handleForgotPassword}>
        <Text style={styles.buttonText}>Send OTP</Text>
      </TouchableOpacity> */}
      {/* </View> */}
    </Container>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  logoContainer: {
    marginBottom: 40,
    alignItems: "center",
  },
  logo: {
    width: 210,
    height: 100,
  },
  inputView: {
    backgroundColor: "#87ceeb",
    borderRadius: 5,
    height: 40,
    marginBottom: 20,
    alignItems: "center",
    flexDirection: "row",
  },
  forgot_button: {
    width: "100%",
    alignItems: "flex-end",
    marginBottom: 25,
    textAlign: "right",
  },
  loginBtn: {
    width: "80%",
    borderRadius: 5,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 0,
    backgroundColor: "#4169e1",
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
  },
  welcomeText: {
    marginBottom: 20,
    fontWeight: 'bold',
    fontSize: 30,
    textAlign:"center"
  },
});

export default ForgotPasswordScreen;
