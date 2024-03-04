import {View, Text, TouchableOpacity,StatusBar, ScrollView, TextInput, Pressable, Platform } from 'react-native'
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
import DateTimePicker from "@react-native-community/datetimepicker"



const NOKInfoAdmin = ({navigation, route}) => {
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

  const [marital_status, setMaritalStatus] = useState("");
  const MaritalStatusData = [
    {key:"Single", value: 'Single'},
    {key: 'Married', value: 'Married'},
    {key: 'Divorced', value: 'Divorced'},
    {key: 'Seperated', value: 'Seperated'},
    {key: 'Widow', value: 'Widow'},
    {key: 'Widower', value: 'Widower'}
  ]

  const [living_spouse, setLivingSpouse] = useState("");
  const LivingWithSpouseData = [
    {key:"No", value: 'No'},
    {key: 'Yes', value: 'Yes'}
  ]

  const [nokState, setNOKState] = useState("");
  const [nokLga, setNOKLga] = useState("");

  const [allNOKStates, setAllNOKStates] = useState([]);
  const [allNOKLgas, setAllNOKLgas] = useState([]);
  const [date, setDate] = useState(new Date())
  const [showPicker, setShowPicker] = useState(false)
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [showDOBError, setShowDOBError] = useState(false);

  const [gender, setGender] = useState("");
  const Genderdata = [
    {key:"M", value: 'Male'},
    {key: 'F', value: 'Female'}
  ]

  useEffect(()=>{
    if(route.params){
      setID(route.params.id)
    }
  },[])

  useEffect(()=>{
    getNOKStates();
    
  }, [])

  useEffect(() => {
    if(nokState !== ""){
      getNOKLGA(nokState);
    }
  }, [nokState])

  const getNOKStates = async() => {
    let originStates = await getStates();

    if(originStates){
        setAllNOKStates(originStates);
    }
  }

  const getNOKLGA = async(state_id) => {
    let originLGA = await getLGAs(state_id);

    if(originLGA){
        setAllNOKLgas(originLGA);
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


  const toggleDatePicker = () => {
    setShowPicker(!showPicker)
  }

  const onChange = ({type}, selectedDate) => {
    if(type == "set"){
      const currentDate = selectedDate
      setDate(currentDate)

      if(Platform.OS === "android"){
        toggleDatePicker();
        setDateOfBirth(formatDate(currentDate))
      }
    }else{
      toggleDatePicker()
    }
  }

  const confirmIOSDate = () => {
    setDateOfBirth(formatDate(date))
    toggleDatePicker()
  }

  const formatDate = (rawDate) => {
    let date = new Date(rawDate);

    let year = date.getFullYear();
    let month = date.getMonth() + 1;
    let day = date.getDate();

    month = month < 10 ? `0${month}` : month;
    day = day < 10 ? `0${day}` : day;

    return `${year}-${month}-${day}`;
  }
 


  const updateRecord = async(data) => {
    
     LogBox.ignoreAllLogs();
      let Data = {
        marital_status: marital_status,
        living_spouse: living_spouse,
        spouse_surname: data.spouse_surname,
        spouse_firstname: data.spouse_firstname,
        spouse_othername: data.spouse_othername,
        father_name: data.father_name,
        mother_name: data.mother_name,
        mother_maiden_name: data.mother_maiden_name,
        next_kin_full_name: data.next_kin_full_name,
        next_kin_date_birth: dateOfBirth,
        next_kin_gender: gender,
        next_kin_address: data.next_kin_address,
        next_kin_town: data.next_kin_town,
        next_kin_state: nokState,
        next_kin_lga: nokLga,
        id: id,
        "update-kaadi": true
      }


      try {
        setPending(true);
      
        const res = await axios.post(`${apiBaseURL}/api/controllers/kaadi_admin.php`,  Data);

     
       
        if (res.data.success) {
        
          setPending(false);
          navigation.navigate("OtherInfoAdmin", {
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
            <View style={styles.formInputContainer}><Text style={{fontSize: 16, fontWeight:"bold", marginRight: 10}}>Marital Status Info</Text></View>

            <View style={styles.formInputContainer}>
                <Text>Marital Status</Text>
                <SelectList 
                    setSelected={(val) => setMaritalStatus(val)} 
                    data={MaritalStatusData} 
                    save="key"
                    placeholder='Select Marital Status'
                    boxStyles={[styles.inputTextContainer, {borderWidth: 0}]}
                    inputStyles={{}}
                    dropdownStyles={[ {borderWidth: 0, backgroundColor:"#E0E0E0"}]}
                    dropdownItemStyles={{}}
                    dropdownTextStyles={{}}
                />
            </View>

            {
                marital_status === "Married" && 
                (
                <>
                
                <View style={styles.formInputContainer}>
                    <Text>Living with Spouse?</Text>
                    <SelectList 
                        setSelected={(val) => setLivingSpouse(val)} 
                        data={LivingWithSpouseData} 
                        save="value"
                        placeholder='Select an Option'
                        boxStyles={[styles.inputTextContainer, {borderWidth: 0}]}
                        inputStyles={{}}
                        dropdownStyles={[ {borderWidth: 0, backgroundColor:"#E0E0E0"}]}
                        dropdownItemStyles={{}}
                        dropdownTextStyles={{}}
                    />
                </View>

                <View style={styles.formInputContainer}>
                    <Text>Spouse Surname</Text>
                        <Input
                        name="spouse_surname"
                        placeholder="Surname"
                        control={control}
                        rules={{ required: "Surname is required" }}
                    />
                </View>

                <View style={styles.formInputContainer}>
                    <Text>Spouse First Name</Text>
                        <Input
                        name="spouse_firstname"
                        placeholder="First Name"
                        control={control}
                        rules={{ required: "Firstname is required" }}
                    />
                </View>

                <View style={styles.formInputContainer}>
                    <Text>Spouse Other Name</Text>
                        <Input
                        name="spouse_othername"
                        placeholder="Other Name"
                        control={control}
                        rules={{ required: false }}
                    />
                </View>

                </>
                )
            }

            <View style={styles.formInputContainer}><Text style={{fontSize: 16, fontWeight:"bold", marginRight: 10}}>Parents Names</Text></View>
                <View style={styles.formInputContainer}>
                    <Text>Father's Full Names</Text>
                        <Input
                        name="father_name"
                        placeholder="Father's Full Names"
                        control={control}
                        rules={{ required: false}}
                    />
                </View>
                <View style={styles.formInputContainer}>
                    <Text>Mother's Full Names</Text>
                        <Input
                        name="mother_name"
                        placeholder="Mother's Full Names"
                        control={control}
                        rules={{ required: false }}
                    />
                </View>
                <View style={styles.formInputContainer}>
                    <Text>Mother's Maiden Name</Text>
                        <Input
                        name="mother_maiden_name"
                        placeholder="Mother's Maiden Name"
                        control={control}
                        rules={{ required: false}}
                    />
                </View>

            <View style={styles.formInputContainer}><Text style={{fontSize: 16, fontWeight:"bold", marginRight: 10}}>Next of Kin</Text></View>
            <View style={styles.formInputContainer}>
                    <Text>NOK Full Names</Text>
                        <Input
                        name="next_kin_full_name"
                        placeholder="Full Names"
                        control={control}
                        rules={{ required: "Full Name is required" }}
                    />
                </View>

                <View style={styles.formInputContainer}>
                <Text>Date of Birth</Text>
                    {showPicker && <DateTimePicker 
                    mode="date"
                    display='spinner'
                    value={date}
                    onChange={onChange}
                    style={{height: 120, marginTop: -10 }}
                    />}

                    {
                    showPicker && Platform.OS === "ios" && (
                        <View style={{flexDirection: "row", justifyContent: "space-around"}}>
                            <TouchableOpacity style={[
                            styles.button,
                            styles.pickerButton,
                            {backgroundColor: "#11182711"}
                            ]}
                            onPress={toggleDatePicker}
                            >
                            <Text style={[styles.buttonText, {color: "#075985"}]}>Cancel</Text>
                            </TouchableOpacity>

                            <TouchableOpacity style={[
                            styles.button,
                            styles.pickerButton,
                            
                            ]}
                            onPress={confirmIOSDate}
                            >
                            <Text style={[styles.buttonText]}>Confirm</Text>
                            </TouchableOpacity>
                        </View>
                    )
                    }
                    {!showPicker && <Pressable onPress={toggleDatePicker}>
                    <View style={styles.inputTextContainer}>
                        <TextInput 
                        style={styles.inputText}
                        placeholder='Date of Birth'
                        value={dateOfBirth}
                        onChangeText={setDateOfBirth}
                        editable={false}
                        onPressIn={toggleDatePicker}
                        />

                    </View>
                    {showDOBError && <View>
                        <Text style={{color: "red"}}>Date of Birth is required</Text>
                    </View>}
                    
                    </Pressable>}
                    
                </View>

                <View style={styles.formInputContainer}>
                    <Text>Gender</Text>
                    <SelectList 
                        search = {false}
                        setSelected={(val) => setGender(val)} 
                        data={Genderdata} 
                        save="key"
                        placeholder='Select Gender'
                        boxStyles={[styles.inputTextContainer, {borderWidth: 0}]}
                        inputStyles={{}}
                        dropdownStyles={[ {borderWidth: 0, backgroundColor:"#E0E0E0"}]}
                        dropdownItemStyles={{}}
                        dropdownTextStyles={{}}

                    />
                </View>

           

            <View style={styles.formInputContainer}><Text style={{fontSize: 16, fontWeight:"bold", marginRight: 10}}>Next of Kin's Residential Address</Text></View>
            <View style={styles.formInputContainer}>
                <Text>Home Address</Text>
                 <Input
                  name="next_kin_address"
                  placeholder="House Address"
                  control={control}
                  rules={{ required: "Home Address is required" }}
                />
            </View>

            <View style={styles.formInputContainer}>
                <Text>Town</Text>
                 <Input
                  name="next_kin_town"
                  placeholder="Residential Town"
                  control={control}
                  rules={{ required: "Residential Town is required" }}
                />
            </View>

            <View style={styles.formInputContainer}>
              <Text>State</Text>
              <SelectList 
                
                  setSelected={(val) => setNOKState(val)} 
                  data={allNOKStates} 
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
                <Text>LGA</Text>
                <SelectList 
                    setSelected={(val) => setNOKLga(val)} 
                    data={allNOKLgas} 
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

export default NOKInfoAdmin