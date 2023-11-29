import React from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
type LayoutProps = {
    children: React.ReactNode;
};
const DefaultLayout: React.FC<LayoutProps> = ({ children }) => {
    return (
        <div>
            <Header></Header>
            {/* Page */}
            <div>{children}</div>
            <Footer></Footer>
        </div>
    );
};

export default DefaultLayout;
