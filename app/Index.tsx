import { Button, Text, View } from "react-native"
import { useRouter } from 'expo-router'
import { SafeAreaView } from "react-native-safe-area-context"

const HomeScreen = () => {
    const router = useRouter()
    return (
        <SafeAreaView  style={{
            flex: 1,
            alignItems: 'center',
            justifyContent: 'space-between',
            marginVertical: 50
        }}>
            <Text
                style={{
                    fontSize: 24,
                    fontWeight: "bold",
                }}
            >Home Page</Text>
            <View
                style={{
                    gap: 10,
                    marginTop: 10,
                    marginBottom: 30,
                    flexDirection: "row"
                }}
            >
                <Button
                    title="Login"
                    onPress={() => router.push('/Login')}
                />
                <Button
                    title="Sign Up"
                    onPress={() => router.push('/Signup')}
                />
                <Button
                    title="Reset Password"
                    onPress={() => router.push('/ResetPassword')}
                />
            </View>
        </SafeAreaView>
    )
}

export default HomeScreen