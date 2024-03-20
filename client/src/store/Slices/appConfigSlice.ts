import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { axiosClient } from "../../utils/axios/axiosClient";
import { KEY_ACCESS_TOKEN, setItem } from "../../utils/localStorage";

// Define the appConfigSlice object using the createSlice function

export const getUserDetail = createAsyncThunk(
  "/api/v1/auth/me",
  async (_, thunkAPI) => {
    try {
      // Call the API and return a promise with
      thunkAPI.dispatch(setLoading(true));
      const userData = await axiosClient.get("/auth/me");
      console.log(userData);
      return userData.data;
    } catch (error) {
      console.log(error);
    } finally {
      thunkAPI.dispatch(setLoading(false));
    }
  }
);

export const getLoggedOut = createAsyncThunk(
  "/api/v1/auth/logout",
  async (_, thunkAPI) => {
    try {
      thunkAPI.dispatch(setLoading(true));
      const userData = await axiosClient.get("/auth/logout");
      console.log("Loggout", userData);

      return userData.data;
    } catch (error) {
      console.log(error);
    } finally {
      thunkAPI.dispatch(setLoading(false));
    }
  }
);

export const getLoggedIn = createAsyncThunk(
  "/api/v1/auth/login",
  async (
    { email, password }: { email: string; password: string },
    thunkAPI
  ) => {
    try {
      thunkAPI.dispatch(setLoading(true));
      const response = await axiosClient.post("/auth/login", {
        email,
        password,
      });
      console.log(response);

      return response.data;
    } catch (error) {
      console.log(error);
    } finally {
      thunkAPI.dispatch(setLoading(false));
    }
  }
);

export const getSignupUser = createAsyncThunk(
  "/api/v1/auth/register",
  async (
    {
      name,
      email,
      password,
    }: {
      name: string;
      email: string;
      password: string;
    },
    thunkAPI
  ) => {
    try {
      thunkAPI.dispatch(setLoading(true));
      const response = await axiosClient.post("/auth/register", {
        email,
        password,
        name,
      });

      console.log(response);

      return response.data;
    } catch (error) {
      console.log(error);
    } finally {
      thunkAPI.dispatch(setLoading(false));
    }
  }
);

const appConfigSlice = createSlice({
  name: "appConfig",
  initialState: {
    isLoading: false,
    user: {},
    isAuthenticated: false,
  },
  reducers: {
    setLoading: (state, action) => {
      state.isLoading = action.payload;
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(getUserDetail.fulfilled, (state, action) => {
        if (action.payload.statusCode == 200) {
          state.isAuthenticated = true;
          state.user = action.payload.result.user;
        }
      })
      .addCase(getLoggedOut.fulfilled, (state, action) => {
        if (action.payload.statusCode == 200) {
          state.isAuthenticated = false;
          state.user = {};
        }
      })
      .addCase(getSignupUser.fulfilled, (state, action) => {
        if (action.payload.statusCode == 200) {
          state.isAuthenticated = true;
          state.user = action.payload.result.user;
        }
      })
      .addCase(getLoggedIn.fulfilled, (state, action) => {
        if (action.payload.statusCode == 200) {
          state.isAuthenticated = true;
          state.user = action.payload.result.user;
        }
      });
  },
});

// Export the appConfigSlice object
export default appConfigSlice.reducer;
export const { setLoading } = appConfigSlice.actions;
