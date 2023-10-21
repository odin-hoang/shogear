// components/Counter.tsx

import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { increment, decrement } from '../actions/counterActions';
import { RootState, AppDispatch } from '../store';


const Counter: React.FC = () => {
  const count = useSelector((state: RootState) => state.counter.value);
  // const dispatch: AppDispatch = useDispatch();
  const dispatch: AppDispatch = useDispatch();

  return (
    <div>
      <h2 className='underline'>Counter: {count}</h2>
      <button onClick={() => dispatch(increment())}>Increment</button>
      <button onClick={() => dispatch(decrement())}>Decrement</button>
    </div>
    
  );
};

export default Counter;
