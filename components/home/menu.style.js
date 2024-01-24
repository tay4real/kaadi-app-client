import { StyleSheet } from "react-native";
import { COLORS, SIZES } from "../../constants"; 

const styles = StyleSheet.create({
  
  menu:{
    justifyContent: 'space-between',
    alignItems: 'center',
    width: SIZES.width / 4 ,
    height: SIZES.width / 4,
    backgroundColor: "#222",
    marginHorizontal: SIZES.xSmall,
    marginVertical: SIZES.xSmall,
    padding: 10,
    borderRadius: 10
  },
  menuText:{
    color: COLORS.white,
    textAlign: 'center'
  }
  

})

export default styles