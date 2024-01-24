import { View, Text, SafeAreaView, StyleSheet, TouchableOpacity, ScrollView, StatusBar } from 'react-native'
import React from 'react'
import { Ionicons } from '@expo/vector-icons'
import { COLORS, SIZES } from '../../constants'

const AgricInputs = ({navigation}) => {
  return (
    <>
      <StatusBar backgroundColor={COLORS.primary} />
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.navigate("SocialBenefits")} style={styles.back}>
                <Ionicons name='arrow-back-outline' size={24}/>
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Agric Inputs</Text>
        </View>
      
        <ScrollView showsVerticalScrollIndicator={false}
            showsHorizontalScrollIndicator={false} style={styles.body} contentContainerStyle={{alignItems: "center", justifyContent:"center"}}  >
            <View style={{width: 120, height: 120, borderRadius: 100, backgroundColor: "#eee", alignItems: "center", justifyContent: "center", marginVertical: 40 }}>
              <Ionicons name='alert-sharp' size={100} style={{color: "red"}}/>
            </View>
            <View style={{width: "80%", alignItems: "center"}}>
              <Text style={{fontSize: 30, marginBottom: 10}}>Not Eligible</Text>
              <Text style={{fontSize: 16, marginBottom: 10, textAlign: "center"}}>Sorry, you are not eleigible to access this benefit.</Text>
            </View>
        </ScrollView>
      </SafeAreaView>
    </>
  )
}

export default AgricInputs

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
  
})