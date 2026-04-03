import { Button, Text, View } from "react-native";
import { useRouter } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

const HomeScreen = () => {
  const router = useRouter();

  useEffect(() => {
    const checkLoginStatus = async () => {
      const isLoggedIn = await AsyncStorage.getItem("isLoggedIn");
      if (!isLoggedIn) router.push("/Login");
    };

    checkLoginStatus();
  }, []);

  const logOutHandler = async () => {
    await AsyncStorage.removeItem("isLoggedIn");
    router.push("/Login");
  };

  return (
    <SafeAreaView
      style={{
        flex: 1,
        alignItems: "center",
        justifyContent: "space-between",
        marginVertical: 50,
      }}
    >
      <View
        style={{
          flexDirection: "row",
          gap: 20,
          alignItems: "center",
        }}
      >
        <Text
          style={{
            fontSize: 24,
            fontWeight: "bold",
          }}
        >
          Home Page
        </Text>
        <Button title="Logout" onPress={logOutHandler} />
      </View>
      <View
        style={{
          gap: 10,
          marginTop: 10,
          marginBottom: 30,
          flexDirection: "row",
        }}
      >
        <Button title="Login" onPress={() => router.push("/Login")} />
        <Button title="Sign Up" onPress={() => router.push("/Signup")} />
        <Button
          title="Reset Password"
          onPress={() => router.push("/ResetPassword")}
        />
      </View>
    </SafeAreaView>
  );
};

export default HomeScreen;
