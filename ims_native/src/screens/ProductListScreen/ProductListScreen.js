
import React from 'react'
import { createStackNavigator } from '@react-navigation/stack';

import ListProducts from './ListProducts'
import Container from '../../components/Container';


const Stack = createStackNavigator();
export default function ProductListScreen() {
  return (

<ListProducts/>

  )
}
