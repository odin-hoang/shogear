// App.tsx

import React from 'react';
import { Provider } from 'react-redux';
import Counter from './components/Counter';
import store from './store';
import Header from './header/header';
import Body from './body/body';
import Footer from './footer/footer';

const App: React.FC = () => {
   return (
      <div>
         <div className='fixed top-0 z-10 w-[100%] bg-red-600'>
            <Header />
         </div>
         <div>
            <Body />
         </div>
         <div>
            <Footer />
         </div>
         {/* <Provider store={store}>
            <div>
               <Counter />
            </div>
         </Provider> */}
      </div>
   );
};

export default App;
