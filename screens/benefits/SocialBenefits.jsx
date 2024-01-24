import { View, Text, SafeAreaView, StyleSheet, TouchableOpacity, ScrollView, StatusBar } from 'react-native'
import React, {useState, useEffect}  from 'react'
import { Ionicons } from '@expo/vector-icons'
import { COLORS, SIZES } from '../../constants'
import axios from 'axios';
import useAuth from '../../hooks/useAuth';

const SocialBenefits = ({navigation}) => {
  const {  user, apiBaseURL } = useAuth();
  const [benefits, setBenefits] = useState([]);

  const getBenefits = async(user_id) => {
    try {
      
      const res = await axios.get(`${apiBaseURL}/kaadi_client/social_benefits.php?user_id=${user_id}`);
      
      if (res.data) {
        setBenefits(res.data);
      }
    } catch (error) {  
      console.log(error.response);
      return false;
    }
  }

  useEffect(()=> {

    if(user && user.orin){
      getBenefits(user.orin)
    }

  }, [])

  console.log(benefits)

  return (
    <>
    <StatusBar backgroundColor={COLORS.primary} />
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.navigate("Home")} style={styles.back}>
              <Ionicons name='arrow-back-outline' size={24}/>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Social Benefits</Text>
      </View>
      <ScrollView showsVerticalScrollIndicator={false}
            showsHorizontalScrollIndicator={false} style={styles.profileInfo} >

        
        
          <View style={styles.infoContainer}>
            <View style={{backgroundColor: "#ccc", paddingHorizontal: 10, paddingVertical: 2, borderRadius: 5}}>
                <Text style={{fontSize:16,fontWeight: "bold"}}>Benefits History</Text>
            </View>

            {
              benefits.length !== 0 && benefits.map((benefit, key) => (
                <View key={key} style={{flexDirection: "row", backgroundColor: "#eee", paddingHorizontal: 10, paddingVertical: 10, borderRadius: 5, marginTop: 10}}>
                  <View style={{marginRight: 10}}><Text>{ key + 1}</Text></View>
                  <View style={{flex: 1}}>
                      <View style={{flexDirection:"row"}}>
                        <Text style={styles.infoTextSpan}>Benefit Type: </Text>
                        <Text style={styles.infoText}>{benefit.benefit_type}</Text>
                      </View>
                      <View style={{flexDirection:"row"}}>
                        <Text style={styles.infoTextSpan}>Description: </Text>
                        <Text style={styles.infoText}>{benefit.description}</Text>
                      </View>
                      <View style={{flexDirection:"row"}}>
                        <Text style={styles.infoTextSpan}>Date Accessed: </Text>
                        <Text style={styles.infoText}>{benefit.date_accessed}</Text>
                      </View>
                      <View style={{flexDirection:"row"}}>
                        <Text style={styles.infoTextSpan}>Amount (Naira):  </Text>
                        <Text style={styles.infoText}>{benefit.amount}</Text>
                      </View>
                  </View>
                </View>
              ))
            }

  
          </View>

            
        </ScrollView>
    
    </SafeAreaView>
    </>
  )
}


export default SocialBenefits

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
    flex: 3
  },
  infoTextSpan:{
    fontWeight: "800",
    flex: 2
  }
})

