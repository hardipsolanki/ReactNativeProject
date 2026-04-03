import React, { useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { TextInput } from "react-native";
import { EyeIcon, EyeOffIcon, PasswordIcon } from "./Icons";

type InputFieldProps = {
  label: string;
  placeHolder: string;
  value: string;
  icon?: React.ReactNode;
  onChange: (text: string) => void;
  isPassword?: boolean;
  keyboardType?: "email-address" | "numeric" | "default";
  error?: string;
};

export const InputField = ({
  label,
  isPassword = false,
  onChange,
  placeHolder,
  value,
  error,
  icon,
  keyboardType = "default",
}: InputFieldProps) => {
  const [showPassword, setShowPassword] = useState<boolean>(false);

  return (
    <View style={style.lableAndInputConatiner}>
      <View style={style.labelAndIconConatiner}>
        {icon && icon}
        <Text style={style.label}>{label}</Text>
      </View>
      <View>
        <TextInput
          style={style.input}
          placeholder={placeHolder}
          value={value}
          secureTextEntry={isPassword && !showPassword}
          keyboardType={keyboardType}
          onChangeText={(text) => onChange(text)}
        />
        {isPassword && (
          <View style={style.passwordHideShowContainer}>
            {showPassword ? (
              <TouchableOpacity onPress={() => setShowPassword(false)}>
                <EyeIcon size={17} color="#888" />
              </TouchableOpacity>
            ) : (
              <TouchableOpacity onPress={() => setShowPassword(true)}>
                <EyeOffIcon size={17} color="#888" />
              </TouchableOpacity>
            )}
          </View>
        )}
        {error && (
          <View>
            <Text style={style.errorMessage}>{error}</Text>
          </View>
        )}
      </View>
    </View>
  );
};

const style = StyleSheet.create({
  lableAndInputConatiner: {
    gap: 5,
  },
  labelAndIconConatiner: {
    flexDirection: "row",
    gap: 5,
  },
  label: {
    color: "rgb(12, 7, 7)",
    marginBottom: 10,
    fontSize: 12,
  },
  input: {
    borderWidth: 1.5,
    borderColor: "rgba(23, 10, 10, 0.18)",
    padding: 10,
    borderRadius: 10,
  },
  passwordHideShowContainer: {
    position: "absolute",
    right: 10,
    top: 12,
  },
  errorMessage: {
    color: "red",
    padding: 6,
  },
});
