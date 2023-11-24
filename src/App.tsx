// App.tsx
import React from 'react';
import { Provider } from 'react-redux';
import store from './app/store';

import Header from './components/header/header';
import Body from './components/body/body';
import Footer from './components/footer/footer';

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
