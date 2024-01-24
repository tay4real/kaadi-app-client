import { View, Text, TouchableOpacity,StatusBar, ScrollView, TextInput, Button, Image } from 'react-native'
import React, { useState, useEffect } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import styles from './captureimage.style'
import { Ionicons } from '@expo/vector-icons'
import * as ImagePicker from "expo-image-picker";
import { COLORS } from '../../constants'
import selectImage from "../../assets/icons/icons8-photo-gallery-100.png";
import camera from "../../assets/icons/camera_icon.png";
import useAuth from '../../hooks/useAuth';
import axios from "axios";
import {LogBox} from 'react-native'


const CaptureUser = ({navigation, route}) => {
  LogBox.ignoreAllLogs()
  
  const { apiBaseURL } = useAuth();
  const [id, setID] = useState( "");
  const [pickedImagePath, setPickedImagePath] = useState("");
 
  useEffect(()=>{
    if(route.params.id){
      setID(route.params.id)
    }
  }, [])
 
  const showImagePicker = async () => {
    // Ask the user for the permission to access the media library
    const permissionResult =
    await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (permissionResult.granted === false) {
      alert("You've refused to allow this app to access your photos!");
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      aspect: [1,1]
    });

    // Explore the result
    console.log(result);

    if (!result.canceled) {   
      setPickedImagePath(result.assets[0].uri);
      console.log(result.assets[0].uri);
      
    }
  };

  const openCamera = async () => {
    // Ask the user for the permission to access the camera
    const permissionResult = 
    await ImagePicker.requestCameraPermissionsAsync();

    if (permissionResult.granted === false) {
      alert("You've refused to allow this app to access your camera!");
      return;
    }

    const result = await ImagePicker.launchCameraAsync({
      cameraType: ImagePicker.CameraType.front,
      allowsEditing: true,
      aspect: [1,1]
    });


    if (!result.canceled) {
      setPickedImagePath(result.assets[0].uri);
    }
  };

  const uploadProfilePicture = async () => {
    
    if (pickedImagePath !== "" && id !== "") {
      
      const formData = new FormData();

      formData.append("profile", {
        name: new Date() + "_" + id,
        uri: pickedImagePath,
        type: "image/jpg",
      });

      formData.append("id", id)

      try {
        // const res = await axios.post(`${apiBaseURL}/kaadi/uploadPicture.php`, formData);

        const res = await fetch(`${apiBaseURL}/kaadi_client/uploadPicture.php`, {
          method: 'POST',
          body: formData
        })
        
       
        
        if (res.ok) {                      
          setPickedImagePath("");
          navigation.navigate("Successful");                                                                                                                               
        }else{
          alert("Something went wrong! Try again");
          console.log(response.data.error);
          navigation.navigate("Welcome");
        }
      } catch (error) {
        
        console.log(error.message);
      }
    }else{
      alert("Something went wrong! Try again");
    }
  };                            

                                                
  return (
   <>
    <StatusBar backgroundColor={COLORS.primary} />
    <SafeAreaView style={styles.container}>
        <View style={styles.header}>
            <TouchableOpacity onPress={() => navigation.navigate("OtherInfo")}>
                <Ionicons name='arrow-back-outline' size={24}/>
            </TouchableOpacity>
            <Text style={styles.titleText}>Image Capture</Text>
        </View>
        <View style={styles.formContainer}>
            <View style={styles.formTitleContainer}>
                <Text style={styles.formTitle}>Capture User Image</Text>
            </View>

            <View style={styles.imageContainer}>
               <Image source={pickedImagePath != "" ? {uri : pickedImagePath} : {uri: "https://cdn.vectorstock.com/i/1000x1000/51/05/male-profile-avatar-with-brown-hair-vector-12055105.webp"}} style={styles.image} />
            </View>
            
            <View style={{ padding: 10, marginHorizontal: 20 }}>
              <TouchableOpacity
                activeOpacity={0.8}
                onPress={() => {
                  showImagePicker();
                }}
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                }}
              >
                <Image
                  source={selectImage}
                  style={{ width: 30, height: 30, marginRight: 14 }}
                />
                <Text style={{ fontSize: 18, fontWeight: "bold" }}>
                  Upload from Gallery
                </Text>
              </TouchableOpacity>
            </View>

            <View style={{ padding: 10, marginHorizontal: 20 }}>
              <TouchableOpacity
                activeOpacity={0.8}
                onPress={() => {
                  openCamera();
                }}
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                }}
              >
                <Image
                  source={camera}
                  style={{ width: 30, height: 30, marginRight: 14 }}
                />
                <Text style={{ fontSize: 18, fontWeight: "bold" }}>
                  Take Photo
                </Text>
              </TouchableOpacity>
            </View>

            <View style={styles.formSubmitContainer}>
              <TouchableOpacity style={styles.submitBtn} onPress={uploadProfilePicture}>
                <Text style={styles.submitBtnText}>Submit</Text>
              </TouchableOpacity>
            </View>
        </View>

    </SafeAreaView>
   </>
  )
}

export default CaptureUser