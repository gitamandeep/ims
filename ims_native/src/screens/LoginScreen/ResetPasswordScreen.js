import React, { useState } from "react";
import { StyleSheet, View, TextInput, TouchableOpacity, Alert } from "react-native";
import { TextInput as PaperInput, Text } from "react-native-paper";
import { useNavigation } from '@react-navigation/native';
import CustomTextInput from "../../components/TextInput";
import Container from "../../components/Container";
import CustomButton from "../../components/Button";
import instance from "../../api/axiosConfig";
import serverUrl from "../../api/urls";


const ResetPasswordScreen = ({route}) => {
    // const [phone, setPhone] = useState('');
    const [newPassword, setnewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const navigation = useNavigation();
    const {phone}=route.params;

    const handleResetPassword = async () => {
        try {
            if (newPassword !== confirmPassword) {
                Alert.alert('Error', 'Passwords do not match.');
                return;
            }

            const response = await instance.patch(serverUrl.resetPassword, {
                "godownheadNo": phone,
                "newPassword": newPassword
            });
            console.log(response.data);

            // Display success message
            Alert.alert('Success', 'Password reset successfully.');

            // Navigate to the login screen or handle it as per your UI flow
            navigation.navigate('LoginScreen');
        } catch (error) {
            console.error('Error resetting password:', error);
            Alert.alert('Error', 'Failed to reset password. Please try again.');
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

            <Text style={styles.welcomeText}>Reset Password</Text>

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
          label="New Password"
          value={newPassword}
          onChangeText={(newPassword) => setnewPassword(newPassword)}
          style={{ width: 290 }}
          keyboardType="numeric"
          autoCapitalize="none"
        />
      </View> */}

            <CustomTextInput label={"New Password"} value={newPassword} placeholder={"Enter new Password"} keyboardType="phone-pad"
                onChangeText={(newPassword) => {
                    setnewPassword(newPassword)
                }} />


            {/* <View style={styles.inputView}>
                <PaperInput
                    mode="outlined"
                    label="Confirm Password"
                    value={confirmPassword}
                    onChangeText={(confirmPassword) => setConfirmPassword(confirmPassword)}
                    style={{ width: 290 }}
                    keyboardType="numeric"
                    autoCapitalize="none"
                />
            </View> */}

            <CustomTextInput label={"Confirm Password"} value={confirmPassword} placeholder={"Confirm Password"} keyboardType="phone-pad"
                onChangeText={(confirmPassword) => {
                    setConfirmPassword(confirmPassword)
                }} />

            <CustomButton title={"RESET PASSWORD"} onSubmit={handleResetPassword} />

            {/* <TouchableOpacity style={styles.loginBtn} onPress={handleResetPassword}>
                <Text style={styles.buttonText}>RESET PASSWORD</Text>
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

export default ResetPasswordScreen;
