import { createSlice } from '@reduxjs/toolkit';

interface BlurSlice {
    isBlur: boolean;
}
const initialState: BlurSlice = {
    isBlur: false,
};

const blurSlice = createSlice({
    name: 'blur',
    initialState,
    reducers: {
        active(state) {
            state.isBlur = true;
        },
        inactive(state) {
            state.isBlur = false;
        },
    },
});
export const { active, inactive } = blurSlice.actions;
export default blurSlice.reducer;
