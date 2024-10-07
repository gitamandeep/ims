import { View, Text,StyleSheet} from 'react-native'
import React from 'react'


import Supplier from './Componenets/Supplier'

export default function ListSupplier() {
  return (
    /*
    view

    segment button 
    //state modification
    state && <View></View>
    
    */
  //   <View >
  //   <View style={styles.inlineContainer}>
  //    <Entries  productDataLen ={ supplierData.length}/>
  //    <SearchBar/>
  //  </View>
  <Supplier/>

//  </View>

  )
}
const styles = StyleSheet.create({

    inlineContainer: {
      flexDirection: 'row', // Align children components horizontally
      alignItems: 'center', // Align children components vertically
      justifyContent: 'space-between',
     
    },
    mainContainer:{
      flex:1,
    }

  });