import React from 'react';
import { ScrollView, View, StyleSheet, Dimensions, TouchableOpacity } from 'react-native';
import { Text } from 'react-native-paper';

const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

const MonthScroller = ({handleScrollToMonth, selectedMonthIndex}) => {
  return (
    <ScrollView horizontal contentContainerStyle={styles.container}>
      {months.map((month, index) => (
        <TouchableOpacity
        key={index}
        style={[
          styles.month,
          index === selectedMonthIndex && styles.selectedMonth
        ]}
        onPress={() => handleScrollToMonth(index)}
      >
        <Text
          variant='bodySmall'
          style={[
            styles.monthText,
            index === selectedMonthIndex && styles.selectedMonthText
          ]}
        >
          {month}
        </Text>
      </TouchableOpacity>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    paddingVertical: Dimensions.get('window').height * 0.01,
    gap: Dimensions.get('window').width * 0.02,
  },

  month: {
    paddingHorizontal: Dimensions.get('window').width * 0.05,
    paddingVertical: Dimensions.get('window').height * 0.01,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 5,
  },
  selectedMonth: {
    borderColor: '#0BA5A4', 
  },
  selectedMonthText: {
    color: '#0BA5A4', 
  },
 
});

export default MonthScroller;
