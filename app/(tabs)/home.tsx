// app/(tabs)/home.tsx
import { View, Text, StyleSheet } from "react-native";
import { Button } from "../../components/Button";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

const HomeScreen = () => {
  const router = useRouter();
  const [isLoggedIn, setIsLoggesIn] = useState<boolean>(false);

  useEffect(() => {
    const checkLoginStatus = async () => {
      const isLoggedIn = await AsyncStorage.getItem("isLoggedIn");

      if (isLoggedIn !== "true") setIsLoggesIn(false);
      else setIsLoggesIn(true);
    };
    checkLoginStatus();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.topContainer}>
        <Text style={styles.title}>Home Page</Text>

        <View style={styles.centerContainer}>
          <Text style={styles.subtitle}>Welcome to the home page...!</Text>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "space-between",
    marginVertical: 50,
  },
  topContainer: {
    alignItems: "center",
  },
  centerContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    gap: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
  },
  subtitle: {
    fontSize: 18,
    color: "gray",
  },
});
