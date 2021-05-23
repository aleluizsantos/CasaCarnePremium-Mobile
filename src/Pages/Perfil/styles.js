import { StyleSheet } from "react-native";

import { colors, fonts } from "../../Styles";

const Styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 70,
    alignItems: "center",
  },
  avatar: {
    position: "relative",
  },
  imgAvatar: {
    width: 150,
    height: 150,
    resizeMode: "contain",
  },
  buttonCamera: {
    position: "absolute",
    borderWidth: 5,
    borderColor: colors.lighter,
    backgroundColor: colors.light,
    padding: 8,
    borderRadius: 50,
    bottom: 0,
    right: 0,
  },
  titleUser: {
    fontFamily: "Archivo_700Bold",
    fontSize: fonts.bigger,
    color: colors.dark,
    textAlign: "center",
    paddingTop: 10,
  },
  dataUser: {
    width: "100%",
    padding: 20,
  },
  fieldGroup: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: colors.light,
  },
  label: {
    fontFamily: "Archivo_400Regular",
    fontSize: fonts.small,
    fontWeight: "bold",
  },
  value: {
    fontFamily: "Archivo_400Regular",
    fontSize: fonts.small,
  },
  groupButton: {
    flexDirection: "row",
    width: "100%",
    paddingHorizontal: 20,
    alignItems: "center",
    justifyContent: "space-between",
  },
  buttonEditPerfil: {
    backgroundColor: colors.primary,
    height: 50,
    width: "48%",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 8,
  },
  buttonCancel: {
    backgroundColor: colors.light,
    height: 50,
    width: "48%",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 8,
  },
  form: {
    width: "100%",
  },
  input: {
    height: 60,
    backgroundColor: "#FFF",
    borderRadius: 10,
    marginBottom: 8,
    paddingHorizontal: 20,
    fontSize: 14,
    borderWidth: 1,
    borderColor: colors.light,
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  modalView: {
    margin: 8,
    width: "90%",
    backgroundColor: "white",
    borderRadius: 20,
    padding: 15,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  containerButtonAdd: {
    flexDirection: "row",
    justifyContent: "space-around",
  },
  buttonUpDatePerfil: {
    backgroundColor: colors.primary,
    height: 50,
    width: "48%",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 8,
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  buttonCancelModal: {
    backgroundColor: colors.light,
    height: 50,
    width: "48%",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 8,
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  title: {
    fontFamily: "Archivo_700Bold",
    fontSize: fonts.big,
    alignSelf: "flex-start",
    padding: 15,
  },
});

export default Styles;
