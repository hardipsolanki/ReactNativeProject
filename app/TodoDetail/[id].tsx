import {
  Alert,
  StyleSheet,
  Switch,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { useLocalSearchParams, useRouter } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { contex, ROUTES } from "../../constant";
import { Button } from "../../components/Button";
import {
  deleteTodo as deleteTodoAsync,
  updateTodo as updateTodoAsync,
} from "../../utils/todo";
import { TodoContext } from "../../context/TodoContext";
import CustomHeader from "../../components/CustomHeader";

const TodoDetail = () => {
  const { id } = useLocalSearchParams();
  const normalizedId = Array.isArray(id) ? id[0] : id;
  const { deleteTodo, todos, updateTodo } = useContext(TodoContext);

  const [todo, setTodo] = useState(todos.find((t) => t.id === normalizedId));
  const [isEnabled, setIsEnabled] = useState(todo?.status === "completed");
  const router = useRouter();

  const toggleSwitch = async () => {
    if (!todo) return;

    const nextStatus: "completed" | "pending" = isEnabled
      ? "pending"
      : "completed";
    const updatedTodo = { ...todo, status: nextStatus };

    setIsEnabled(!isEnabled);
    setTodo(updatedTodo);
    updateTodo(updatedTodo);
    await updateTodoAsync(updatedTodo);
  };

  const deleteTodoHandler = async (id: string) => {
    deleteTodo(id);
    await deleteTodoAsync(id)
      .then(() => {
        console.log("todo deleted successfully");
        Alert.alert("Success", contex.tabs.deleteTodo.deleteTodoMsg);
      })
      .catch((error) => {
        console.log("error while deleting todo: ", error);
      });
    router.back();
  };

  return (
    <>
      <SafeAreaView style={styles.conatiner}>
        <CustomHeader
          title={
            todo?.status === "completed" ? "Complete Task" : "Pending Task"
          }
        />
        <View style={styles.todoConatiner}>
          <Text style={styles.todoTitle}>{todo?.title}</Text>
          <Text style={styles.todoDescription}>{todo?.description}</Text>
        </View>
        <View style={styles.borderTop}></View>
        <View style={styles.todoStausConatiner}>
          <Text style={styles.swithBtnText}>
            {isEnabled ? "Completed" : "Pending"}
          </Text>
          {/* <Switch value={isEnabled} onValueChange={toggleSwitch} /> */}

          <TouchableOpacity
            onPress={toggleSwitch}
            style={[
              styles.toggleBtnContainer,
              { backgroundColor: isEnabled ? "#4CAF50" : "#ccc" },
            ]}
          >
            {/* Text */}
            <Text
              style={[
                styles.toggleText,
                isEnabled
                  ? { position: "relative", right: 10 }
                  : { position: "relative", left: 10 },
              ]}
            >
              {isEnabled ? "ON" : "OFF"}
            </Text>

            {/* Ball */}
            <View
              style={[
                styles.toggleBtn,
                {
                  left: isEnabled
                    ? contex.tabs.updateTodo.TOGGLE_WIDTH -
                      contex.tabs.updateTodo.BALL_SIZE -
                      contex.tabs.updateTodo.PADDING
                    : contex.tabs.updateTodo.PADDING,
                },
              ]}
            />
          </TouchableOpacity>
        </View>
        <View style={styles.actionConatiner}>
          <Button
            onPress={() =>
              router.push({
                pathname: ROUTES.UPDATE_TODO,
                params: { id: todo?.id },
              })
            }
          >
            {contex.tabs.updateTodo.updateButton}
          </Button>
          <Button
            style={{ backgroundColor: "red" }}
            onPress={() => {
              deleteTodoHandler(normalizedId);
            }}
          >
            {contex.tabs.deleteTodo.deleteTodoText}
          </Button>
        </View>
      </SafeAreaView>
    </>
  );
};

export default TodoDetail;

const styles = StyleSheet.create({
  conatiner: {
    flex: 1,
    alignItems: "center",
    padding: 20,
  },
  todoTitle: {
    fontSize: 18,
    fontWeight: "bold",
  },
  todoDescription: {
    fontSize: 14,
    color: "#555",
  },
  todoConatiner: {
    width: "100%",
    padding: 10,
    gap: 10,
    paddingTop: 60,
    marginTop: 30,
    // backgroundColor: "white",
    borderBottomWidth: 0.3,
    borderColor: "#25202013",
  },
  borderTop: {
    borderTopColor: "#f0f0f013",
    borderTopWidth: 1,
  },
  actionConatiner: {
    gap: 20,
    width: "100%",
    marginTop: 20,
  },
  todoStausConatiner: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 30,
    backgroundColor: "white",
    borderRadius: 6,
    paddingHorizontal: 10,
    paddingVertical: 7,
  },
  swithBtnText: {
    fontSize: 18,
    fontWeight: "bold",
  },
  toggleBtnContainer: {
    width: 70,
    height: 30,
    borderRadius: 20,
    justifyContent: "center",
    paddingHorizontal: 4,
  },

  toggleBtn: {
    width: 22,
    height: 22,
    borderRadius: 11,
    backgroundColor: "#fff",
    position: "absolute",
    top: 4,
  },

  toggleText: {
    color: "#fff",
    fontSize: 10,
    fontWeight: "bold",
    alignSelf: "center",
  },
});
