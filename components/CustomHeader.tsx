import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useRouter } from "expo-router";

export const CustomHeader = ({
  title,
  Icon,
}: {
  title: string;
  Icon?: React.ReactElement;
}) => {
  const router = useRouter();
  return (
    <View style={styles.conatiner}>
      {title === "Home" || title === "Profile" || title === "Add Task" ? (
        <View style={styles.homeConatiner}>
          <Text style={styles.titleText}>{title}</Text>
          {Icon}
        </View>
      ) : (
        <View>
          <View>
            <TouchableOpacity
              hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
              style={styles.arrowBtn}
              onPress={() => router.back()}
            >
              <Ionicons name="chevron-back" size={24} color="black" />
            </TouchableOpacity>
          </View>
          <Text style={styles.titleText}>{title}</Text>
        </View>
      )}
    </View>
  );
};

export default CustomHeader;

const styles = StyleSheet.create({
  conatiner: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    height: 80,
    zIndex: 10,
    backgroundColor: "white",
    paddingVertical: 10,
  },
  titleText: {
    textAlign: "center",
    fontSize: 18,
    marginLeft: 15,
    fontWeight: "bold",
  },
  arrowBtn: {
    position: "relative",
    top: 30,
    left: 30,
  },
  homeConatiner: {
    height: "100%",
    marginHorizontal: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingTop: 15,
  },
});
