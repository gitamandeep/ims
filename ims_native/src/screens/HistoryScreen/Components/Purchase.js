import {
  View,
  StyleSheet,
  Dimensions,
  FlatList,
} from "react-native";
import React, { useState, useEffect } from "react";
import api from "../../../api/axiosConfig"
import serverUrl from '../../../api/urls'

import { Card, Text } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import { Grid } from "../../../components/GlobalStyle";
import { MaterialIcons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Spinner from "../../../components/Spinner";

const imageSource = require("../Assets/purchase.png");

export default function Purchase() {
  //////////////////////////////////////////////////////////
  // API FETCHING CODE //
  const [loading, setLoading] = useState(true);
  const [purchaseOrder, setpurchaseOrder] = useState([]);
  useEffect(() => {
    fetchData();
  }, []);

  const Navigation = useNavigation();
  const fetchData = async () => {
    try {
      const userString = await AsyncStorage.getItem('user');
      const user = JSON.parse(userString);
      api.get(serverUrl.getAllPurchase)
        .then(response => {
          const data = user.role === 'admin' ? response.data : response.data.filter((order) => {
            return order.godownId == user.godownId;
          });
          setpurchaseOrder(data);
        })
        .catch(error => {
          // console.error("Error fetching data:", error);
        })
        .finally(() => setLoading(false));
    } catch (error) {
      // console.error("Error fetching user data:", error);
    }
  };
    

  return (
   <>
      {
       loading ? (
        <View style={{marginTop: Dimensions.get('window').height*0.2}}>
          <Spinner animating={loading} size={"large"} color={"#0BA5A4"} /> 
        </View>
      ) : (
        
        purchaseOrder.length == 0 ? (
          <View style={styles.notFoundText}>
            <Text variant="bodyMedium">No Purchase Orders Found</Text>
          </View>
        ) : (
          <FlatList
          // contentContainerStyle={styles.container}
            data={purchaseOrder}
            keyExtractor={(item) => item.purchaseId}
            renderItem={({ item }) => (
            
                <Card style={styles.card} onPress={() => {
                  Navigation.navigate("PurchaseDetails", {
                    purchaseId: item.purchaseId
                  });
                }}>
                  <Card.Content style={{gap: 10}}>
                    <View style={[Grid.row, {alignItems: "center", gap: 10}]}>
                      <View style={Grid['4col']}>
                        <View style={[Grid.row, {marginBottom: Dimensions.get('window').height*0.01}]}>
                          <Text variant="bodySmall"  style={{color: "#64696E"}}>{item.purchaseDate.substring(0, 10).split("-").reverse().join("-")}</Text>
                        </View>
                        <View style={[Grid.row, {justifyContent: "space-between"}]}>
                          <Text variant="titleMedium">{`PUR${item.purchaseId}`} </Text>
                        </View>
                        <View style={[Grid.row, {gap: 5}]}>
                          {item.products.slice(0, 5).map((product) => (
                            <Text variant="bodySmall" >{product.productName}</Text>
                          ))}
                        </View>
                      </View>
                      <View style={[Grid['1col'], {alignItems: "flex-end"}]}>
                        <MaterialIcons name="chevron-right" size={20} color="#64696E" />
                      </View>
                    </View>
  
                  </Card.Content>
                </Card>
            )}
          />
        )
      )
          
      }
     </>
  )
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    marginVertical: Dimensions.get("window").height * 0.005,
  },
  card: {
    marginHorizontal: Dimensions.get("window").width * 0.05,
    marginVertical: Dimensions.get("window").height * 0.01,
    backgroundColor:"#fff",
  },
  notFoundText: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: Dimensions.get('window').height*0.2
  }

});

