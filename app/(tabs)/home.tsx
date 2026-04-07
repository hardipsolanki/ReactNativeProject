import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
  TextInput,
  Alert,
} from "react-native";
import React, { useContext, useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { contex } from "../../constant"; // adjust path
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";
import { InputField } from "../../components/InputField";
import { Button } from "../../components/Button";
import { TodoContext } from "../../context/TodoContext";
import { deleteTodo as deleteTodoAsync } from "../../utils/todo";

const TodoScreen = () => {
  const router = useRouter();
  const { todos, deleteTodo } = useContext(TodoContext);

  useEffect(() => {
    const loggedInUser = async () => {
      try {
        const isLoggedIn = await AsyncStorage.getItem("isLoggedIn");
        if (isLoggedIn !== "true") {
          router.replace("/Login");
        }
      } catch (error) {
        console.error("Error fetching logged-in user data:", error);
      }
    };
    loggedInUser();
  }, []);

  const deleteTodoHandler = async (id: string) => {
    deleteTodo(id);
    await deleteTodoAsync(id)
      .then(() => {
        console.log("todo deleted successfully");
        Alert.alert("Success", "Todo deleted successfully");
      })
      .catch((error) => {
        console.log("error while deleting todo: ", error);
      });
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.header}>{contex.tabs.home.heading}</Text>

      <Button style={styles.addBtn} onPress={() => router.push("/addTodo")}>
        + Add Todo
      </Button>

      {/* Todo List */}
      <FlatList
        data={todos}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.todoItem}>
            <Text style={styles.todoText}>{item.text}</Text>

            <View style={styles.actions}>
              <TouchableOpacity
                onPress={() =>
                  router.push({
                    pathname: "/UpdateTodo",
                    params: { id: item.id, text: item.text },
                  })
                }
                style={styles.editBtn}
              >
                <Text style={styles.actionText}>
                  {contex.tabs.home.editIcon}
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => deleteTodoHandler(item.id)}
                style={styles.deleteBtn}
              >
                <Text style={styles.actionText}>
                  {contex.tabs.home.deleteIcon}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      />
    </SafeAreaView>
  );
};

export default TodoScreen;

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "#fff" },

  header: {
    fontSize: 26,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },

  addBtn: {
    backgroundColor: "#007bff",
    padding: 12,
    borderRadius: 8,
    alignItems: "center",
    marginBottom: 15,
  },

  btnText: {
    color: "#fff",
    fontWeight: "bold",
  },

  todoItem: {
    backgroundColor: "#f5f5f5",
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    flexDirection: "row",
    justifyContent: "space-between",
  },

  todoText: {
    fontSize: 16,
    flex: 1,
  },

  actions: {
    flexDirection: "row",
    gap: 10,
  },

  actionText: {
    fontSize: 18,
  },
  editBtn: {
    padding: 6,
    backgroundColor: "#e0f7fa",
    borderRadius: 6,
  },

  deleteBtn: {
    padding: 6,
    backgroundColor: "#ffebee",
    borderRadius: 6,
  },
});
