// cartSlice.ts
import { createSlice } from '@reduxjs/toolkit';

interface CartState {
   quantity: number;
}

const initialState: CartState = {
   quantity: 0,
};

const cartSlice = createSlice({
   name: 'cart',
   initialState,
   reducers: {
      updateQuantity: (state, actions) => {
         state.quantity += actions.payload;
      },
   },
});

export const { updateQuantity } = cartSlice.actions;
export default cartSlice.reducer;
