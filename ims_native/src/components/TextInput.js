import { Dimensions, StyleSheet, View } from "react-native";
import { TextInput } from "react-native-paper";
import ErrorText from "./ErrorText";
const CustomTextInput = ({
    label,
    placeholder,
    value,
    keyboardType,
    secureTextEntry,
    onChangeText,
    error,
    icon,
    position }) => {
    return (
        <View>
            <TextInput
                style={styles.input}
                label={label}
                value={value}
                placeholder={placeholder}
                onChangeText={onChangeText}
                keyboardType={keyboardType}
                secureTextEntry={secureTextEntry}
                left={icon && position === "left" ? <TextInput.Icon icon={icon} /> : null}
                right={icon && position === "right" ? <TextInput.Icon icon={icon} /> : null}
                mode="outlined"
                outlineColor="#D3D3D3"
                theme={{ roundness: Dimensions.get("window").scale * 5 }}
                />
                
                {error && <ErrorText errorMessage={error} />}
        </View>

    )
}

const styles = StyleSheet.create({
    input: {
        marginVertical: Dimensions.get("window").height * 0.01,
        backgroundColor: "white",
    },
});

export default CustomTextInput;