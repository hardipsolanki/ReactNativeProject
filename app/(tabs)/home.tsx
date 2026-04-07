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
      <FlatList
        data={filteredTodos}
        keyExtractor={(item) => item.id.toString()}
        ListHeaderComponent={
          <View style={styles.stickyHeader}>
            {/* Filters */}
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
                      {item.key.charAt(0).toUpperCase() + item.key.slice(1)}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </View>

            {/* Search */}
            <InputField
              label=""
              placeHolder={contex.tabs.home.searchPlaceholder}
              value={searchText}
              onChange={(text) => setSearchText(text)}
              style={styles.searchInput}
            />
          </View>
        }
        stickyHeaderIndices={[0]}
        contentContainerStyle={styles.headerContentStyle}
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
                style={[
                  styles.statusBadge,
                  item.status === "completed"
                    ? styles.completedBadge
                    : styles.pendingBadge,
                ]}
              >
                <Text
                  style={
                    item.status === "completed"
                      ? styles.completedText
                      : styles.pendingText
                  }
                >
                  {item.status === "completed" ? "Completed" : "Pending"}
                </Text>
              </View>
            </View>
          </TouchableOpacity>
        )}
        ListEmptyComponent={
          <Text style={styles.emptyText}>No Todos Found</Text>
        }
      />
    </SafeAreaView>
  );
};

export default TodoScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#f0f0f0",
  },
  stickyHeader: {
    backgroundColor: "#f0f0f0", // same as screen
    paddingBottom: 10,
    zIndex: 10, // 🔥 prevents overlap
  },

  searchInput: {
    backgroundColor: "white",
    marginTop: 10,
    borderRadius: 8,
  },
  headerContainer: {
    flexDirection: "row",
    gap: 10,
    justifyContent: "space-evenly",
    backgroundColor: "white",
    padding: 10,
    borderRadius: 8,
  },
  headerContentStyle: {
    paddingBottom: 20,
  },
  addBtn: {
    paddingVertical: 7,
    paddingHorizontal: 20,
    borderRadius: 20,
  },

  btnText: {
    fontWeight: "bold",
  },

  todoItem: {
    backgroundColor: "white",
    padding: 15,
    borderRadius: 20,
    marginTop: 15,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  todoText: {
    gap: 6,
    flex: 1,
  },

  todoTitle: {
    fontSize: 16,
    fontWeight: "bold",
  },

  todoDescription: {
    fontSize: 13,
    color: "#555",
  },

  statusBadge: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
  },

  completedBadge: {
    backgroundColor: "#E6F9F0",
    borderWidth: 1,
    borderColor: "#2ECC71",
  },

  pendingBadge: {
    backgroundColor: "#FFE5E5",
    borderWidth: 1,
    borderColor: "#FF4D4D",
  },

  completedText: {
    color: "#2ECC71",
    fontWeight: "600",
  },

  pendingText: {
    color: "#FF4D4D",
    fontWeight: "600",
  },

  emptyText: {
    textAlign: "center",
    marginTop: 20,
    color: "#888",
  },
});
