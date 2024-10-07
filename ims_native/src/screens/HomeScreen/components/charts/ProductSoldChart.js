import React, { useEffect, useRef, useState } from "react";
import { Dimensions, View } from "react-native";
import { Text } from "react-native-paper";
import { LineChart } from "react-native-gifted-charts";
// import MonthScroller from "../MonthScroller";
import { StyleSheet } from "react-native";
import axios from "axios";

function Reduce(array) {
  return array.map((el) => {
    return {
      label: el.week,
      value: el.orderQuantity,
    };
  });
}

const LineChartComponent = () => {
  const [Data, setData] = useState(null);
  const [maxValue, setMaxValue] = useState(0);
  const ref = useRef(null);
  // const [selectedMonthIndex, setSelectedMonthIndex] = useState(2);

  const updateState = (newData) => {
    setData(newData);
  };

  // const handleScrollToMonth = (index) => {
  //   const dataWidth = lineData.length * 6;
  //   const chartWidth = Dimensions.get("window").width;
  //   const scrollPosition = index * dataWidth - chartWidth;
  //   ref.current?.scrollTo({ x: scrollPosition, animated: true });
  //   setSelectedMonthIndex(index);
  // };

  useEffect(() => {
    const getOrderData = () => {
      const url =
        "https://231a-117-215-153-177.ngrok-free.app/api/getOrderQuantityByWeek?godownId=1";

      axios
        .get(url, {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
            Authorization:
              "Bearer 9M0Bvc5kQoVl2iHa35SdauayiZAGmtc0X9vpk0bBdGE=",
          },
        })
        .then((response) => {
          // console.log("API response:", response.data); // Log the API response
          const newData = Reduce(response.data);
          // console.log("Reduced data:", newData); // Log the reduced data
          setData(newData); // Update the state with the fetched data
        })
        .catch((error) => {
          console.error("Error fetching data:", error);
        });
    };
    getOrderData();
  }, []);

  return (
    <>
      <View style={styles.container}>
        <Text
          variant="titleSmall"
          style={{ textAlign: "left", alignSelf: "flex-start" }}
        >
          Sales Overview
        </Text>
        {/* <MonthScroller
          handleScrollToMonth={handleScrollToMonth}
          selectedMonthIndex={selectedMonthIndex}
        /> */}
        <LineChart
          scrollRef={ref}
          data={Data}
          curved
          initialSpacing={25}
          hideDataPoints
          // rotateLabel
          xAxisLabelsVerticalShift={5}
          xAxisColor="transparent"
          yAxisColor="transparent"
          color="#0BA5A4"
          yAxisTextStyle={{ fontSize: Dimensions.get("window").width * 0.03 }}
          rulesType="solid"
          rulesColor="#EEEDEB"
          areaChart
          startFillColor="rgba(14,164,164,0.3)"
          endFillColor="rgba(14,164,164,0)"
          startOpacity={0.6}
          endOpacity={0.1}
          spacing={60}
          // width={Dimensions.get('window').width * 0.9}
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
