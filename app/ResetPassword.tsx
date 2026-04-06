import { useRouter } from "expo-router";
import React, { use, useState } from "react";
import {
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { EyeIcon, EyeOffIcon, PasswordIcon } from "../components/Icons";
import { InputField } from "../components/InputField";
import { Button } from "../components/Button";
import { getSingleUser, getUsers } from "../utils/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";

const ResetPassword = () => {
  const [passwordOldRequiredError, setPasswordOldRequiredError] =
    useState<string>("");
  const [passwordConfirmRequiredError, setPasswordConfirmRequiredError] =
    useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const [fieldsData, setFieldsData] = React.useState<{
    newPassword: string;
    confirmPassword: string;
  }>({
    newPassword: "",
    confirmPassword: "",
  });
  const router = useRouter();
  const arrow = "<";

  const validation = () => {
    let isValid = true;
    if (!fieldsData.newPassword) {
      isValid = false;
      setPasswordOldRequiredError("Password is required");
    }
    if (!fieldsData.confirmPassword) {
      isValid = false;
      setPasswordConfirmRequiredError("Confirm password is required");
    }
    if (fieldsData.newPassword && fieldsData.confirmPassword) {
      if (fieldsData.newPassword !== fieldsData.confirmPassword) {
        isValid = false;
        setPasswordConfirmRequiredError("Passwords do not match");
      }
    }

    return isValid;
  };

  const handleResetPassword = async () => {
    setPasswordOldRequiredError("");
    setPasswordConfirmRequiredError("");
    setError("");
    const isValid = validation();
    if (!isValid) return;

    try {
      setLoading(true);
      let userId = await AsyncStorage.getItem("userId");
      const users = await getUsers();
      if (users?.length) {
        const userIndex = users.findIndex((user) => user.id === userId);
        if (userIndex !== -1) {
          const updatedUsers = [...users];
          updatedUsers[userIndex] = {
            ...users[userIndex],
            password: fieldsData.newPassword,
          };
          await AsyncStorage.setItem("users", JSON.stringify(updatedUsers));
          console.log("Password reset successful...!");
          router.push("/Login");
        }
      }
    } catch (error) {
      console.error("Error resetting password:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={style.conatiner}>
      <View style={style.arrowBtnContainer}>
        <TouchableOpacity onPress={() => router.push("/Index")}>
          <Text style={style.arrowBtn}>{arrow}</Text>
        </TouchableOpacity>
      </View>

      <View style={style.headingContainer}>
        <Text style={style.headingText}>Reset Password</Text>
      </View>

      <View style={style.loginFormContainer}>
        <View>
          <Text>Change your password to something you can remember</Text>
          {error && (
            <View style={style.errorMessageConatiner}>
              <Text style={style.errorMessage}>{error}</Text>
            </View>
          )}
          <View style={style.fieldsGapContainer}>
            <View>
              <InputField
                label="Your New Password"
                placeHolder="Enter your new password"
                value={fieldsData.newPassword}
                onChange={(value) =>
                  setFieldsData((prevData) => ({
                    ...prevData,
                    newPassword: value,
                  }))
                }
                isPassword
                error={passwordOldRequiredError}
                icon={<PasswordIcon size={17} color="#888" />}
              />
            </View>
            <View>
              <InputField
                label="Your Confirm Password"
                placeHolder="Enter your confirm password"
                value={fieldsData.confirmPassword}
                onChange={(value) =>
                  setFieldsData((prevData) => ({
                    ...prevData,
                    confirmPassword: value,
                  }))
                }
                isPassword
                error={passwordConfirmRequiredError}
                icon={<PasswordIcon size={17} color="#888" />}
              />
            </View>
          </View>
          <View style={style.resetBtnContainer}>
            <Button loading={loading} onPress={handleResetPassword}>
              Reset Password
            </Button>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

const style = StyleSheet.create({
  conatiner: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "white",
    padding: 20,
  },
  textContainer: {
    width: "100%",
    height: "100%",
  },
  headingText: {
    textAlign: "center",
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
  },
  loginFormContainer: {
    width: "100%",
  },
  LogintText: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#007bff",
    marginVertical: 10,
  },
  arrowBtnContainer: {
    position: "absolute",
    top: 60,
    left: 30,
  },
  arrowBtn: {
    color: "#007bff",
    fontSize: 20,
    fontWeight: "bold",
  },
  headingContainer: {
    marginBottom: 20,
  },
  fieldsGapContainer: {
    gap: 20,
    marginTop: 30,
  },
  fieldsLableAndInputConatiner: {
    flexDirection: "row",
    gap: 5,
  },
  labelText: {
    color: "rgb(12, 7, 7)",
    marginBottom: 10,
    fontSize: 12,
  },
  textInput: {
    borderWidth: 1.5,
    borderColor: "rgba(23, 10, 10, 0.18)",
    padding: 10,
    borderRadius: 10,
  },
  resetBtnContainer: {
    marginTop: 30,
  },
  resetButton: {
    backgroundColor: "#007bff",
    padding: 10,
    borderRadius: 5,
    width: "100%",
    alignItems: "center",
  },
  resetButtonText: {
    color: "white",
    fontWeight: "bold",
  },
  errorMessageConatiner: {
    margin: 10,
  },
  errorMessage: {
    color: "red",
    textAlign: "center",
    padding: 5,
  },
});

export default ResetPassword;
