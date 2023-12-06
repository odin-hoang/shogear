import Banner from '../layouts/components/Banner';
import News from '../layouts/components/News';
import SideBar from '../layouts/components/SideBar';

const Home = () => {
    return (
        <div className='mx-auto  max-w-[1200px] '>
            <div className='mb-6 flex items-center gap-6'>
                <SideBar />
                <Banner />
            </div>
            <News />
        </div>
    );
};

export default Home;
