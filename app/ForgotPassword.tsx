import { useRouter } from "expo-router";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { UserIcon } from "../components/Icons";
import { SafeAreaView } from "react-native-safe-area-context";
import { InputField } from "../components/InputField";
import { Button } from "../components/Button";
import { useState } from "react";

const ForgotPassword = () => {
  const router = useRouter();
  const [email, setEmail] = useState<string>("");
  const arrow = "<";

  return (
    <SafeAreaView style={style.safeArea}>
      <View style={style.arrowBtnContainer}>
        <TouchableOpacity onPress={() => router.push("/Index")}>
          <Text style={style.arrowBtn}>{arrow}</Text>
        </TouchableOpacity>
      </View>

      <Text style={style.headingText}>Forgot Password</Text>

      <View style={style.conatiner}>
        <View>
          {/* Description Text */}
          <View style={style.descriptionContainer}>
            <Text style={style.descriptionText}>
              Confirm your email and we'll send
            </Text>
            <Text style={style.descriptionText}>the instructions.</Text>
          </View>

          {/* Email Field */}
          <View style={style.emailFieldContainer}>
            <View>
              <InputField
                label="Your Email"
                placeHolder="Enter your email"
                value={email}
                onChange={(value) => setEmail(value)}
                keyboardType="email-address"
                icon={<UserIcon size={17} color="#888" />}
              />
            </View>
          </View>

          {/* Send Button */}
          <View style={style.sendBtnContainer}>
            <Button onPress={() => {}}>Send Reset Instructions</Button>
          </View>
        </View>

        {/* Bottom Text */}
        <View>
          <View style={style.checkEmailContainer}>
            <Text>Please check your email</Text>
          </View>
        </View>
      </View>
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
});

export default ForgotPassword;
