import { View, Text, StyleSheet, TouchableOpacity, Image, Dimensions, FlatList, TouchableWithoutFeedback } from 'react-native'
import React, { useState, useEffect, } from 'react'
import { useNavigation } from "@react-navigation/native";
import api from "../../../api/axiosConfig"
import serverUrl from '../../../api/urls'
import { Searchbar } from 'react-native-paper';
import Spinner from '../../../components/Spinner';

const imageSource = require('../Assets/warehouse.png')

export default function Godowns() {
  const [searchQuery, setSearchQuery] = useState('');
  const [godownData, setGodownData] = useState([]);
  const [loading, setLoading] = useState(true)
  const [selectedGodown, setSelectedGodown] = useState(null);
  const Navigation = useNavigation();
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {

    try {
      const response = await api.get(`${serverUrl.getAllGodowns}`);
      setGodownData(response.data);
      setLoading(false)
    } catch (error) {
      if (error.response && error.response.data === 'No Godowns Found') {
        setLoading(false)
        }
      console.error('Error fetching data:', error.response.data);
      
    }
  };


  /////////////////////////////////////////////////


  const renderItems = ({ item }) => {
    const matchAddress = !searchQuery || item.address.toLowerCase().includes(searchQuery.toLowerCase());
    const matchId = !searchQuery || item.godownId.toString().toLowerCase().includes(searchQuery.toLowerCase());
    if (matchAddress || matchId) {
      return (
        <View>
          <TouchableOpacity onPress={() => {
            Navigation.navigate("GodownDetails", {
              godownId: item.godownId,
            })
          }}
          >
            <View style={styles.itemView}>
              <Image
                source={imageSource}
                style={styles.itemImage}
              />
              <View style={styles.nameView}>
                <View style={styles.priceView}>
                  <Text>ID : </Text>
                  <Text style={styles.priceText}>
                    {'GH0' + item.godownId}
                  </Text>

                </View>
                <Text numberOfLines={1} style={styles.nameText}>{item.address}</Text>


              </View>
              <View >
                <TouchableOpacity
                  onPress={() => {
                  }}>
                  <Image
                    source={require('../../../../assets/next.png')}
                    style={styles.icon}

                  />
                </TouchableOpacity>

              </View>
            </View>
          </TouchableOpacity>


        </View>
      );
    } else {
      // Return null if the item should be filtered out
      return null;
    }
  };

  return (
    <>{
      loading ? <Spinner animating={loading} size={"large"} color={"#0BA5A4"} /> :
        (<View style={styles.container1}>
          <View style={styles.topContainer}>
            <View style={styles.entries}>
              <Text style={styles.entriesTxt}>Total Entries : {godownData.length} </Text>
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





          <FlatList
            data={godownData}
            renderItem={renderItems}
            keyExtractor={(item) => item.godownId}
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



  // supplier INFO

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
  container: {
    flex: 1,
  },
  itemView: {
    flexDirection: 'row',
    width: '90%',
    alignSelf: 'center',
    backgroundColor: '#fff',
    elevation: 4,
    marginTop: 10,
    borderRadius: 10,
    height: 60,
    marginBottom: 10,
    alignItems: 'center'
  },
  itemImage: {
    width: 40,
    height: 40,
    borderRadius: 10,
    margin: 5,
  },
  nameView: {
    width: '53%',
    margin: 10,
  },
  priceView: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  nameText: {
    fontSize: 17,
    fontWeight: '500',
  },

  priceText: {
    fontSize: 15,
    color: 'green',

  },

  icon: {
    width: 28,
    height: 28,
    marginLeft: 45,

  },
  descText: {
    fontSize: 14,
    fontWeight: '600',
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
  btntext: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: 'bold',
    letterSpacing: 0.25,
    color: 'white',
  },
  //////////////
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


  /////////////////

})