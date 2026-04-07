import { StyleSheet, Text, View } from "react-native";
import React, { useContext, useState } from "react";
import { contex } from "../constant";
import { InputField } from "./InputField";
import Ionicons from "@expo/vector-icons/Ionicons";
import { Button } from "./Button";
import { useRouter } from "expo-router";
import { TodoContext } from "../context/TodoContext";
import {
  addTodo as addTodoToStorage,
  updateTodo as updateTodoAsync,
} from "../utils/todo";

const TodoForm = ({ id, text }: { id?: string; text?: string }) => {
  const [todo, setTodo] = useState(text || "");
  const [error, setError] = useState("");
  const { addTodo } = useContext(TodoContext);
  const router = useRouter();
  const { todos, updateTodo } = useContext(TodoContext);

  const onSubmit = async () => {
    if (!todo) {
      setError(contex.tabs.addTodo.requiredErr);
      return;
    }

    if (id) {
      const existingTodo = todos.find((t) => t.id === id);
      if (!existingTodo) {
        setError(contex.tabs.updateTodo.notFoundErr);
        return;
      }
      updateTodo({ ...existingTodo, text: todo || existingTodo.text });
      await updateTodoAsync({
        ...existingTodo,
        text: todo || existingTodo.text,
      })
        .then(() => {
          router.back();
          console.log("todo update successfully: ", existingTodo);
        })
        .catch((error) => {
          console.log("error while updating todo: ", error);
        });

      console.log("todo update successfully: ", existingTodo);
      return;
    } else {
      try {
        addTodo({ id: Date.now().toString(), text: todo });
        await addTodoToStorage({ id: Date.now().toString(), text: todo })
          .then(() => {
            console.log("todo added successfully");
          })
          .catch((error) => {
            console.log("error while adding todo: ", error);
          });

        setTodo("");
      } catch (error) {
        console.log("error while adding todo: ", error);
      } finally {
        setError("");
      }
      router.back();
    }
  };

  return (
    <View style={styles.container}>
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
        <Button onPress={onSubmit}>
          {id
            ? contex.tabs.updateTodo.updateButton
            : contex.tabs.addTodo.addButton}
        </Button>
      </View>
    </View>
  );
};

export default TodoForm;

const styles = StyleSheet.create({
  container: {
    width: "100%",
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
