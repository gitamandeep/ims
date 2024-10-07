
import { View, Text, StyleSheet, TouchableOpacity, Modal, Image, Dimensions, FlatList, TouchableWithoutFeedback } from 'react-native'
import React, { useState, useEffect } from 'react'
import api from "../../../api/axiosConfig"
import serverUrl from '../../../api/urls'
import { Searchbar } from 'react-native-paper';
import { useNavigation, useFocusEffect } from "@react-navigation/native";


import AsyncStorage from '@react-native-async-storage/async-storage';
import Spinner from '../../../components/Spinner';

const imageSource = require('../../../../assets/battery.png')

export default function Products() {
  const navigation = useNavigation();

  const [searchQuery, setSearchQuery] = useState('');

  const [userRole, setUserRole] = useState('');
  // const [productData, setProductData] = useState([]);
  const [loading, setLoading] = useState(true)

  // Function to send data to parent component


  //////////////////////////////////////////////////////////
  // API FETCHING CODE //
 
  
  // useFocusEffect(
  //   React.useCallback(() => {
  //     fetchData();



  //   }, [userRole])
  // );

  // useEffect(() => {
  //   if (userRole !== '') {
  //     fetchData();
  //   }
  // }, [userRole]);

 
  // useEffect(() => {
  //   fetchData();
   
  // }, []);  
  useFocusEffect(
    React.useCallback(() => {
      fetchData();
    }, [])
  );

  const [productData, setProductData] = useState([]);
  const fetchData = async () => {
    const userString = await AsyncStorage.getItem('user');
    
    const user = JSON.parse(userString);
  
    const role = user.role;
    const godownId = user.godownId;
    setUserRole(role);    
    try {

      let url = '';
    
      if (userRole === 'admin') {
       
        url = serverUrl.getAllProducts;
      } else if (userRole === 'godownhead') {
      
        url = serverUrl.getGodownProducts+godownId;
 
      }
      else {
        url = serverUrl.getAllProducts;
     
      
      }
     
      const response = await api.get(url);
   
        setProductData(response.data);
      
  


      setLoading(false)
    } catch (error) {
     
     
      if (error.response && error.response.data === 'Product List is Empty') {
      setLoading(false)
      }
    }
  };

 
  
  const renderIconContainer = (item) => {
   
    if (userRole === 'godownhead') {
      return (
        <View style={styles.iconContainer}>
          <TouchableOpacity
            onPress={() => {
              // Handle icon press
              navigation.navigate('Update Product', { productData: item });
              console.log(item)
            }}>
            <Image
              source={require('../../../../assets/info.png')}
              style={styles.icon}
            />
          </TouchableOpacity>
        </View>
      );
    }
    return null;
  };

  /////////////////////////////////////////////////

  const [modalVisible, setModalVisible] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const renderItems = ({ item }) => {
    if (!searchQuery || item.productName.toLowerCase().includes(searchQuery.toLowerCase())) {
      return (
        <TouchableOpacity
          onPress={() => {
            setModalVisible(true);
            setSelectedProduct(item);
          }}>
          <View styles={styles.mainContainer}>

            <View style={styles.itemView}>
              <View style={{ justifyContent: 'center', marginLeft: 5 }}>
                <Image
                  source={imageSource}
                  style={styles.itemImage}
                />
              </View>

              <View style={styles.nameView}>
                <Text style={styles.nameText}>{item.productName}</Text>
                <Text style={styles.descText}>{'Qty : ' + item.totalQuantity}</Text>
                <View style={styles.priceView}>
                  <Text style={styles.priceText}>
                    {'₹' + item.price}
                  </Text>

                </View>
              </View>


            {renderIconContainer(item)}
            {/* <View style={styles.iconContainer}>
          <TouchableOpacity
            onPress={() => {
              // Handle icon press
              navigation.navigate('Update Product', { productData : item });
              console.log(item);
            }}>
            <Image
              source={require('../../../../assets/info.png')}
              style={styles.icon}
            />
          </TouchableOpacity>
        </View> */}

            </View>

          </View>
        </TouchableOpacity>
      );
    } else {
      // Return null if the item should be filtered out
      return null;
    }
  }

  return (
    <>
      {
        loading ? <Spinner animating={loading} size={"large"} color={"#0BA5A4"} /> :
          (<View style={styles.container1}>
            <View style={styles.topContainer}>
              <View style={styles.entries}>
                <Text style={styles.entriesTxt}>Total Entries : {productData.length} </Text>
              </View>
              {/* search bar  */}
              <View style={styles.searchContainer}>
                <Searchbar
                  style={styles.searchBar}
                  placeholder="Search"
                  onChangeText={setSearchQuery}
                  value={searchQuery}
                />
              </View>
              {/* /////////////////// */}
            </View>


            <Modal
              visible={modalVisible}
              animationType="slide"
              transparent={true}
              onRequestClose={() => {
                setModalVisible(!modalVisible);
              }}
            >
              <TouchableWithoutFeedback onPress={() => setModalVisible(false)}>
                <View style={styles.modalcontainer}>
                  <View style={styles.tablecontainer}>
                    <View style={styles.thead}>
                      <Text style={styles.theadfeild}>FIELD</Text>
                      <Text style={styles.theadfeild}>VALUE</Text>
                    </View>
                    <View style={styles.trow1}>
                      <Text style={styles.tfeild}>ID</Text>
                      <Text style={styles.tvalue}>{selectedProduct ? selectedProduct.productId : ''}</Text>
                    </View>
                    <View style={styles.trow2}>
                      <Text style={styles.tfeild}>Name</Text>
                      <Text style={styles.tvalue}>{selectedProduct ? selectedProduct.productName : ''}</Text>
                    </View>
                    <View style={styles.trow1}>
                      <Text style={styles.tfeild}>Godown Id</Text>
                      <Text style={styles.tvalue}>{selectedProduct ? selectedProduct.godownId : ''}</Text>
                    </View>
                    <View style={styles.trow2}>
                      <Text style={styles.tfeild}>Product Volume</Text>
                      <Text style={styles.tvalue}>{selectedProduct ? selectedProduct.productVolume : ''}</Text>
                    </View>
                    <View style={styles.trow1}>
                      <Text style={styles.tfeild}>Product Type</Text>
                      <Text style={styles.tvalue}>{selectedProduct ? selectedProduct.productType : ''} KW</Text>
                    </View>
                    <View style={styles.trow2}>
                      <Text style={styles.tfeild}>Category</Text>
                      <Text style={styles.tvalue}>{selectedProduct ? selectedProduct.productCategory : ''}</Text>
                    </View>
                    <View style={styles.trow1}>
                      <Text style={styles.tfeild}>Total Quantity</Text>
                      <Text style={styles.tvalue}>{selectedProduct ? selectedProduct.totalQuantity : ''}</Text>
                    </View>
                    <View style={styles.trow2}>
                      <Text style={styles.tfeild}>Price</Text>
                      <Text style={styles.tvalue}>₹{selectedProduct ? selectedProduct.price : ''}</Text>
                    </View>
                    <TouchableOpacity onPress={() => setModalVisible(!modalVisible)} style={styles.closeButton} >
                      <Text style={styles.btntext}>Close</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </TouchableWithoutFeedback>
            </Modal>



              <FlatList
                data={productData}
                renderItem={renderItems}
                keyExtractor={(item) => item.productId.toString()}
              />
          </View>
          )
      }
    

    </>
  )
}
const styles = StyleSheet.create({
  container1: {
    flex: 1,
    backgroundColor: '#fff',


  },
  itemView1: {

    flexDirection: 'row',
    width: '90%',
    alignSelf: 'center',
    backgroundColor: '#fff',
    elevation: 4,
    marginTop: 20,
    borderRadius: 10,
    height: 60,
    justifyContent: 'space-between', // Align child elements horizontally
    alignItems: 'center', // Align child elements vertically
    paddingHorizontal: 20,
  },
  itemText: {
    fontSize: 16,
  },



  // Product INFO

  cardBody: {
    marginTop: Dimensions.get('window').height * 0.55,
    alignItems: 'center',

  },
  card: {
    width: '98%', // Adjust the width as needed
    backgroundColor: '#fff',
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
  },
  cardContent: {

    marginTop: 20, // Make the card title bold
  },
  image: {

    width: 150, // Adjust the width and height as needed
    height: 150,
    borderRadius: 10, // Assuming it's a circular image

  },
  imageContainer: {
    alignItems: 'center', // Align items in the center horizontally
    justifyContent: 'center', // Align items in the center vertically
  },
  closeButton: {
    margin: 20,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 10,
    elevation: 5,
    backgroundColor: 'black',
    marginLeft: 85,
    marginRight: 85,
  },
  text: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: 'bold',
    letterSpacing: 0.25,
    color: 'white',
  },
  btntext: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: 'bold',
    letterSpacing: 0.25,
    color: 'white',
  },
  // container: {
  //   flex: 1,
  // },
  itemView: {
    flexDirection: 'row',
    width: '90%',
    alignSelf: 'center',
    backgroundColor: '#fff',
    elevation: 4,

    borderRadius: 10,
    height: 80,
    marginBottom: 10,
    flex: 1,

  },
  itemImage: {
    width: 35,
    height: 35,

    margin: 5,

  },
  nameView: {
    width: '69%',
    margin: 10,
  },
  priceView: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  nameText: {
    fontSize: 17,
    fontWeight: '500'
  },

  priceText: {
    fontSize: 15,
    color: 'green',
    fontWeight: '500'
  },

  icon: {
    width: 28,
    height: 28,


  },
  iconContainer: {
    justifyContent: 'center',
  },
  descText: {
    fontSize: 14,
    color: 'rgb(100,105,110)',

  },
  productInfoTxt: {
    fontWeight: 'bold',
    fontSize: 18,


  },
  productInfoValue: {
    fontSize: 18,
    color: 'green',
    fontWeight: '500',
  },
  mainContainer: {
    flex: 1,

  }
  ,
  //TABLE DESIGNS
  modalcontainer: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.6)',
    justifyContent: 'center',
    paddingLeft: Dimensions.get('window').width * 0.05,
    paddingRight: Dimensions.get('window').width * 0.05,

  },
  tablecontainer: {

    backgroundColor: '#fff',
    height: 470,
    width: '100%',
    borderRadius: 15,
    paddingTop: 25,


  },
  thead: {
    flexDirection: 'row',
    justifyContent: 'space-between', // Places the first text at the start and the second text at the end
    paddingHorizontal: 30,
    backgroundColor: 'rgb(249,250,251)',

    paddingTop: 10,
    paddingBottom: 10,
  },
  trow1: {
    flexDirection: 'row',
    justifyContent: 'space-between', // Places the first text at the start and the second text at the end
    paddingHorizontal: 30,
    backgroundColor: 'rgb(255,255,255)',
    paddingTop: 10,
    paddingBottom: 10,
  },
  trow2: {
    flexDirection: 'row',
    justifyContent: 'space-between', // Places the first text at the start and the second text at the end
    paddingHorizontal: 30,
    backgroundColor: 'rgb(249,250,251)',
    paddingTop: 10,
    paddingBottom: 10,
  },
  theadfeild: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  tfeild: {

  },
  tvalue: {
    color: 'rgb(140,140,140)',

  },
  searchContainer: {
    marginTop: 10,
    marginRight: 17,
    alignItems: 'flex-end', // Aligns items (search bar) to the end of the container (to the right)
  },
  searchBar: {
    width: 180,

    backgroundColor: '#f5f6fc',
    borderWidth: 2,


  },
  topContainer: {
    flexDirection: 'row',
    alignItems: 'center', // Align children components vertically
    justifyContent: 'space-between', // Distribute space between children components
    paddingHorizontal: 5, // Add padding horizontally
    marginBottom: 10,
  },
  entries: {
    marginTop: 20,
    marginLeft: 16,

  },
  entriesTxt: {
    fontSize: 14,
    fontWeight: '600',

  }


})