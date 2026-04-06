import { StyleSheet, Text, View } from "react-native";
import React, { useContext, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { InputField } from "../../components/InputField";
import { Button } from "../../components/Button";
import { contex } from "../../utils/constant";
import { useRouter } from "expo-router";
import Ionicons from "@expo/vector-icons/Ionicons";
import { addTodo as addTodoToStorage, getTodos } from "../../utils/todo";
import { TodoContext } from "../../context/TodoContext";

const AddTodo = () => {
  const [todo, setTodo] = useState("");
  const [error, setError] = useState("");
  const { addTodo } = useContext(TodoContext);
  const router = useRouter();

  const addTodoHandler = async () => {
    if (!todo) {
      setError(contex.tabs.addTodo.requiredErr);
      return;
    }

    try {
        await addTodoToStorage({ id: Date.now().toString(), text: todo });
        addTodo({ id: Date.now().toString(), text: todo });

      setTodo("");
    } catch (error) {
      console.log("error while adding todo: ", error);
    } finally {
      setError("");
    }
    router.back();
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.header}>{contex.tabs.addTodo.heading}</Text>

      <View style={styles.inputFieldsTodoConatiner}>
        <InputField
          label={contex.tabs.addTodo.inputLabel}
          placeHolder={contex.tabs.addTodo.inputPlaceholder}
          value={todo}
          onChange={setTodo}
          icon={
            <Ionicons
              name="pencil"
              size={20}
              color={"#2926268c"}
              style={{ marginRight: 8 }}
            />
          }
          error={error}
        />
      </View>
      <View style={styles.button}>
        <Button onPress={addTodoHandler}>
          {contex.tabs.addTodo.addButton}
        </Button>
      </View>
    </SafeAreaView>
  );
};

export default AddTodo;

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
  inputFieldsTodoConatiner: {
    width: "100%",
    marginTop: 20,
  },

  button: {
    marginTop: 20,
  },
});
