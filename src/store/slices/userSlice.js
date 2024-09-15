import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  getUser,
  loginUser,
  registerUser,
  resetPassword,
} from "../../services/userService";

export const registerNewUser = createAsyncThunk(
  "user/registerNewUser",
  async (userData, { rejectWithValue }) => {
    try {
      const response = await registerUser(userData);
      return response;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const loginExistingUser = createAsyncThunk(
  "user/loginExistingUser",
  async (loginData, { rejectWithValue }) => {
    try {
      const response = await loginUser(loginData);
      return response;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const resetUserPassword = createAsyncThunk(
  "user/resetUserPassword",
  async (userId, { rejectWithValue }) => {
    try {
      const response = await resetPassword(userId);
      return response;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const getUserDetails = createAsyncThunk(
  "user/getUserDetails",
  async (userId, { rejectWithValue }) => {
    try {
      const response = await getUser(userId);
      return response;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const initialState = {
  user: null,
  token: null,
  status: "idle",
  error: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.status = "succeeded";
    },
    logoutUser: (state) => {
      state.user = null;
      state.token = null;
      state.status = "idle";
      state.error = null;
      localStorage.removeItem("token");
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerNewUser.pending, (state) => {
        state.status = "loading";
      })
      .addCase(registerNewUser.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.user = action.payload;
      })
      .addCase(registerNewUser.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      .addCase(loginExistingUser.pending, (state) => {
        state.status = "loading";
      })
      .addCase(loginExistingUser.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.user = action.payload;
      })
      .addCase(loginExistingUser.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      .addCase(resetUserPassword.pending, (state) => {
        state.status = "loading";
      })
      .addCase(resetUserPassword.fulfilled, (state, action) => {
        state.status = "succeeded";
      })
      .addCase(resetUserPassword.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export const { setUser, logoutUser } = userSlice.actions;

export default userSlice.reducer;
