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
    fontSize: SIZES.large,
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
  },
  button:{
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 50,
    marginTop: 10,
    marginBottom: 15,
    backgroundColor: "#075985"
  },
  buttonText: {
    fontSize: 14,
    fontWeight: "500",
    color: "#fff"
  },
  datePicker: {
    height: 120,
    marginTop: -10
  },
  pickerButton:{
    paddingHorizontal: 20
  },
  inputText: {
    height: 60,
    borderRadius: 10,
    fontSize: 15,
    fontWeight: "400",
    color: "black",
    lineHeight: 15,
    letterSpacing: -0.02,
    flex: 1,
  },
  inputTextContainer: {
    backgroundColor: "#E0E0E0",
    flex: 1,
    borderRadius: 3,
    paddingHorizontal: 10,
    marginVertical: 5,
    height: 45,
  }
})

export default styles

