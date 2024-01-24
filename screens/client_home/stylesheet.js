import { StyleSheet } from "react-native";
import { COLORS, SIZES } from "../../constants";

const styles = StyleSheet.create({
  container:{
    flexDirection: "column",
    alignItems: "center",
    height: "100%",
  },
  menuContainer:{
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  menu:{
    justifyContent: 'center',
    alignItems: 'center',
    width: SIZES.width / 6 ,
    height: SIZES.width / 6,
    backgroundColor: COLORS.tertiary,
    marginHorizontal: SIZES.xSmall,
    marginVertical: SIZES.xSmall,
  },
  menuText:{
    color: COLORS.white,
    textAlign: 'center'
  }
  

})

export default styles