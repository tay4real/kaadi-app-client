import { View,Text,  SafeAreaView, StyleSheet, TouchableOpacity, Image, ScrollView, StatusBar } from 'react-native'
import React, {useState, useEffect} from 'react'
import { COLORS, SIZES } from '../../constants'
import { Ionicons } from '@expo/vector-icons'
import useAuth from '../../hooks/useAuth';
import img from "../../assets/avatar.jpg"
import axios from 'axios';



const MyProfile = ({navigation}) => {
  
  const {  user, apiBaseURL } = useAuth();
  const [children, setChildren] = useState([]);
  const [profile_img, setProfileImage] = useState(null);


 



  const getChildrenInformation = async(user_id) => {
    try {
      
      const res = await axios.get(`${apiBaseURL}/kaadi_client/children_information.php?user_id=${user_id}`);
      
      console.log(res.data)
      if (res.data) {
        setChildren(res.data);
      }
    } catch (error) {  
      console.log(error.response);
      return false;
    }
  }

  useEffect(()=> {

    if(user && user.orin){
      getChildrenInformation(user.orin)
    }

    if(user && user.profile_image === 1){
      setProfileImage(`${apiBaseURL}/registration/pictures/${user.orin}.jpg`)
    }

  }, [])



  return (
   <>
    <StatusBar backgroundColor={COLORS.primary} />
    <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.navigate("Home")} style={styles.back}>
                <Ionicons name='arrow-back-outline' size={24}/>
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Profile</Text>
        </View>
        <View style={styles.profileContainer}>
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
        <ScrollView showsVerticalScrollIndicator={false}
            showsHorizontalScrollIndicator={false} style={styles.profileInfo} >

        
        
          <View style={styles.infoContainer}>
            <View style={{backgroundColor: "#ccc", paddingHorizontal: 10, paddingVertical: 2, borderRadius: 5}}>
                <Text style={{fontSize:16,fontWeight: "bold"}}>Personal Information</Text>
            </View>
            <View style={{backgroundColor: "#eee", paddingHorizontal: 10, paddingVertical: 10, borderRadius: 5, marginTop: 10}}>
              <View style={{flexDirection:"row"}}>
                <Text style={styles.infoTextSpan}>Username: </Text>
                <Text style={styles.infoText}>{user && user.username}</Text>
              </View>
              <View style={{flexDirection:"row"}}>
                <Text style={styles.infoTextSpan}>NIN: </Text>
                <Text style={styles.infoText}>{user.nin && user.nin}</Text>
              </View>
              <View style={{flexDirection:"row"}}>
                <Text style={styles.infoTextSpan}>ORIN: </Text>
                <Text style={styles.infoText}>{user.orin && user?.orin}</Text>
              </View>
              <View style={{flexDirection:"row"}}>
                <Text style={styles.infoTextSpan}>Name: </Text>
                <Text style={styles.infoText}>{user && user.surname + " " + user.firstname + " " + user.othername}</Text>
              </View>
              <View style={{flexDirection:"row"}}>
                <Text style={styles.infoTextSpan}>Phone: </Text>
                <Text style={styles.infoText}>{user && user.phone_number}</Text>
              </View>
              <View style={{flexDirection:"row"}}>
                <Text style={styles.infoTextSpan}>Sex: </Text>
                <Text style={styles.infoText}>{user && user.sex}</Text>
              </View>
              <View style={{flexDirection:"row"}}>
                <Text style={styles.infoTextSpan}>Date of Birth: </Text> 
                <Text style={styles.infoText}>{user && user.date_birth}</Text>
              </View>
              <View style={{flexDirection:"row"}}>
                <Text style={styles.infoTextSpan}>Marital Status: </Text>
                <Text style={styles.infoText}>{user && user.marital_status}</Text>
              </View>
              
            </View>

            {
              user && (user.spouse_surname !== ""  ) && (
                <>
                  <View style={{backgroundColor: "#ccc", paddingHorizontal: 10, paddingVertical: 2, borderRadius: 5, marginTop: 10}}>
                      <Text style={{fontSize:16,fontWeight: "bold"}}>Spouse Information</Text>
                  </View>
                  <View style={{backgroundColor: "#eee", paddingHorizontal: 10, paddingVertical: 10, borderRadius: 5, marginTop: 10}}>
                    <View style={{flexDirection:"row"}}>
                      <Text style={styles.infoTextSpan}>Name: </Text>
                      <Text style={styles.infoText}>{user && user.spouse_surname + " " +  user.spouse_firstname + " " +  user.spouse_othername }</Text>
                    </View>
                    <View style={{flexDirection:"row"}}>
                      <Text style={styles.infoTextSpan}>Phone: </Text>
                      <Text style={styles.infoText}>{user && user.spouse_phonenumber}</Text>
                    </View>
                  
                  </View>
                </>
              )

              
            }

            {
              user && (user.nok_fullname !== ""  ) && (
                <>
                  <View style={{backgroundColor: "#ccc", paddingHorizontal: 10, paddingVertical: 2, borderRadius: 5,  marginTop: 10}}>
                      <Text style={{fontSize:16,fontWeight: "bold"}}>Next of Kin Information</Text>
                  </View>
                  <View style={{backgroundColor: "#eee", paddingHorizontal: 10, paddingVertical: 10, borderRadius: 5, marginTop: 10}}>
                    
                    <View style={{flexDirection:"row"}}>
                      <Text style={styles.infoTextSpan}>Name: </Text>
                      <Text style={styles.infoText}>{user && user.nok_fullname }</Text>
                    </View>
                    <View style={{flexDirection:"row"}}>
                      <Text style={styles.infoTextSpan}>Phone: </Text>
                      <Text style={styles.infoText}>{user && user.nok_phone}</Text>
                    </View>
                    <View style={{flexDirection:"row"}}>
                      <Text style={styles.infoTextSpan}>Sex: </Text>
                      <Text style={styles.infoText}>{user && user.nok_gender}</Text>
                    </View>
                    <View style={{flexDirection:"row"}}>
                      <Text style={styles.infoTextSpan}>Date of Birth: </Text>
                      <Text style={styles.infoText}>{user && user.nok_dob}</Text>
                    </View>
                    <View style={{flexDirection:"row"}}>
                      <Text style={styles.infoTextSpan}>Address: </Text>
                      <Text style={styles.infoText}>{user && user.nok_address}</Text>
                    </View>
                    <View style={{flexDirection:"row"}}>
                      <Text style={styles.infoTextSpan}>LGA and State: </Text>
                      <Text style={styles.infoText}>{user && user.nok_lga + ", " + user.nok_state}</Text>
                    </View>
                    
                  </View>
                </>
              )
 
            }

            {
              user && (user.occupation !== "" ) && (
                <>
                  <View style={{backgroundColor: "#ccc", paddingHorizontal: 10, paddingVertical: 2, borderRadius: 5,  marginTop: 10}}>
                      <Text style={{fontSize:16,fontWeight: "bold"}}>Employment Information</Text>
                  </View>
                  <View style={{backgroundColor: "#eee", paddingHorizontal: 10, paddingVertical: 10, borderRadius: 5, marginTop: 10}}>
                    
                    <View style={{flexDirection:"row"}}>
                      <Text style={styles.infoTextSpan}>Occupation: </Text>
                      <Text style={styles.infoText}>{user && user.occupation }</Text>
                    </View>
                    
                    
                  </View>
                </>
              )
 
            }


     {

              children && children.length !== 0 && (
                <>
                  <View style={{backgroundColor: "#ccc", paddingHorizontal: 10, paddingVertical: 2, borderRadius: 5,  marginTop: 10}}>
                      <Text style={{fontSize:16,fontWeight: "bold"}}>Children Information</Text>
                  </View>
                  {
                    children.map((child, key) => (
                      <View key={key} style={{backgroundColor: "#eee", paddingHorizontal: 10, paddingVertical: 10, borderRadius: 5, marginTop: 10}}>
                    
                        <View style={{flexDirection:"row"}}>
                          <Text style={styles.infoTextSpan}>Name: </Text>
                          <Text style={styles.infoText}>{child.child_fullname }</Text>
                        </View>
                        <View style={{flexDirection:"row"}}>
                          <Text style={styles.infoTextSpan}>Sex: </Text>
                          <Text style={styles.infoText}>{child.gender }</Text>
                        </View>
                        <View style={{flexDirection:"row"}}>
                          <Text style={styles.infoTextSpan}>Date of Birth: </Text>
                          <Text style={styles.infoText}>{child.date_birth }</Text>
                        </View>
                        
                      </View>
                    ))
                  }
                </>
              )
 
            } 

          </View>

            
        </ScrollView>
      </SafeAreaView>
   </>
  )
}

