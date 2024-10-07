import { Dimensions, ScrollView, StyleSheet, View } from "react-native";
import React, { useEffect, useState } from "react";
import Container from "../../components/Container";
import CardComponent from "./components/CardComponent";
import LineChartComponent from "../../components/LineChartComponent";

import { Text } from "react-native-paper";
import { Grid } from "../../components/GlobalStyle"
import api from "../../api/axiosConfig"
import serverUrl from "../../api/urls"
import FloatingActionButton from "../../components/FloatingActionButton";
import Layout from "../../components/Layout";
import Spinner from "../../components/Spinner";
import CustomSegmentButton from "../AdminScreen/components/CustomSegmentButton";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useIsFocused } from "@react-navigation/native";

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

const HomeScreen = ({ route },) => {
    const [fabClicked, setFabClicked] = useState(false);
    const handleFabClick = () => {
        setFabClicked(!fabClicked);
    };

    const [loading, setLoading] = useState(true)
    const [selectedSegment, setSelectedSegment] = useState("Products Sold");

    const [data, setData] = useState({
        totalSales: 0,
        quantitySold: 0,
        todayOrder: 0,
        QuantitySoldToday: 0,
    });

    const [topSellingProducts, setTopSellingProducts] = useState([]);

    // line chart data
    const [salesByWeek, setSalesByWeek] = useState([]);
    const [orderQuantityByWeek, setOrderQuantityByWeek] = useState([]);

    const updateState = (newState, setState) => {
        setState((prevState) => ({ ...prevState, ...newState }));
    };


    const fetchSalesData = async() => {
        return new Promise(async(resolve, reject) => {
            const userString = await AsyncStorage.getItem('user');
            const user = JSON.parse(userString);
            api.get(`${serverUrl.getSales}/${user.godownId}`)
                .then(response => {
                    const data = {
                        totalSales: response.data.saleOrdersCount,
                        quantitySold: response.data.totalQuantitiesSold,
                    };
                    resolve(data);
                })
                .catch(error => {
                    reject(error);
                });
        });
    };


    const fetchTodaySalesData = async() => {
        return new Promise(async(resolve, reject) => {
            const userString = await AsyncStorage.getItem('user');
            const user = JSON.parse(userString);
            const today = new Date().toISOString().split('T')[0];
            api.get(serverUrl.getSalesByDate, {
                params: {
                    godownId: user.godownId,
                    date: today,
                },
            })
                .then(response => {
                    const data = {
                        todayOrder: response.data.salesByDate,
                        QuantitySoldToday: response.data.totalQuantitiesSoldByDate,
                    };
                    resolve(data);
                })
                .catch(error => {
                    reject(error);
                });
        });
    };



    const fetchTopSellingProducts = async() => {
        return new Promise(async(resolve, reject) => {
            const userString = await AsyncStorage.getItem('user');
            const user = JSON.parse(userString);
            api.get(`${serverUrl.getTopSellingProducts}/${user.godownId}`)
                .then(response => {
                    setTopSellingProducts(response.data);
                    resolve(response.data);
                })
                .catch(error => {
                    reject(error);
                });
        });
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
    

    const isFocused = useIsFocused();

    useEffect(() => {
        setLoading(true);
        fetchSalesData()
            .then(data => {
                updateState(data, setData);
            })
            .catch(error => {
                // console.log(error);
            });

        fetchTodaySalesData()
            .then(data => {
                updateState(data, setData);
            })
            .catch(error => {
                // console.log(error);
            });

        fetchTopSellingProducts()
            .catch(error => {
                // console.log(error);
            })

            getOrderQuantityDataByWeek()
            .then(data => {
                updateState(data, setOrderQuantityByWeek);
            })
           
            getSalesByDataWeek()
            .then(data => {
                updateState(data, setSalesByWeek);
            })
            .finally(() => setLoading(false));

    }, [isFocused])

    return (
        <>
        {  loading ? <Spinner animating={loading} color={"#0BA5A4"} size={"large"} /> :(
            <ScrollView>
        
                <Layout route={route}>
                    <ScrollView showsVerticalScrollIndicator={false} style={{
                        backgroundColor: fabClicked ? 'rgba(128,128,128)' : '#fff',
                        opacity: fabClicked ? 0.045 : 1,
                    }}>

                        <Container>
                            <View style={styles.homeContainer}>
                                <View style={[styles.cardContainer, Grid.row]}>
                                    <CardComponent title={`${data.quantitySold} Units`} description={"Total Sales"} iconName={"bar-chart"} iconLibrary={"FontAwesome"}/>
                                    <CardComponent title={`${data.QuantitySoldToday} Units`} description={"Today Order"} iconName={"shopping-cart"} iconLibrary={"FontAwesome"} />
                                </View>
                                <CustomSegmentButton state={selectedSegment} onValueChange={(value) => setSelectedSegment(value)} />

                                {selectedSegment === "Products Sold" ? (
                                    <LineChartComponent data={Object.values(orderQuantityByWeek)} />
                                    ) : (
                                    <LineChartComponent data={Object.values(salesByWeek)} />
                                )}
                                <Text variant="titleSmall" >Top Selling Items</Text>
                                <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.cardScrollContent}>
                                    <View style={[styles.cardContainer, Grid.row, styles.cardScrollPadding]}>
                                        {
                                            topSellingProducts.length > 0 ? (
                                                topSellingProducts.slice(0, 5).map((product, index) => (
                                                    <CardComponent key={index} title={`${product[1]} Units`} description={product[0]} iconName={"star"}  iconLibrary={"FontAwesome"} />
                                                ))
                                            ) : (
                                                <View style={[Grid.row, styles.cardContainer]}>
                                                    <CardComponent title={"0 Units"} description={"No Data"} iconName={"star"} iconLibrary={"FontAwesome"} />
                                                    <CardComponent title={"0 Units"} description={"No Data"} iconName={"star"} iconLibrary={"FontAwesome"} />
                                                </View>
                                            )
                                        }
                                    </View>
                                </ScrollView>
                            </View>
                        </Container>
                    </ScrollView>
                    <FloatingActionButton
                        onPress={()=> {
                            setFabClicked(!fabClicked)}

                        } />
                </Layout>
            </ScrollView>
            )}
            
        </>
    )
}
const styles = StyleSheet.create({
    homeContainer: {
        flex: 1,
        justifyContent: "center",
        gap: Dimensions.get("window").height * 0.02,
    },

    cardContainer: {
        gap: Dimensions.get("window").width * 0.04,
        alignItems: "center",
        justifyContent: "center",
    },

    scrollViewContainer: {
        flex: 1,
        maxWidth: "100%",
        overflow: "hidden",
    },

    cardScrollContent: {
        flexGrow: 1,
        flexDirection: "row",
        justifyContent: "flex-start",
        alignItems: "center",
    },

    cardScrollPadding: {
        padding: Dimensions.get("window").height * 0.005,
    },
});

export default HomeScreen;
