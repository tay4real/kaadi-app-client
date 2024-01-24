import { View, Text, TouchableOpacity,StatusBar, ScrollView, TextInput, Pressable, Platform } from 'react-native'
import React, {useState, useEffect} from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import styles from './register.style'
import { Ionicons } from '@expo/vector-icons'
import SelectDropdown from 'react-native-select-dropdown'
import { useNavigation } from '@react-navigation/native'
import { COLORS } from '../../constants'
import Input from '../../components/input/Input';
import { useForm } from "react-hook-form";
import Button from '../../components/button/Button';
import useAuth from '../../hooks/useAuth';
import { SelectList } from 'react-native-dropdown-select-list';
import axios from "axios";
import DateTimePicker from "@react-native-community/datetimepicker"


const RegisterKaadi = () => {
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
  
  const [gender, setGender] = useState("");
  const Genderdata = [
    {key:"M", value: 'Male'},
    {key: 'F', value: 'Female'}
  ]

  const [occupation, setOccupation] = useState("");
  const [occupations, setOccupations] = useState([]);

  useEffect(()=>{
      getOccupationCatergories();
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


  const getOccupationCatergories = async() => {
    try {
      
      const res = await axios.get(`${apiBaseURL}/common/occupation_categories.php`);

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
      }else{
        setShowDOBError(false);

        let Data = {
          nin : data.nin.trim(),
          sur_name: data.surname.trim(),
          first_name: data.firstname.trim(),
          other_name: data.othername.trim(),
          full_name: data.surname.trim().toUpperCase() + " " + data.firstname.trim().toUpperCase() + " " + data.othername.trim().toUpperCase(),
          phone_number1: data.phone.trim(),
          gender: gender,
          occupation_id: occupation,
          date_birth: dateOfBirth
        }
  
  
        try {
          setPending(true)
          const res = await axios.post(`${apiBaseURL}/kaadi_client/register_kaadi.php`,  Data);
          if (res.data) {
            setPending(false);
            console.log(res.data.id)
            if(res.data.id){
              navigation.navigate("OtherInfo", {
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
    <ScrollView
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
        >
        <View style={styles.header}>
            {
             user && user.role === "Admin" ? 
              <TouchableOpacity onPress={() => navigation.navigate("Home")}>
                <Ionicons name='arrow-back-outline' size={24}/>
              </TouchableOpacity> : 
              <TouchableOpacity onPress={() => navigation.navigate("Welcome")}>
                <Ionicons name='arrow-back-outline' size={24}/>
              </TouchableOpacity>
            }
            <Text style={styles.titleText}>Kaadi Registration</Text>
        </View>
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
              <Input
                name="nin"
                placeholder="NIN"
                control={control}
                rules={{ required: "NIN is required" }}
              />
            </View>
            <View style={styles.formInputContainer}>
                <Input
                name="surname"
                placeholder="Surname"
                control={control}
                rules={{ required: "Surname is required" }}
              />
            </View>
            <View style={styles.formInputContainer}>
                <Input
                  name="firstname"
                  placeholder="First Name"
                  control={control}
                  rules={{ required: "First name is required" }}
                />
            </View>
            <View style={styles.formInputContainer}>
                <Input
                  name="othername"
                  placeholder="Othername"
                  control={control}
                  rules={{ required: false}}
                />
            </View>
            <View style={styles.formInputContainer}>
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
              <SelectList 
                  setSelected={(val) => setOccupation(val)} 
                  data={occupations} 
                  save="key"
                  placeholder='Select Occupation'
              />
            </View>
            <View style={styles.formInputContainer}>
                <Input
                  name="phone"
                  placeholder="Phone"
                  control={control}
                  rules={{ required: "Phone is required" }}
                />
            </View>
            <View style={styles.formInputContainer}>
              <SelectList 
                  search = {false}
                  setSelected={(val) => setGender(val)} 
                  data={Genderdata} 
                  save="key"
                  placeholder='Select Gender'
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

export default RegisterKaadi