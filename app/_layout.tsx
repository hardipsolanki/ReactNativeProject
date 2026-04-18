import { Stack } from "expo-router";
import { SafeAreaProvider } from "react-native-safe-area-context";
import AppProvider from "../context/AppProvider";
import { ROUTES } from "../constant";

const Layout = () => {
  return (
    <SafeAreaProvider>
      <AppProvider>
        <Stack>
          <Stack.Screen name={ROUTES.TABS} options={{ headerShown: false }} />
          <Stack.Screen
            name={ROUTES.HOME}
            options={{ title: "Home", headerShown: false }}
          />
          <Stack.Screen
            name={ROUTES.UPDATE_TODO}
            options={{ title: "Update Todo", headerShown: false }}
          />
          <Stack.Screen
            name={ROUTES.LOGIN}
            options={{ title: "Login", headerShown: false }}
          />
          <Stack.Screen
            name={ROUTES.SIGNUP}
            options={{ title: "Sign Up", headerShown: false }}
          />
          <Stack.Screen
            name={ROUTES.FORGOT_PASSWORD}
            options={{ title: "Forgot Password", headerShown: false }}
          />
          <Stack.Screen
            name={ROUTES.RESET_PASSWORD}
            options={{ title: "Reset Password", headerShown: false }}
          />
          <Stack.Screen
            name={ROUTES.SingleTodoPage}
            options={{ headerShown: false }}
          />
        </Stack>
      </AppProvider>
    </SafeAreaProvider>
  );
};

export default Layout;
