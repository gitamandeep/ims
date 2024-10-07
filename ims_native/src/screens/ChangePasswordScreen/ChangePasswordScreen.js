import { Dimensions, StyleSheet, View } from "react-native";
import { useState } from "react";
import { useContext } from "react";
import { Context as UserContext } from "../../context/UserContext";
import OTPVerification from "../../components/OtpVerification/OTPVerification";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import ChangePasswordForm from "./components/ChangePasswordForm";

const ChangePasswordScreen = () => {
    const [loading, setLoading] = useState(false)
    const { state } = useContext(UserContext);
    const [ isVerified, setIsVerified ] = useState(false);
  
    return (
        <>
       <KeyboardAwareScrollView contentContainerStyle={styles.container}>
        <View style={styles.formContainer}>
                {
                    !isVerified ?( <OTPVerification phoneNumber={state.godownheadNo} setIsVerified={(val) => setIsVerified(val)} /> ): (
                    <ChangePasswordForm />
                    )
                    
                }
            </View>
       </KeyboardAwareScrollView>
        </>
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

export default ChangePasswordScreen;
