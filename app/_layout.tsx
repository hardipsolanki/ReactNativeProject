import { Stack } from 'expo-router'
import { SafeAreaProvider } from 'react-native-safe-area-context'

const Layout = () => {
    return (
        <SafeAreaProvider>
            <Stack>
                <Stack.Screen name="Index" options={{ title: 'Home', headerShown: false }} />
                <Stack.Screen name="Login" options={{ title: 'Login', headerShown: false }} />
                <Stack.Screen name="Signup" options={{ title: 'Sign Up', headerShown: false }} />
                <Stack.Screen name="ForgotPassword" options={{ title: 'Forgot Password', headerShown: false }} />
                <Stack.Screen name="ResetPassword" options={{ title: 'Reset Password', headerShown: false }} />
            </Stack>
        </SafeAreaProvider>
    )
}

export default Layout;
