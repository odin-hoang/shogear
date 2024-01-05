import DefaultLayout from '../layouts/DefaultLayout';
import CategoryConfig from '../layouts/components/admin-forms/CategoryConfig';
import NewPost from '../layouts/components/new-post/NewPost';
import Cart from '../pages/Cart';
import Checkout from '../pages/Checkout';
import Home from '../pages/Home';
import ProductDetail from '../pages/ProductDetail';
import SearchResult from '../pages/SearchResult';
export const publicRoutes = [
    { path: '/', component: Home, layout: DefaultLayout },
    { path: '/cart', component: Cart, layout: DefaultLayout },
    { path: '/checkout', component: Checkout, layout: DefaultLayout },
    { path: '/products/:name', component: ProductDetail },
    { path: '/search', component: SearchResult },
    { path: '/new/config', component: CategoryConfig },
    { path: '/new/product', component: NewPost },
];
// need to sign in to access routes
export const privateRoutes = [];
