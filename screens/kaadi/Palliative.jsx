import { View, Text, StatusBar, TouchableOpacity } from 'react-native'
import React, {useState} from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { COLORS } from '../../constants'
import styles from './palliative.style'
import { useNavigation } from '@react-navigation/native'
import { Ionicons } from '@expo/vector-icons'

const Palliative = () => {

  const navigation = useNavigation() 
 
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [selectedLGA, setSelectedLGA] = useState('')
  const [location, setLocation] = useState('')

  const category = [
    "Covid19 Palliative", 
    "Oil-Subsidy Palliative"
  ]

  const lga = [

  ]

  const [selectedCategory, setSelectedCategory] = useState('')
  
  
  return (
    <>
     <StatusBar backgroundColor={COLORS.primary} />
     <SafeAreaView>
        <View style={styles.header}>
            <TouchableOpacity onPress={() => navigation.navigate("Home")}>
                <Ionicons name='arrow-back-outline' size={24}/>
            </TouchableOpacity>
            <Text style={styles.titleText}>Palliative</Text>
        </View>
        <View style={styles.menuContainer}>
            
            <TouchableOpacity style={styles.menu} onPress={() => navigation.navigate("AddPalliative")}>
              <Text style={styles.menuText}>New Palliative</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.menu} onPress={() => navigation.navigate("SearchPalliatives")}>
              <Text style={styles.menuText}>Search Palliatives</Text>
            </TouchableOpacity>
        </View>
     </SafeAreaView>
    </>
  )
}

export default Palliative