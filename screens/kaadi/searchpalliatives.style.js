import { StyleSheet } from "react-native";
import { COLORS, SIZES } from "../../constants";

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
  
  titleText:{
    fontSize: SIZES.xLarge,
    fontWeight: "600",
  },
  searchContainer:{
    flexDirection:'row',
    height: 40,
    width: "80%",
    marginHorizontal: "10%",
    marginTop: 10,
    alignItems: 'center',
    backgroundColor: '#CCCCCC',
    borderColor: COLORS.black,
    borderRadius: 20,
    paddingHorizontal: 10
  },
  searchInput:{
    flex: 5,
    height: 40,
    marginRight: 5,
    
  }
})

export default styles