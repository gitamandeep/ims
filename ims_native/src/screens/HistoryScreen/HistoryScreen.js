
import { StyleSheet, View , Dimensions} from 'react-native';
import { SegmentedButtons } from 'react-native-paper';
import Delivery from './Components/Delivery';
import Purchase from './Components/Purchase';
import Layout from '../../components/Layout';
import { Grid } from '../../components/GlobalStyle';
import CardComponent from '../HomeScreen/components/CardComponent';
import { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import api from "../../api/axiosConfig"
import serverUrl from "../../api/urls"
import { useIsFocused } from '@react-navigation/native';
import Spinner from '../../components/Spinner';

export default function HistoryScreen({route}) {
    const [value, setValue] = useState('Purchase');
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState({
      purchaseProductsCount: 0,
      soldProductsCount: 0,
    })

    const updateState = (newData) => {
      setData((prevState) => ({ ...prevState, ...newData }));
  };

    const fetchData = async () => {
      try {
        const userString = await AsyncStorage.getItem('user');
        const user = JSON.parse(userString);
        const purchaseUrl = user.role === 'admin' ? serverUrl.getPurchaseProductsCount : serverUrl.getPurchaseProductCountBygodownId+user.godownId;
        api.get(purchaseUrl)
          .then(response => {
            updateState({purchaseProductsCount: response.data})
          })
          .catch(error => {
            console.error('Error fetching data:', error);
          });


          const deliveryUrl = user.role === 'admin' ? serverUrl.getTotalDeliveryProducts : `${serverUrl.getSales}/${user.godownId}`;
          api.get(deliveryUrl)
          .then(response => {
            updateState({soldProductsCount: user.role === 'admin' ? response.data : response.data.totalQuantitiesSold})
          })
          .catch(error => {
            console.error('Error fetching data:', error);
          })
          .finally(() => setLoading(false));

          
      } catch (error) {
        console.error('Error fetching data:', error);
      }

        
    } 

    const isFocused = useIsFocused();
    
    useEffect(() => {
      fetchData()

    }, [isFocused])
  
    return (
      <>
      <Layout route={route}>
       {
        loading ? <Spinner animating={loading} size={"large"} color={"#0BA5A4"} /> : (
          <View style={styles.container}>
              <View style={[Grid.row, styles.header]}>
                    <CardComponent title={`${data.purchaseProductsCount}`} description="Items In" iconName="move-to-inbox" bgColor="#fff" iconLibrary={"MaterialIcons"} />
                    <CardComponent title={`${data.soldProductsCount}`} description="Items Out" iconName="outbox" bgColor="#fff" iconLibrary={"MaterialIcons"} />
                </View>
              <View style={styles.segmentContainer}>
                <SegmentedButtons 
                    value={value}
                    onValueChange={setValue}
                    buttons={[
                      {
                        value: 'Purchase',
                        label: 'Purchase',
                      },
                      {
                        value: 'Delivery',
                        label: 'Delivery',
                      },
                      
                    ]}
                  />
                </View>
                    <View style={{marginBottom: Dimensions.get('window').height*0.64}}>
                        {value==="Purchase" ? <Purchase/> : <Delivery/>}
                    </View>
                    
            </View>
        )
       }


      </Layout>
      </>

    
  )
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#FFF',
  },
  segmentContainer: {
      
      alignItems: 'center',
      marginHorizontal: Dimensions.get("window").width * 0.05,
      marginVertical: Dimensions.get("window").height * 0.01,
    },

    header: {
      marginHorizontal: Dimensions.get("window").width * 0.05,
      marginVertical: Dimensions.get("window").height * 0.01,
      gap: Dimensions.get("window").width * 0.04,

    }
  });
