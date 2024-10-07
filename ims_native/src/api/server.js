import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

const token= AsyncStorage.getItem('auth');

export default axios.create({
    baseURL:'https://936d-2401-4900-1c2b-ceef-adc5-db43-7369-df98.ngrok-free.app',
    headers:{
        "Content-Type":"application/json",
        "Authorization": `Bearer ${token}`
    },

    withCredentials: true
});
