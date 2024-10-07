import React, { useState } from "react";
import { StyleSheet, View, Image, TouchableOpacity, Alert } from "react-native";
import { TextInput as PaperInput, Text } from "react-native-paper";
import instance from "../../api/axiosConfig";
import serverUrl from "../../api/urls";
import { useNavigation } from '@react-navigation/native';
import Container from "../../components/Container";
import CustomTextInput from "../../components/TextInput";
import CustomButton from "../../components/Button";

const OTPVerificationScreen = ({route}) => {
  // const [phone, setPhone] = useState('');
  const [otp, setOTP] = useState('');
  const navigation = useNavigation();
  const {phone}=route.params;

  const handleVerifyOTP = async () => {
    try {
      const response = await instance.post(serverUrl.verifyOtp, { "otp": otp, "godownheadNo": phone });
      console.log(response.data);

      // Display success message
      Alert.alert('Success', 'OTP verified successfully.');

      // Navigate to the password reset screen or handle it as per your UI flow
      navigation.navigate('ResetPasswordScreen', phone);
    } catch (error) {
      console.error('Error verifying OTP:', error);
      Alert.alert('Error', 'Failed to verify OTP. Please try again.');
    }
  };

  return (
    <Container>
      {/* // <View style={styles.container}> */}
      {/* <View style={styles.logoContainer}>
        <Image
          style={styles.logo}
          source={require("../../../assets/LogoPyramid.png")}
        />
      </View> */}

      

      <Text style={styles.welcomeText}>Verify OTP</Text>

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

      {/* <CustomTextInput label={"Phone Number"} value={phone} placeholder={"Enter your Phone number"} keyboardType="phone-pad"
        onChangeText={(phone) => {
          setPhone(phone)
        }} /> */}

      {/* <View style={styles.inputView}>
        <PaperInput
          mode="outlined"
          label="OTP"
          value={otp}
          onChangeText={(otp) => setOTP(otp)}
          style={{ width: 290 }}
          keyboardType="numeric"
          autoCapitalize="none"
        />
      </View> */}

      <CustomTextInput label={"OTP"} value={otp} placeholder={"Enter 6 digit OTP"} keyboardType="numeric"
        onChangeText={(otp) => {
          setOTP(otp)
        }} />

      <CustomButton title={"VERIFY OTP"} onSubmit={handleVerifyOTP} />

      {/* <TouchableOpacity style={styles.loginBtn} onPress={handleVerifyOTP}>
        <Text style={styles.buttonText}>Verify OTP</Text>
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

export default OTPVerificationScreen;
