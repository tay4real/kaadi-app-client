import { StyleSheet } from "react-native";
import { COLORS, SIZES } from "../../constants";

const styles = StyleSheet.create({
  header:{
    flexDirection: 'row',
    height: 50,
    width: "100%",
    justifyContent: "space-between",
    alignItems: 'center',
    backgroundColor: COLORS.primary,
    paddingHorizontal: 20
  },
  titleText:{
    fontSize: SIZES.xLarge,
    fontWeight: "600",
  },
  menuContainer:{
    backgroundColor: "grey",
    height: SIZES.height,
    width:"100%",
    justifyContent:'center',
    alignItems: 'center'
  },
  menu:{
    height: 70,
    width: "80%",
    backgroundColor: "black",
    borderRadius: 20,
    marginVertical: 5,
    alignItems: 'center',
    justifyContent: 'center'
  },
  menuText:{
    color:"white",
    fontSize: 20
  }
})

export default styles