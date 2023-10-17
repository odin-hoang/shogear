// App.tsx

import React from 'react';
import { Provider } from 'react-redux';
import Counter from './components/Counter';
import store from './store';
const App: React.FC = () => {
  return (
    <Provider store={store}>
      <div className="App">
        <h1 className='text-blue-600'>Redux Example</h1>
        <Counter />
      </div>
    </Provider>
  );
};

export default App;
