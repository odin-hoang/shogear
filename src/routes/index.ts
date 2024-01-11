import AdminLayout from '../layouts/AdminLayout';
import DefaultLayout from '../layouts/DefaultLayout';
import UserProfile from '../layouts/components/UserProfile';
import CategoryConfig from '../layouts/components/admin-forms/CategoryConfig';
import AdminPage from '../layouts/components/admin/AdminPage';
import NewPost from '../layouts/components/new-post/NewPost';
import OrderCheck from '../layouts/components/order-results/OrderCheck';
import ResultOrder from '../layouts/components/order-results/ResultOrder';
import SellerOrder from '../layouts/components/seller/SellerOrder';
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
    { path: '/user/order', component: OrderCheck },
    { path: '/order/result/:paymentId', component: ResultOrder },
    { path: '/user/profile', component: UserProfile },
    { path: '/seller/order', component: SellerOrder },
    { path: '/admin', component: AdminPage, layout: AdminLayout },
];
// need to sign in to access routes
export const privateRoutes = [];
