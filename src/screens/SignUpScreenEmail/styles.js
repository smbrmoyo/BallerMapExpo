import { Platform, StyleSheet } from "react-native";
import { hsize, wsize } from "../../utils/Dimensions";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#743cff",
  },
  header: {
    flex: 1,
    justifyContent: "flex-end",
    paddingHorizontal: wsize(20),
    paddingBottom: hsize(50),
    alignItems: "center",
  },
  footer: {
    flex: Platform.OS === "ios" ? 4 : 5,
    backgroundColor: "#fff",
    borderTopLeftRadius: wsize(30),
    borderTopRightRadius: wsize(30),
    paddingHorizontal: wsize(20),
    paddingVertical: hsize(20),
  },
  text_header: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 30,
  },
  text_footer: {
    color: "#05375a",
    fontSize: 18,
  },
  action: {
    flexDirection: "row",
    marginTop: hsize(10),
    borderBottomWidth: 1,
    borderBottomColor: "#f2f2f2",
    paddingBottom: hsize(5),
  },
  textInput: {
    flex: 1,
    marginTop: Platform.OS === "ios" ? 0 : hsize(-12),
    paddingLeft: wsize(10),
    color: "#05375a",
  },
  button: {
    alignItems: "center",
    marginTop: hsize(30),
  },
  signIn: {
    width: "100%",
    height: hsize(60),
    justifyContent: "center",
    alignItems: "center",
    borderRadius: wsize(10),
  },
  textSign: {
    fontSize: 18,
    fontWeight: "bold",
  },
  textPrivate: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginTop: hsize(30),
  },
  color_textPrivate: {
    color: "#743cff",
  },
  errorMsg: {
    color: "#FF0000",
    fontSize: 14,
  },
});

export default styles;
