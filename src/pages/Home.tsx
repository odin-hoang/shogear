import Banner from '../layouts/components/Banner';
import News from '../layouts/components/News';
// import SideBar from '../layouts/components/SideBar';

const Home = () => {
    return (
        <div className='bg-bodyBg-default px-6 py-6 '>
            <div className='mx-auto  max-w-[1200px] '>
                <div className='mb-6 flex items-center  gap-6'>
                    {/* <SideBar /> */}
                    <Banner />
                </div>
                <News />
            </div>
        </div>
    );
};

export default Home;
