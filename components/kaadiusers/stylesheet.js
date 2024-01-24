import { StyleSheet } from "react-native";
import { COLORS, SIZES } from "../../constants";

const styles = StyleSheet.create({
  container:{
    flexDirection: 'row',
    padding: 10,
    backgroundColor: COLORS.gray2,
    marginVertical: 5,
    marginHorizontal: 20,
    borderRadius: 10
  },
  section1:{
    flex: 2,
    marginRight: 5
  },
  section2:{
    flex: 1
  },
  picture:{
    width: 100,
    height: 100,
    aspectRatio: 1,
    borderRadius: 50
  }
})

export default styles