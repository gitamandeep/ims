import { Dimensions, StyleSheet } from "react-native"
import { Text } from "react-native-paper"

const ErrorText = ({errorMessage}) => {
    return <Text variant="bodyMedium" style={styles.error}>{errorMessage}</Text>
}

const styles = StyleSheet.create({
    error: {
        color: 'red',
        marginBottom: Dimensions.get("window").height*0.02
    }
})

export default ErrorText;