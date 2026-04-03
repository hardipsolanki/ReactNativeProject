import React from "react";
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TouchableOpacity,
} from "react-native";

type ButtonProps = {
  children: React.ReactNode;
  onPress: () => void;
  loading?: boolean;
  disabled?: boolean;
};

export const Button = ({
  children,
  onPress,
  loading,
  disabled = false,
}: ButtonProps) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled || loading}
      activeOpacity={0.8}
      style={style.btn}
    >
      {loading ? (
        <ActivityIndicator color='white' size="small" />
      ) : (
        <Text style={style.btnText}>{children}</Text>
      )}
    </TouchableOpacity>
  );
};

const style = StyleSheet.create({
  btn: {
    backgroundColor: "#007bff",
    padding: 10,
    borderRadius: 5,
    width: "100%",
    alignItems: "center",
    shadowColor: "#007bff",
    shadowOffset: {
      width: 20,
      height: 20,
    },
  },
  btnText: {
    color: "white",
    fontWeight: "bold",
  },
});
