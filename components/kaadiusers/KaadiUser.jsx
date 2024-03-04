import { View, Text, Image, TouchableOpacity} from 'react-native'
import React from 'react'
import styles from './stylesheet'
import useAuth from '../../hooks/useAuth';
import { useNavigation } from '@react-navigation/native';


const KaadiUser = ({data}) => {
  const navigation = useNavigation();
  const { apiBaseURL } = useAuth();

  
  return (
    <TouchableOpacity onPress={() => navigation.navigate("KaadiUser", {
      data: data.item
    })} >
        <View style={styles.container}>
        <View style={styles.section2}>
          {
            data.item.image_name === ""  ?
            <Image source={{uri:  "https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_1280.png" }} style={styles.picture} />
            :
            <Image source={{uri:  `${apiBaseURL}/registration/pictures/${data.item.image_name}` }} style={styles.picture} />
          }
          
        </View>
        <View style={styles.section1}>
          <Text><Text style={{fontWeight: "bold"}}>Name: </Text>{data.item.sur_name} {data.item.first_name} {data.item.other_name}</Text>
          <Text><Text style={{fontWeight: "bold"}}>NIN: </Text>{data.item.nin}</Text>
          <Text><Text style={{fontWeight: "bold"}}>ORIN: </Text>{data.item.pin_number}</Text>
          <Text><Text style={{fontWeight: "bold"}}>Occupation: </Text>{data.item.occupation}</Text>
          <Text><Text style={{fontWeight: "bold"}}>Gender: </Text>{data.item.gender}</Text>
        </View>
        
        
      </View>
    </TouchableOpacity>
    
  )
}

export default KaadiUser