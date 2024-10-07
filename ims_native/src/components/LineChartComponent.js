import { Dimensions, View } from "react-native";
import { Text } from "react-native-paper";
import { LineChart } from "react-native-gifted-charts";
import { StyleSheet } from "react-native";

const dummyData = [
  { label: 'week 1', value: 12 },
  { label: 'week 2', value: 20 },
  { label: 'week 3', value: 35 },
  { label: 'week 4', value: 8 },
  { label: 'week 5', value: 45 },
  { label: 'week 6', value: 18 },
  { label: 'week 7', value: 30 },
  { label: 'week 8', value: 23 },
  { label: 'week 9', value: 42 },
  { label: 'week 10', value: 15 },
  { label: 'week 11', value: 37 },
  { label: 'week 12', value: 5 },
  { label: 'week 13', value: 28 },
  { label: 'week 14', value: 33 },
  { label: 'week 15', value: 19 },
  { label: 'week 16', value: 10 },
  { label: 'week 17', value: 47 },
  { label: 'week 18', value: 25 },
  { label: 'week 19', value: 38 },
  { label: 'week 20', value: 14 },
  { label: 'week 21', value: 29 },
  { label: 'week 22', value: 41 },
  { label: 'week 23', value: 9 },
  { label: 'week 24', value: 36 },
  { label: 'week 25', value: 21 },
  { label: 'week 26', value: 7 },
  { label: 'week 27', value: 49 },
  { label: 'week 28', value: 16 },
  { label: 'week 29', value: 32 },
  { label: 'week 30', value: 11 },
  { label: 'week 31', value: 44 },
  { label: 'week 32', value: 24 },
  { label: 'week 33', value: 6 },
  { label: 'week 34', value: 39 },
  { label: 'week 35', value: 17 },
  { label: 'week 36', value: 34 },
  { label: 'week 37', value: 22 },
  { label: 'week 38', value: 48 },
  { label: 'week 39', value: 13 },
  { label: 'week 40', value: 31 },
  { label: 'week 41', value: 50 },
  { label: 'week 42', value: 27 },
  { label: 'week 43', value: 3 },
  { label: 'week 44', value: 46 },
  { label: 'week 45', value: 26 },
  { label: 'week 46', value: 4 },
  { label: 'week 47', value: 40 },
  { label: 'week 48', value: 2 },
  { label: 'week 49', value: 43 },
  { label: 'week 50', value: 1 },
  { label: 'week 51', value: 51 },
  { label: 'week 52', value: 0 },
];


const LineChartComponent = ({ data }) => {
  return (
    <>
      <View style={styles.container}>
        <Text
          variant="titleSmall"
          style={{ textAlign: "left", alignSelf: "flex-start" }}
        >
          Sales Overview
        </Text>
        <LineChart
          data={data.length > 0 ? data : dummyData}
          curved
          initialSpacing={25}
          hideDataPoints
          xAxisLabelsVerticalShift={5}
          xAxisColor="transparent"
          yAxisColor="transparent"
          color="#0BA5A4"
          yAxisTextStyle={{ fontSize: Dimensions.get("window").width * 0.03 }}
          rulesType="solid"
          rulesColor="#f2f2f2"
          areaChart
          startFillColor="rgba(14,164,164,0.3)"
          endFillColor="rgba(14,164,164,0)"
          startOpacity={0.6}
          endOpacity={0.1}
          spacing={60}
          height={Dimensions.get("window").height * 0.22}
        />
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default LineChartComponent;
