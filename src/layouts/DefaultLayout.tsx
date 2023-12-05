import React from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import NavBar from './components/NavBar';
type LayoutProps = {
    children: React.ReactNode;
};
const DefaultLayout: React.FC<LayoutProps> = ({ children }) => {
    return (
        <div className='min-w-[600px]'>
            <Header></Header>
            <NavBar></NavBar>
            {/* Page */}
            <div className='bg-bodyBg-default py-4 '>{children}</div>
            <Footer></Footer>
        </div>
    );
};

export default DefaultLayout;
