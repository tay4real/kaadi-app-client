import { useEffect, useState } from "react"
import axios from "axios"
import AsyncStorage from "@react-native-async-storage/async-storage"
import { useSelector, useDispatch } from "react-redux"
//import {API_BASE_URL} from '@env'

const useAuth = () => {

  //const apiBaseURL = "http://192.168.153.43/kaadiapi";
  const apiBaseURL = "https://sitaapps.ng";

  let {
    user,
    isLoading,
    error
  } = useSelector((state) => state.authReducer);

  const dispatch = useDispatch();



  useEffect(() => {
    loadStorageData();
  }, []);


  async function loadStorageData() {
    let authDataSerialized = await AsyncStorage.getItem("@user");

    try {
      if(authDataSerialized){
        const _authData = JSON.parse(authDataSerialized);

        dispatch({ type: "LOAD_USER_SUCCESS", payload: _authData });
        
      }
    } catch (error) {
      console.log(error)
    }
  }

  const signIn = async (username, password) => {
    try {
      dispatch({ type: "LOAD_USER_START" });
      const res = await axios.post(`${apiBaseURL}/api/controllers/users.php`, {
        username: username.trim(),
        password: password.trim(),
        "user-login" : true
      });
      

      if(res.data){
        if(res.data.error){
          
         
          dispatch({
            type: "LOAD_USER_FAILURE",
            payload: res.data.error,
          });

        }else{
          console.log(res.data)
          
          AsyncStorage.setItem("@user", JSON.stringify(res.data));
          dispatch({ type: "LOAD_USER_SUCCESS", payload: res.data });
        }
        
      }
    } catch (error) {
     
      dispatch({
        type: "LOAD_USER_FAILURE",
        payload: error.response.data.message,
      });
    }
  }

  const SignOut = async () => {
    dispatch({
      type: "USER_SIGNOUT",
    });
    await AsyncStorage.removeItem("@user");
  }

  return {
    user,
    isLoading,
    error,
    apiBaseURL,
    signIn,
    SignOut
  }
}

export default useAuth