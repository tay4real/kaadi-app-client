import { View, Text, Image} from 'react-native'
import React from 'react'
import styles from './stylesheet'
import useAuth from '../../hooks/useAuth';

const KaadiUser = ({data}) => {
  const { apiBaseURL } = useAuth();
  return (
    <View style={styles.container}>
      <View style={styles.section2}>
        {
          data.item.Image_URL === "" ?
          <Image source={{uri:  "https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_1280.png" }} style={styles.picture} />
          :
          <Image source={{uri:  `${apiBaseURL}/uploads/${data.item.Image_URL}` }} style={styles.picture} />
        }
        
      </View>
      <View style={styles.section1}>
        <Text><Text style={{fontWeight: "bold"}}>Name: </Text>{data.item.Surname} {data.item.FirstName}</Text>
        <Text><Text style={{fontWeight: "bold"}}>NIN: </Text>{data.item.NIN}</Text>
        <Text><Text style={{fontWeight: "bold"}}>ORIN: </Text>{data.item.ORIN}</Text>
        <Text><Text style={{fontWeight: "bold"}}>Occupation: </Text>{data.item.Occupation}</Text>
        <Text><Text style={{fontWeight: "bold"}}>Gender: </Text>{data.item.Gender}</Text>
      </View>
      
      
    </View>
  )
}

export default KaadiUser