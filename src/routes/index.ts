import DefaultLayout from '../layouts/DefaultLayout';
import Cart from '../pages/Cart';
import Home from '../pages/Home';
import ProductDetail from '../pages/ProductDetail';
export const publicRoutes = [
    { path: '/', component: Home, layout: DefaultLayout },
    { path: '/cart', component: Cart, layout: DefaultLayout },
    { path: '/products/:name', component: ProductDetail },
];
// need to sign in to access routes
export const privateRoutes = [];