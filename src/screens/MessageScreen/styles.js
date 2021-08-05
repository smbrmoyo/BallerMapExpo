import { StyleSheet, StatusBar, Dimensions } from "react-native";
const { width, height } = Dimensions.get("window");

const styles = StyleSheet.create({
  screen: {},
  header: {
    flexDirection: "row",
    width: width,
    height: 50,
    //position: 'absolute',
    //top: StatusBar.currentHeight,
    marginBottom: 50,
    justifyContent: "space-between",
    alignItems: "center",
    borderBottomWidth: 0.2,
    borderBottomColor: "black",
  },
  searchInput: {
    width: "95%",
    height: 35,
    borderRadius: 10,
    fontSize: 16,
    paddingLeft: 10,
    //borderColor: "grey",
    //borderWidth: 2,
    backgroundColor: "#E7E7E7",
  },
  textHeader: {
    fontWeight: "900",
    fontSize: 25,
    marginHorizontal: 10,
    fontFamily: "Comfortaa",
  },
  iconContainer: {
    height: 40,
    width: 40,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.05)",
    marginHorizontal: 10,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: 10,
    //marginVertical: 5,
    padding: 5,
    //borderBottomColor: "#cccccc",
    //borderBottomWidth: 1,
    width: width,
  },
  textSection: {
    flexDirection: "column",
    justifyContent: "center",
    padding: 15,
    paddingLeft: 0,
    marginHorizontal: 10,
    width: 300,
    //borderBottomWidth: 1,
    //borderBottomColor: '#cccccc',
  },
  info: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 5,
  },
  userNameText: {
    fontSize: 14,
    fontWeight: "bold",
    //font-family: 'Lato-Regular',
  },
  postTimeText: {
    fontSize: 12,
    color: "#666",
    //font-family: 'Lato-Regular',
  },
  text: {
    fontSize: 14,
    color: "grey",
    width: "90%",
  },
  inputBox: {
    flex: 1,
    //margin: 3,
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
    width: "60%",
    borderRadius: 20,
  },
  headerContainer: {
    flexDirection: "row",
    width: "100%",
    paddingHorizontal: 10,
    //marginTop: 30,
  },
});

export default styles;