import { Image, StyleSheet, Text, View } from "react-native";
import React, { useContext } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { UserContext } from "../../context/UserContext";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";
import { Button } from "../../components/Button";

const Profile = () => {
  const { user } = useContext(UserContext);
  const router = useRouter();

  async function logOutHandler() {
    await AsyncStorage.setItem("isLoggedIn", "false");
    router.push("/Login");
  }

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.profileText}>Profile</Text>
      <View style={styles.userDetailsContainer}>
        <View style={styles.userImageContainer}>
          <Image
            style={styles.userAvatar}
            source={require("../../assets/userAvatar.jpg")}
          />
        </View>
        <View style={styles.userInfoContainer}>
          <Text style={styles.userName}>{user?.fullName}</Text>
          <Text style={styles.userEmail}>{user?.email}</Text>
          <Text style={styles.userBio}>
            Passionate developer exploring React Native.
          </Text>
        </View>

        <Button onPress={logOutHandler} style={styles.logOutButton}>
          Log Out
        </Button>
      </View>
    </SafeAreaView>
  );
};

export default Profile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    marginVertical: 50,
    backgroundColor: "#f5f5f5",
  },
  profileText: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 20,
  },
  userDetailsContainer: {
    marginTop: 20,
    backgroundColor: "white",
    borderRadius: 15,
    padding: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5,
    width: "90%",
    alignItems: "center",
  },
  userImageContainer: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: 20,
    borderWidth: 3,
    borderColor: "#007bff",
    overflow: "hidden",
  },
  userAvatar: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
  userInfoContainer: {
    alignItems: "center",
  },
  userName: {
    fontSize: 22,
    fontWeight: "600",
    color: "#333",
    marginBottom: 5,
  },
  userEmail: {
    fontSize: 16,
    color: "#666",
    marginBottom: 10,
  },
  userBio: {
    fontSize: 14,
    color: "#888",
    textAlign: "center",
    lineHeight: 20,
  },
  logOutButton: {
    marginTop: 20,
    backgroundColor: "#ff4d4d",
  }
});
