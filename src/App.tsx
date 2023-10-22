// App.tsx
import React from 'react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import pricetotalSlice from './pricetotal/pricetotal';
import cartSlice from './cart/cart';

import Header from './header/header';
import Body from './body/body';
import Footer from './footer/footer';

const store = configureStore({
   reducer: {
      pricetotal: pricetotalSlice, // Add your reducer to the store
      cart: cartSlice,
   },
});
const App: React.FC = () => {
   return (
      <Provider store={store}>
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
         </div>
      </Provider>
   );
};

export default App;
