import React, { useState, useEffect } from "react";
import { StyleSheet, View } from "react-native";
import { Text, List, Divider } from "react-native-paper";
import GodownAccordion from "./Components/GodownAccordion";
import { ScrollView } from "react-native-gesture-handler";
import Container from "../../components/Container";
import serverUrl from "../../api/urls";
import api from "../../api/axiosConfig";


const GodownDetails = ({route}) => {
    console.log(route.params);
    const [Data, setData] = useState(null);
    const { godownId } = route.params;
    console.log(godownId);

  useEffect(() => {
        const getGodownData = async (id) => {
            try {
                const response = await api.get(`${serverUrl.getGodownDetails}/${id}`);
                setData(response.data);
                console.log("api response:", response.data); // Log fetched data
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        // Call the function to fetch data when component mounts or when godownId changes
        getGodownData(godownId);
    }, [godownId]);

  return (
    <ScrollView>
      <Container>
        <View style={styles.container}>
          <Text style={styles.heading}>Godown Details</Text>
          <View style={styles.detailsContainer}>
            {Data && (
              <>
                <Text style={styles.detailText}>
                  Godown Id:{" "}
                  <Text style={styles.detailValue}>{Data.godownId}</Text>
                </Text>
                <Text style={styles.detailText}>
                  Godown Address:{" "}
                  <Text style={styles.detailValue}>{Data.address}</Text>
                </Text>
                <Text style={styles.detailText}>
                  Godown Volume:{" "}
                  <Text style={styles.detailValue}>{Data.volume}</Text>
                </Text>
                <GodownAccordion products={Data.productList} />
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
    marginBottom: 15,
  },
  detailText: {
    fontSize: 15,
    color: "grey",
    marginBottom: 4,
  },
  detailValue: {
    fontWeight: "bold",
  },
});

export default GodownDetails;
