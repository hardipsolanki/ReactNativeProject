import { useRouter } from "expo-router";
import React, { use, useContext, useState } from "react";
import {
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

import { SafeAreaView } from "react-native-safe-area-context";
import { InputField } from "../components/InputField";
import { Button } from "../components/Button";
import { getUsers } from "../utils/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { UserContext } from "../context/UserContext";
import { contex, ROUTES } from "../constant";
import { UserIcon } from "../components/icons/UserIcon";
import { PasswordIcon } from "../components/icons/PasswordIcon";
import { GoogleIcon } from "../components/icons/GoogleIcon";
import { FacebookIcon } from "../components/icons/FacebookIcon";
import { XIcon } from "../components/icons/XIcon";

const Login = () => {
  const router = useRouter();
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const [emailRequiredError, setEmailRequiredError] = useState<string>("");
  const [passwordRequiredError, setPasswordRequiredError] =
    useState<string>("");
  const { setUser } = useContext(UserContext);

  const validation = () => {
    let isValid = true;
    if (!email) {
      isValid = false;
      setEmailRequiredError(contex.login.emailRequiredErr);
    }
    if (!password) {
      isValid = false;
      setPasswordRequiredError(contex.login.passwordRequiredErr);
    }
    return isValid;
  };

  const handleLogin = async () => {
    setEmailRequiredError("");
    setPasswordRequiredError("");
    setError("");
    const isValid = validation();
    if (!isValid) return;

    try {
      setLoading(true);
      const users = await getUsers();
      if (users?.length) {
        const user = users.find((user) => user.email === email);

        if (!user) {
          setError(contex.login.userNotFoundErr);
          return;
        }
        if (password !== user.password) {
          setError(contex.login.invalidPasswordErr);
          return;
        }
        setUser(user);
        await AsyncStorage.setItem("isLoggedIn", "true");
        router.replace(ROUTES.HOME);
      }
    } catch (error: any) {
      console.log("error in login: ", error);
      setError(error?.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={style.conatiner}>
      <View style={style.arrowBtnContainer}>
        <TouchableOpacity onPress={() => router.push(ROUTES.SIGNUP)}>
          <Text style={style.arrowBtn}>{"<"}</Text>
        </TouchableOpacity>
      </View>
      <Text style={style.headingText}>{contex.login.heading}</Text>
      <View style={style.loginFormContainer}>
        <Text style={style.LogintText}>{contex.login.title}</Text>
        {error && (
          <View style={style.errorMessageConatiner}>
            <Text style={style.errorMessage}>{error}</Text>
          </View>
        )}
        <View style={style.loginFieldsContainer}>
          <InputField
            label={contex.login.emailLabel}
            placeHolder={contex.login.emailPlaceholder}
            value={email}
            onChange={(value) => setEmail(value)}
            keyboardType="email-address"
            error={emailRequiredError}
            icon={<UserIcon size={17} color="#888" />}
          />
          <InputField
            label={contex.login.passwordLabel}
            placeHolder={contex.login.passwordPlaceholder}
            value={password}
            onChange={(value) => setPassword(value)}
            isPassword
            error={passwordRequiredError}
            icon={<PasswordIcon size={17} color="#888" />}
          />
        </View>
        <View style={style.forgotPasswordTextConatiner}>
          <TouchableOpacity onPress={() => router.push(ROUTES.FORGOT_PASSWORD)}>
            <Text style={style.forgotPasswordText}>
              {contex.login.forgotPassword}
            </Text>
          </TouchableOpacity>
        </View>
        <Button
          loading={loading}
          onPress={handleLogin}
          style={style.loginButton}
        >
          {contex.login.loginButton}
        </Button>
        <View style={style.bottomContainer}>
          <TouchableOpacity onPress={() => router.push(ROUTES.SIGNUP)}>
            <View style={style.signupRow}>
              <Text>{contex.login.signupQuestion}</Text>
              <Text style={style.signupText}>{contex.login.signupText}</Text>
            </View>
          </TouchableOpacity>
          <View style={style.socialIconsContainer}>
            <GoogleIcon size={30} />
            <FacebookIcon size={30} />
            <XIcon size={30} />
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

const style = StyleSheet.create({
  conatiner: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "white",
    padding: 20,
  },
  arrowBtnContainer: {
    position: "absolute",
    top: 60,
    left: 30,
  },
  arrowBtn: {
    color: "#007bff",
    fontSize: 30,
    fontWeight: "bold",
  },
  textContainer: {
    width: "100%",
    height: "100%",
  },
  headingText: {
    textAlign: "center",
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 40,
  },
  loginFormContainer: {
    width: "100%",
  },
  LogintText: {
    fontSize: 15,
    fontWeight: "bold",
    color: "#007bff",
    marginBottom: 40,
  },
  loginFieldsContainer: {
    gap: 20,
  },
  forgotPasswordTextConatiner: {
    marginVertical: 30,
  },
  forgotPasswordText: {
    color: "#007bff",
    textAlign: "center",
    fontWeight: "bold",
  },
  loginButton: {
    marginTop: 10,
    backgroundColor: "#0066ff",
  },

  bottomContainer: {
    flexDirection: "column",
  },
  signupContainer: {
    alignItems: "center",
    marginVertical: 55,
  },
  signupRow: {
    flexDirection: "row",
    marginVertical: 30,
    alignItems: "center",
    justifyContent: "center",
  },
  signupText: {
    color: "#007bff",
    fontWeight: "bold",
  },
  socialIconsContainer: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 30,
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

export default Login;
