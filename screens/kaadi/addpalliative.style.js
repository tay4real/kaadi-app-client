import { StyleSheet } from "react-native";
import { COLORS, SIZES } from "../../constants";

const styles = StyleSheet.create({
  container:{

  },
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
  formContainer:{
    backgroundColor: COLORS.offwhite,
    borderRadius: 20
  },
  formTitleContainer:{
    flexDirection: 'row', 
    alignItems: 'center', 
    justifyContent: 'center',
    marginTop: 10
  },
  formTitle:{
    fontWeight: "bold", 
    fontSize: 20
  }
  ,
  formInputContainer:{
    paddingHorizontal: 20,
    paddingVertical: 5
  },
  textInput:{
    height: 40,
    borderColor: COLORS.gray,
    backgroundColor: COLORS.gray,
    borderRadius: 10,
    paddingHorizontal: 10,
    marginTop: 5
  },
  textMultiInput:{
    height: 70,
    borderColor: COLORS.gray,
    backgroundColor: COLORS.gray,
    borderRadius: 10,
    paddingHorizontal: 10,
    marginTop: 5
  },
  buttonStyle:{
    height: 40,
    borderColor: COLORS.gray,
    backgroundColor: COLORS.gray,
    borderRadius: 10,
    paddingHorizontal: 10,
    marginTop: 5,
    width:"100%",
    justifyContent: "flex-start"
  },
  buttonTextStyle: {
    fontSize: 14,
  },
  rowStyle:{
    height: 40
  },
  rowTextStyle:{
    textAlign: 'left',
    fontSize: 14,
  },
  formSubmitContainer:{
    marginTop: 40,
    paddingHorizontal: 20,
  },
  submitBtn:{
    backgroundColor: "#3b5998",
    height: 50,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent:'center'
  },
  submitBtnText:{
    fontSize: 15
  }
})

export default styles