import { createSlice } from "@reduxjs/toolkit";

const initialState = { username: localStorage.getItem("user") || null };
const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    login: (state, action) => {
      state.username = action.payload.username;
      localStorage.setItem("user", JSON.stringify(action.payload.username));
    },
    logout: (state) => {
      state.username = null;
      localStorage.removeItem("user");
    },
  },
});

export const { login, logout } = userSlice.actions;
export default userSlice.reducer;
