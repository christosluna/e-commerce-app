import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { CartItem, CounterState } from '../interface';

// Define the initial state
const initialState: CounterState = {
  value: 0,
  items: []
};

export const counterSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<CartItem>) => {
      const { id } = action.payload;
      const existingItem = state.items.find(item => item.id === id);

      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.items.push({ ...action.payload, quantity: 1 });
        state.value += 1;
      }
      
    },
    incrementQuantity: (state, action: PayloadAction<number>) => {
      const id = action.payload;
      const item = state.items.find(item => item.id === id);
      if (item) {
        item.quantity += 1;
      }
    },
    decrementQuantity: (state, action: PayloadAction<number>) => {
      const id = action.payload;
      const item = state.items.find(item => item.id === id);
      if (item && item.quantity > 1) {
        item.quantity -= 1;
      } else {
        state.items = state.items.filter(item => item.id !== id);
        state.value -= 1; 
      }
    },
    removeFromCart: (state, action: PayloadAction<number>) => {
      const id = action.payload;
      state.items = state.items.filter(item => item.id !== id);
      state.value -= 1; 
    }
  }
});

export const { addToCart, incrementQuantity, decrementQuantity, removeFromCart } = counterSlice.actions;

export default counterSlice.reducer;
