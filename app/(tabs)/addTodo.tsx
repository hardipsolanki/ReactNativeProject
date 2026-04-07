import { StyleSheet, Text } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { contex } from "../../constant";
import TodoForm from "../../components/TodoForm";

const AddTodo = () => {
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.header}>{contex.tabs.addTodo.heading}</Text>
      <TodoForm />
    </SafeAreaView>
  );
};

export default AddTodo;

const styles = StyleSheet.create({
  container: {
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
