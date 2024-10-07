import React, {  } from "react";
import { StyleSheet, View } from "react-native";
import {
  SegmentedButtons,
} from "react-native-paper";

const CustomSegmentButton=({state, onValueChange}) => {
    
    return (
        <View>
        <SegmentedButtons
            style={styles.button}
            value={state}
            onValueChange={onValueChange}
            buttons={[
              { value: "Products Sold", label: "Products Sold" },
              { value: "Orders Received", label: "Orders Received" },
            ]}
          />
          
        </View>
    )
}

const styles = StyleSheet.create({
  button: {
    
  }
})

export default CustomSegmentButton;