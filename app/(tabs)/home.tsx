import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
  TextInput,
  Alert,
  Animated, 
} from "react-native";
import React, { useContext, useEffect, useRef, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { contex, ROUTES } from "../../constant";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";
import { Button } from "../../components/Button";
import { TodoContext } from "../../context/TodoContext";
import { deleteTodo as deleteTodoAsync } from "../../utils/todo";
import { color } from "../../theme";
import { InputField } from "../../components/InputField";
import CustomHeader from "../../components/CustomHeader";
import Ionicons from "@expo/vector-icons/Ionicons";

const TodoScreen = () => {
  const router = useRouter();
  const { todos, deleteTodo } = useContext(TodoContext);
  const [filteredTodos, setFilteredTodos] = useState(todos);
  const [searchText, setSearchText] = useState("");
  const [applyFilter, setApplyFilter] = useState(contex.tabs.home.status.all);

  const handleFilterPress = (key: string, index: number) => {
    Animated.sequence([
      Animated.timing(scaleAnims[index], {
        toValue: 0.88,
        duration: 80,
        useNativeDriver: true,
      }),
      Animated.timing(scaleAnims[index], {
        toValue: 1,
        duration: 80,
        useNativeDriver: true,
      }),
    ]).start();
    setApplyFilter(key);
  };

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
    { key: contex.tabs.home.status.all },
    { key: contex.tabs.home.status.completed },
    { key: contex.tabs.home.status.pending },
  ];
  const scaleAnims = useRef(filters.map(() => new Animated.Value(1))).current;

  return (
    <SafeAreaView style={styles.container}>
      <CustomHeader
        Icon={<Ionicons name="notifications" size={24} color="black" />}
        title="Home"
      />
      <View style={styles.list}>
        <FlatList
          data={filteredTodos}
          keyExtractor={(item) => item.id.toString()}
          showsVerticalScrollIndicator={false}
          ListHeaderComponent={
            <View style={styles.stickyHeader}>
              {/* ── Segmented Filter ── */}
              <View style={styles.segmentWrapper}>
                {filters.map((item, index) => {
                  // 👈 ADD 4: index added here 
                  const isActive = applyFilter === item.key;
                  return (
                    <Animated.View
                      key={item.key}
                      style={{
                        flex: 1,
                        transform: [{ scale: scaleAnims[index] }],
                      }}
                    >
                      <TouchableOpacity
                        style={[
                          styles.segmentBtn,
                          isActive && styles.segmentBtnActive,
                        ]}
                        // 👇 ADD 6: changed onPress to handleFilterPress
                        onPress={() => handleFilterPress(item.key, index)}
                        activeOpacity={0.8}
                      >
                        <Text
                          style={[
                            styles.segmentText,
                            isActive && styles.segmentTextActive,
                          ]}
                        >
                          {item.key.charAt(0).toUpperCase() + item.key.slice(1)}
                        </Text>
                      </TouchableOpacity>
                    </Animated.View>
                    // 👆 ADD 5: closing Animated.View
                  );
                })}
              </View>

              {/* ── Search ── */}
              <InputField
                label=""
                placeHolder={contex.tabs.home.searchPlaceholder}
                value={searchText}
                onChange={(text) => setSearchText(text)}
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
      </View>
    </SafeAreaView>
  );
};

export default TodoScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingBottom: 0,
    paddingTop: 20,
    paddingHorizontal: 20,
    backgroundColor: "#f0f0f0",
  },
  stickyHeader: {
    backgroundColor: "#f0f0f0",
    paddingBottom: 10,
    zIndex: 10,
  },
  list: {
    height: "100%",
    paddingTop: 20,
    marginTop: 30,
  },
  headerContentStyle: {
    paddingBottom: 20,
  },
  segmentWrapper: {
    flexDirection: "row",
    backgroundColor: "#E5E5E5",
    borderRadius: 10,
    marginBottom: 12,
  },
  segmentBtn: {
    flex: 1,
    paddingVertical: 8,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  segmentBtnActive: {
    backgroundColor: "#2320df",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.18,
    shadowRadius: 3,
    elevation: 3,
  },
  segmentText: {
    fontSize: 13,
    fontWeight: "600",
    color: "#9E9E9E",
  },
  segmentTextActive: {
    color: "#FFFFFF",
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
