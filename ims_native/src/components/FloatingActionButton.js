import React, { useContext,useEffect,useState } from 'react';
import { FloatingAction } from 'react-native-floating-action';
import { AntDesign, MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';
import { Dimensions, Modal, TouchableOpacity, TouchableWithoutFeedback, Platform, Text, View } from 'react-native';
import { StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { AuthContext } from '../context/authContext';



const FloatingActionButton = ({ onPress }) => {
  const navigation = useNavigation();
  const {role}  = useContext(AuthContext);
  // const role = 'admin' ;
  const [actions, setActions] = useState([
    {
      text: "Add Supplier",
      icon: <MaterialCommunityIcons name="truck-plus-outline" size={20} color="white" />,
      name: "Add Supplier",
      position: 1
    }
  ]);
  
  
  useEffect(() => {
    if (role === 'admin') {
      setActions(prevActions => [
        ...prevActions,
        {
          text: "Add Customer",
          icon: <AntDesign name="adduser" size={20} color="white" />,
          name: "Add Customer",
          position: 2
        },
        {
          text: "Add Godown",
          icon: <MaterialIcons name="warehouse" size={20} color="white" />,
          name: "Add Godown",
          position: 3
        }
      ]);
    } else {
      setActions(prevActions => [
        ...prevActions,
        {
          text: "Add Product",
          icon: <MaterialIcons name="add-shopping-cart" color="white" size={20} />,
          name: "Add Product",
          position: 2
        },
        {
          text: "Add P/O",
          icon: <MaterialCommunityIcons name="warehouse" size={20} color="white" />,
          name: "Add P/O",
          position: 3
        }
      ]);
    }
  }, [role]);
  const setOnPress = () => {
    onPress(true);
  }
  return (
    
    <View style={styles.container}>


      <FloatingAction
        onPressMain={() => setOnPress()}
        actions={actions}
        onPressItem={name => {
          navigation.navigate(name);
          setOnPress()
        }}
      />

      {/* // actionsPaddingTopBottom={250} */}

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    bottom: 20,
    //  position:'absolute',
    zIndex: 1
  },
});
export default FloatingActionButton;