export default MyProfile

const styles = StyleSheet.create({
  container:{
    backgroundColor: COLORS.primary, 
    flex: 1,

  },
  back:{
    width: 30, 
    height: 30, 
    borderRadius: 30, 
    backgroundColor: "white", 
    alignItems: "center", 
    justifyContent: "center"
  },
  header:{
    height: 50,
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    marginTop: 5
  },
  headerTitle:{
    fontSize: SIZES.large,
  },
  profileContainer:{
    height:"25%",
    width:"100%", 
    borderBottomLeftRadius: 30, 
    borderBottomRightRadius: 30, 
    alignItems: "center",
    justifyContent: "center"
  },

  profileInfo:{
    backgroundColor: "white",
    flex: 1,
    marginTop: 10,
    paddingVertical: 20,
    paddingHorizontal: 20,
  },
  infoContainer:{
    borderColor: "#eee",
    borderStyle: "solid",
    borderWidth: 2,
    borderRadius: 10,
    padding: 10,
    marginBottom:60
  },
  titleContainer:{
    borderBottomColor: "#eee",
    borderBottomWidth: 1,
    borderBottomStyle: "solid",
    marginBottom: 10,
    flexDirection: "row",
    justifyContent: "space-between"
  },
  infoTitle:{
    fontSize: SIZES.large,
    
  },
  infoText:{
    fontSize: 14, 
    fontWeight: "500",
    flex: 4
  },
  infoTextSpan:{
    fontWeight: "800",
    flex: 2
  }
})