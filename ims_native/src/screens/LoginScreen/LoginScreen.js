import React, { useState, useContext } from "react";
import {
    StyleSheet,
    View,
    Image,
    TouchableOpacity,
} from "react-native";
import { Button, TextInput as PaperInput, Text } from "react-native-paper";
import { useNavigation } from '@react-navigation/native';
import { AuthContext } from "../../context/authContext";
import AsyncStorage from "@react-native-async-storage/async-storage";
import instance from "../../api/axiosConfig";
import serverUrl from "../../api/urls";
import CustomTextInput from "../../components/TextInput";
import Container from "../../components/Container";
import CustomButton from "../../components/Button";
import { useForm, Controller } from 'react-hook-form';
import { showMessage } from 'react-native-flash-message';
import { err } from "react-native-svg";



const LoginScreen = () => {
    const { handleLogin } = useContext(AuthContext);
    const navigation = useNavigation();
    const [name, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const { control, handleSubmit, formState: { errors } } = useForm({
        defaultValues: {
            username: name,
            password: password,
        }
    });


    const onSubmit = async (data) => {

        try {
            // console.log("in login")

            const raw = {
                "username": data.username,
                "password": data.password
            }
            console.log(raw)

            const response = await instance.post(serverUrl.login, raw);
            const authData = {
                token: response.data.cookie,
                username: response.data.username
            }

            const user = {
                username: response.data.username,
                godownHeadId: response.data.godownHeadId,
                godownId: response.data.godownId,
                role: response.data.role,
            }
            showMessage({
                message: "Success",
                description: "Loged in successfully",
                type: "success",
            });

            handleLogin(authData, user);
        } catch (error) { 
            showMessage({
                message: "Failed",
                description: error.response.data.message,
                type: "danger",
            });
            // console.error(error);
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

            {/* <View>
                <Text style={styles.titleText}>Pyramid Electronics</Text>
            </View> */}

            <Text style={styles.welcomeText}>Welcome Back!</Text>

            {/* Added spacing View */}
            {/* <View style={styles.spacingView} />
            <View style={styles.inputView}>
                <PaperInput
                    // secureTextEntry
                    mode="outlined"
                    label="Username"
                    value={name}
                    onChangeText={(name) => {
                        setUsername(name)
                    }}
                    style={{ width: 290 }}
                />
            </View> */}

            <Controller
                control={control}
               
                render={({ field: { onBlur, onChange, value } }) => (

                    <CustomTextInput
                        label={"Username"}
                        value={value}
                        onBlur={onBlur}
                        placeholder={"Enter your username"}
                        error={errors.username && errors.username.message}

                        onChangeText={onChange}
                    />
                )}

                name="username"
                rules={{
                    required: 'Username is required',
                }}
            />


            <Controller
                control={control}
               
                render={({ field: { onBlur, onChange, value } }) => (


                    <CustomTextInput
                        label={"Password"}
                        placeholder={"Enter your password"}
                        value={value}
                        onChangeText={onChange}
                        error={errors.password && errors.password.message}

                    />
                )}

                name="password"
                rules={{
                    required: 'Password is required',
                }}
            />

            {/* <View style={styles.inputView}>
                <PaperInput
                    mode="outlined"
                    label="Password"
                    secureTextEntry={true}
                    onChangeText={(password) => setPassword(password)}
                    style={{ width: 290 }}
                />
            </View> */}
            <TouchableOpacity style={{ marginLeft: 150 }} onPress={() => navigation.navigate("ForgotPassword")}>
                <Text style={styles.forgot_button}>
                    Forgot Password?
                </Text>
            </TouchableOpacity>
            {/* <TouchableOpacity style={styles.loginBtn} onPress={onSubmit}>
                <Text style={styles.loginText}>LOGIN</Text>
            </TouchableOpacity> */}


            <CustomButton title={"LOGIN"} onSubmit={handleSubmit(onSubmit)} />
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
        // width: 4,
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
    loginText: {
        color: "white",
        fontRadius: 5,
        height: 50,
        alignItems: "center",
        justifyContent: "center",
        marginTop: 0,
        backgroundColor: "#4169e1",
    },
    loginText: {
        color: "white",
        fontWeight: "bold",
    },
    welcomeText: {
        marginBottom: 20,
        fontWeight: 'bold',
        fontSize: 30,
        textAlign: "center"
    },
    titleText: {
        marginBottom: 20,
        fontWeight: "bold",
        fontFamily: "Cochin"
    },
    spacingView: { // Added spacing view
        marginBottom: 20, // Adjust margin as needed
    },
});

export default LoginScreen;