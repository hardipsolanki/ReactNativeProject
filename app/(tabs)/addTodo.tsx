import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { contex } from "../../constant";
import TodoForm from "../../components/TodoForm";
import CustomHeader from "../../components/CustomHeader";
import Ionicons from "@expo/vector-icons/Ionicons";

const AddTodo = () => {
  return (
    <SafeAreaView style={styles.container}>
      <CustomHeader
        Icon={<Ionicons name="add" size={24} color="black" />}
        title="Add Task"
      />
      <View style={styles.addTodoConatainer}>
        <TodoForm />
      </View>
    </SafeAreaView>
  );
};

export default AddTodo;

const styles = StyleSheet.create({
  container: {
    // justifyContent: "center",
    // alignItems: "center",
    // padding: 20,
  },
  addTodoConatainer: {
    paddingTop: 20,
    marginTop: 30,
  },
});
