import DefaultLayout from '../layouts/DefaultLayout';
import Home from '../pages/Home';
export const publicRoutes = [{ path: '/', component: Home, layout: DefaultLayout }];
// need to sign in to access routes
export const privateRoutes = [];
