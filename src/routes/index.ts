import DefaultLayout from '../layouts/DefaultLayout';
import Cart from '../pages/Cart';
import Home from '../pages/Home';
export const publicRoutes = [
    { path: '/', component: Home, layout: DefaultLayout },
    { path: '/cart', component: Cart, layout: DefaultLayout },
];
// need to sign in to access routes
export const privateRoutes = [];
