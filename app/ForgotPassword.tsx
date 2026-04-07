import { useRouter } from "expo-router";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { InputField } from "../components/InputField";
import { Button } from "../components/Button";
import { useState } from "react";
import { getUsers } from "../utils/auth";
import { generateOtp } from "../utils/otpGenerator";
import { User } from "../types/user/user";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { contex, ROUTES } from "../constant";
import { UserIcon } from "../components/icons/UserIcon";

const ForgotPassword = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [isValidEmail, setIsValidEmail] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [emailRequiredError, setEmailRequiredError] = useState("");
  const [userEnteredOtp, setUserEnteredOtp] = useState("");
  const [otp, setOtp] = useState<number>(0);

  const validation = () => {
    if (!email) {
      setEmailRequiredError(contex.forgotPassword.emailRequiredErr);
      return false;
    }
    return true;
  };

  const verifyEmailHandler = async () => {
    try {
      setEmailRequiredError("");
      setError("");
      const isValid = validation();
      if (!isValid) return;
      const users = await getUsers();
      if (users?.length) {
        const user = users.find((user) => user.email === email);
        if (!user) {
          setError(contex.forgotPassword.userNotFoundErr);
          return;
        }
        await AsyncStorage.setItem("userId", user.id);
        setIsValidEmail(true);
        const generatedOtp = generateOtp();
        console.log(`Your OTP is ${generatedOtp}`);
        setOtp(generatedOtp);
      }
    } catch (error: any) {
      console.log({ error });
      setError(error?.message);
    } finally {
      setLoading(false);
    }
  };
  const verifyOtpHandler = (otpByUser: number) => {
    setEmailRequiredError("");

    if (otpByUser !== otp) {
      setError(contex.forgotPassword.invalidOtpErr);
      return;
    }
    router.push(ROUTES.RESET_PASSWORD);
  };

  return (
    <SafeAreaView style={style.safeArea}>
      <ScrollView>
        <View style={style.arrowBtnContainer}>
          <TouchableOpacity onPress={() => router.push(ROUTES.LOGIN)}>
            <Text style={style.arrowBtn}>{"<"}</Text>
          </TouchableOpacity>
        </View>
        <Text style={style.headingText}>{contex.forgotPassword.heading}</Text>
        <View style={style.conatiner}>
          <View>
            {/* Description */}
            <View style={style.descriptionContainer}>
              <Text style={style.descriptionText}>
                {contex.forgotPassword.descriptionLine1}
              </Text>
              <Text style={style.descriptionText}>
                {contex.forgotPassword.descriptionLine2}
              </Text>
              {error && (
                <View style={style.errorMessageConatiner}>
                  <Text style={style.errorMessage}>{error}</Text>
                </View>
              )}
            </View>
            {/* Email */}
            <View style={style.emailFieldContainer}>
              <InputField
                label={contex.forgotPassword.emailLabel}
                placeHolder={contex.forgotPassword.emailPlaceholder}
                value={email}
                onChange={(value) => setEmail(value)}
                keyboardType="email-address"
                icon={<UserIcon size={17} color="#888" />}
                error={emailRequiredError}
                style={{ marginBottom: 20 }}
              />
              {/* OTP */}
              {isValidEmail && (
                <InputField
                  label={contex.forgotPassword.otpLabel}
                  placeHolder={contex.forgotPassword.otpPlaceholder}
                  value={userEnteredOtp}
                  onChange={(value) => setUserEnteredOtp(value)}
                  keyboardType="numeric"
                  icon={<UserIcon size={17} color="#888" />}
                />
              )}
            </View>
            {/* Button */}
            <View style={style.sendBtnContainer}>
              <Button
                loading={loading}
                onPress={
                  isValidEmail
                    ? () => verifyOtpHandler(Number(userEnteredOtp))
                    : verifyEmailHandler
                }
              >
                {isValidEmail
                  ? contex.forgotPassword.verifyButton
                  : contex.forgotPassword.sendButton}
              </Button>
            </View>
          </View>
          {/* Bottom */}
          <View style={style.checkEmailContainer}>
            <Text>{contex.forgotPassword.checkEmailText}</Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const style = StyleSheet.create({
  safeArea: {
    height: "100%",
    width: "100%",
  },
  conatiner: {
    flex: 1,
    justifyContent: "center",
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
    marginTop: 100,
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
  descriptionContainer: {
    marginBottom: 35,
    gap: 10,
  },
  descriptionText: {
    color: "rgb(55, 48, 48)",
  },
  emailFieldContainer: {
    marginTop: 20,
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
  sendBtnContainer: {
    marginTop: 40,
  },
  sendButton: {
    backgroundColor: "#007bff",
    padding: 10,
    borderRadius: 5,
    width: "100%",
    alignItems: "center",
  },
  sendButtonText: {
    color: "white",
    fontWeight: "bold",
  },
  checkEmailContainer: {
    alignItems: "center",
    marginTop: 40,
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

export default ForgotPassword;
