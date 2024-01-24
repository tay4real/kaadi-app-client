import { View, Text, TouchableOpacity,StatusBar, ScrollView, TextInput, Button } from 'react-native'
import React, {useState} from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import styles from './addpalliative.style'
import { Ionicons } from '@expo/vector-icons'
import SelectDropdown from 'react-native-select-dropdown'
import { useNavigation } from '@react-navigation/native'
import { COLORS } from '../../constants'
import MultitextInput from '../../components/input/MultilineInput'


const AddPalliative = () => {

  const navigation = useNavigation() 

  const [palliativeName, setPaliativeName] = useState('')
  const [description, setDescription] = useState('')

  const [location, setLocation] = useState('')
  const [selectedcategory, setSelectedCategory] = useState()
  const [selectedLGA, setSelectedLGA] = useState('')

  const category = [
    "Covid19 Palliative", 
    "Oil-Subsidy Palliative"
  ]

  const lga = [
    "Akoko North-East",
    "Akure North-West",
    "Akoko South-East",
    "Akoko South-West",
    "Akure North",
    "Akure South",
    "Ese Odo",
    "Idanre",
    "Ifedore",
    "Ilaje",
    "Ile Oluji/Okeigba",
    "Irele",
    "Odigbo",
    "Okitipupa",
    "Ondo East",
    "Ondo West",
    "Ose",
    "Owo"
  ]



  return (
    <>
     <StatusBar backgroundColor={COLORS.primary} />
    <SafeAreaView style={styles.container}>
        <View style={styles.header}>
            <TouchableOpacity onPress={() => navigation.navigate("Palliative")}>
                <Ionicons name='arrow-back-outline' size={24}/>
            </TouchableOpacity>
            <Text style={styles.titleText}>New palliative</Text>
        </View>
        <View style={styles.formContainer}>
            
            <View style={styles.formTitleContainer}>
                <Text style={styles.formTitle}>New Palliative</Text>
            </View>

            <View style={styles.formInputContainer}>
              <Text>Select Category</Text>
              <SelectDropdown
                data={category}
                onSelect={(selectedItem) => {
                  setSelectedCategory(selectedItem)
                }}
                buttonTextAfterSelection={(selectedItem) => {
                  return selectedItem
                }}
                rowTextForSelection={(item) => {
                  return item
                }}
                buttonStyle={styles.buttonStyle}
                buttonTextStyle= {styles.buttonTextStyle}
                dropdownStyle={{}}
                selectedRowStyle={{}}
                selectedRowTextStyle={{}}
                rowStyle={styles.rowStyle}
                rowTextStyle={styles.rowTextStyle}
              />
            </View>
            <View style={styles.formInputContainer}>
                <Text>Palliative Name</Text>
                <TextInput 
                  style={styles.textInput}
                  placeholder="Palliative Name"
                  onChangeText={value => setPaliativeName(value)}
                  defaultValue={palliativeName} 
                />
            </View>
            <View style={styles.formInputContainer}>
                <Text>Description</Text>
                <MultitextInput
                  multiline
                  numberOfLines={5}
                  onChangeText={(text) => setDescription(text)}
                  value={description}
                  placeholder=""
                  style={styles.textMultiInput}
                />
            </View>
            <View style={styles.formInputContainer}>
              <Text>Select LGA</Text>
              <SelectDropdown
                data={lga}
                onSelect={(selectedItem) => {
                  setSelectedLGA(selectedItem)
                }}
                buttonTextAfterSelection={(selectedItem) => {
                  return selectedItem
                }}
                rowTextForSelection={(item) => {
                  return item
                }}
                buttonStyle={styles.buttonStyle}
                buttonTextStyle= {styles.buttonTextStyle}
                dropdownStyle={{}}
                selectedRowStyle={{}}
                selectedRowTextStyle={{}}
                rowStyle={styles.rowStyle}
                rowTextStyle={styles.rowTextStyle}
              />
            </View>
            <View style={styles.formInputContainer}>
                <Text>Location</Text>
                <TextInput 
                  style={styles.textInput}
                  placeholder="Location"
                  onChangeText={value => setLocation(value)}
                  defaultValue={location} 
                />
            </View>
            
           

            <View style={styles.formSubmitContainer}>
              <TouchableOpacity style={styles.submitBtn} onPress={() => navigation.navigate("CaptureUser")}>
                <Text style={styles.submitBtnText}>Add palliative</Text>
              </TouchableOpacity>
            </View>
        </View>

    </SafeAreaView>
    </>
  )
}

export default AddPalliative