import { View, Text, ScrollView, FlatList, StyleSheet,Dimensions,SafeAreaView,Linking,TouchableOpacity } from 'react-native'
import React, {useEffect,useState} from 'react'
import { Feather } from '@expo/vector-icons';
import api from "../../../api/axiosConfig"
import serverUrl from '../../../api/urls'
import { AntDesign } from '@expo/vector-icons';

export default function DeliveryOrderBill({ route }) {
  const { orderId } = route.params;
  // API FETCHING CODE //

  const [deliveryOrder, setdeliveryOrder] = useState([]);
  useEffect(() => {
    fetchData();
  }, []);  

  const fetchData = async () => {
   
    try {
      const response = await api.get(serverUrl.getDeliveryOrdersById+orderId);
      setdeliveryOrder(response.data);
  
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const downloadInvoice = () => {
    const invoiceUrl = serverUrl.invoiceApi+orderId;
    Linking.openURL(invoiceUrl);
};

  ///////////////////////////////////
  const renderProductItem = ({ item,index }) => {
    return (
      <View style={styles.productContainer}>
        <Text style={styles.productName}>{item.productName}</Text>
        <View style={styles.orderitempriceconatiner}>
        <Text style={styles.productQty}>₹{item.sellPrice} x {item.orderQuantity} </Text>
        <Text style={styles.productPrice}>₹{item.sellPrice*item.orderQuantity}</Text>
        </View>
      </View>
    );
  };

    return (
 
    <SafeAreaView style={styles.mainContainer}>
 
    <View style={styles.View1}>
        <Text style={styles.orderTitle}>Order Summary</Text>
        <TouchableOpacity onPress={downloadInvoice}>
        <Text style={styles.downloadTxt}>Download Invoice <Feather name="download" size={14} color="green" /></Text>
        </TouchableOpacity>
        {deliveryOrder.products?.length > 0 && (
        <Text style={styles.title2}>{deliveryOrder.products.length} items in this order </Text>
        )}
    </View>
    <View>
        <FlatList
        data={deliveryOrder.products}
        renderItem={renderProductItem}
        keyExtractor={(item, index) => index.toString()}


        />
    </View>
   
    
    <View style={styles.paymentInfoContainer}>
        <Text style={styles.title3}>Payment Details</Text>
        <View style={styles.orderitempriceconatiner}>
          <Text>Sub Total</Text>
          <Text>₹{(deliveryOrder.totalSellPrice || 0).toFixed(2)}</Text>
        </View>
        <View style={styles.orderitempriceconatiner}>
          <Text>CGST 9%</Text>
          <Text>₹{(deliveryOrder.totalSellPrice ? (deliveryOrder.totalSellPrice * 0.09).toFixed(2) : 0)}</Text>
        </View>
        <View style={styles.orderitempriceconatiner}>
        <Text>SGST 9%</Text>
          <Text>₹{(deliveryOrder.totalSellPrice ? (deliveryOrder.totalSellPrice * 0.09).toFixed(2) : 0)}</Text>
        </View>
        <View style={styles.orderitempriceconatiner}>
        <Text style={styles.productPrice}>Total Amount</Text>
          <Text style={styles.productPrice}>₹{((deliveryOrder.totalSellPrice || 0) + ((deliveryOrder.totalSellPrice || 0) * 0.18)).toFixed(2)}</Text>
        </View>
    </View>

    <View>
      <Text style={styles.title3}>Order Details</Text>
      <Text style={styles.detailFeild}>Order id</Text>
      <Text style={styles.detailValue}>ORD{deliveryOrder.orderId}</Text>
      <Text style={styles.detailFeild}>Deliver to</Text>
      {deliveryOrder.customer && (
      <Text style={styles.detailValue}>{deliveryOrder.customer.customerName}, {deliveryOrder.customer.customerAddress}</Text>
      )}
      <Text style={styles.detailFeild}>Order date</Text>
      <Text style={styles.detailValue}>{deliveryOrder.orderDate ? deliveryOrder.orderDate.substring(0, 10).split("-").reverse().join("/") : ""}</Text>
      <Text style={styles.detailFeild}>Sold By</Text>
      <Text style={styles.detailValue}>{deliveryOrder.godownHeadName}, {deliveryOrder.godownAddress}</Text>
      
    </View>
    </SafeAreaView>
  )
}


const styles = StyleSheet.create({
  mainContainer:{
    padding:'3%',
    backgroundColor:'#FFF',
    flex:1,

  },
    orderTitle:{
        fontSize:22,
        fontWeight:'bold',

       },
      title2:{
        fontSize:18,
        fontWeight:'bold',
      },
      View1:{
       
        marginBottom:'5%'
      },
      downloadTxt:{
        color:'green',
        marginTop:'1.5%',
        marginBottom:'2%'
      },

      productName:{
        fontWeight:'500',
        fontSize:16,
        marginBottom:'0.5%'
      },
      productQty:{
        fontWeight:'400',
        color:'rgb(130,135,138)'
      },
      productContainer:{
        marginBottom:'2%'
      },
      productPrice:{
        fontWeight:'bold',
        fontSize:14.5,
      },

    orderitem:{

    },
    title3:{
      fontSize:18,
      fontWeight:'bold',
      marginBottom:'5%',
      marginTop:'3%'
    },
    orderitempriceconatiner:{
        flexDirection: 'row',
        alignItems:'center',
        justifyContent: 'space-between',
        marginVertical: '1.5%',
    },
    paymentInfoContainer:{
      borderTopWidth:Dimensions.get('window').height*0.015,
      borderColor:'#F5F6FC',
      borderBottomWidth:Dimensions.get('window').height*0.015,
    },
    detailFeild:{
      color:'rgb(118,120,128)',
      marginVertical: '0.5%',
    },
    detailValue:{
      marginVertical: '0.5%',
      marginBottom:'2.5%',
     
    },

})