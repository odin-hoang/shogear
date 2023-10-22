// cartSlice.ts

import { createSlice } from '@reduxjs/toolkit';

interface PriceState {
   quantity: number;
   pricePerProduct: number;
   total: number;
}

const initialState: PriceState = {
   quantity: 1,
   pricePerProduct: 26490000,
   total: 26490000
};

const pricetotalSlice = createSlice({
   name: 'pricetotal',
   initialState,
   reducers: {
      increaseQuantity: (state) => {
         state.quantity += 1;
         state.total = state.quantity * state.pricePerProduct;
      },
      decreaseQuantity: (state) => {
         state.quantity = state.quantity > 1 ? state.quantity - 1 : state.quantity;
         state.total = state.quantity * state.pricePerProduct;
      },
   },
});

export const { increaseQuantity, decreaseQuantity } = pricetotalSlice.actions;
export default pricetotalSlice.reducer;
