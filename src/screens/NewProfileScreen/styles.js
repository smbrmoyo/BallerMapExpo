import { Platform, StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  titleBar: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 24,
    marginHorizontal: 20,
  },
  ProfileImage: {
    marginTop: 25,
    alignItems: "center",
  },
  image: {
    width: 200,
    height: 200,
    borderRadius: 100,
    overflow: "hidden",
  },
  dn: {
    backgroundColor: "#41444B",
    position: "absolute",
    top: 25,
    width: 50,
    height: 50,
    borderRadius: 30,
    alignItems: "center",
    justifyContent: "center",
  },
  texts: {
    marginTop: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  titletext: {
    fontSize: 30,
    fontWeight: "600",
  },
  statscontainer: {
    flexDirection: "row",
    marginTop: 32,
  },
  statsbox: {
    alignItems: "center",
    flex: 1,
  },
  statstext: {
    fontSize: 12,
    textTransform: "uppercase",
    fontWeight: "500",
  },
  followview: {
    marginTop: 25,
    alignItems: "center",
  },
  follow: {
    width: 150,
    height: 50,
    borderRadius: 20,
    backgroundColor: "#00BECC",
    alignItems: "center",
    justifyContent: "center",
  },
  endtext: {
    alignSelf: "center",
    marginTop: 75,
  },
  separator: {
    borderColor: "grey",
    borderWidth: 0.5,
    flexDirection: "row",
    height: 40,
    width: "100%",
    justifyContent: "space-around",
    alignItems: "center",
  },
  iconPost: {},
});

export default styles;
