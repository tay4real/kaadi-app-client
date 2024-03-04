import { View, Text,TextInput, Image, TouchableOpacity, StyleSheet, StatusBar, SafeAreaView, ScrollView, ActivityIndicator} from 'react-native'
import React, {useState, useEffect} from 'react'
import useAuth from '../../hooks/useAuth';
import { ListItem, Icon } from '@rneui/themed';
import { COLORS, SIZES } from "../../constants";
import { Ionicons } from '@expo/vector-icons'
import { SelectList } from 'react-native-dropdown-select-list';
import axios from 'axios';






const KaadiUser = ({navigation, route}) => {

  const { apiBaseURL, user } = useAuth();
  const [data, setData] = useState({});
  const [showDetails, setDetails] = useState(false)
  const [showBasicInfo, setBasicInfo] = useState(false)
  const [showOriginPlace, setOriginPlace] = useState(false)
  const [showBirthPlace, setBirthPlace] = useState(false)
  const [showSpouseInfo, setSpouseInfo] = useState(false)
  const [showNOKInfo, setNOKInfo] = useState(false)
  const [showBenefits, setBenefits] = useState(false)
  const [showAddBenefits, setAddBenefits] = useState(false)

//   const [showSelectBox, setSelectBox] = useState(false)
  

  const [benefitSources, setBenefitSources] = useState([]);
  const [benefitLists, setBenefitLists] = useState([]);
  const [accsessedBenefits, setAccessedBenefits] = useState([]);

 
  const [pin_number, setPinNumber] = useState("");
 
  const [source, setSource] = useState("");
  const [description, setDescription] = useState("");
  const [benefit, setBenefit] = useState("");
  const [amount, setAmount] = useState("");
  const [user_id, setUserID] = useState("");

  const [pending, setPending] = useState(false);
  const [error, setError] = useState(false);
  

  useEffect(()=>{
    if(route.params.data){
      setData(route.params.data)
      
    }
  },[])

  

  useEffect(() => {
    setUserID(user.id)
    console.log(user.id)
  }, [user])

  useEffect(() => {
    getBenefitSources();
  }, [])

  useEffect(() => {
    if(data.length !== 0){
        setPinNumber(data.pin_number)
    }
  }, [data])

  useEffect(() => {
    setBenefit();
    getBenefitLists(source);
  }, [source])

  useEffect(() => {
    getAccessedBenefits(pin_number)
  }, [pin_number])

  console.log(pin_number)


  const getBenefitSources = async() => {
    try {
      
        const res = await axios.post(`${apiBaseURL}/api/controllers/social_benefits.php`, {
          "get-sources": true
        });
  
        
        if (res.data) {
            
    
            const sources = [];

            res.data.data.map((data) => {
                sources.push({key: data.id, value: data.mda_name});
            })
           
            setBenefitSources(sources)
        }
      } catch (error) {
        
        console.log(error.response.data);
        setError(error.response.data);
        return false;
      }
  }



  const getBenefitLists = async(source) => {
    try {
      
        if(source !== ""){
            const res = await axios.post(`${apiBaseURL}/api/controllers/social_benefits.php`, {
                "get-benefit-list-by-mda": true,
                source_id: source
            });
    
            if (res.data) {
                
              
                const lists = [];

                console.log(res.data)
                res.data.map((data) => {
                   
                    lists.push({key: data.id, value: data.benefit_name});
                })
                
                setBenefitLists(lists)
            }
        }
        
      } catch (error) {  
        console.log(error.response);
        setError(error.response.data);
        return false;
      }
  }


  const getAccessedBenefits = async(pin_number) => {
    try {

        
  
        const res = await axios.post(`${apiBaseURL}/api/controllers/access_social_benefits.php`, {
            "get-user-benefits": true,
            "pin_number": pin_number
        });
  
        
        if (res.data) {
             
            setAccessedBenefits(res.data.data)
        }
      } catch (error) {
        
        console.log(error.response.data);
        setError(error.response.data);
        return false;
      }
  }
  


  const addBenefits = async() => {
    const data = {
        "add-benefit": "true",
        "pin_number": pin_number,
        "source": source,
        "description": description,
        "benefit": benefit,
        "amount": amount,
        "user_id": user_id
      }

    try {
        setPending(true);
      
        const res = await axios.post(`${apiBaseURL}/api/controllers/access_social_benefits.php`,  data);
        setPending(false);
        if(res.data.success){
            setAccessedBenefits(res.data.data)
            setDescription("");
            setAmount("");
            setAddBenefits(!showAddBenefits)
            setBenefits(!showBenefits);
        }
    } catch (error) {
        setPending(false);
    }
  }

  console.log(accsessedBenefits)

  return (
    <>
      <StatusBar backgroundColor={COLORS.primary} />
      
      <SafeAreaView>
        
        <View style={styles.header}>
            <TouchableOpacity onPress={() => navigation.navigate("SearchKaadiAdmin")} style={styles.back}>
                <Ionicons name='arrow-back-outline' size={24}/>
            </TouchableOpacity>
            <Text style={styles.headerTitle}>Kaadi User</Text>
        </View>
        <View style={styles.container}>
        <Text style={{textAlign:"center", fontSize:18, fontWeight: "600", marginBottom: 10}}>{data.sur_name} {data.first_name} {data.other_name}</Text>
        <ScrollView 
            showsHorizontalScrollIndicator={false} >
            <View style={styles.section2}>
            {
                data.image_name === ""  ?
                <Image source={{uri:  "https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_1280.png" }} style={styles.picture} />
                :
                <Image source={{uri:  `${apiBaseURL}/registration/pictures/${data.image_name}` }} style={styles.picture} />
            }
            
            </View>
           
           

            <View style={{backgroundColor: "#ddd", color: "white", marginTop: 10, paddingVertical: 10, paddingHorizontal: 15}} >
                <TouchableOpacity style={{flexDirection:"row", justifyContent: "space-between", alignItems: ""}} onPress={() => {
                    setDetails(!showDetails);
                }}>

                    
                    {
                        showDetails ? (<>
                        <Text style={{fontSize: 16, fontWeight:"600"}}>Hide Profile</Text>
                        <Icon type='ionicon' name='chevron-up-outline' size={24} /></>
                        ) :
                        (
                            <>
                            <Text style={{fontSize: 16, fontWeight:"600"}}>Show Profile</Text>
                            <Icon type='ionicon' name='chevron-down-outline' size={24} />
                            </>
                        )
                    }
                   
                </TouchableOpacity>

                {
                    showDetails && (
                        <>
                        <View style={{backgroundColor: "white", marginTop: 10, paddingVertical: 10, paddingHorizontal: 15}}>
                <TouchableOpacity style={{flexDirection:"row", justifyContent: "space-between", alignItems: ""}} onPress={() => {
                    setBasicInfo(!showBasicInfo);
                }}>

                    <Text style={{fontSize: 16, fontWeight:"600"}}>Basic Information</Text>
                    {
                        showBasicInfo ? (<Icon type='ionicon' name='chevron-up-outline' size={24} />) :<Icon type='ionicon' name='chevron-down-outline' size={24} />
                    }
                   
                </TouchableOpacity>
                
                {
                    showBasicInfo && (
                        <View style={{marginVertical: 10}}>
                <View style={{flexDirection:"row"}}>
                    <View style={{flex: 1}}><Text><Text style={{fontWeight: "bold"}}>NIN: </Text>{data.nin}</Text></View>
                    <View style={{flex: 1}}><Text><Text style={{fontWeight: "bold"}}>ORIN: </Text>{data.pin_number}</Text></View>
                </View>
                <View style={{flexDirection:"row", marginVertical: 2}}>
                    <View style={{flex: 2}}><Text><Text style={{fontWeight: "bold"}}>Surname: </Text>{data.sur_name}</Text></View>
                </View>
                <View style={{flexDirection:"row", marginVertical: 2}}>
                    <View style={{flex: 1}}><Text><Text style={{fontWeight: "bold"}}>First Name: </Text>{data.first_name}</Text></View>
                </View>
                <View style={{flexDirection:"row", marginVertical: 2}}>
                    <View style={{flex: 2}}><Text><Text style={{fontWeight: "bold"}}>Othername: </Text>{data.other_name}</Text></View> 
                </View>
                <View style={{flexDirection:"row", marginVertical: 2}}>
                    <View style={{flex: 1}}><Text><Text style={{fontWeight: "bold"}}>Gender: </Text>{data.gender}</Text></View>
                </View>
                <View style={{flexDirection:"row", marginVertical: 2}}>
                    <View style={{flex: 2}}><Text><Text style={{fontWeight: "bold"}}>Occupation: </Text>{data.occupation}</Text></View>
                </View>
                <View style={{flexDirection:"row", marginVertical: 2}}>
                    <View style={{flex: 2}}><Text><Text style={{fontWeight: "bold"}}>Marital Status: </Text>{data.marital_status}</Text></View>
                </View>
                <View style={{flexDirection:"row", marginBottom: 10}}>
                    <View style={{flex: 2}}><Text><Text style={{fontWeight: "bold"}}>Residential Address: </Text>{data.residential_address}, {data.residential_town}, {data.residential_lga_name} </Text></View>
                </View>
                        </View>
                    )
                }
            </View>

            <View style={{backgroundColor: "white", marginTop: 10, paddingVertical: 10, paddingHorizontal: 15}}>
                <TouchableOpacity style={{flexDirection:"row", justifyContent: "space-between", alignItems: ""}} onPress={() => {
                    setOriginPlace(!showOriginPlace);
                }}>

                    <Text style={{fontSize: 16, fontWeight:"600"}}>Place of Origin</Text>
                    {
                        showOriginPlace ? (<Icon type='ionicon' name='chevron-up-outline' size={24} />) :<Icon type='ionicon' name='chevron-down-outline' size={24} />
                    }
                   
                </TouchableOpacity>
                
                {
                    showOriginPlace && (
                        <View style={{marginVertical: 10}}>
                
                <View style={{flexDirection:"row", marginVertical: 2}}>
                    <View style={{flex: 2}}><Text><Text style={{fontWeight: "bold"}}>Town: </Text>{data.town_origin}</Text></View>
                </View>
                <View style={{flexDirection:"row", marginVertical: 2}}>
                    <View style={{flex: 1}}><Text><Text style={{fontWeight: "bold"}}>Local Government: </Text>{data.lga_origin}</Text></View>
                </View>
                <View style={{flexDirection:"row", marginVertical: 2}}>
                    <View style={{flex: 2}}><Text><Text style={{fontWeight: "bold"}}>State: </Text>{data.state_origin}</Text></View> 
                </View>
                <View style={{flexDirection:"row", marginVertical: 2}}>
                    <View style={{flex: 1}}><Text><Text style={{fontWeight: "bold"}}>Country: </Text>{data.country_origin}</Text></View>
                </View>
                
                        </View>
                    )
                }
            </View>

            <View style={{backgroundColor: "white", marginTop: 10, paddingVertical: 10, paddingHorizontal: 15}}>
                <TouchableOpacity style={{flexDirection:"row", justifyContent: "space-between", alignItems: ""}} onPress={() => {
                    setBirthPlace(!showBirthPlace);
                }}>

                    <Text style={{fontSize: 16, fontWeight:"600"}}>Place of Birth</Text>
                    {
                        showBirthPlace ? (<Icon type='ionicon' name='chevron-up-outline' size={24} />) :<Icon type='ionicon' name='chevron-down-outline' size={24} />
                    }
                   
                </TouchableOpacity>
                
                {
                    showBirthPlace && (
                        <View style={{marginVertical: 10}}>
                
                <View style={{flexDirection:"row", marginVertical: 2}}>
                    <View style={{flex: 2}}><Text><Text style={{fontWeight: "bold"}}>Town: </Text>{data.town_birth}</Text></View>
                </View>
                <View style={{flexDirection:"row", marginVertical: 2}}>
                    <View style={{flex: 1}}><Text><Text style={{fontWeight: "bold"}}>Local Government: </Text>{data.lga_birth}</Text></View>
                </View>
                <View style={{flexDirection:"row", marginVertical: 2}}>
                    <View style={{flex: 2}}><Text><Text style={{fontWeight: "bold"}}>State: </Text>{data.state_birth}</Text></View> 
                </View>
                <View style={{flexDirection:"row", marginVertical: 2}}>
                    <View style={{flex: 1}}><Text><Text style={{fontWeight: "bold"}}>Country: </Text>{data.country_birth}</Text></View>
                </View>
                
                        </View>
                    )
                }
            </View>

            {
                data.marital_status === "Married" && (
                    <View style={{backgroundColor: "white", marginTop: 10, paddingVertical: 10, paddingHorizontal: 15}}>
                <TouchableOpacity style={{flexDirection:"row", justifyContent: "space-between", alignItems: ""}} onPress={() => {
                    setSpouseInfo(!showSpouseInfo);
                }}>

                    <Text style={{fontSize: 16, fontWeight:"600"}}>Spouse Information</Text>
                    {
                        showSpouseInfo ? (<Icon type='ionicon' name='chevron-up-outline' size={24} />) :<Icon type='ionicon' name='chevron-down-outline' size={24} />
                    }
                   
                </TouchableOpacity>
                
                {
                    showSpouseInfo && (
                        <View style={{marginVertical: 10}}>
                
                
                <View style={{flexDirection:"row", marginVertical: 2}}>
                    <View style={{flex: 1}}><Text><Text style={{fontWeight: "bold"}}>Surname: </Text>{data.spouse_surname}</Text></View>
                </View>
                <View style={{flexDirection:"row", marginVertical: 2}}>
                    <View style={{flex: 2}}><Text><Text style={{fontWeight: "bold"}}>First Name: </Text>{data.spouse_firstname}</Text></View> 
                </View>
                <View style={{flexDirection:"row", marginVertical: 2}}>
                    <View style={{flex: 1}}><Text><Text style={{fontWeight: "bold"}}>Othername: </Text>{data.spouse_othername}</Text></View>
                </View>
                <View style={{flexDirection:"row", marginVertical: 2}}>
                    <View style={{flex: 2}}><Text><Text style={{fontWeight: "bold"}}>Living with Spouse: </Text>{data.living_spouse}</Text></View>
                </View>
                        </View>
                    )
                }
            </View>
                )
            }
             <View style={{backgroundColor: "white", marginTop: 10, paddingVertical: 10, paddingHorizontal: 15}}>
                <TouchableOpacity style={{flexDirection:"row", justifyContent: "space-between", alignItems: ""}} onPress={() => {
                    setNOKInfo(!showNOKInfo);
                }}>

                    <Text style={{fontSize: 16, fontWeight:"600"}}>Next of Kin Information</Text>
                    {
                        showNOKInfo ? (<Icon type='ionicon' name='chevron-up-outline' size={24} />) :<Icon type='ionicon' name='chevron-down-outline' size={24} />
                    }
                   
                </TouchableOpacity>
                
                {
                    showNOKInfo && (
                        <View style={{marginVertical: 10}}>
                
                
                <View style={{flexDirection:"row", marginVertical: 2}}>
                    <View style={{flex: 1}}><Text><Text style={{fontWeight: "bold"}}>Fullname: </Text>{data.next_kin_full_name}</Text></View>
                </View>
                <View style={{flexDirection:"row", marginVertical: 2}}>
                    <View style={{flex: 2}}><Text><Text style={{fontWeight: "bold"}}>Gender: </Text>{data.next_kin_gender}</Text></View> 
                </View>
                <View style={{flexDirection:"row", marginVertical: 2}}>
                    <View style={{flex: 1}}><Text><Text style={{fontWeight: "bold"}}>Date of Birth: </Text>{data.next_kin_date_birth}</Text></View>
                </View>
                <View style={{flexDirection:"row", marginVertical: 2}}>
                    <View style={{flex: 2}}><Text><Text style={{fontWeight: "bold"}}>Address: </Text>{data.next_kin_address}</Text></View>
                </View>
                <View style={{flexDirection:"row", marginVertical: 2}}>
                    <View style={{flex: 2}}><Text><Text style={{fontWeight: "bold"}}>Town: </Text>{data.next_kin_town}</Text></View>
                </View>
                <View style={{flexDirection:"row", marginVertical: 2}}>
                    <View style={{flex: 2}}><Text><Text style={{fontWeight: "bold"}}>LGA: </Text>{data.next_kin_lga}</Text></View>
                </View>
                <View style={{flexDirection:"row", marginVertical: 2}}>
                    <View style={{flex: 2}}><Text><Text style={{fontWeight: "bold"}}>State: </Text>{data.next_kin_state}</Text></View>
                </View>
                        </View>
                    )
                }
            </View>
                        </>
                    )
                }
            

            </View>

            <View style={{backgroundColor: "#ddd", color: "white", marginTop: 10, paddingVertical: 10, paddingHorizontal: 15}} >
                <TouchableOpacity style={{flexDirection:"row", justifyContent: "space-between", alignItems: ""}} onPress={() => {
                    setBenefits(!showBenefits);
                }}>

                    
                    {
                        showBenefits ? (<>
                        <Text style={{fontSize: 16, fontWeight:"600"}}>Social Benefits Accessed</Text>
                        <Icon type='ionicon' name='chevron-up-outline' size={24} /></>
                        ) :
                        (
                            <>
                            <Text style={{fontSize: 16, fontWeight:"600"}}>Social Benefits Accessed</Text>
                            <Icon type='ionicon' name='chevron-down-outline' size={24} />
                            </>
                        )
                    }
                   
                </TouchableOpacity>

                {
                    showBenefits && (
                        <>
                        {
                            accsessedBenefits.length !== 0 ? 
                                (
                                    accsessedBenefits.map((benefit, key) => (
                                    <View key={benefit.id} style={{flexDirection: "row", backgroundColor: "#eee", paddingHorizontal: 10, paddingVertical: 10, borderRadius: 5, marginTop: 10}}>
                                        <View style={{marginRight: 10}}><Text>{ key + 1}.</Text></View>
                                        <View style={{flex: 1}}>
                                            <View style={{flexDirection:"column"}}>
                                              <Text style={styles.infoTextSpan}>Source: </Text>
                                              <Text style={styles.infoText}>{benefit.source}</Text>
                                            </View>
                                            <View style={{}}>
                                              <Text style={styles.infoTextSpan}>Benefit: </Text>
                                              <Text style={styles.infoText}>{benefit.benefit}</Text>
                                            </View>
                                            <View style={{}}>
                                              <Text style={styles.infoTextSpan}>Description: </Text>
                                              <Text style={styles.infoText}>{benefit.description}</Text>
                                            </View>
                                            <View style={{}}>
                                              <Text style={styles.infoTextSpan}>Date Accessed: </Text>
                                              <Text style={styles.infoText}>{benefit.date_created}</Text>
                                            </View>
                                            <View style={{}}>
                                              <Text style={styles.infoTextSpan}>Amount (Naira):  </Text>
                                              <Text style={styles.infoText}>N{benefit.amount}</Text>
                                            </View>
                                        </View>
                                      </View>
                                    ))
                                )
                                    
                                
                             : (

                                <>
                                    <View style={{backgroundColor: "#fff", padding: 10, marginTop: 10}}>
                                        <Text>No Benefits Accessed</Text>
                                    </View>
                                </>
                            ) 
                        }
                        </>
                    )
                }
            

            </View>

            <View style={{backgroundColor: "#ddd", color: "#fff", marginTop: 10, paddingVertical: 10, paddingHorizontal: 15}} >
                <TouchableOpacity style={{flexDirection:"row", justifyContent: "space-between", marginBottom: 10}} onPress={() => {
                    setAddBenefits(!showAddBenefits)
                }}>
                            <Text style={{fontSize: 16, fontWeight:"600"}}>Add Social Benefits</Text>
                            <Icon type='ionicon' name='add-circle-outline' size={24} />
                </TouchableOpacity>
                {
                    showAddBenefits && (
                        <>
                            <View style={{borderColor: "black", borderStyle:"solid", borderWidth: 1, borderRadius: 10, padding: 10}}>
                            

                            <Text>Source</Text>
                            <SelectList 
                                setSelected={(val) => setSource(val)} 
                                data={benefitSources} 
                                save="key"
                                placeholder='Select Source'
                                boxStyles={[styles.inputText, {borderWidth: 0}]}
                                inputStyles={{}}
                                dropdownStyles={[ {borderWidth: 0, backgroundColor:"#fff"}]}
                                dropdownItemStyles={{}}
                                dropdownTextStyles={{}}
                            />

                            <Text>Benefit</Text>
                            <SelectList 
                                setSelected={(val) => setBenefit(val)} 
                                data={benefitLists} 
                                save="key"
                                placeholder='Select Benefit'
                                boxStyles={[styles.inputText, {borderWidth: 0}]}
                                inputStyles={{}}
                                dropdownStyles={[ {borderWidth: 0, backgroundColor:"#fff"}]}
                                dropdownItemStyles={{}}
                                dropdownTextStyles={{}}
                            />

                            <Text>Description</Text>
                            <View style={{}}>
                                <TextInput style={[styles.inputText, {height: 80}]} multiline numberOfLines={3} placeholder='Description' value={description} onChangeText={(value) => setDescription(value)} />
                            </View>

                            <Text>Amount (Naira)</Text>
                            <View style={{}}>
                                <TextInput style={styles.inputText} placeholder='Amount' value={amount} onChangeText={(value) => setAmount(value)} />
                            </View>

                            <TouchableOpacity style={{backgroundColor: "grey", paddingVertical: 5, borderRadius: 10, marginTop: 20 }} onPress={() => addBenefits()}>
                                <Text style={{color: "black", textAlign: "center", fontSize: 18, fontWeight:"bold"}}>Add Benefit {pending && <ActivityIndicator/>}</Text>
                            </TouchableOpacity>
                            </View>
                        </>
                    )
                }
            </View>

        </ScrollView>
              
      </View>

        

      </SafeAreaView>
    </>
  )
}

