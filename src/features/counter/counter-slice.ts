import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface CounterSlice {
    value: number;
}
const initialState: CounterSlice = {
    value: 0,
};

const counterSlice = createSlice({
    name: 'counter',
    initialState,
    reducers: {
        incremented(state) {
            // it's okay to do this because the immer makes it possible under the hood
            state.value++;
        },
        amountAdded(state, action: PayloadAction<number>) {
            state.value += action.payload;
        },
    },
});
export const { incremented, amountAdded } = counterSlice.actions;
export default counterSlice.reducer;
