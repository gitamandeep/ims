import React from "react";
import { StyleSheet } from "react-native";
import { List, Avatar, Divider, Text } from "react-native-paper";
import GodownDetails from "../GodownDetails";

const GodownAccordion = ({products}) => {
    console.log("api response" + products);
  // Check if productList is null or undefined
  if (!products) {
    return null; // If productList is null or undefined, render nothing
  }

  return (
    <>
      {products.map((product, index) => (
        <List.Section key={index}>
          <List.Accordion
            title={product.productName}
            style={styles.accordion}
            titleStyle={styles.accordionTitle}
            left={(props) => (
              <List.Icon {...props} icon="package-variant" color="black" />
            )}
          >
            <List.Item
              title="Product Volume: "
              left={() => (
                <Avatar.Icon
                  size={20}
                  icon="cube-outline"
                  color="black"
                  backgroundColor="transparent"
                />
              )}
              right={() => <Text>{product.productVolume}</Text>}
            />
            <Divider />
            <List.Item
              title="Price: "
              left={() => (
                <Avatar.Icon
                  size={24}
                  icon="ev-station"
                  color="black"
                  backgroundColor="transparent"
                />
              )}
              right={() => <Text>{product.price}</Text>}
            />
            <Divider />
            <List.Item
              title="Total Quantity: "
              left={() => (
                <Avatar.Icon
                  size={24}
                  icon="cart-outline"
                  color="black"
                  backgroundColor="transparent"
                />
              )}
              right={() => <Text>{product.totalQuantity}</Text>}
            />
            <Divider />
            <List.Item
              title="Product Type: "
              left={() => (
                <Avatar.Icon
                  size={24}
                  icon="tag-outline"
                  color="black"
                  backgroundColor="transparent"
                />
              )}
              right={() => <Text>{product.productType}</Text>}
            />
            <Divider />
            <List.Item
              title="Product Category: "
              left={() => (
                <Avatar.Icon
                  size={24}
                  icon="tag-outline"
                  color="black"
                  backgroundColor="transparent"
                />
              )}
              right={() => <Text>{product.productCategory}</Text>}
            />
          </List.Accordion>
        </List.Section>
      ))}
    </>
  );
};

const styles = StyleSheet.create({
  accordion: {
    backgroundColor: "#f9f9f9",
    borderRadius: 10,
    elevation: 3,
  },
  accordionTitle: {
    color: "black",
    fontWeight: "bold",
    fontSize: 15,
  },
});

export default GodownAccordion;
