import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { axiosClient } from "../../utils/axios/axiosClient";
import { TodoState } from "../../utils/types/todoType";
import { setLoading } from "./appConfigSlice";

// Define the appConfigSlice object using the createSlice function

export const getCreateTodoList = createAsyncThunk(
  "/api/v1/todo/create",
  async (
    { title, description }: { title: string; description: string },
    thunkAPI
  ) => {
    try {
      thunkAPI.dispatch(setLoading(true));

      const todoData = await axiosClient.post("/todo/create", {
        title,
        description,
      });

      return todoData.data.result;
    } catch (error) {
      console.log(error);
    } finally {
      thunkAPI.dispatch(setLoading(false));
    }
  }
);

export const getAllTodo = createAsyncThunk(
  "/api/v1/todo/all",
  async (_, thunkAPI) => {
    try {
      thunkAPI.dispatch(setLoading(true));
      const todoData = await axiosClient.get("/todo/all");

      return todoData.data.result;
    } catch (error) {
      console.log(error);
    } finally {
      thunkAPI.dispatch(setLoading(false));
    }
  }
);

export const getUpdateTodoStatus = createAsyncThunk(
  "/api/v1/todo/progress",
  async ({ todoId }: { todoId: string }, thunkAPI) => {
    try {
      thunkAPI.dispatch(setLoading(true));

      const todoData = await axiosClient.post("/todo/progress", { todoId });
      return todoData.data.result;
    } catch (error) {
      console.log(error);
    } finally {
      thunkAPI.dispatch(setLoading(false));
    }
  }
);

export const getUpdateTodo = createAsyncThunk(
  "/api/v1/todo/update",
  async (
    {
      todoId,
      title,
      description,
    }: { todoId: string; title: string; description: string },
    thunkAPI
  ) => {
    try {
      thunkAPI.dispatch(setLoading(true));

      const todoData = await axiosClient.put("/todo/update", {
        todoId,
        title,
        description,
      });
      return todoData.data.result;
    } catch (error) {
      console.log(error);
    } finally {
      thunkAPI.dispatch(setLoading(false));
    }
  }
);

export const getRemoveTodo = createAsyncThunk(
  "/api/v1/todo/remove",
  async ({ todoId }: { todoId: string }, thunkAPI) => {
    try {
      thunkAPI.dispatch(setLoading(true));

      const todoData = await axiosClient.post("/todo/remove", { todoId });
      return todoData.data.result;
    } catch (error) {
      console.log(error);
    } finally {
      thunkAPI.dispatch(setLoading(false));
    }
  }
);

const todos: TodoState[] = [];

const todoConfigSlice = createSlice({
  name: "todoConfig",
  initialState: {
    todos,
  },
  reducers: {
    // ...
  },

  extraReducers: (builder) => {
    builder
      .addCase(getCreateTodoList.fulfilled, (state, action) => {
        const newTodo = action.payload;
        state.todos.push(newTodo);
      })
      .addCase(getAllTodo.fulfilled, (state, action) => {
        state.todos = action.payload;
      })
      .addCase(getUpdateTodoStatus.fulfilled, (state, action) => {
        const id = action.payload._id;
        const index = state.todos.findIndex((todo) => todo._id == id);
        state.todos[index].isCompleted = !state.todos[index].isCompleted;
      })
      .addCase(getRemoveTodo.fulfilled, (state, action) => {
        state.todos = action.payload.newTodo;
      })
      .addCase(getUpdateTodo.fulfilled, (state, action) => {
        const id = action.payload._id;
        const index = state.todos.findIndex((elem) => elem._id == id);
        state.todos[index] = action.payload;
      });
  },
});

// Export the appConfigSlice object
export default todoConfigSlice.reducer;
