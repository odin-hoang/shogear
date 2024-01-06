import { PayloadAction, createSlice } from '@reduxjs/toolkit';

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
export const loadCartState = () => {
    try {
        const serialState = localStorage.getItem('cart');
        if (serialState === null) {
            return undefined;
        }
        return JSON.parse(serialState);
    } catch (err) {
        return undefined;
    }
};
export const saveState = (state: any) => {
    try {
        const serialState = JSON.stringify(state);
        localStorage.setItem('cart', serialState);
    } catch (err) {
        console.log(err);
    }
};

const initialState: CartSlice = {
    cartItems: loadCartState()?.cartItems ?? [],
    quantityTotal: loadCartState()?.quantityTotal ?? 0,
    shippingFee: loadCartState()?.shippingFee ?? -1,
};

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addToCart(state, action: PayloadAction<CartItem>) {
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            const { id } = action.payload;
            const existingItem = state.cartItems.find((item) => item.id === id);

            if (existingItem) {
                existingItem.quantity += 1;
            } else {
                state.cartItems.push({ ...action.payload, quantity: 1 });
                state.quantityTotal += 1;
            }
            saveState(state);
        },
        removeFromCart(state, action: PayloadAction<number>) {
            state.cartItems = state.cartItems.filter((item) => item.id !== action.payload);
            state.quantityTotal -= 1;
            saveState(state);
        },
        updateCartItemQuantity: (state, action) => {
            const { index, quantity } = action.payload;
            state.cartItems[index].quantity = quantity;
            saveState(state);
        },
        updateShippingFee(state, action: PayloadAction<number>) {
            state.shippingFee = action.payload;
            saveState(state);
        },
        removeAllItems: (state) => {
            state.cartItems = [];
        },
    },
});

export const { addToCart, removeFromCart, updateCartItemQuantity, updateShippingFee, removeAllItems } =
    cartSlice.actions;
export default cartSlice.reducer;
