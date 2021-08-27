import { StyleSheet } from "react-native";
import { wsize, hsize } from "../../utils/Dimensions";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: hsize(24),
    backgroundColor: "white",
    width: "100%",
    height: "100%",
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
  postHeaderContainer: {
    flex: 1,
    flexDirection: "row",
    paddingHorizontal: wsize(20),
    paddingVertical: hsize(10),
    justifyContent: "space-between",
    width: "100%",
    marginBottom: hsize(3),
    //backgroundColor: "grey",
  },
  postHeaderFirst: {
    flexDirection: "row",
  },
  postHeaderSecond: {
    marginRight: wsize(2),
  },
  postHeaderProfileName: {
    alignSelf: "center",
    fontWeight: "500",
    fontSize: wsize(14),
    marginLeft: wsize(9),
    color: "#262626",
  },
  inputBox: {
    flex: 1,
    margin: 3,
    padding: 10,
    borderWidth: 0.5,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
    borderRadius: 20,
  },
  headerContainer: {
    flexDirection: "row",
    width: "100%",
    paddingHorizontal: wsize(10),
  },
});

export default styles;
