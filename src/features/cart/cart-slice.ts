import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface CartItem {
   id: number;
   name: string;
   quantity: number;
}

interface CartSlice {
   cartItems: CartItem[];
   quantityTotal: number;
}

const initialState: CartSlice = {
   cartItems: [],
   quantityTotal: 0,
}

const cartSlice = createSlice({
   name: 'cart',
   initialState,
   reducers: {
      addToCart(state, action: PayloadAction<CartItem>) {
         // eslint-disable-next-line @typescript-eslint/no-unused-vars
         const { id, name } = action.payload;
         const existingItem = state.cartItems.find(item => item.id === id);

         if (existingItem) {
            existingItem.quantity += 1;
         } else {
            state.cartItems.push({ ...action.payload, quantity: 1 });
            state.quantityTotal += 1;
         }
      },
      removeFromCart(state, action: PayloadAction<number>) {
         state.cartItems = state.cartItems.filter(item => item.id !== action.payload);
      },
   }
})

export const { addToCart, removeFromCart } = cartSlice.actions;
export default cartSlice.reducer;
