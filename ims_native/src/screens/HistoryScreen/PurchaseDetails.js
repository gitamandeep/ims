import React, { useState, useEffect } from "react";
import { StyleSheet, View } from "react-native";
import { Text, List, Avatar, Divider } from "react-native-paper";
import ProductAccordion from "./Components/ProductAccordion";
import { ScrollView } from "react-native-gesture-handler";
import Container from "../../components/Container";
import api from "../../api/axiosConfig";
import serverUrl from "../../api/urls";

const PurchaseDetails = ({ route }) => {
  const [data, setData] = useState(null);
  const { purchaseId } = route.params;
  console.log(purchaseId);

  useEffect(() => {
    const getPurchaseData = async (id) => {
      try {
        const response = await api.get(`${serverUrl.getPurchaseDetails}/${id}`);
        setData(response.data);
        // console.log("api response:", response.data); // Log fetched data
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    // Call the function to fetch data when component mounts
    getPurchaseData(purchaseId); // Replace "your_purchase_id_here" with the actual purchase ID
  }, []);

  return (
    <ScrollView>
      <Container>
        <View style={styles.container}>
          <Text style={styles.heading}>Purchase Details</Text>
          <View style={styles.detailsContainer}>
            {data && (
              <>
                <Text style={styles.detailText}>
                  Purchase Id:{" "}
                  <Text style={styles.detailValue}>{data.purchaseId}</Text>
                </Text>
                <Text style={styles.detailText}>
                  Date:{" "}
                  <Text style={styles.detailValue}>
                    {data.purchaseDate && data.purchaseDate.substring(0, 10)}
                  </Text>
                </Text>

                <ProductAccordion
                  key="0"
                  products={data.products}
                />
              </>
            )}
          </View>
        </View>
      </Container>
    </ScrollView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingVertical: 30,
    backgroundColor: "#ffffff",
  },
  heading: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    color: "black",
    marginBottom: 20,
  },
  detailsContainer: {
    // flexDirection: 'row',
    // justifyContent: 'space-between',
    marginBottom: 15,
  },
  detailText: {
    fontSize: 15,
    color: "#333",
    marginBottom: 4,
  },
  detailValue: {
    fontWeight: "bold",
  },
});

export default PurchaseDetails;
