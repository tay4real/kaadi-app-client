
import React from 'react'
import { View, Text, Image, StatusBar, SafeAreaView, StyleSheet } from 'react-native'
import img from "../../assets/welcome.jpg"
import { COLORS } from '../../constants';
import Button from '../../components/Button';


const Welcome = ({navigation}) => {
  return (
    <>
      <StatusBar backgroundColor={COLORS.primary} />
      <SafeAreaView style={styles.container}>
      
        <Image style={styles.image} source={img} />
        <View style={styles.textContainer}>
          <Text style={styles.textTitle}>
            Kaadi Igbe Ayo
          </Text>
          <Text style={styles.textSubTitle}>
            Igba Irorun de fun awon omo Ipinle Ondo
          </Text>
        </View>
        
        <View style={{  marginHorizontal: 22, width: "70%" }}>
          <Button
            title="Login"
            filled
            onPress={() => navigation.navigate("Signin")}
            style={{
                marginTop: 18,
                marginBottom: 4,
            }}
          />
          <Button
            title="Register"
            onPress={() => navigation.navigate("RegisterKaadi")}
            style={{
                marginTop: 18,
                marginBottom: 4,
            }}
          />
        </View>
      </SafeAreaView>
    </>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    alignItems: "center",
    backgroundColor: COLORS.white,
    height: "100%",
  },
  image: {
    height: "60%",
    width: "100%",
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
    color: COLORS.primary,
    fontWeight: "700",
    marginBottom: 12,
    paddingLeft: 35,
    paddingRight: 35,
  },
  textSubTitle: {
    fontSize: 15,
    textAlign: "center",
    lineHeight: 15.25,
    letterSpacing: -0.02,
    fontStyle: "normal",
    fontWeight: "500",
    paddingLeft: 46,
    paddingRight: 46,
  },
  sliderContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "4%",
  },
  buttonContainer: {
    flexDirection: "row",
    width: "80%",
    marginTop: 40,
    paddingBottom: 20,
  },
  buttonContainerVertical: {
    flexDirection: "column",
    width: "80%",
    height: "50%",
  },
})

export default Welcome