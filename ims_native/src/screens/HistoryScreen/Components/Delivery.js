import { View, StyleSheet,Dimensions,FlatList } from 'react-native'
import React, {useState,useEffect} from 'react'

import api from "../../../api/axiosConfig"
import serverUrl from '../../../api/urls'
import { useNavigation } from '@react-navigation/native';
import { Card ,Text} from 'react-native-paper';
import { Grid } from '../../../components/GlobalStyle';
import { MaterialIcons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Spinner from '../../../components/Spinner';
import Container from '../../../components/Container';

const imageSource = require('../Assets/delivery.png')

export default function Delivery() {
  //////////////////////////////////////////////////////////
  // API FETCHING CODE //

  const [deliveryOrder, setdeliveryOrder] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);  

  const Navigation = useNavigation();
  const fetchData = async () => {   
    try {
      const userString = await AsyncStorage.getItem('user');
      const user = JSON.parse(userString);
      const url = user.role === 'admin' ? serverUrl.getAllDelivery : serverUrl.getDeliveryOrdersByGodownId+user.godownId;
      api.get(url)
      .then(response => {
        setdeliveryOrder(response.data);
      
      })
      .catch(error => {
        // console.error('Error fetching data:', error);
      })
      .finally(() => setLoading(false));
    } catch (error) {
      // console.error('Error fetching data:', error);
    }
  };
  

/////////////////////////////////////////////////
     
  return (
    <>
      {
        loading ? (
        <View style={{marginTop: Dimensions.get('window').height*0.2}}>
          <Spinner animating={loading} size={"large"} color={"#0BA5A4"} /> 
        </View>
        ): (
           
            deliveryOrder.length == 0 ? ( 
              <View style={styles.notFoundText}>
                <Text variant='bodyMedium' >No Delivery Orders Found</Text>
              </View>
            
            ) : (

              <FlatList
                // contentContainerStyle={styles.container}
                data={deliveryOrder}
                showsVerticalScrollIndicator={false}
                
                keyExtractor={(item) => item.orderId}
                renderItem={({ item }) => (
                
                    <Card style={styles.card}  onPress={() => {
                      Navigation.navigate("Invoice", {
                        orderId: item.orderId,
                      });
                    }}>
                      <Card.Content style={{gap: 10}}>
                        <View style={[Grid.row, {alignItems: "center", gap: 10}]}>
                          <View style={Grid['4col']}>
                            <View style={[Grid.row, {marginBottom: Dimensions.get('window').height*0.01}]}>
                              <Text variant="bodySmall"  style={{color: "#64696E"}}>{item.orderDate.substring(0, 10).split("-").reverse().join("-")}</Text>
                            </View>
                            <View style={[Grid.row, {justifyContent: "space-between"}]}>
                              <Text variant="titleMedium">{`ORD${item.orderId}`} </Text>
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
