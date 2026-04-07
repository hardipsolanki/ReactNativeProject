import AsyncStorage from "@react-native-async-storage/async-storage";
import { Todo } from "../types/todo/todo";


const getTodos = async (): Promise<Todo[]> => {
    try {
        const todos = await AsyncStorage.getItem("todos");
        return todos ? JSON.parse(todos) : [];
    } catch (error) {
        throw error;
    }
}

const addTodo = async (todo: Todo) => {
    try {
        const todos = await getTodos();
        todos.push(todo);
        await AsyncStorage.setItem("todos", JSON.stringify(todos));
    } catch (error) {
        throw error;
    }
}

const deleteTodo = async (id: string) => {
    try {
        const todos = await getTodos();
        const filteredTodos = todos.filter((todo: Todo) => todo.id !== id);
        await AsyncStorage.setItem("todos", JSON.stringify(filteredTodos));
    } catch (error) {
        throw error;
    }
}

const updateTodo = async (updatedTodo: Todo) => {
    try {
        const todos = await getTodos();
        const findIndex = todos.findIndex((todo: Todo) => todo.id === updatedTodo.id);
        console.log(findIndex)
        if (findIndex !== -1) {
            todos.splice(findIndex, 1, updatedTodo);
            await AsyncStorage.setItem("todos", JSON.stringify(todos));
        }
    } catch (error) {
        throw error;
    }
}

export {
    getTodos,
    addTodo,
    deleteTodo,
    updateTodo
}