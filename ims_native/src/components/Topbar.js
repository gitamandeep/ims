import React, { useContext } from 'react';
import { Appbar, Menu } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { AuthContext } from '../context/authContext';



const TopBar = ({ route }) => {

  const title = route.name;
  // console.log(route) 
  // const [title, setTitle] = useState('Home'); // State to hold the title
  // const currentRoute = useRoute();
  // console.log(currentRoute.name);


  // Use useFocusEffect to execute logic on screen focus
  // useFocusEffect(
  //   React.useCallback(() => {
  //     // Get the name of the currently focused screen
  //     const screenName = currentRoute.name;

  //     // Set the title based on the currently focused screen
  //     switch (screenName) {
  //       case 'Home':
  //         setTitle('Home');
  //         break;
  //       case 'Product':
  //         setTitle('Product');
  //         break;
  //       case 'History':
  //         setTitle('History');
  //         break;
  //       case 'Supplier':
  //         setTitle('Supplier');
  //         break;
  //       case 'Profile':
  //         setTitle('Profile');
  //         break;
  //       default:
  //         setTitle('');
  //     }
  //   }, [navigation])
  // )
  const navigation = useNavigation();
  const { role } = useContext(AuthContext);


  const handleSupplierPress = () => {
    // Navigate to the "Add Supplier" page
    navigation.navigate('Supplier');
    // Close the menu
    closeMenu();
  };

  const handleProductPress = () => {
    // Navigate to the "Add Supplier" page
    navigation.navigate('Product');
    // Close the menu
    closeMenu();
  };

  const handleGodownPress = () => {
    // Navigate to the "Add Supplier" page
    navigation.navigate('Godown');
    // Close the menu
    closeMenu();
  };

  const handleCustomerPress = () => {
    // Navigate to the "Add Supplier" page
    navigation.navigate('Customer');
    // Close the menu
    closeMenu();
  };
  // console.log(title);
  const [visible, setVisible] = React.useState(false);
  const openMenu = () => setVisible(true);
  const closeMenu = () => setVisible(false);
  return (
    <Appbar.Header>

      <Appbar.Content title={title}
      />


      <Menu
        visible={visible}
        onDismiss={closeMenu}
        anchor={
          <Appbar.Action
            icon="menu"
            onPress={openMenu}

          />
        }>
        <Menu.Item
          onPress={handleSupplierPress}
          title="Supplier"

        />
        {/* <Menu.Item
          onPress={handleAddSupplierPress}
          title="Add Supplier"
        /> */}
        <Menu.Item
          onPress={handleProductPress}
          title="Product"

        />
        {/* <Menu.Item
          onPress={() => {
            console.log('Option 1 was pressed');
          }}
          title="Add Product"
        /> */}

        {/* <Menu.Item
          onPress={() => {
            console.log('Option 3 was pressed');
          }}
          title="Add P/O"
          
        /> */}
        {role === 'admin' && (
          <React.Fragment>
            <Menu.Item
              onPress={handleGodownPress}
              title="Godown"

            />
            <Menu.Item
              onPress={handleCustomerPress}
              title="Customer"

            />
          </React.Fragment>
        )}




      </Menu>
    </Appbar.Header>
  );
}

export default TopBar;