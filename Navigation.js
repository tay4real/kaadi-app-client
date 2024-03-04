import {NavigationContainer} from '@react-navigation/native'
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs'
import {createNativeStackNavigator} from "@react-navigation/native-stack"
// import {createDrawerNavigator} from "@react-navigation/drawer"
import Screen from './screens';
import { Ionicons } from '@expo/vector-icons';
import useAuth from './hooks/useAuth';

// Stack
const HomeStack = createNativeStackNavigator();

function HomeStackGroup(){
  const {user}  = useAuth()
  
  return(
    <HomeStack.Navigator >
      {
        user ? 
          user.role === "Public" ? (
            <>
              <HomeStack.Screen name="TabGroup"  component={TabClientGroup} options={{headerShown: false}} />
              <HomeStack.Screen name="MyProfile"  component={Screen.MyProfile} options={{headerShown: false}}/>
              <HomeStack.Screen name="SocialBenefits"  component={Screen.SocialBenefits} options={{headerShown: false}}/>
              <HomeStack.Screen name="HealthBenefits"  component={Screen.HealthBenefits} options={{headerShown: false}}/>
              <HomeStack.Screen name="Assets"  component={Screen.Assets} options={{headerShown: false}}/>
              <HomeStack.Screen name="Security"  component={Screen.Security} options={{headerShown: false}}/>
              <HomeStack.Screen name="Tax"  component={Screen.Tax} options={{headerShown: false}}/>
              <HomeStack.Screen name="AgricInputs"  component={Screen.AgricInputs} options={{headerShown: false}}/>
              <HomeStack.Screen name="OndoScholarship"  component={Screen.OndoScholarship} options={{headerShown: false}}/>
              <HomeStack.Screen name="SMEsGrants"  component={Screen.SMEsGrants} options={{headerShown: false}}/>
            </>
            ) : user.role === "Admin" ? 
            (
              <>
                <HomeStack.Screen name="TabGroup"  component={TabGroup} options={{headerShown: false}} />
                <HomeStack.Screen name="RegisterKaadiAdmin"  component={Screen.RegisterKaadiAdmin} options={{headerShown: false}}/>
                <HomeStack.Screen name="SearchKaadiAdmin"  component={Screen.SearchKaadi} options={{headerShown: false}}/>
                <HomeStack.Screen name="Palliative"  component={Screen.Palliative} options={{headerShown: false}}/>
                <HomeStack.Screen name="AddPalliative"  component={Screen.AddPalliative} options={{headerShown: false}}/>
                <HomeStack.Screen name="CaptureUserAdmin"  component={Screen.CaptureUserAdmin} options={{headerShown: false}}/>
                <HomeStack.Screen name="OtherInfoAdmin"  component={Screen.OtherInfoAdmin} options={{headerShown: false}}/>
                <HomeStack.Screen name="NOKInfoAdmin"  component={Screen.NOKInfoAdmin} options={{headerShown: false}}/>
                <HomeStack.Screen name="SuccessfulAdmin"  component={Screen.SuccessfulAdmin} options={{headerShown: false}}/>
                <HomeStack.Screen name="KaadiUser"  component={Screen.KaadiUser} options={{headerShown: false}}/>
              </>
              ) :
              user.role === "User" && 
              (
                <>
                  <HomeStack.Screen name="TabGroup"  component={TabGroup} options={{headerShown: false}} />
                  <HomeStack.Screen name="RegisterKaadiAdmin"  component={Screen.RegisterKaadiAdmin} options={{headerShown: false}}/>
                  <HomeStack.Screen name="SearchKaadiAdmin"  component={Screen.SearchKaadi} options={{headerShown: false}}/>
                  <HomeStack.Screen name="Palliative"  component={Screen.Palliative} options={{headerShown: false}}/>
                  <HomeStack.Screen name="AddPalliative"  component={Screen.AddPalliative} options={{headerShown: false}}/>
                  <HomeStack.Screen name="CaptureUserAdmin"  component={Screen.CaptureUserAdmin} options={{headerShown: false}}/>
                  <HomeStack.Screen name="OtherInfoAdmin"  component={Screen.OtherInfoAdmin} options={{headerShown: false}}/>
                  <HomeStack.Screen name="NOKInfoAdmin"  component={Screen.NOKInfoAdmin} options={{headerShown: false}}/>
                  <HomeStack.Screen name="SuccessfulAdmin"  component={Screen.SuccessfulAdmin} options={{headerShown: false}}/>
                  <HomeStack.Screen name="KaadiUser"  component={Screen.KaadiUser} options={{headerShown: false}}/>
                </>
                ) 
        : (
          <>
          
          <HomeStack.Screen name="Welcome"  component={Screen.Welcome} options={{headerShown: false}} />
          <HomeStack.Screen name="Signin"  component={Screen.Signin} options={{headerShown: false}}/>
          <HomeStack.Screen name="RegisterKaadi"  component={Screen.RegisterKaadi} options={{headerShown: false}}/>
          <HomeStack.Screen name="CaptureUser"  component={Screen.CaptureUser} options={{headerShown: false}}/>
          <HomeStack.Screen name="OtherInfo"  component={Screen.OtherInfo} options={{headerShown: false}}/>
          <HomeStack.Screen name="Successful"  component={Screen.Successful} options={{headerShown: false}}/>
         
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
      <Tab.Screen name='Home' component={Screen.ClientHome} options={{headerShown: false, tabBarLabel: "Home"}} />
      <Tab.Screen name='Benefits' component={Screen.SocialBenefits} options={{headerShown: false}}/>
      <Tab.Screen name='Notifications' component={Screen.Notifications} options={{headerShown: false}} />
      <Tab.Screen name='Settings' component={Screen.Settings} options={{headerShown: false}}/>
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
          }else if(route.name === "Settings"){
            iconName = focused ? "settings" : "settings-outline";
          }

          return <Ionicons name={iconName} size={size} color={color} />
        },
        tabBarActiveTintColor: "#FF7754",
        tabBarInactiveTintColor: "gray"
      })}
    >
      <Tab.Screen name='Home' component={Screen.AdminHome} options={{headerShown: false, tabBarLabel: "Home"}} />
      <Tab.Screen name='Search' component={Screen.SearchKaadi} options={{headerShown: false}}/>
      
      <Tab.Screen name='Settings' component={Screen.Settings} options={{headerShown: false}}/>
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