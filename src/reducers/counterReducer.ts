// reducers/counterReducer.ts

import { createReducer } from '@reduxjs/toolkit';
import { increment, decrement } from '../actions/counterActions';

interface CounterState {
  count: number;
}

const initialState: CounterState = {
  count: 0,
};

const counterReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(increment, (state) => {
      state.count += 1;
    })
    .addCase(decrement, (state) => {
      state.count -= 1;
    });
});

export default counterReducer;
