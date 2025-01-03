import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  username: localStorage.getItem("user") || null,
  email: localStorage.getItem("email") || null,
};
const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    login: (state, action) => {
      const {username, email} = action.payload
      state.username = username
      state.email = email
      localStorage.setItem("user", username);
      localStorage.setItem("email", email)
    },
    logout: (state) => {
      state.username = null;
      state.email = null
      localStorage.removeItem("user");
      localStorage.removeItem("email");
    },
  },
});

export const { login, logout } = userSlice.actions;
export default userSlice.reducer;
