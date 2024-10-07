import { View, Text, StyleSheet } from 'react-native'
import React from 'react'

export default function Entries({productDataLen}) {
  
  return (
    <View style={styles.entries}>
      <Text style={styles.entriesTxt}>Total Entries : {productDataLen} </Text>
    </View>
  )
}

const styles = StyleSheet.create({
    entries:{
        marginTop: 20,
        marginLeft:22,
      
    },
    entriesTxt:{
      fontSize: 14,
      fontWeight: '600',

    }
})