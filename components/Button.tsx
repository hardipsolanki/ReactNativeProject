import React from "react";
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TouchableOpacity,
  type StyleProp,
  type TextStyle,
  type ViewStyle,
} from "react-native";

type ButtonProps = {
  children: React.ReactNode;
  onPress: () => void;
  loading?: boolean;
  disabled?: boolean;
  style?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
};

export const Button = ({
  children,
  onPress,
  loading,
  disabled = false,
  style: customStyle,
  textStyle: customTextStyle,
}: ButtonProps) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled || loading}
      activeOpacity={0.75}
      style={[style.btn, customStyle, disabled && style.disabledBtn]}
    >
      {loading ? (
        <ActivityIndicator color="white" size="small" />
      ) : (
        <Text style={[style.btnText, customTextStyle]}>{children}</Text>
      )}
    </TouchableOpacity>
  );
};

const style = StyleSheet.create({
  btn: {
    backgroundColor: "#007bff",
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderRadius: 12,
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#007bff",
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.2,
    shadowRadius: 10,
    elevation: 4,
  },
  disabledBtn: {
    backgroundColor: "#8aa9f8",
  },
  btnText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 16,
  },
});
