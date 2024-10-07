import React, { useState, useEffect } from "react";
import { StyleSheet, View, Dimensions, InteractionManager } from "react-native";
import {
  Provider as PaperProvider,
  Button,
  Text,
  Card,
  Avatar,
  Menu,
  Divider,
} from "react-native-paper";
import { FontAwesome } from "@expo/vector-icons";
import DropDownPicker from "react-native-dropdown-picker";
import LineChartComponent from "../../components/LineChartComponent";
import FloatingActionButton from "../../components/FloatingActionButton";
import Container from "../../components/Container";
import Layout from "../../components/Layout";
import { SegmentedButtons } from "react-native-paper";
import serverUrl from "../../api/urls";
import api from "../../api/axiosConfig";
import CustomSegmentButton from "./components/CustomSegmentButton"
import { ScrollView } from "react-native-gesture-handler";

function ReduceOrderDetails(array) {
  return array.map((el) => {
    return {
      label: el.week,
      value: el.orderQuantity,
    };
  });
}

function ReduceSalesDetails(array) {
  return array.map((el) => {
    return {
      label: el.week,
      value: el.salesCount,
    };
  });
}

const AdminScreen = ({ route }) => {
  const [fabClicked, setFabClicked] = useState(false);
  const handleFabClick = () => {
    setFabClicked(!fabClicked);
  };
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(true);
  const [selectedValue, setSelectedValue] = useState("");
  const [items, setItems] = useState([]);
  const [Data, setData] = useState([]);
  const [Revenue, SetRevenue] = useState([]);
  const [sales, setSales] = useState(null);
  const [selectedSegment, setSelectedSegment] = useState("Products Sold");

   // line chart data
   const [salesByWeek, setSalesByWeek] = useState([]);
   const [orderQuantityByWeek, setOrderQuantityByWeek] = useState([]);

   const updateState = (newState, setState) => {
    setState((prevState) => ({ ...prevState, ...newState }));
};


  const getApiData = async () => {
    try {
          const response = await api.get(`${serverUrl.getAllGodown}`);
          setData(response.data);
          const dropdownItems = response.data.map((godown, index) => ({
            label: "Godown "+ godown.godownId,
            value: godown.godownId, // Assuming each godown has an id
          }));
          setItems(dropdownItems);
        // console.log("api response out" + JSON.stringify(Data))
      } catch (error) {
        console.error("Error fetching data:" + error);
      }
        console.log(Data);
    };
    
    
  const getApiData2 = async () => {
    try {
      const response = await api.get(`${serverUrl.getAllDelivery}`);
      SetRevenue(response.data);
      // console.log("api response out" + JSON.stringify(Data))
    } catch (error) {
      console.error("Error fetching data:" + error);
    }
    console.log(Revenue);
  };

  const calculateTotalSales = (orders) => {
    let total = 0;

    orders.forEach((order) => {
      total += order.orderQuantity * order.totalSellPrice;
    });
    // console.log(total);
    setSales(total);
    // console.log(sales);
    return total;
  };

  const handleDropdownChange = (value) => {
    setSelectedValue(value);
  };

  const getOrderQuantityDataByWeek = () => {
    return new Promise(async(resolve, reject) => {
        const url = serverUrl.getOrderQuantityByWeek;
        const userString = await AsyncStorage.getItem('user');
        const user = JSON.parse(userString);
        api
            .get(url, {
                params: {
                    godownId: user.godownId
                }
            })
            .then((response) => {
                const newData = ReduceOrderDetails(response.data);
                resolve(newData);
            })
            .catch((error) => {
                reject(error);
            });
    });
};

const getSalesByDataWeek = () => {
    return new Promise(async(resolve, reject) => {
        const url = serverUrl.getSalesByWeek;
        const userString = await AsyncStorage.getItem('user');
        const user = JSON.parse(userString);
        api
            .get(url, {
                params: {
                    godownId: user.godownId
                }
            })
            .then((response) => {
                const newData = ReduceSalesDetails(response.data);
                resolve(newData);
            })
            .catch((error) => {
                reject(error);
            });
    });
};
  
  
  useEffect(() => {
    getApiData();
    getApiData2();
    calculateTotalSales(Revenue);

    getOrderQuantityDataByWeek()
            .then(data => {
                updateState(data, setOrderQuantityByWeek);
            })
           
            getSalesByDataWeek()
            .then(data => {
                updateState(data, setSalesByWeek);
            })

    
  }, []);


  return (
    <Layout route={route}>
      <ScrollView style={{
        backgroundColor: fabClicked ? 'rgba(128,128,128)' : 'transparent',
        opacity: fabClicked ? 0.045 : 1,
      }}>
      <Container>


        <View style={styles.cards}>
          <Card style={styles.card1}>
            <Card.Content>
              <Text variant="titleMedium">Profit</Text>
              <Text
                variant="bodyLarge"
                style={{ textAlign: "center", color: "green" }}
              >
                ₹200
              </Text>
            </Card.Content>
          </Card>
          <Card style={styles.card2}>
            <Card.Content>
              <Text variant="titleMedium">Revenue</Text>
              <Text
                variant="bodyLarge"
                style={{ textAlign: "center", color: "green" }}
              >
                ₹9026
              </Text>
            </Card.Content>
          </Card>
        </View>
        <View style={styles.cards}>
          <Card style={styles.card1}>
            <Card.Content>
              <Text variant="titleMedium">Total Godowns</Text>
              <Text variant="bodyLarge" style={{ textAlign: "center" }}>
                {Data.length}
              </Text>
            </Card.Content>
          </Card>
          <Card style={styles.card2}>
            <Card.Content>
              <Text variant="titleMedium">Godown Capacity</Text>
              <Text variant="bodyLarge" style={{ textAlign: "center" }}>
              {selectedValue
                  ? Data.find((godown) => godown.godownId === selectedValue)
                      ?.volume || 0
                    : Data.length > 0
                      ? Data[0].volume
                      : 0}
                </Text>
              </Card.Content>
            </Card>
          </View>
          <View style={styles.sbtn}>
            <CustomSegmentButton state={selectedSegment} onValueChange={(value) => setSelectedSegment(value)} />
          </View>


          {selectedSegment === "Products Sold" ? (
            <LineChartComponent data={orderQuantityByWeek} />
          ) : (
            <LineChartComponent data={salesByWeek} />
          )}

       
      </Container>

      </ScrollView>
      <FloatingActionButton
          onPress={() => {
            setFabClicked(!fabClicked)
          }

          } />
      

    </Layout>

  );
}
const styles = StyleSheet.create({
  cards: {
    flexDirection: "row",
    justifyContent: "space-evenly", // Optional: to evenly space the cards
    // paddingHorizontal: 10, // Optional: to add some space around the cards
  },
  card1: {
    flexDirection: "row",
    width: Dimensions.get("screen").width * 0.42, // Adjust the width as needed
    height: 90,
    marginTop: 20,
    textAlign: "center",
    justifyContent: "center",
    alignItems: "center",
  },
  card2: {
    flexDirection: "row",
    width: Dimensions.get("screen").width * 0.42, // Adjust the width as needed
    height: 90,
    marginTop: 20,
    textAlign: "center",
    justifyContent: "center",
    alignItems: "center",
  },
  sbtn: {
    marginTop: 13,
  }
});

export default AdminScreen;
