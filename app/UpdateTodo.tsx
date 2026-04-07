import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { useLocalSearchParams } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import TodoForm from "../components/TodoForm";
import { contex } from "../constant";

const updateTodo = () => {
  const { id, text } = useLocalSearchParams();
  console.log("id as a paranms: ", id);
  const normalizedId = Array.isArray(id) ? id[0] : id;
  const normalizedText = Array.isArray(text) ? text[0] : text;
  if (!normalizedId || !normalizedText) return;

  console.log("id", normalizedId);
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.header}>{contex.tabs.updateTodo.heading}</Text>
      <TodoForm id={normalizedId} text={normalizedText} />
    </SafeAreaView>
  );
};

export default updateTodo;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },

  header: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
});
