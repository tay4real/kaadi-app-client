import { StyleSheet } from "react-native";
import { COLORS } from "../../constants"; 

export const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    alignItems: "center",
    backgroundColor: COLORS.white,
    height: "100%",
  },
  appImage: {
    height: "56%",
    width: "100%",
    resizeMode: "cover",
  },
  appTextContainer: {
    marginTop: 20,
    marginBottom: 30,
  },
  appTextTitle: {
    fontSize: 20,
    fontStyle: "normal",
    textAlign: "center",
    lineHeight: 23,
    color: "#1935DE",
    fontWeight: "700",
    marginBottom: 12,
    paddingLeft: 35,
    paddingRight: 35,
  },
  appTextSubTitle: {
    fontSize: 13,
    textAlign: "center",
    lineHeight: 15.25,
    letterSpacing: -0.02,
    fontStyle: "normal",
    fontWeight: "500",
    paddingLeft: 46,
    paddingRight: 46,
  },
  appSliderContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "4%",
  },
  buttonContainer: {
    flexDirection: "row",
    width: "80%",
    marginTop: 40,
    paddingBottom: 20,
  },
  buttonContainerVertical: {
    flexDirection: "column",
    width: "80%",
    height: "50%",
  },
});
