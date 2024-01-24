import { StyleSheet } from "react-native";
import { COLORS, SIZES } from "../../constants";

const styles = StyleSheet.create({
  header:{
    flexDirection: 'row',
    backgroundColor: COLORS.primary,
    height: 50,
    width: "100%",
    justifyContent: "space-between",
    alignItems: 'center',
    paddingHorizontal: 20
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