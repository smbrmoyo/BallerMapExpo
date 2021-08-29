import { StyleSheet, Text, View, FlatList } from "react-native";
import { hsize, wsize } from "../../utils/Dimensions";

const styles = StyleSheet.create({
  textHeader: {
    fontSize: 20,
    fontFamily: "ComfortaaBold",
  },
  headerContainer: {
    flexDirection: "row",
    width: "100%",
    paddingHorizontal: wsize(10),
  },
  container: {
    flex: 1,
    paddingTop: hsize(24),
    backgroundColor: "white",
    width: "100%",
    height: "100%",
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    margin: hsize(10),
    paddingVertical: hsize(5),
  },
  iconContainer: {
    backgroundColor: "#eee",
    padding: 5,
    borderRadius: 50,
    marginRight: 15,
  },
  locationText: {},
  heading: {
    marginTop: 50,
    marginBottom: 10,
    marginLeft: 15,
    fontSize: 25,
  },
  inputBox: {
    padding: hsize(10),
    backgroundColor: "#eee",
    marginVertical: hsize(5),
    width: "100%",
    borderRadius: hsize(5),
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
  },
  flatList: {
    paddingLeft: 15,
    marginTop: 15,
    paddingBottom: 15,
    fontSize: 20,
    borderBottomColor: "#26a69a",
    borderBottomWidth: 1,
  },
});

export default styles;
