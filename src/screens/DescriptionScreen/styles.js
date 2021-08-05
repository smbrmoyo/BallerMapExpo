import { StyleSheet, StatusBar } from "react-native";
import { wsize, hsize } from "../../utils/Dimensions";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    //paddingTop: hsize(44),
  },
  iconContainer: {
    height: 40,
    width: 40,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    //backgroundColor: 'rgba(0,0,0,0.05)',
    //marginBottom: 15,
    marginHorizontal: 10,
  },
  profileInitialContainer: {
    flexDirection: "row",
    paddingHorizontal: wsize(10),
    paddingVertical: hsize(10),
  },
  profilePhoto: {
    width: wsize(80),
    height: wsize(80),
    borderRadius: wsize(40),
  },
  profileNameContainer: {
    marginLeft: wsize(22),
    justifyContent: "center",
    alignContent: "center",
  },
  profileName: {
    fontSize: wsize(24),
    fontWeight: "bold",
    color: "#262626",
  },
  profileType: {
    fontSize: wsize(14),
  },
  profileInfoContainer: {
    paddingHorizontal: wsize(10),
    paddingTop: hsize(10),
    marginBottom: hsize(2),
    alignSelf: "center",
    width: "100%",
  },
  profileInfo: {
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: 5,
  },
  textInfo: {
    fontSize: wsize(12),
  },
  linkInfo: {
    fontSize: wsize(12),
    color: "#003569",
  },
  userInfoWrapper: {
    flexDirection: "row",
    justifyContent: "space-around",
    //width: "100%",
    marginVertical: 10,
  },
});
export default styles;
