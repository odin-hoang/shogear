import Banner from '../layouts/components/Banner';
import SideBar from '../layouts/components/SideBar';

const Home = () => {
    return (
        <div className='mx-auto flex max-w-[1200px] '>
            <div className='flex items-center gap-6'>
                <SideBar />
                <Banner />
            </div>
        </div>
    );
};

export default Home;
