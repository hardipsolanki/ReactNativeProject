import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
  TextInput,
  Alert,
} from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { contex, ROUTES } from "../../constant"; // adjust path
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";
import { Button } from "../../components/Button";
import { TodoContext } from "../../context/TodoContext";
import { deleteTodo as deleteTodoAsync } from "../../utils/todo";
import { color } from "../../theme";
import { InputField } from "../../components/InputField";
const TodoScreen = () => {
  const router = useRouter();
  const { todos, deleteTodo } = useContext(TodoContext);
  const [filteredTodos, setFilteredTodos] = useState(todos);
  const [searchText, setSearchText] = useState("");
  const [applyFilter, setApplyFilter] = useState(contex.tabs.home.status.all);
  useEffect(() => {
    let filtered = todos;
    if (applyFilter !== "all") {
      filtered = filtered.filter((t) => t.status === applyFilter);
    }

    if (searchText.trim()) {
      filtered = filtered.filter((t) =>
        t.title.toLowerCase().includes(searchText.toLowerCase()),
      );
    }

    setFilteredTodos(filtered);
  }, [applyFilter, todos, searchText]);

  useEffect(() => {
    const loggedInUser = async () => {
      try {
        const isLoggedIn = await AsyncStorage.getItem("isLoggedIn");
        if (isLoggedIn !== "true") {
          router.replace(ROUTES.LOGIN);
        }
      } catch (error) {
        console.error("Error fetching logged-in user data:", error);
      }
    };
    loggedInUser();
  }, []);

  const filters = [
    {
      key: contex.tabs.home.status.all,
      style: color.home.filterTodoTextColor.all,
    },
    {
      key: contex.tabs.home.status.completed,
      style: color.home.filterTodoTextColor.completed,
    },
    {
      key: contex.tabs.home.status.pending,
      style: color.home.filterTodoTextColor.pending,
    },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.headerContainer}>
        {filters.map((item) => {
          const isActive = applyFilter === item.key;
          return (
            <TouchableOpacity
              key={item.key}
              style={[
                styles.addBtn,
                {
                  backgroundColor: isActive
                    ? item.style.backgroundColor
                    : "#e9e8e8",
                },
              ]}
              onPress={() => setApplyFilter(item.key)}
            >
              <Text
                style={[
                  styles.btnText,
                  {
                    color: isActive ? item.style.color : "#0000004d",
                  },
                ]}
              >
                {item.key}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
      <View>
        <InputField
          label=""
          placeHolder={contex.tabs.home.searchPlaceholder}
          value={searchText}
          onChange={(text) => setSearchText(text)}
          style={{ backgroundColor: "white" }}
        />
      </View>
      <FlatList
        data={filteredTodos}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => router.push(`/TodoDetail/${item.id}`)}
          >
            <View style={styles.todoItem}>
              <View style={styles.todoText}>
                <Text style={styles.todoTitle}>{item.title}</Text>
                <Text style={styles.todoDescription}>{item.description}</Text>
              </View>

              <View
                style={
                  item.status === "completed"
                    ? styles.todoStatsBtn
                    : styles.todoPendingBtn
                }
              >
                <Text
                  style={[
                    item.status === "completed"
                      ? styles.statusBtnText
                      : styles.statusPendingBtnText,
                  ]}
                >
                  {item.status === "completed" ? "Completed" : "Pending"}
                </Text>
              </View>
            </View>
          </TouchableOpacity>
        )}
      />
    </SafeAreaView>
  );
};

export default TodoScreen;

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "#f0f0f0" },
  headerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "white",
    padding: 10,
    borderRadius: 8,
  },
  todoItem: {
    backgroundColor: "white",
    padding: 15,
    borderRadius: 20,
    marginBottom: 20,
    marginTop: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  statusPendingBtnText: {
    color: "#FF4D4D", // red for pending
    fontWeight: "600",
  },
  todoPendingBtn: {
    backgroundColor: "#FFE5E5", // light red/pink background
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 4,
    justifyContent: "center",
    alignItems: "center",
  },
  todoText: {
    gap: 6,
  },
  todoTitle: {
    fontSize: 18,
    fontWeight: "bold",
  },
  todoDescription: {
    fontSize: 14,
    color: "#555",
  },
  todoStatsBtn: {
    flexDirection: "row",
    gap: 15,
    alignItems: "center",
    padding: 6,
    borderRadius: 4,
  },
  statusBtnText: {
    color: "white",
  },

  header: {
    fontSize: 26,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },

  addBtn: {
    padding: 7,
    paddingHorizontal: 30,
    borderRadius: 8,
    alignItems: "center",
  },

  btnText: {
    color: "#fff",
    fontWeight: "bold",
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
