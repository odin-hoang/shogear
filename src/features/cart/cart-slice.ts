import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface CartItem {
   price: number;
   imageUrl: string | undefined;
   id: number;
   name: string;
   quantity: number;
}

interface CartSlice {
   cartItems: CartItem[];
   quantityTotal: number;
   shippingFee: number;
}

const initialState: CartSlice = {
   cartItems: [],
   quantityTotal: 0,
   shippingFee: -1
}

const cartSlice = createSlice({
   name: 'cart',
   initialState,
   reducers: {
      addToCart(state, action: PayloadAction<CartItem>) {
         // eslint-disable-next-line @typescript-eslint/no-unused-vars
         const { id } = action.payload;
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
         state.quantityTotal -= 1;
      },
      updateCartItemQuantity: (state, action) => {
         const { index, quantity } = action.payload;
         state.cartItems[index].quantity = quantity;
      },
      updateShippingFee(state, action: PayloadAction<number>) {
         state.shippingFee = action.payload;
      }
   }
})

export const { addToCart, removeFromCart, updateCartItemQuantity, updateShippingFee } = cartSlice.actions;
export default cartSlice.reducer;
