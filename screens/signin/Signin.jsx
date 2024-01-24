
import React, {useState} from 'react'
import {
  View,
  Text,
  Image,
  StatusBar,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  Alert,
  StyleSheet
} from "react-native";
import Input from '../../components/input/Input';
import { useForm } from "react-hook-form";
import Button from '../../components/button/Button';
import { COLORS } from '../../constants';
import img from "../../assets/welcome.jpg"
import useAuth from '../../hooks/useAuth';



const Signin = ({navigation, route}) => {

  const { apiBaseURL,  signIn, user, error, isLoading } = useAuth();


 
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();

  console.log(user);

  const [hidePassword, setHidePassword] = useState(true);

  const togglePassword = () => {
    setHidePassword(!hidePassword);
  };

  const onSignInPressed = async (data) => {
    await signIn(data.username, data.password);
    
  };

  const onForgotPasswordPressed = () => {
    navigation.navigate("ForgotPassword");
  }

  const onSignUp = () => {
    navigation.navigate("RegisterKaadi");
  }

  
  return (
    <>
      <StatusBar backgroundColor={COLORS.primary} />
      <SafeAreaView style={styles.container}>
        <Image style={styles.image} source={img} />
        <ScrollView
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
        >

          <View style={styles.headerContainer}>
            <Text style={styles.header}>Sign In</Text>
          </View>
          {error !== "" && (
            <View>
              <Text style={{ padding: 5, color: "red", textAlign: "center" }}>
                {error}
              </Text>
            </View>
          )}
        

          <View style={styles.inputContainer}>
            <Input
              name="username"
              placeholder="Username"
              control={control}
              rules={{ 
                required: 'Username is required'
              }}
            />

            <Input
              name="password"
              placeholder="Password"
              secure={true}
              control={control}
              hidePassword={hidePassword}
              togglePassword={togglePassword}
              rules={{
                required: "Password is required",
                minLength: {
                  value: 3,
                  message: "Password should be minimum 3 characters long",
                },
              }}
            />
          </View>

          <View style={styles.buttonContainer}>
            <Button
              text="Sign In"
              bgColor= {COLORS.primary}
              onPress={handleSubmit(onSignInPressed)}
              pending={isLoading}
            />
          </View>

          <TouchableOpacity
            onPress={onForgotPasswordPressed}
            style={styles.loginContainer}
          >
            <Text>Forgot password?</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={onSignUp}
            style={styles.loginContainer}
          >
            <Text>Not Registered? Sign up</Text>
          </TouchableOpacity>
   
        </ScrollView>
      </SafeAreaView>
    </>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    backgroundColor: "#fff",
    height: "100%",
  },
  image: {
    height: "30%",
    width: "100%",
    resizeMode: "cover",
  },
  headerContainer: {
    width: "100%",
    height: 50,
    marginTop: 18,
    paddingLeft: 40,
    paddingRight: 40,
  },
  header: {
    fontSize: 25,
    textAlign: "center",
    lineHeight: 40,
    color: COLORS.black,
    fontWeight: "700",
    letterSpacing: -0.02,
    fontStyle: "normal",
  },
  inputContainer: {
    marginBottom: 5,
    paddingLeft: 40,
    paddingRight: 40,
  },
  buttonContainer: {
    marginTop: 21,
    paddingLeft: 40,
    paddingRight: 40,
    marginBottom: 20
  },
  seperatorContainer: {
    marginTop: 20,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  loginContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 10,
  },
  loginText: {
    color: "#1935DE",
    marginLeft: 8,
  },
  socialLogin: {
    padding: 10,
    margin: 5,
    height: 40,
    width: 40,
    resizeMode: "stretch",
    alignItems: "center",
  },
})

export default Signin