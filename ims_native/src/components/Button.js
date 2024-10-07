import {  Dimensions, StyleSheet, View } from "react-native"
import { ActivityIndicator, Button, Text } from "react-native-paper";

const CustomButton = ({ title , onSubmit, loading, disabled }) => {
    return (
        <View style={styles.buttonContainer}>
            {
                loading ? <ActivityIndicator animating={true} color="#0BA5A4" size={"small"} /> : 

                <Button style={styles.button} onPress={onSubmit} disabled={disabled} >
                    <Text style={{color: "white"}} variant="titleMedium" >{title}</Text>
                </Button>
            }
        </View>
    )
}

const styles = StyleSheet.create({
    buttonContainer: {
        marginVertical: Dimensions.get("window").height * 0.02,
    },

    button: {
        backgroundColor: "#007AFF",
        borderRadius: Dimensions.get("window").scale * 5,
    }
});

export default CustomButton;