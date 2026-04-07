import { StyleSheet, Text, View } from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { contex, ROUTES } from "../constant";
import { InputField } from "./InputField";
import Ionicons from "@expo/vector-icons/Ionicons";
import { Button } from "./Button";
import { useRouter } from "expo-router";
import { TodoContext } from "../context/TodoContext";
import {
  addTodo as addTodoToStorage,
  updateTodo as updateTodoAsync,
} from "../utils/todo";
import { Todo } from "../types/todo/todo";

const TodoForm = ({ id }: { id?: string }) => {
  const [titleRedError, setTitleRedError] = useState("");
  const [decsRedError, setDescrRedError] = useState("");
  const { addTodo } = useContext(TodoContext);
  const router = useRouter();
  const { todos, updateTodo } = useContext(TodoContext);
  const [todo, setTodo] = useState(todos.find((t) => t.id === id));
  const [filedsData, setFieldsData] = useState<{
    title: string;
    description: string;
    status: "pending" | "completed";
  }>({
    title: todo?.title || "",
    description: todo?.description || "",
    status: todo?.status || "pending",
  });

  const validate = () => {
    let isValidate = true;
    if (!filedsData.title.trim()) {
      setTitleRedError(contex.tabs.addTodo.requiredTitleErr);
      isValidate = false;
    }
    if (!filedsData.description.trim()) {
      setDescrRedError(contex.tabs.addTodo.requiredDescErr);
      isValidate = false;
    }
    return isValidate;
  };

  const onSubmit = async () => {
    setTitleRedError("");
    setDescrRedError("");
    const isValidate = validate();

    if (!isValidate) return;

    if (id) {
      if (!todo) {
        return;
      }
      updateTodo({
        ...todo,
        title: filedsData.title || todo.title,
        description: filedsData.description || todo.description,
      });
      await updateTodoAsync({
        ...todo,
        title: filedsData.title || todo.title,
        description: filedsData.description || todo.description,
      })
        .then(() => {
          router.push(ROUTES.HOME);
          console.log("todo update successfully: ", todo);
        })
        .catch((error) => {
          console.log("error while updating todo: ", error);
        });

      console.log("todo update successfully: ", todo);
      return;
    } else {
      try {
        addTodo({
          id: Date.now().toString(),
          title: filedsData.title,
          description: filedsData.description,
          status: filedsData.status,
        });
        await addTodoToStorage({
          id: Date.now().toString(),
          title: filedsData.title,
          description: filedsData.description,
          status: filedsData.status,
        })
          .then(() => {
            console.log("todo added successfully");
          })
          .catch((error) => {
            console.log("error while adding todo: ", error);
          });

        setFieldsData({
          title: "",
          description: "",
          status: "pending",
        });
      } catch (error) {
        console.log("error while adding todo: ", error);
      } finally {
        setTitleRedError("");
        setDescrRedError("");
      }
      router.back();
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.inputFieldsTodoConatiner}>
        <InputField
          label={contex.tabs.addTodo.title}
          placeHolder={contex.tabs.addTodo.titlePlaceholder}
          value={filedsData.title}
          onChange={(value) =>
            setFieldsData((prev) => ({ ...prev, title: value }))
          }
          error={titleRedError}
        />
      </View>
      <View style={styles.inputFieldsTodoConatiner}>
        <InputField
          label={contex.tabs.addTodo.Description}
          placeHolder={contex.tabs.addTodo.descriptionPlaceholder}
          value={filedsData.description}
          onChange={(value) =>
            setFieldsData((prev) => ({ ...prev, description: value }))
          }
          error={decsRedError}
          style={{
            lineHeight: 20,
            height: 100,
            textAlignVertical: "top",
          }}
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
