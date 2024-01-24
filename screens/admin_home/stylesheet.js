import { StyleSheet } from "react-native";
import { COLORS, SIZES } from "../../constants";

const styles = StyleSheet.create({
  container:{
    flex: 1,
    backgroundColor: "white"
  },
  menuContainer:{
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  
  menu:{
    width: "90%",
    height: "20vh",
    backgroundColor: "#eee",
    borderRadius: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 10,
    paddingVertical: 20,
    marginVertical: 10
  },
  menuText:{
    fontSize: 20
  }
  

})

export default styles