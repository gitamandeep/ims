import * as React from "react";
import { Provider as PaperProvider } from 'react-native-paper';
import { AuthProvider } from "./src/context/authContext";
import NavigationFlow from "./src/navigation/NavigationFlow";
import { Provider as UserProvider } from "./src/context/UserContext";
import FlashMessage from "react-native-flash-message";
import { Dimensions } from "react-native";
import { CartProvider } from "./src/context/CartContext";


export default function App() {
  return (
    <CartProvider>
      <AuthProvider>
      <UserProvider>
        <PaperProvider>
          <NavigationFlow />
          <FlashMessage position="top" style={{paddingTop: Dimensions.get("window").height*0.03 }} />
        </PaperProvider>
      </UserProvider>
    </AuthProvider>
    </CartProvider>
    
   
  );
}
