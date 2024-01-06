import DefaultLayout from './layouts/DefaultLayout';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { publicRoutes } from './routes';
import React from 'react';
import AuthProvider from './utils/authContext';
const App = () => {
    return (
        <Router>
            <div className='App'>
                <AuthProvider>
                    <Routes>
                        {publicRoutes.map((route, index) => {
                            let Layout = DefaultLayout;
                            if (route.layout === null) {
                                Layout = React.Fragment;
                            } else if (route.layout) {
                                Layout = route.layout;
                            }
                            const Page = route.component;
                            return (
                                <Route
                                    key={index}
                                    path={route.path}
                                    element={
                                        <Layout>
                                            <Page />
                                        </Layout>
                                    }
                                />
                            );
                        })}
                    </Routes>
                </AuthProvider>
            </div>
            <ToastContainer />
        </Router>
    );
};

export default App;
