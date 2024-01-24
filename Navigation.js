import {NavigationContainer} from '@react-navigation/native'
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs'
import {createNativeStackNavigator} from "@react-navigation/native-stack"
// import {createDrawerNavigator} from "@react-navigation/drawer"
import { ClientHome, AdminHome, Welcome, Signin, RegisterKaadi, 
  CaptureUser, Settings, Notifications, 
  OtherInfo, Successful, SocialBenefits, MyProfile, HealthBenefits, 
  Assets, Security, Tax, AgricInputs, OndoScholarship, SMEsGrants, SearchKaadi, Palliative, AddPalliative } from './screens';
import { Ionicons } from '@expo/vector-icons';
import useAuth from './hooks/useAuth';

// Stack
const HomeStack = createNativeStackNavigator();

function HomeStackGroup(){
  const {user}  = useAuth()
  
  console.log("Confirm: ",user)
  return(
    <HomeStack.Navigator >
      {
        user ? 
          user.role === "Public" ? (
            <>
              <HomeStack.Screen name="TabGroup"  component={TabClientGroup} options={{headerShown: false}} />
              <HomeStack.Screen name="MyProfile"  component={MyProfile} options={{headerShown: false}}/>
              <HomeStack.Screen name="SocialBenefits"  component={SocialBenefits} options={{headerShown: false}}/>
              <HomeStack.Screen name="HealthBenefits"  component={HealthBenefits} options={{headerShown: false}}/>
              <HomeStack.Screen name="Assets"  component={Assets} options={{headerShown: false}}/>
              <HomeStack.Screen name="Security"  component={Security} options={{headerShown: false}}/>
              <HomeStack.Screen name="Tax"  component={Tax} options={{headerShown: false}}/>
              <HomeStack.Screen name="AgricInputs"  component={AgricInputs} options={{headerShown: false}}/>
              <HomeStack.Screen name="OndoScholarship"  component={OndoScholarship} options={{headerShown: false}}/>
              <HomeStack.Screen name="SMEsGrants"  component={SMEsGrants} options={{headerShown: false}}/>
            </>
            ) : user.role === "Admin" ? 
            (
              <>
                <HomeStack.Screen name="TabGroup"  component={TabGroup} options={{headerShown: false}} />
                <HomeStack.Screen name="RegisterKaadi"  component={RegisterKaadi} options={{headerShown: false}}/>
                <HomeStack.Screen name="SearchKaadi"  component={SearchKaadi} options={{headerShown: false}}/>
                <HomeStack.Screen name="Palliative"  component={Palliative} options={{headerShown: false}}/>
                <HomeStack.Screen name="AddPalliative"  component={AddPalliative} options={{headerShown: false}}/>
                <HomeStack.Screen name="CaptureUser"  component={CaptureUser} options={{headerShown: false}}/>
                <HomeStack.Screen name="OtherInfo"  component={OtherInfo} options={{headerShown: false}}/>
              </>
              ) :
              user.role === "User" && 
              (
                <>
                  <HomeStack.Screen name="TabGroup"  component={TabGroup} options={{headerShown: false}} />
                  <HomeStack.Screen name="RegisterKaadi"  component={RegisterKaadi} options={{headerShown: false}}/>
                  <HomeStack.Screen name="SearchKaadi"  component={SearchKaadi} options={{headerShown: false}}/>
                  <HomeStack.Screen name="Palliative"  component={Palliative} options={{headerShown: false}}/>
                  <HomeStack.Screen name="AddPalliative"  component={AddPalliative} options={{headerShown: false}}/>
                  <HomeStack.Screen name="CaptureUser"  component={CaptureUser} options={{headerShown: false}}/>
                  <HomeStack.Screen name="OtherInfo"  component={OtherInfo} options={{headerShown: false}}/>
                </>
                ) 
        : (
          <>
          
          <HomeStack.Screen name="Welcome"  component={Welcome} options={{headerShown: false}} />
          <HomeStack.Screen name="Signin"  component={Signin} options={{headerShown: false}}/>
          <HomeStack.Screen name="RegisterKaadi"  component={RegisterKaadi} options={{headerShown: false}}/>
          <HomeStack.Screen name="CaptureUser"  component={CaptureUser} options={{headerShown: false}}/>
          <HomeStack.Screen name="OtherInfo"  component={OtherInfo} options={{headerShown: false}}/>
          <HomeStack.Screen name="Successful"  component={Successful} options={{headerShown: false}}/>
         
        </>
        )
      }
       
    </HomeStack.Navigator>
  )
}



// Tab Bottom
const Tab = createBottomTabNavigator();


function TabClientGroup()
 {
  return (
    <Tab.Navigator
      screenOptions={({route, navigation}) => ({
        tabBarIcon: ({color, focused, size}) => {
          let iconName;
          if(route.name === "Home"){
            iconName = focused ? "home" : "home-outline";
          }else if(route.name === "Benefits"){
            iconName = focused ? "people-circle" : "people-circle-sharp";
          }else if(route.name === "Notifications"){
            iconName = focused ? "notifications" : "notifications-outline";
          }else if(route.name === "Settings"){
            iconName = focused ? "settings" : "settings-outline";
          }

          return <Ionicons name={iconName} size={size} color={color} />
        },
        tabBarActiveTintColor: "#FF7754",
        tabBarInactiveTintColor: "gray"
      })}
    >
      <Tab.Screen name='Home' component={ClientHome} options={{headerShown: false, tabBarLabel: "Home"}} />
      <Tab.Screen name='Benefits' component={SocialBenefits} options={{headerShown: false}}/>
      <Tab.Screen name='Notifications' component={Notifications} options={{headerShown: false}} />
      <Tab.Screen name='Settings' component={Settings} options={{headerShown: false}}/>
    </Tab.Navigator>
  )
 }

 function TabGroup()
 {
  return (
    <Tab.Navigator
      screenOptions={({route, navigation}) => ({
        tabBarIcon: ({color, focused, size}) => {
          let iconName;
          if(route.name === "Home"){
            iconName = focused ? "home" : "home-outline";
          }else if(route.name === "Search"){
            iconName = focused ? "search" : "search-outline";
          }else if(route.name === "Notifications"){
            iconName = focused ? "notifications" : "notifications-outline";
          }else if(route.name === "Settings"){
            iconName = focused ? "settings" : "settings-outline";
          }

          return <Ionicons name={iconName} size={size} color={color} />
        },
        tabBarActiveTintColor: "#FF7754",
        tabBarInactiveTintColor: "gray"
      })}
    >
      <Tab.Screen name='Home' component={AdminHome} options={{headerShown: false, tabBarLabel: "Home"}} />
      <Tab.Screen name='Search' component={SearchKaadi} options={{headerShown: false}}/>
      <Tab.Screen name='Notifications' component={Notifications} options={{headerShown: false}} />
      <Tab.Screen name='Settings' component={Settings} options={{headerShown: false}}/>
    </Tab.Navigator>
  )
 }




export default function Navigation(){
  return (
    <NavigationContainer>
      <HomeStackGroup/>
    </NavigationContainer>
  )
}