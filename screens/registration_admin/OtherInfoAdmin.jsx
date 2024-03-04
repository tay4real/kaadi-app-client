import { View, Text, TouchableOpacity,StatusBar, ScrollView, TextInput } from 'react-native'
import React, {useState, useEffect} from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import styles from './register.style'
import { Ionicons } from '@expo/vector-icons'
import { COLORS } from '../../constants'
import Input from '../../components/input/Input';
import { useForm } from "react-hook-form";
import Button from '../../components/button/Button';
import useAuth from '../../hooks/useAuth';
import { SelectList } from 'react-native-dropdown-select-list';
import axios from "axios";
import {LogBox} from 'react-native'



const OtherInfoAdmin = ({navigation, route}) => {
  const { apiBaseURL } = useAuth();
  const [id, setID] = useState( "");
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();

  

 
  const [pending, setPending] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");


  const [originState, setOriginState] = useState("");
  const [originLga, setOriginLga] = useState("");
  const [birthState, setBirthState] = useState("");
  const [birthLga, setBirthLga] = useState("");
  const [residential_lga, setResidentialLGA] = useState("");




  const [allBirthStates, setAllBirthStates] = useState([]);
  const [allBirthLgas, setAllBirthLgas] = useState([]);

  const [allOriginStates, setAllOriginStates] = useState([]);
  const [allOriginLgas, setAllOriginLgas] = useState([]);

  const [allResisdentialLgas, setAllResisdentialLgas] = useState([]);

 


  useEffect(()=>{
    if(route.params){
      setID(route.params.id)
    }
  },[])

  useEffect(()=>{
    getOriginStates();
    getBirthStates();
    getResidentialLGA(1);
  }, [])

  useEffect(() => {
    if(originState !== ""){
      getOriginLGA(originState);
    }

    if(birthState !== ""){
      getBirthLGA(birthState);
    }
  }, [originState, birthState ])

  const getOriginStates = async() => {
    let originStates = await getStates();

    if(originStates){
      setAllOriginStates(originStates);
    }
  }

  const getOriginLGA = async(state_id) => {
    let originLGA = await getLGAs(state_id);

    if(originLGA){
      setAllOriginLgas(originLGA);
    }
  }

  const getBirthStates = async() => {
    let birthStates = await getStates();

    if(birthStates){
      setAllBirthStates(birthStates);
    }
  }

  const getBirthLGA = async(state_id) => {
    let birthLGA = await getLGAs(state_id);

    if(birthLGA){
      setAllBirthLgas(birthLGA);
    }
  }

  const getResidentialLGA = async(state_id) => {
    let residenceLGA = await getLGAs(state_id);

    if(residenceLGA){
      setAllResisdentialLgas(residenceLGA);
    }
  }

  const getStates = async() => {
    try {
      
      const res = await axios.post(`${apiBaseURL}/api/controllers/general.php`, {
        "all-states": true
      });

      if (res.data) {
        return res.data;
      }
    } catch (error) {
      
      console.log(error.response.data);
      setError(error.response.data);
      return false;
    }
  }

  const getLGAs = async(state_id) => {
    try {
      
      const res = await axios.post(`${apiBaseURL}/api/controllers/general.php`, {
        "all-lgas": true,
        state_id: state_id
      });

      if (res.data) {
        return res.data;
      }
    } catch (error) {  
      console.log(error.response);
      setError(error.response.data);
      return false;
    }
  }



  const updateRecord = async(data) => {
    
     LogBox.ignoreAllLogs();
      let Data = {
        country_birth: "Nigeria",
        state_birth : birthState,
        lga_birth: birthLga,
        town_birth: data.birth_town.trim(),
        country_origin: "Nigeria",
        state_origin : originState,
        lga_origin: originLga,
        town_origin: data.origin_town.trim(),
        residential_address: data.home_address.trim(),
        residential_lga_name: residential_lga,
        residential_town: data.residential_town.trim(),
        id: id,
        "update-kaadi": true
      }


      try {
        setPending(true);
      
        const res = await axios.post(`${apiBaseURL}/api/controllers/kaadi_admin.php`,  Data);

     
       
        if (res.data.success) {
        
          setPending(false);
          navigation.navigate("CaptureUserAdmin", {
            id: id
          });

        }else if(res.data.error){
          
          setPending(false)
          setError(res.data.error)
          setSuccess("");
        }
      } catch (error) {
        
        setPending(false)
        console.log(error.response.data);
        setError(error.response.data);
      }

     
     
  }


 
  return (
    <>
     <StatusBar backgroundColor={COLORS.primary} />
    <SafeAreaView style={styles.container}>
    <ScrollView
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
        >
        <View style={styles.header}>
            <TouchableOpacity onPress={() => navigation.navigate("RegisterKaadiAdmin")}>
                <Ionicons name='arrow-back-outline' size={24}/>
            </TouchableOpacity>
            <Text style={styles.titleText}>Kaadi Registration</Text>
        </View>
        <View style={styles.formContainer}>
            <View style={styles.formTitleContainer}>
                <Text style={styles.formTitle}>Additional Information</Text>
            </View>

            {error !== "" && (
            <View>
              <Text style={{ padding: 5, color: "red", textAlign: "center" }}>
                {error}
              </Text>
            </View>
          )}
            <View style={styles.formInputContainer}><Text style={{fontSize: 16, fontWeight:"bold", marginRight: 10}}>Place of Birth</Text></View>

            <View style={styles.formInputContainer}>
              <SelectList 
                
                  setSelected={(val) => setBirthState(val)} 
                  data={allBirthStates} 
                  save="key"
                  placeholder='Select State'
                  boxStyles={[styles.inputTextContainer, {borderWidth: 0}]}
                  inputStyles={{}}
                  dropdownStyles={[ {borderWidth: 0, backgroundColor:"#E0E0E0"}]}
                  dropdownItemStyles={{}}
                  dropdownTextStyles={{}}
              />
            </View>

            <View style={styles.formInputContainer}>
              <SelectList 
                  setSelected={(val) => setBirthLga(val)} 
                  data={allBirthLgas} 
                  save="value"
                  placeholder='Select LGA'
                  boxStyles={[styles.inputTextContainer, {borderWidth: 0}]}
                  inputStyles={{}}
                  dropdownStyles={[ {borderWidth: 0, backgroundColor:"#E0E0E0"}]}
                  dropdownItemStyles={{}}
                  dropdownTextStyles={{}}
              />
            </View>

            <View style={styles.formInputContainer}>
                 <Input
                  name="birth_town"
                  placeholder="Town"
                  control={control}
                  rules={{ required: "Town is required" }}
                />
            </View>

            <View style={styles.formInputContainer}><Text style={{fontSize: 16, fontWeight:"bold", marginRight: 10}}>Place of Origin</Text></View>
            <View style={styles.formInputContainer}>
              <SelectList 
                  setSelected={(val) => setOriginState(val)} 
                  data={allOriginStates} 
                  save="key"
                  placeholder='Select State'
                  boxStyles={[styles.inputTextContainer, {borderWidth: 0}]}
                  inputStyles={{}}
                  dropdownStyles={[ {borderWidth: 0, backgroundColor:"#E0E0E0"}]}
                  dropdownItemStyles={{}}
                  dropdownTextStyles={{}}
              />
            </View>

            <View style={styles.formInputContainer}>
              <SelectList 
                  setSelected={(val) => setOriginLga(val)} 
                  data={allOriginLgas} 
                  save="value"
                  placeholder='Select LGA'
                  boxStyles={[styles.inputTextContainer, {borderWidth: 0}]}
                  inputStyles={{}}
                  dropdownStyles={[ {borderWidth: 0, backgroundColor:"#E0E0E0"}]}
                  dropdownItemStyles={{}}
                  dropdownTextStyles={{}}
              />
            </View>
            
            <View style={styles.formInputContainer}>
                 <Input
                  name="origin_town"
                  placeholder="Town"
                  control={control}
                  rules={{ required: "Town is required" }}
                />
            </View>

            <View style={styles.formInputContainer}><Text style={{fontSize: 16, fontWeight:"bold", marginRight: 10}}>Residential Address</Text></View>
            <View style={styles.formInputContainer}>
                 <Input
                  name="home_address"
                  placeholder="Home Address"
                  control={control}
                  rules={{ required: "Home Address is required" }}
                />
            </View>

            <View style={styles.formInputContainer}>
                 <Input
                  name="residential_town"
                  placeholder="Residential Town"
                  control={control}
                  rules={{ required: "Residential Town is required" }}
                />
            </View>

            <View style={styles.formInputContainer}>
              <SelectList 
                  setSelected={(val) => setResidentialLGA(val)} 
                  data={allResisdentialLgas} 
                  save="value"
                  placeholder='Select LGA'
                  boxStyles={[styles.inputTextContainer, {borderWidth: 0}]}
                  inputStyles={{}}
                  dropdownStyles={[ {borderWidth: 0, backgroundColor:"#E0E0E0"}]}
                  dropdownItemStyles={{}}
                  dropdownTextStyles={{}}
              />
            </View>

            <View style={styles.formSubmitContainer}>
              <Button
                text="Save and Continue"
                bgColor= {COLORS.primary}
                onPress={handleSubmit(updateRecord)}
                pending={pending}
              />
            </View>
        </View>
        </ScrollView>
    </SafeAreaView>
    </>
  )
}

export default OtherInfoAdmin