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
  
 
  let filteredData = data.filter(d => {
    return(
      d.Surname.toLowerCase().indexOf(search.toLowerCase()) !== -1 ||
        d.FirstName.toLowerCase().indexOf(search.toLowerCase()) !== -1 ||
        d.OtherName.toLowerCase().indexOf(search.toLowerCase()) !== -1 ||
        d.NIN.toLowerCase().indexOf(search.toLowerCase()) !== -1 ||
        d.ORIN.toLowerCase().indexOf(search.toLowerCase()) !== -1 
    )
  });

  

  const getRegisteredKaadiUsers = async() => {
    try {
      
      const res = await axios.get(`${apiBaseURL}/kaadi/get_all_registered_kaadi.php`);

      if (res.data) {
        setPending(false);
        setData(res.data)  
      }
    } catch (error) {
      
      console.log(error.response);
      setError(error.response.data);
    }
  }

  return (
    <>
     <StatusBar backgroundColor={COLORS.primary} />
    <SafeAreaView>
        <View style={styles.header}>
            <TouchableOpacity onPress={() => navigation.navigate("Home")}>
                <Ionicons name='arrow-back-outline' size={24}/>
            </TouchableOpacity>
            <Text style={styles.titleText}>Kaadi Users</Text>
        </View>
        <View style={styles.searchContainer}>
            <TextInput style={styles.searchInput}  placeholder='Search Kaadi' onChangeText={(value) => setSearch(value) } value={search} />
            <Ionicons name='search-outline' size={24} />
        </View>

        <View style={{marginTop: 10, marginBottom: 200}}>
          <FlatList 
            data={filteredData}
            keyExtractor={(item) => item.ID }
            renderItem={(item) => <KaadiUser data={item} />}
          />
        </View>

    </SafeAreaView>
    </>
  )
}

export default SearchKaadi