import { createSlice } from "@reduxjs/toolkit";

// Initial state: Load the cart from localStorage if available
const cartInLocalStorage = localStorage.getItem('cart');
const initialState = {
  cartArray: cartInLocalStorage ? JSON.parse(cartInLocalStorage) : [],
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    // Add book to the cart or increase quantity if it already exists
    add_book: (state, action) => {
      const {newBook, quantity }= action.payload
      const existingBook = state.cartArray.find(book => newBook.id === book.id);

      if (existingBook) {
        existingBook.quantity += 1;
      } else {
        state.cartArray.push({ ...newBook, quantity: quantity });
      }

      localStorage.setItem("cart", JSON.stringify(state.cartArray));
    },

    // Remove a book from the cart
    remove_book: (state, action) => {
      state.cartArray = state.cartArray.filter(book => book.id !== action.payload.id);
      localStorage.setItem("cart", JSON.stringify(state.cartArray));
    },

    // Update book quantity (increase or decrease)
    update_quantity: (state, action) => {
      const { id, quantity } = action.payload;
      const book = state.cartArray.find(book => book.id === id);
      if (book) {
        // Make sure the quantity is always >= 1
        book.quantity = Math.max(1, book.quantity + quantity);
      }
      localStorage.setItem("cart", JSON.stringify(state.cartArray));
    },

    // Clear the entire cart
    clear_cart: (state) => {
      state.cartArray = [];
      localStorage.removeItem('cart');
    },
  },
});

export const { add_book, remove_book, update_quantity, clear_cart } = cartSlice.actions;
export default cartSlice.reducer;
