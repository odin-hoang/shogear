import { configureStore } from '@reduxjs/toolkit';
import priceTotalSlice from '../features/priceTotal/priceTotalSlice';
import cartSlice from '../features/cart/cartSlice';
const store = configureStore({
   reducer: {
      pricetotal: priceTotalSlice, // Add your reducer to the store
      cart: cartSlice,
   },
});
export default store;

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
