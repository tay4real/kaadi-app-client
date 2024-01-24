import { View,StatusBar, Image, Text, TouchableOpacity} from 'react-native'
import React from 'react'
import styles from './stylesheet';
import { SafeAreaView } from 'react-native-safe-area-context'
import { Menu } from '../../components';
import { COLORS } from '../../constants';
import useAuth from '../../hooks/useAuth';
import { Ionicons } from '@expo/vector-icons'



const Home = ({navigation}) => {
  const {  user } = useAuth();
  return (
    <>
     <StatusBar backgroundColor={COLORS.primary} />
      <SafeAreaView style={styles.container}>
        <View style={{
          height:"20%",
          width:"100%", 
          borderBottomLeftRadius: 30, 
          borderBottomRightRadius: 30, 
          backgroundColor: COLORS.primary, 
          alignItems: "center",
          justifyContent: "center"
        }}>
          {/*  */}
         
          <Text style={{
            fontSize: 24,
            fontWeight: "600",
            color: "#222",
          }}>Welcome, {user && user.fullname}</Text>
        </View>
        <View style={{marginTop: 50}}>
          <View style={styles.menuContainer}>
              
              <TouchableOpacity onPress={() => navigation.navigate("RegisterKaadi")} style={styles.menu}>
                <View style={{flexDirection: "row", alignItems: "center"}}>
                   
                    <Text style={styles.menuText}>Register Kaadi User</Text>
                  </View>
                  <Ionicons name='person' size={30} style={{marginRight: 10, color:"red"}}/>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => navigation.navigate("SearchKaadi")} style={styles.menu}>
                  <View style={{flexDirection: "row", alignItems: "center"}}>
                    
                    <Text style={styles.menuText}>Search Registered Users</Text>
                  </View>
                  <Ionicons name='search' size={24} style={{marginRight: 10, color:"red"}}/>
              </TouchableOpacity>
          </View>

          
          
          
          
        </View>
        
      </SafeAreaView>
    </>
  )
}



export default Home