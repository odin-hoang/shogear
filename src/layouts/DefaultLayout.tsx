import React from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import NavBar from './components/NavBar';
import { useAppSelector } from '../app/hook';
type LayoutProps = {
    children: React.ReactNode;
};
const DefaultLayout: React.FC<LayoutProps> = ({ children }) => {
    const isBlur = useAppSelector((state) => state.blur.isBlur);
    return (
        <div className='relative'>
            {isBlur && <div className='absolute inset-0 z-[20] h-full w-full bg-black/50'></div>}
            <Header></Header>
            <NavBar></NavBar>
            {/* Page */}
            <div className='bg-bodyBg-default px-6 py-6 '>{children}</div>
            <Footer></Footer>
        </div>
    );
};

export default DefaultLayout;
