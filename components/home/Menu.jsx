import { Text, TouchableOpacity } from 'react-native'
import React from 'react'
import styles from './menu.style'
import { Ionicons } from '@expo/vector-icons';
import { COLORS } from '../../constants';
import { useNavigation } from '@react-navigation/native'


const Menu = ({icon, title, location}) => {
  const navigation = useNavigation()
  return (
    <TouchableOpacity style={styles.menu} onPress={() => navigation.navigate(location)}>
        <Ionicons name={icon} size={30} color={COLORS.white}/>
        <Text style={styles.menuText}>{title}</Text>
    </TouchableOpacity>
  )
}

export default Menu