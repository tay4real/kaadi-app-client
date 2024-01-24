import { View, Text, SafeAreaView, StyleSheet, TouchableOpacity, ScrollView, StatusBar } from 'react-native'
import React, {useState} from 'react'
import { Ionicons } from '@expo/vector-icons'
import { COLORS, SIZES } from '../../constants'
import { Toggle } from '@ui-kitten/components';

const OndoScholarship = ({navigation}) => {
 
  return (
    <>
      <StatusBar backgroundColor={COLORS.primary} />
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.navigate("SocialBenefits")} style={styles.back}>
                <Ionicons name='arrow-back-outline' size={24}/>
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Ondo Scholarship</Text>
        </View>
    
        <ScrollView showsVerticalScrollIndicator={false}
            showsHorizontalScrollIndicator={false} style={styles.body} contentContainerStyle={{alignItems: "center", justifyContent:"center"}}  >
            
            <TouchableOpacity onPress={() => navigation.navigate("AgricInputs")} style={styles.benefits}>
                  <Text style={styles.benefitText}>Apply for Bursary</Text>
                  <Ionicons name='arrow-forward-outline' size={24}/>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate("AgricInputs")} style={styles.benefits}>
                  <Text style={styles.benefitText}>Apply for Schorlarship</Text>
                  <Ionicons name='arrow-forward-outline' size={24}/>
            </TouchableOpacity>

            <View style={{width: "90%", height: 300 , backgroundColor: "#eee", borderRadius: 10, padding: 10, marginTop: 10}}>
              <Text style={{fontSize: 18, fontWeight: "600", borderBottomColor: "#ddd", borderBottomWidth: 1, borderBottomStyle: "solid", paddingBottom: 10}}>History</Text>
              <Text style={{textAlign: "center", marginTop: 40, fontSize: 15, fontWeight: "500"}}>No History Found</Text>
            </View>
            
        </ScrollView>
      </SafeAreaView>
    </>
  )
}

export default OndoScholarship

const styles = StyleSheet.create({
  container:{
    flexDirection: "column",
    alignItems: "center",
    height: "100%",
    backgroundColor: COLORS.primary
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
    marginTop: 5,
    backgroundColor: COLORS.primary
  },
  headerTitle:{
    fontSize: SIZES.large,
  },
  body:{
    backgroundColor: "white",
    flexGrow: 1,
    width: "100%",
    paddingTop: 30
  },
  benefits:{
    width: "90%",
    height: "20vh",
    backgroundColor: "#eee",
    borderRadius: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 10,
    paddingVertical: 20,
    marginVertical: 5
  },
  benefitText:{
    fontSize: 20
  }
  
})