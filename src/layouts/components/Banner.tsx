import Carousel from '../../components/Carousel';

const Banner = () => {
    // Hot deal will go hear
    return (
        <div className='w-full rounded-md bg-primary-900  pb-4'>
            <div className='relative -left-4 z-10 inline-block shadow-lg'>
                <h2 className='relative z-10 bg-gradient-to-t from-state-warning to-warning bg-clip-text p-1 text-lg font-black italic text-transparent'>
                    <span className='flash'></span>
                    <span className='ml-6'>HOT DEAL MỖI NGÀY</span>
                </h2>
                <div className='absolute -inset-1 z-0 block -skew-y-3 bg-primary-900 shadow-xl outline-dashed outline-offset-1 outline-side-default'></div>
            </div>
            <Carousel />
        </div>
    );
};

export default Banner;
