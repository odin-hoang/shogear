import { configureStore } from '@reduxjs/toolkit';
import counterReducer from '../features/counter/counter-slice';
import blurReducer from '../features/blur/blur-slice';
import cartReducer from '../features/cart/cart-slice'
export const store = configureStore({
    reducer: {
        cart: cartReducer,
        counter: counterReducer,
        blur: blurReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
