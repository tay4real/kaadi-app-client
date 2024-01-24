import { View, Text, SafeAreaView, StyleSheet, TouchableOpacity, ScrollView, StatusBar } from 'react-native'
import React, {useEffect, useState} from 'react'
import { Ionicons } from '@expo/vector-icons'
import { COLORS, SIZES } from '../../constants'
import useAuth from '../../hooks/useAuth';
import { Dialog, Button, Input, Icon } from '@rneui/themed';
import axios from 'axios';
import { useSelector, useDispatch } from "react-redux"
import AsyncStorage from '@react-native-async-storage/async-storage'




const Settings = ({navigation}) => {
  const { SignOut, user, apiBaseURL } = useAuth();

  const [visiblePassword, setVisiblePassword] = useState(false);
  const [visibleUsername, setVisibleUsername] = useState(false);
  const [pending, setPending] = useState(false);
  const [username, setUsername] = useState("");
  const [orin, setOrin] = useState("");
  const [oldpassword, setOldPassword] = useState("");
  const [newpassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [message, setMessage] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const[passErr, setPassErr] = useState("");

  const dispatch = useDispatch();

  const logOut = async() => {
    await SignOut();
  }

 

  const toggleUpdatePassword = () => {
    setVisiblePassword(!visiblePassword);
  };
  const toggleUpdateUsername = () => {
    setVisibleUsername(!visibleUsername);
  };


  useEffect(()=>{
    if(user){
      setUsername(user.username);
      setOrin(user.orin);
    }
  }, [user])



  setTimeout(() => {
    setMessage("");
  }, 20000);

  setTimeout(() => {
    setErrorMsg("");
  }, 20000);




  const getUser = async() => {
    let Data = {
      orin: orin
    }


    try {
   
      dispatch({ type: "LOAD_USER_START" });
     
      const res = await axios.post(`${apiBaseURL}/kaadi_client/getUser.php`,  Data);
      
      if (res.data) {
      
        AsyncStorage.setItem("@user", JSON.stringify(res.data));
        dispatch({ type: "LOAD_USER_SUCCESS", payload: res.data });
      }else if(res.data.error){
        setPending(false)
      }
    } catch (error) {
     setPending(false)
      console.log(error.response.data);
      setError(error.response.data);
    }
  }


  const updateUsername = async() => {
   
    let Data = {
      username: username,
      orin: orin
    }


    try {
      setPending(true);
      toggleUpdateUsername();
     
      const res = await axios.post(`${apiBaseURL}/kaadi_client/update_username.php`,  Data);
      
      if (res.data.success) {
        setPending(false);
        setMessage("Username updated successfully!");
        getUser();

      }else if(res.data.error){
        console.log(orin, username)
        setPending(false)
        setErrorMsg(res.data.error)
      }
    } catch (error) {
     setPending(false)
      console.log(error.response.data);
      setError(error.response.data);
    }

  } 

  const updatePassword = async() => {
   
   

    if(confirmPassword !== newpassword){
      setPassErr("Confirm Password does not match");
    }else{

      setPassErr("");

      let Data = {
        oldpassword: oldpassword,
        newpassword: newpassword,
        orin: orin
      }


        try {
          setPending(true);
          toggleUpdatePassword();
        
          const res = await axios.post(`${apiBaseURL}/kaadi_client/update_password.php`,  Data);
          
          setOldPassword("");
          setConfirmPassword("");
          setNewPassword("");
          if (res.data.success) {
            setPending(false);
            setMessage(res.data.success);
    
          }else if(res.data.error){
           
            setPending(false)
            setErrorMsg(res.data.error)
          }
          
        } catch (error) {
        setPending(false)
          console.log(error.response.data);
          setError(error.response.data);
        }
    }


   

  } 
  
  
  return (
    <>
      <StatusBar backgroundColor={COLORS.primary} />
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.navigate("Home")} style={styles.back}>
                <Ionicons name='arrow-back-outline' size={24}/>
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Settings</Text>
        </View>
      
        <ScrollView showsVerticalScrollIndicator={false}
            showsHorizontalScrollIndicator={false} style={styles.body} contentContainerStyle={{alignItems: "center"}}  >

            {
              message && (
                <View>
                  <Text style={{color:"green"}}>{message}</Text>
                </View>
              )
              
            }

            {
              errorMsg && (
                <View>
                  <Text style={{color:"red"}}>{errorMsg}</Text>
                </View>
              )
            }
            <TouchableOpacity onPress={() => toggleUpdateUsername()} style={styles.benefits}>
                <View style={{flexDirection: "row", alignItems: "center"}}>
                  <Ionicons name='person' size={30} style={{marginRight: 10, color:"black"}}/>
                  <Text style={styles.benefitText}>Update Username</Text>
                </View>
                <Ionicons name='arrow-forward-outline' size={24}/>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => toggleUpdatePassword()} style={styles.benefits}>
                <View style={{flexDirection: "row", alignItems: "center"}}>
                  <Ionicons name='key' size={24} style={{marginRight: 10, color:"black"}}/>
                  <Text style={styles.benefitText}>Update Password</Text>
                </View>
                <Ionicons name='arrow-forward-outline' size={24}/>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => logOut()} style={styles.benefits}>
                <View style={{flexDirection: "row", alignItems: "center"}}>
                  <Ionicons name='log-out' size={24} style={{marginRight: 10, color: "red"}}/>
                  <Text style={styles.benefitText}>Log out</Text>
                </View>
                <Ionicons name='arrow-forward-outline' size={24}/>
            </TouchableOpacity>
            
            <Dialog
              isVisible={visiblePassword}
              onBackdropPress={toggleUpdatePassword}
            >
              <Dialog.Title title="Update Password"/>
              {
                passErr && (
                  <View><Text style={{color:"red", textAlign:"center"}}>{passErr}</Text></View>
                )
              }
                    <Input
                        placeholder="Old Password"
                        value={oldpassword}
                        onChangeText={value => setOldPassword(value)}
                        secureTextEntry={true}
                        leftIcon={
                          <Icon
                            name='key'
                            type='ionicon'
                            size={24}
                            color='black'
                          />
                        }
                    />

                    <Input
                        placeholder="New Password"
                        value={newpassword}
                        onChangeText={value => setNewPassword(value)}
                        secureTextEntry={true}
                        leftIcon={
                          <Icon
                            name='key'
                            type='ionicon'
                            size={24}
                            color='black'
                          />
                        }
                    />

                    <Input
                        placeholder="Confirm New Password"
                        value={confirmPassword}
                        onChangeText={value => setConfirmPassword(value)}
                        secureTextEntry={true}
                        leftIcon={
                          <Icon
                            name='key'
                            type='ionicon'
                            size={24}
                            color='black'
                          />
                        }
                    />

                <Dialog.Actions>
                  <Button color={"error"} onPress={toggleUpdatePassword} buttonStyle={{marginLeft: 10}} >Cancel</Button>
                  <Button color={"primary"} onPress={updatePassword} >Update</Button>
                </Dialog.Actions>
            </Dialog>


            <Dialog
              isVisible={visibleUsername}
              onBackdropPress={toggleUpdateUsername}
            >
                <Dialog.Title title="Update Username"/>
              
                 
                    <Input
                        placeholder="Username"
                        value={username}
                        onChangeText={value => setUsername(value)}
                        leftIcon={
                          <Icon
                            name='person'
                            type='ionicon'
                            size={24}
                            color='black'
                          />
                        }
                    />
                
               

                <Dialog.Actions>
                  <Button color={"error"} onPress={toggleUpdateUsername} buttonStyle={{marginLeft: 10}} >Cancel</Button>
                  <Button color={"primary"} onPress={updateUsername} >Update</Button>
                </Dialog.Actions>
            </Dialog>
        </ScrollView>
        
      </SafeAreaView>
    </>
  )
}

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
  },
  titleText:{
    fontSize: SIZES.large,
    fontWeight: "600",
  },
  formContainer:{
    backgroundColor: COLORS.offwhite,
    borderRadius: 10
  },
  formTitleContainer:{
    flexDirection: 'row', 
    alignItems: 'center', 
    justifyContent: 'center',
    marginTop: 10
  },
  formTitle:{
    fontWeight: "bold", 
    fontSize: 20
  }
  ,
  formInputContainer:{
    paddingHorizontal: 5
  },
  textInput:{
    height: 40,
    borderColor: COLORS.gray,
    backgroundColor: COLORS.gray,
    borderRadius: 10,
    paddingHorizontal: 10,
    marginTop: 5
  },
  buttonStyle:{
    height: 40,
    borderColor: COLORS.gray,
    backgroundColor: COLORS.gray,
    borderRadius: 10,
    paddingHorizontal: 10,
    marginTop: 5,
    width:"100%",
    justifyContent: "flex-start"
  },
  buttonTextStyle: {
    fontSize: 14,
  },
  rowStyle:{
    height: 40
  },
  rowTextStyle:{
    textAlign: 'left',
    fontSize: 14,
  },
  formSubmitContainer:{
    marginTop: 40,
    paddingHorizontal: 20,
  },
  submitBtn:{
    backgroundColor: "#3b5998",
    height: 50,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent:'center'
  },
  submitBtnText:{
    fontSize: 15
  },
  button:{
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 50,
    marginTop: 10,
    marginBottom: 15,
    backgroundColor: "#075985"
  },
  buttonText: {
    fontSize: 14,
    fontWeight: "500",
    color: "#fff"
  },
  datePicker: {
    height: 120,
    marginTop: -10
  },
  pickerButton:{
    paddingHorizontal: 20
  },
  inputText: {
    height: 60,
    borderRadius: 10,
    fontSize: 15,
    fontWeight: "400",
    color: "black",
    lineHeight: 15,
    letterSpacing: -0.02,
    flex: 1,
  },
  inputTextContainer: {
    backgroundColor: "#E0E0E0",
    flex: 1,
    borderRadius: 3,
    paddingHorizontal: 10,
    marginVertical: 5,
    height: 45,
  }
})


export default Settings