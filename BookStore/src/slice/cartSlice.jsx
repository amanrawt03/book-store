import { createSlice } from "@reduxjs/toolkit";

const initialState = { cart: localStorage.getItem("cart") || [] };
const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    add_book: (state, action) => {
      state.cart.push(action.payload);
      localStorage.setItem("cart", JSON.stringify(state.cart));
    },
    remove_book: (state, action) => {
      state.cart = state.cart.filter((item) => item.id !== action.payload.id);
      localStorage.setItem("cart", JSON.stringify(state.cart));
    },
  },
});

export const { add_book, remove_book } = cartSlice.actions;
export default cartSlice.reducer;
