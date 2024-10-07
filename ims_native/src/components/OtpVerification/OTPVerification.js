import React, { useState, useEffect, useContext } from "react";
import { ActivityIndicator, Text, Title } from "react-native-paper";
import Container from "../Container";
import { Dimensions, StyleSheet, TouchableOpacity, View } from "react-native";
import { Grid } from "../GlobalStyle";
import OtpInput from "./OtpInput";
import CustomButton from "../Button";
import { useNavigation } from "@react-navigation/native";
import ErrorText from "../ErrorText";
import { Context as UserContext } from "../../context/UserContext";
import { showMessage } from "react-native-flash-message";
import Spinner from "../Spinner";

const OTPVerification = ({ phoneNumber, setIsVerified }) => {
  const [countdown, setCountdown] = useState(180);
  const [loading, setLoading] = useState(false)
  const [resentLoader, setResentLoader] = useState(false)
  const [error, setError] = useState("");
  const { sendOtp, verifyOtp } = useContext(UserContext);

  const [otp, setOtp] = useState(['', '', '', '', '', '']); 
  const generateOtpString = () => {
    return otp.join('');
  };

  const onSubmit = () => {
    const otpString = generateOtpString();
    if(otpString.length < 6) {
      setError("Please enter a valid OTP");
      return;
    }

    setLoading(true);

    verifyOtp({ godownheadNo: phoneNumber, otp: otpString })
    .then(() => {
      setIsVerified(true);
      showMessage({
        message: "Success",
        description: "OTP verified",
        type: "success",
      
      })
    })
    .catch((error) => {
      // setError(error);
      showMessage({
        message: "Failed",
        description: error,
        type: "danger",
      })
      
    })
    .finally(() => setLoading(false));
  }


;

  const sendOtpHandler = (phoneNumber) => {
    setResentLoader(true);
    setLoading(false);
    sendOtp(phoneNumber)
    .then(() => {
        showMessage( {
          message: "Success",
          description: "OTP sent",
          type: "success",
      })
    })
    .catch((error) => {
        showMessage({
          message: "Failed",
          description: error,
          type: "danger",
    })
    })
    .finally(() => setResentLoader(false));
}

  useEffect(() => {
    // sendOtpHandler(phoneNumber);
    const timer = setInterval(() => {
      if (countdown > 0) {
        setCountdown((prevCountdown) => prevCountdown - 1);
      } else {
        clearInterval(timer); 
      }
    }, 1000); 
    

    return () => clearInterval(timer);

  }, [countdown]); 

  useEffect(() => {
    sendOtpHandler(phoneNumber);
  }, []);
    

  const handleResendOTP = () => {
    sendOtpHandler(phoneNumber);
    setCountdown(300);
  };
  

  const minutes = Math.floor(countdown / 60);
  const seconds = countdown % 60;
  const formattedTime = `${minutes}:${seconds.toString().padStart(2, "0")}`;

  return (
    <Container>
      <Title variant="titleLarge" style={styles.heading}>
        OTP Verification
      </Title>
      <Text variant="bodyMedium" style={styles.subheading}>
        Please enter the 6-digit code sent to your mobile number ending with <Text variant="titleMedium" style={styles.subheading}>{phoneNumber.slice(-4)}</Text>
      </Text>
      
      <Text variant="bodyMedium" style={[styles.timer, {color: countdown<60 ? "red" : "blue"}]}>
        {countdown>0 ? formattedTime : "Time out"}
      </Text>
      <OtpInput otp={otp} setOtp={setOtp} />
      {
        error.length>1 && (
            <ErrorText errorMessage={error} />
        )
      }
      <View style={[Grid.row, styles.resendView]}>
        <Text variant="bodyMedium"> Didn't receive the OTP? </Text>
        { resentLoader ? (<ActivityIndicator animating={resentLoader} size={"small"} color={"#0BA5A4"} />) : (
          <TouchableOpacity onPress={handleResendOTP}>
            <Text variant="bodyMedium" style={{ color: "blue" }}>
              Resend OTP
            </Text>
          </TouchableOpacity>
        )}
      </View>
      <CustomButton title={"Verify"} loading={loading} onSubmit={onSubmit} />
     
    </Container>
  );
};

const styles = StyleSheet.create({
  heading: {
    textAlign: "center",
    marginVertical: Dimensions.get("window").height * 0.01,
  },

  subheading: {
    textAlign: "center",
    marginTop: Dimensions.get("window").height * 0.02,
    marginBottom: Dimensions.get("window").height * 0.05,
  },

  timer: {
    textAlign: "center",
    marginVertical: Dimensions.get("window").height * 0.02,
  },

  resendView: {
    justifyContent: "center",
    marginVertical: Dimensions.get("window").height * 0.02,
    alignItems: "center",
  },

  hyperLink: {
    textAlign: "center",
    color: "blue",
  },
});

export default OTPVerification;
