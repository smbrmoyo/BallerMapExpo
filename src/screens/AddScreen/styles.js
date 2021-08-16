import { StyleSheet } from "react-native";
import { hsize, wsize } from "../../utils/Dimensions";

const styles = StyleSheet.create({
  screen: {
    paddingHorizontal: wsize(20),
    backgroundColor: "white",
    flex: 1,
  },
  container: {
    flex: 1,
    //backgroundColor: "#743cff",
  },
  locationContainer: {
    //alignItems: "center",
    justifyContent: "center",
    marginVertical: hsize(10),
    //marginBottom: 50,
    zIndex: 1,
  },
  title: {
    flexDirection: "row",
    paddingHorizontal: wsize(10),
    marginVertical: hsize(5),
    alignContent: "center",
    //backgroundColor: "green",
    alignItems: "center",
  },
  titleText: {
    fontSize: hsize(20),
    fontWeight: "400",
    fontFamily: "ComfortaaBold",
  },
  addressContainer: {
    padding: hsize(10),
    height: "100%",
  },
  dateContainer: {
    justifyContent: "center",
    marginBottom: hsize(20),
  },
  descriptionContainer: {
    justifyContent: "center",
    marginBottom: hsize(20),
  },
  usersContainer: {},
  TagsContainer: {
    justifyContent: "center",
    marginBottom: hsize(20),
  },
  iconTitleContainer: {
    //backgroundColor: "#a2a2a2",
    padding: 5,
    borderRadius: 50,
    borderWidth: 1,
    borderColor: "grey",
    marginRight: 15,
    marginBottom: 10,
  },

  iconContainer: {
    backgroundColor: "#eee",
    padding: 5,
    borderRadius: 50,
    marginRight: 15,
  },
  locationText: {},
  textInput: {
    padding: hsize(10),
    backgroundColor: "#eee",
    marginVertical: hsize(5),
    borderRadius: hsize(5),
  },
  separator: {
    backgroundColor: "#efefef",
    height: 1,
  },
  listView: {
    //position: 'absolute',
    top: 0,
  },
  autocompleteContainer: {
    //position: "absolute",
    //top: 0,
    //left: 10,
    //right: 10,
    backgroundColor: "white",
    //borderRadius: 5,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: hsize(10),
  },
});

export default styles;