export default KaadiUser

const styles = StyleSheet.create({
    back:{
        width: 30, 
        height: 30, 
        borderRadius: 30, 
        backgroundColor: "white", 
        alignItems: "center", 
        justifyContent: "center"
      },
      header:{
        height: 50,
        width: "100%",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        paddingHorizontal: 20,
        backgroundColor: COLORS.primary
      },
      headerTitle:{
        fontSize: SIZES.large,
      },
    headerContainer: {
        justifyContent: "space-between",
        alignItems: "center",
        backgroundColor: COLORS.primary,
        marginBottom: 20,
        width: '100%',
        paddingVertical: 15,
        paddingHorizontal: 15,
        flexDirection:"row"
    },
    heading: {
        fontSize: 22,
        fontWeight: 'bold',
    },
    container:{
        flexDirection: 'column',
        padding: 10,
        backgroundColor: COLORS.gray2,
        marginVertical: 10,
        marginHorizontal: 20,
        paddingVertical: 20,
        borderRadius: 10,
        height: "90%"
      },
      section1:{
        marginRight: 5
      },
      section2:{
        alignItems:"center",
        marginBottom: 10
      },
      picture:{
        width: 200,
        height: 200,
        aspectRatio: 1
      },
      inputText: {
        height: 50,
        borderRadius: 10,
        fontSize: 15,
        fontWeight: "400",
        color: "black",
        lineHeight: 15,
        letterSpacing: -0.02,
        paddingHorizontal: 10,
        marginVertical: 5,
        flex: 1,
        backgroundColor: COLORS.offwhite
      },
      inputTextContainer: {
        backgroundColor: "#E0E0E0",
        flex: 1,
        borderRadius: 3,
        paddingHorizontal: 10,
        marginVertical: 5,
        height: 45,
      },
      formContainer:{
        backgroundColor: COLORS.offwhite,
        borderRadius: 10
      },
      infoTitle:{
        fontSize: SIZES.large,
        
      },
      infoText:{
        fontSize: 14, 
        fontWeight: "500",
        flex: 3
      },
      infoTextSpan:{
        fontWeight: "800",
        flex: 2
      }
})