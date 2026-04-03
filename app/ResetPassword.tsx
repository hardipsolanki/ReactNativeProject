import { useRouter } from "expo-router";
import React from "react";
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

const ResetPassword = () => {
  const [showPassword, setShowPassword] = React.useState<boolean>(false);
  const [fieldsData, setFieldsData] = React.useState<{
    oldPassword: string;
    newPassword: string;
    confirmPassword: string;
  }>({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const router = useRouter();
  const arrow = "<";

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

          <View style={style.fieldsGapContainer}>
            <View>
              <View style={style.fieldsLableAndInputConatiner}>
                <PasswordIcon size={17} color="#888" />
                <Text style={style.labelText}>Old Password</Text>
              </View>
              <View>
                <TextInput
                  placeholder="Enter your old password"
                  value={fieldsData.oldPassword}
                  onChangeText={(text) =>
                    setFieldsData((prevData) => ({
                      ...prevData,
                      oldPassword: text,
                    }))
                  }
                  secureTextEntry={!showPassword}
                  style={style.textInput}
                />
              </View>
            </View>

            <View>
              <View style={style.fieldsLableAndInputConatiner}>
                <PasswordIcon size={17} color="#888" />
                <Text style={style.labelText}>New Password</Text>
              </View>
              <View>
                <TextInput
                  placeholder="Enter your new password"
                  value={fieldsData.newPassword}
                  onChangeText={(text) =>
                    setFieldsData((prevData) => ({
                      ...prevData,
                      newPassword: text,
                    }))
                  }
                  secureTextEntry={!showPassword}
                  style={style.textInput}
                />
              </View>
            </View>

            {/* Confirm Password */}
            <View>
              <View style={style.fieldsLableAndInputConatiner}>
                <PasswordIcon size={17} color="#888" />
                <Text style={style.labelText}>Confirm Password</Text>
              </View>
              <View>
                <TextInput
                  placeholder="Enter your confirm password"
                  value={fieldsData.confirmPassword}
                  onChangeText={(text) =>
                    setFieldsData((prevData) => ({
                      ...prevData,
                      confirmPassword: text,
                    }))
                  }
                  secureTextEntry={!showPassword}
                  style={style.textInput}
                />
              </View>
            </View>
          </View>

          <View style={style.resetBtnContainer}>
            <TouchableOpacity style={style.resetButton}>
              <Text style={style.resetButtonText}>Reset Password</Text>
            </TouchableOpacity>
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
});

export default ResetPassword;
