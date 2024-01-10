import React from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import { useAppSelector } from '../app/hook';
type LayoutProps = {
    children: React.ReactNode;
};
const DefaultLayout: React.FC<LayoutProps> = ({ children }) => {
    const isBlur = useAppSelector((state) => state.blur.isBlur);
    return (
        <div className='relative'>
            {isBlur && (
                <div className='absolute inset-0 z-[20] h-full w-full bg-black/50'>
                    <span className='loading loading-infinity loading-lg'></span>
                </div>
            )}
            <Header></Header>
            {/* <NavBar></NavBar> */}
            {/* Page */}
            <div>{children}</div>
            <Footer></Footer>
        </div>
    );
};

export default DefaultLayout;
