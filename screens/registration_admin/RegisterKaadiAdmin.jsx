import { View, Text, TouchableOpacity,StatusBar, ScrollView, TextInput, Pressable, Platform } from 'react-native'
import React, {useState, useEffect} from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import styles from './register.style'
import { Ionicons } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native'
import { COLORS } from '../../constants'
import Input from '../../components/input/Input';
import { useForm } from "react-hook-form";
import Button from '../../components/button/Button';
import useAuth from '../../hooks/useAuth';
import { SelectList } from 'react-native-dropdown-select-list';
import axios from "axios";
import DateTimePicker from "@react-native-community/datetimepicker"


const RegisterKaadiAdmin = () => {
  const { apiBaseURL, user } = useAuth();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const navigation = useNavigation() 


  const [pending, setPending] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");
  const [error, setError] = useState("");
  const [date, setDate] = useState(new Date())
  const [showPicker, setShowPicker] = useState(false)
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [showDOBError, setShowDOBError] = useState(false);
  const [showGenderError, setShowGenderError] = useState(false);
  const [showOccupationError, setShowOccupationError] = useState(false);
  
  const [gender, setGender] = useState("");
  const Genderdata = [
    {key:"M", value: 'Male'},
    {key: 'F', value: 'Female'}
  ]

  const [occupation, setOccupation] = useState("");
  const [occupations, setOccupations] = useState([]);

  useEffect(()=>{
    getOccupationCategories();
  },[])

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


  const getOccupationCategories = async() => {
    try {
      
      const res = await axios.post(`${apiBaseURL}/api/controllers/general.php`, {
        "all-occupations": true
      });


      if (res.data) {
        setPending(false);
        setOccupations(res.data)  
      }
    } catch (error) {
      
      console.log(error.response);
      setError(error.response.data);
    }
  }

  const insertRecord = async(data) => {
      
      if(dateOfBirth === ""){
        setShowDOBError(true);
      }else if(gender === ""){
        setShowGenderError(true);
      }else if(occupation === ""){
        setShowOccupationError(true);
      }
      
      else{
        setShowDOBError(false);
        setShowGenderError(false);
        setShowOccupationError(false);


        // Sanitize data
        let fullname = data.surname.trim().toUpperCase() + " " + data.firstname.trim().toUpperCase() + " ";
        let othername = "";
       
        if(data.othername !== ""){
          fullname += data.othername.trim().toUpperCase();
          othername = data.othername.trim().toUpperCase();
        }

        let Data = {
          nin : data.nin.trim(),
          sur_name: data.surname.trim(),
          first_name: data.firstname.trim(),
          other_name: data.othername.trim(),
          full_name: fullname.trim(),
          phone_number1: data.phone.trim(),
          gender: gender,
          occupation_id: occupation,
          date_birth: dateOfBirth,
          "register-kaadi": true
        }
  
  
        try {
          setPending(true)
          const res = await axios.post(`${apiBaseURL}/api/controllers/kaadi_admin.php`,  Data);
          if (res.data) {
            setPending(false);
            console.log(res.data.id)
            if(res.data.id){
              navigation.navigate("NOKInfoAdmin", {
                id: res.data.id
              });
            }
      
          
          }else if(res.data.error){
            setPending(false)
            setError(res.data.error)
            setSuccess("");
          }
        } catch (error) {
          setPending(false);
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
            <TouchableOpacity onPress={() => navigation.navigate("Home")}>
                <Ionicons name='arrow-back-outline' size={24}/>
              </TouchableOpacity>
            <Text style={styles.titleText}>Kaadi Registration</Text>
        </View>
    <ScrollView
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
        >
        
        <View style={styles.formContainer}>
            <View style={styles.formTitleContainer}>
                <Text style={styles.formTitle}>Basic Info</Text>
            </View>

            {error !== "" && (
            <View>
              <Text style={{ padding: 5, color: "red", textAlign: "center" }}>
                {error}
              </Text>
            </View>
          )}
            <View style={styles.formInputContainer}>
              <Text>NIN</Text>
              <Input
                name="nin"
                placeholder="NIN"
                control={control}
                rules={{ required: "NIN is required" }}
              />
            </View>
            <View style={styles.formInputContainer}>
              <Text>Surname</Text>
                <Input
                name="surname"
                placeholder="Surname"
                control={control}
                rules={{ required: "Surname is required" }}
              />
            </View>
            <View style={styles.formInputContainer}>
            <Text>First Name</Text>
                <Input
                  name="firstname"
                  placeholder="First Name"
                  control={control}
                  rules={{ required: "First name is required" }}
                />
            </View>
            <View style={styles.formInputContainer}>
            <Text>Othername</Text>
                <Input
                  name="othername"
                  placeholder="Othername"
                  control={control}
                  rules={{ required: false}}
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
            <Text>Occupation</Text>
              <SelectList 
                  setSelected={(val) => setOccupation(val)} 
                  data={occupations} 
                  save="key"
                  placeholder='Select Occupation'
                  boxStyles={[styles.inputTextContainer, {borderWidth: 0}]}
                  inputStyles={{}}
                  dropdownStyles={[ {borderWidth: 0, backgroundColor:"#E0E0E0"}]}
                  dropdownItemStyles={{}}
                  dropdownTextStyles={{}}
              />
            </View>
            <View style={styles.formInputContainer}>
            <Text>Phone</Text>
                <Input
                  name="phone"
                  placeholder="Phone"
                  control={control}
                  rules={{ required: "Phone is required" }}
                />
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

            <View style={styles.formSubmitContainer}>
              <Button
                text="Save and Continue"
                bgColor= {COLORS.primary}
                onPress={handleSubmit(insertRecord)}
                pending={pending}
              />
            </View>
        </View>
        </ScrollView>
    </SafeAreaView>
    </>
  )
}

export default RegisterKaadiAdmin