import { View, Text, SafeAreaView, StyleSheet, TouchableOpacity, ScrollView, StatusBar } from 'react-native'
import React from 'react'
import { Ionicons } from '@expo/vector-icons'
import { COLORS, SIZES } from '../../constants'

const HealthBenefits = ({navigation}) => {
  return (
    <>
      <StatusBar backgroundColor={COLORS.primary} />
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.navigate("Home")} style={styles.back}>
                <Ionicons name='arrow-back-outline' size={24}/>
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Health Tracker</Text>
        </View>
      
        <ScrollView showsVerticalScrollIndicator={false}
            showsHorizontalScrollIndicator={false} style={styles.body} contentContainerStyle={{alignItems: "center"}}  >

            <TouchableOpacity onPress={() => navigation.navigate("Home")} style={styles.benefits}>
                <View style={{flexDirection: "row", alignItems: "center"}}>
                  <Ionicons name='fitness' size={30} style={{marginRight: 10, color:"red"}}/>
                  <Text style={styles.benefitText}>Heart Rate</Text>
                </View>
                <Ionicons name='arrow-forward-outline' size={24}/>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate("Home")} style={styles.benefits}>
                <View style={{flexDirection: "row", alignItems: "center"}}>
                  <Ionicons name='egg-outline' size={24} style={{marginRight: 10, color:"red"}}/>
                  <Text style={styles.benefitText}>Blood Sugar</Text>
                </View>
                <Ionicons name='arrow-forward-outline' size={24}/>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate("Home")} style={styles.benefits}>
                <View style={{flexDirection: "row", alignItems: "center"}}>
                  <Ionicons name='file-tray-sharp' size={24} style={{marginRight: 10, color: "red"}}/>
                  <Text style={styles.benefitText}>Blood Pressure</Text>
                </View>
                <Ionicons name='arrow-forward-outline' size={24}/>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate("Home")} style={styles.benefits}>
                <View style={{flexDirection: "row", alignItems: "center"}}>
                  <Ionicons name='body-sharp' size={24} style={{marginRight: 10}}/>
                  <Text style={styles.benefitText}>Weight & BMI</Text>
                </View>
                <Ionicons name='arrow-forward-outline' size={24}/>
            </TouchableOpacity>
            
        </ScrollView>
      </SafeAreaView>
    </>
  )
}

export default HealthBenefits

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
    marginVertical: 10
  },
  benefitText:{
    fontSize: 20
  }
})
