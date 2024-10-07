import React from "react";
import { StyleSheet, View } from "react-native";
import { List, Avatar, Divider, Text } from "react-native-paper";

const ProductAccordion = ({ products}) => {
  // console.log(products)
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
              title="Product Name: "
              left={() => (
                <Avatar.Icon
                  size={24}
                  icon="cube-outline"
                  color="black"
                  backgroundColor="transparent"
                />
              )}
              right={() => <Text>{product.productName}</Text>}
            />
            <Divider />
            <List.Item
              title="Product Volume: "
              left={() => (
                <Avatar.Icon
                  size={24}
                  icon="cube-outline"
                  color="black"
                  backgroundColor="transparent"
                />
              )}
              right={() => <Text>{product.productVolume}</Text>}
            />
            <Divider />
            <List.Item
              title="Product Type: "
              left={() => (
                <Avatar.Icon
                  size={24}
                  icon="ev-station"
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
            <Divider />
            <List.Item
              title="Purchase Quantity: "
              left={() => (
                <Avatar.Icon
                  size={24}
                  icon="cart-outline"
                  color="black"
                  backgroundColor="transparent"
                />
              )}
              right={() => <Text>{product.purchaseQuantity}</Text>}
            />
          </List.Accordion>
        </List.Section>
      ))}
    </>
  );
}
  

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

export default ProductAccordion;
