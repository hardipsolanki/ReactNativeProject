import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { useLocalSearchParams } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import TodoForm from "../components/TodoForm";
import { contex } from "../constant";
import CustomHeader from "../components/CustomHeader";

const updateTodo = () => {
  const { id } = useLocalSearchParams();
  const normalizedId = Array.isArray(id) ? id[0] : id;
  if (!normalizedId) return;

  return (
    <SafeAreaView style={styles.container}>
      <CustomHeader title="Update Todo" />
      <View style={styles.updateTodoContainer}>
        <TodoForm id={normalizedId} />
      </View>
    </SafeAreaView>
  );
};

export default updateTodo;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    padding: 20,
  },

  header: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  updateTodoContainer: {
    width: "100%",
    paddingTop: 20,
    marginTop: 30,
  },
});
