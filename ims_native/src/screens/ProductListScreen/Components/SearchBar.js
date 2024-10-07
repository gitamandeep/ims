import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import { Searchbar } from 'react-native-paper';

export default function SearchBar() {
    const [searchQuery, setSearchQuery] = React.useState('');

  return (
    <View style={styles.container}>
    <Searchbar
    style={styles.searchBar}
      placeholder="Search"
      onChangeText={setSearchQuery}
      value={searchQuery}
    />
    </View>
  )
}

const styles = StyleSheet.create({
    container: {
        marginTop: 20,
        marginRight:20,
        alignItems: 'flex-end', // Aligns items (search bar) to the end of the container (to the right)
    },
    searchBar: {
        width: 180,
    }
})