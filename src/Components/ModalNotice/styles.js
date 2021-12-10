import { StyleSheet } from "react-native";
import { colors } from "../../Styles";

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(0, 0, 0, 0.8)",
    zIndex: 1,
  },
  modal: {
    flex: 1,
    bottom: 0,
    position: "absolute",
    justifyContent: "center",
    alignItems: "center",
    height: "50%",
    backgroundColor: "#fff",
    width: "100%",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingLeft: 25,
    paddingRight: 25,
  },
  indicator: {
    position: "absolute",
    top: 0,
    width: 50,
    height: 5,
    backgroundColor: "#ccc",
    borderRadius: 50,
    alignSelf: "center",
    marginTop: 5,
  },
  title: {
    fontSize: 16,
    fontWeight: "700",
  },
  text: {
    marginTop: 8,
    textAlign: "center",
  },
  btn: {
    width: "100%",
    height: 50,
    borderRadius: 10,
    backgroundColor: colors.primary,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 30,
  },
});

export default styles;
