import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  screen: {
    paddingHorizontal: 10,
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
    marginVertical: 10,
    //marginBottom: 50,
    zIndex: 1,
  },
  title: {
    flexDirection: "row",
    paddingHorizontal: 10,
    alignItems: "center",
  },
  titleLocation: {
    fontSize: 20,
    fontWeight: "300",
  },
  addressContainer: {
    padding: 10,
    height: "100%",
  },
  dateContainer: {
    justifyContent: "center",
    marginBottom: 20,
  },
  descriptionContainer: {
    justifyContent: "center",
    marginBottom: 20,
  },
  usersContainer: {},
  TagsContainer: {
    justifyContent: "center",
    marginBottom: 20,
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
    padding: 10,
    backgroundColor: "#eee",
    marginVertical: 5,
    borderRadius: 5,
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
    marginVertical: 10,
  },
});

export default styles;
