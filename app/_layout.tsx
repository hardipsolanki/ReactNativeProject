import { Stack } from "expo-router";
import { SafeAreaProvider } from "react-native-safe-area-context";
import AppProvider from "../context/AppProvider";

const Layout = () => {
  return (
    <SafeAreaProvider>
      <AppProvider>
        <Stack>
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen
            name="Index"
            options={{ title: "Home", headerShown: false }}
          />
          <Stack.Screen
            name="UpdateTodo"
            options={{ title: "Update Todo", headerShown: false }}
          />
          <Stack.Screen
            name="Login"
            options={{ title: "Login", headerShown: false }}
          />
          <Stack.Screen
            name="Signup"
            options={{ title: "Sign Up", headerShown: false }}
          />
          <Stack.Screen
            name="ForgotPassword"
            options={{ title: "Forgot Password", headerShown: false }}
          />
          <Stack.Screen
            name="ResetPassword"
            options={{ title: "Reset Password", headerShown: false }}
          />
        </Stack>
      </AppProvider>
    </SafeAreaProvider>
  );
};

export default Layout;
