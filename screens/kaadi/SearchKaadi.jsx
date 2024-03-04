import { View, Text, StatusBar, TouchableOpacity, TextInput, FlatList } from 'react-native'
import { Input } from '@ui-kitten/components';
import React, {useState, useEffect} from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import styles from './searchpalliatives.style'
import { Ionicons } from '@expo/vector-icons'
import { COLORS } from '../../constants';
import KaadiUser from '../../components/kaadiusers/KaadiUser';
import axios from "axios";
import useAuth from '../../hooks/useAuth';

const SearchKaadi = ({navigation}) => {
  const { apiBaseURL } = useAuth();
  const [search, setSearch] = useState('')
  const [pending, setPending] = useState(false);
  const [error, setError] = useState("");
  const [data, setData] = useState([])

 
  useEffect(() => {
    getRegisteredKaadiUsers()
  }, [])
  
 
  // let filteredData = data.filter(d => {
  //   return(
  //     d.sur_name.toLowerCase().indexOf(search.toLowerCase()) !== -1 ||
  //       d.first_name.toLowerCase().indexOf(search.toLowerCase()) !== -1 ||
  //       d.other_name.toLowerCase().indexOf(search.toLowerCase()) !== -1 ||
  //       d.nin.toLowerCase().indexOf(search.toLowerCase()) !== -1 ||
  //       d.pin_number.toLowerCase().indexOf(search.toLowerCase()) !== -1 
  //   )
  // });

  const searchKaadi = async() => {
    try {
      
      let res;
      if(search !== "" && search.length >= 3){
        res = await axios.post(`${apiBaseURL}/api/controllers/kaadi_admin.php`, {
          "search-kaadi-users": true,
          "criteria": search
        });
      }else{
        res = await axios.post(`${apiBaseURL}/api/controllers/kaadi_admin.php`, {
          "search-kaadi-users": true
        });
      }
      
      if (res.data) {
       
        setPending(false);
        setData(res.data.data);  
      }
    } catch (error) {
      
      console.log(error.response);
      setError(error.response.data);
    }
  }

  
  const getRegisteredKaadiUsers = async() => {
    try {
      
      const res = await axios.post(`${apiBaseURL}/api/controllers/kaadi_admin.php`, {
        "verified-kaadi-users": true
      });

      if (res.data) {
        setPending(false);
        setData(res.data.data);  
      }
    } catch (error) {
      console.log(error.response);
      setError(error.response.data);
    }
  }

  return (
    <>
     <StatusBar backgroundColor={COLORS.primary} />
    <SafeAreaView style={styles.container}>
        <View style={styles.header}>
            <TouchableOpacity onPress={() => navigation.navigate("Home")} style={styles.back}>
                <Ionicons name='arrow-back-outline' size={24}/>
            </TouchableOpacity>
            <Text style={styles.headerTitle}>Kaadi Users</Text>
        </View>
        <View style={styles.searchContainer}>
            <TextInput style={styles.searchInput}  placeholder='Search Kaadi' onChangeText={(value) => setSearch(value) } value={search} />
            <TouchableOpacity onPress={searchKaadi}><Ionicons name='search-outline' size={24} /></TouchableOpacity>
        </View>

        <View style={{marginTop: 10, marginBottom: 200}}>
          <FlatList 
            data={data}
            keyExtractor={(item) => item.id }
            renderItem={(item) => <KaadiUser data={item} />}
          />
          
        </View>

    </SafeAreaView>
    </>
  )
}

export default SearchKaadi