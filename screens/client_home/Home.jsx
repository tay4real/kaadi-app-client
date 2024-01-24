import { View,StatusBar, Image, Text} from 'react-native'
import React, { useEffect, useState } from 'react'
import styles from './stylesheet';
import { SafeAreaView } from 'react-native-safe-area-context'
import { Menu } from '../../components';
import { COLORS } from '../../constants';
import img from "../../assets/avatar.jpg"
import useAuth from '../../hooks/useAuth';
import axios from 'axios';



const Home = () => {
  const {  user, apiBaseURL } = useAuth();
  const [profile_img, setProfileImage] = useState(null);

  useEffect(()=>{
    if(user && user.profile_image === 1){
      setProfileImage(`${apiBaseURL}/registration/pictures/${user.orin}.jpg`)
    }
  }, [])

  console.log(profile_img);
  return (
    <>
     <StatusBar backgroundColor={COLORS.primary} />
      <SafeAreaView style={styles.container}>
        <View style={{
          height:"30%",
          width:"100%", 
          borderBottomLeftRadius: 30, 
          borderBottomRightRadius: 30, 
          backgroundColor: COLORS.primary, 
          alignItems: "center",
          justifyContent: "center"
        }}>
          {/*  */}
          <View style={{height: 130, width: 130, borderRadius: 75, padding: 5, backgroundColor: "grey"}}>
           {
            profile_img !== null ? 
            <Image style={{
              width: "100%",
              height:"100%",
              borderRadius: 75
            }} source={{uri: profile_img}} />
            :
            <Image style={{
              width: "100%",
              height:"100%",
              borderRadius: 75
            }} source={img} />
           }
          </View>
          <Text style={{
            fontSize: 24,
            fontWeight: "600",
            color: "#222",
          }}>{user && user.surname + " " + user.firstname}</Text>
        </View>
        <View style={{marginTop: 50}}>
          <View style={styles.menuContainer}>
              <Menu icon={'person-circle-sharp'} title={'My Profile'} location={"MyProfile"} />
              <Menu icon={'people-circle-sharp'} title={'Social Benefits'} location={"SocialBenefits"} />
              <Menu icon={'fitness-sharp'} title={'Health Tracker'} location={"HealthBenefits"} />
          </View>
          
          <View style={styles.menuContainer}>
              <Menu icon={'folder-open-sharp'} title={'Assets'} location={"Assets"} />
              <Menu icon={'eye-sharp'} title={'Security'} location={"Security"} />
              <Menu icon={'stats-chart-sharp'} title={'Tax'} location={"Tax"} />
          </View>
          
        </View>
        
      </SafeAreaView>
    </>
  )
}



export default Home