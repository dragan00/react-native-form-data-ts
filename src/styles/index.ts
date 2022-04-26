import { Platform } from "react-native";

type AppStyle = Record<string, string | number>;

const appStyle = {
  mainColor: "#4890ff",
  shadowMainColor: "#e6f7ff",
  fontColor: "#262626",
  onMainColorFontColor: "white",
  errorColor: "#f5222d",
  disabledColor: "#d3d9e4"
};

export const fontSize = {
  classic: 15
}



export default appStyle;



export const classicButtonStyle =  {
  width: 100,
  height: 40,
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  borderRadius: 3
}

export const classicInputStyle = {
  width: 300,
  borderWidth: 1,
  borderColor: '#00000080',
  borderRadius: 8,
  fontFamily: 'Poppins-Medium',
  color: '#000',
  fontSize: 18,
  paddingHorizontal: Platform.OS === 'ios' ? 16 : 14,
  height: 60,
}