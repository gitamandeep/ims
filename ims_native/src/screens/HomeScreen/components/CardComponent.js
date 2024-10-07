import { Card, Text } from 'react-native-paper';
import { FontAwesome, FontAwesome5, MaterialIcons } from '@expo/vector-icons';
import { Dimensions, StyleSheet, View } from 'react-native';
import { Grid } from "../../../components/GlobalStyle";

const getIcon = (iconName, iconLibrary) => {
    if(iconLibrary === "MaterialIcons") {
        return <MaterialIcons name={iconName} size={20} color="white" />
    } else if(iconLibrary === "FontAwesome") {
        return <FontAwesome name={iconName} size={15} color="white" />
    }
    else if(iconLibrary === "FontAwesome5") {
        return <FontAwesome5 name={iconName} size={15} color="white" />
    }

}

const CustomCardTitle = ({iconName, iconLibrary}) => {
    return (
      <Card.Title
        left={() => {
                return (
                    <View style={styles.iconStyle}>
                        {getIcon(iconName, iconLibrary)}
                    </View>
                )
            }
        }
      />
    );
  };

const CardComponent = ({ title, description, iconName, iconLibrary, bgColor, color }) => {
    return (
        <>
        <Card style={[Grid['1col'], styles.cardStyle, { backgroundColor: bgColor || "#fff"}]}>
            <CustomCardTitle iconName={iconName} iconLibrary={iconLibrary} />
            <Card.Content>
                <Text variant="titleMedium">{title}</Text>
                <Text variant="bodySmall">{description}</Text>
            </Card.Content>
        </Card>
        </>
    )
}

const styles = StyleSheet.create({
    cardStyle: {
        minWidth: Dimensions.get("window").width * 0.4,
    },
    iconStyle: {
        width: 30,
        height: 30,
        borderRadius: 18,
        backgroundColor: 'black',
        justifyContent: 'center',
        alignItems: 'center'
    }

})

export default CardComponent;