import { View, Text, Image } from 'react-native'
import React from 'react'
import styles from './beneficiary.style'

const Beneficiary = ({data}) => {
  
  return (
    <View style={styles.container}>
      <View style={styles.section1}>
        <Text><Text style={{fontWeight: "bold"}}>Name: </Text>{data.item.name}</Text>
        <Text><Text style={{fontWeight: "bold"}}>Palliative Accessed: </Text>{data.item.palliative_accessed}</Text>
        <Text><Text style={{fontWeight: "bold"}}>Items Collected: </Text>{data.item.collectibles}</Text>
        <Text><Text style={{fontWeight: "bold"}}>Description: </Text>{data.item.description}</Text>
        <Text><Text style={{fontWeight: "bold"}}>Date Collected: </Text>{data.item.date_collected}</Text>
      </View>
      <View style={styles.section2}>
        <Image source={{uri: data.item.picture}} style={styles.picture} />
        <Text style={{fontWeight: "bold"}}>Orin Number: </Text>
        <Text>{data.item.orin}</Text>
      </View>
      
    </View>
  )
}

export default Beneficiary