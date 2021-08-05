import { StyleSheet, StatusBar, Dimensions } from "react-native";

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: "row",
    width: "100%",
    padding: 10,
    marginTop: 30,
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
  cancelButton: {
    alignSelf: "center",
    padding: 5,
  },
  recentMembersContainer: {
    borderBottomColor: "grey",
    borderBottomWidth: 0.3,
    paddingTop: 10,
    paddingBottom: 10,
  },
  memberContainer: {
    padding: 5,
    width: 70,
    alignItems: "center",
  },
  memberImage: {
    height: 60,
    width: 60,
    borderRadius: 10,
  },
  memberName: {
    marginTop: 5,
    fontSize: 10,
    textAlign: "center",
  },
  searchResultsContainer: {
    paddingTop: 10,
    backgroundColor: "white",
  },
  searchResultsContainerTitle: {
    paddingLeft: 10,
    fontWeight: "500",
    paddingBottom: 10,
    paddingTop: 10,
  },
});

export default styles;
