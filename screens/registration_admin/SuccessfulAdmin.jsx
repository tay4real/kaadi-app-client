import { View, Text, SafeAreaView, TouchableOpacity, Image, StyleSheet } from 'react-native'
import React from 'react'
import img from "../../assets/icons/check_mark.jpg"
import { COLORS } from '../../constants';

const SuccessfulAdmin = ({navigation}) => {
  return (
    <SafeAreaView>
      <View style={styles.container}>
          
          <Image style={styles.image} source={img}  />
         
          <Text style={styles.textTitle}>Success!</Text>
          
          <TouchableOpacity style={styles.buttonContainer} onPress={() => navigation.navigate("TabGroup")}>
            <Text style={{   fontSize: 16, fontWeight: "600"}}>OK</Text>
          </TouchableOpacity>
      </View>
      

    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: COLORS.white,
    height: "100%",
  },
  image: {
    width:  100,
    height: 100,
    resizeMode: "cover",
  },
  textContainer: {
    marginTop: 20,
    marginBottom: 30,
  },
  textTitle: {
    fontSize: 24,
    fontStyle: "normal",
    textAlign: "center",
    lineHeight: 23,
    color: "green",
    fontWeight: "700",
    marginBottom: 12,
    paddingLeft: 35,
    paddingRight: 35,
  },
  textSubTitle: {
    fontSize: 20,
    textAlign: "center",
    lineHeight: 20,
    letterSpacing: -0.02,
    fontStyle: "normal",
    fontWeight: "500",
    paddingLeft: 46,
    paddingRight: 46,
  },
  
  buttonContainer: {
    width: "80%",
    backgroundColor: COLORS.primary,
    marginTop: 40,
    paddingVertical: 10,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
 
  },
  
})
export default SuccessfulAdmin