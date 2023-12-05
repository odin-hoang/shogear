import Button from '../../components/Button';
import { FaFilter, FaPaperPlane } from 'react-icons/fa';
import { CiBoxList, CiGrid41 } from 'react-icons/ci';
import { Link } from 'react-router-dom';
import { cn } from '../../utils/cn';
import { useState } from 'react';
type NewsProps = {};

const News = ({}: NewsProps) => {
    const data = [
        {
            imageUrl: 'https://picsum.photos/200/300',
            title: 'David Smith',
            price: '120 000',
        },
        {
            imageUrl: 'https://picsum.photos/200/400',
            title: 'Todo Smith',
            price: '120 000',
        },
        {
            imageUrl: 'https://picsum.photos/200/500',
            title: 'Kelvin Smith',
            price: '120 000',
        },
        {
            imageUrl: 'https://picsum.photos/200/250',
            title: 'Kelvin Smith',
            price: '120 000',
        },
        {
            imageUrl: 'https://picsum.photos/200/260',
            title: 'Kelvin Smith',
            price: '120 000',
        },
        {
            imageUrl: 'https://picsum.photos/200/270',
            title: 'Kelvin Smith',
            price: '120 000',
        },
        {
            imageUrl: 'https://picsum.photos/200/280',
            title: 'Kelvin Smith',
            price: '120 000',
        },
        {
            imageUrl: 'https://picsum.photos/200/281',
            title: 'Kelvin Smith',
            price: '120 000',
        },
        {
            imageUrl: 'https://picsum.photos/200/282',
            title: 'Kelvin Smith',
            price: '120 000',
        },
        {
            imageUrl: 'https://picsum.photos/200/283',
            title: 'Kelvin Smith',
            price: '120 000',
        },
        {
            imageUrl: 'https://picsum.photos/200/284',
            title: 'Kelvin Smith',
            price: '120 000',
        },
        {
            imageUrl: 'https://picsum.photos/200/285',
            title: 'Kelvin Smith',
            price: '120 000',
        },
        {
            imageUrl: 'https://picsum.photos/200/286',
            title: 'Kelvin Smith',
            price: '120 000',
        },
        {
            imageUrl: 'https://picsum.photos/200/221',
            title: 'Kelvin Smith',
            price: '120 000',
        },
        {
            imageUrl: 'https://picsum.photos/200/222',
            title: 'Kelvin Smith',
            price: '120 000',
        },
        {
            imageUrl: 'https://picsum.photos/200/223',
            title: 'Kelvin Smith',
            price: '120 000',
        },
        {
            imageUrl: 'https://picsum.photos/200/401',
            title: 'Kelvin Smith',
            price: '120 000',
        },
        {
            imageUrl: 'https://picsum.photos/200/223',
            title: 'Kelvin Smith',
            price: '120 000',
        },
        {
            imageUrl: 'https://picsum.photos/200/401',
            title: 'Kelvin Smith',
            price: '120 000',
        },
        {
            imageUrl: 'https://picsum.photos/200/223',
            title: 'Kelvin Smith',
            price: '120 000',
        },
    ];
    // default layout = grid
    const [layout, setLayout] = useState(false);
    return (
        <div className='min-h-screen  rounded-md bg-white p-4'>
            {/* Title and filterer */}
            <div className='mb-4 flex items-center justify-between'>
                <h1 className='inline-block text-lg font-bold'>
                    <span className='inline-block text-primary-default'>
                        <FaPaperPlane />
                    </span>
                    <span className='ml-2'>Bài đăng mới</span>
                </h1>
                <div className='flex gap-3 '>
                    <span className='flex items-center gap-1 text-primary-900'>
                        <span className=''>
                            <FaFilter />
                        </span>
                        <span>Lọc</span>
                    </span>
                    <Button>Toàn quốc</Button>
                    <Button>Danh mục</Button>
                    <Button price='asc'>Giá</Button>
                    <span className='cursor-pointer text-3xl' onClick={() => setLayout(!layout)}>
                        {layout ? <CiGrid41 /> : <CiBoxList />}
                    </span>
                </div>
            </div>
            {/* layout */}
            {layout ? (
                <div className='flex flex-col gap-2'>
                    {data.map((item, index) => (
                        <div className={cn(' flex gap-4 rounded-sm border p-2')} key={index}>
                            <div className='flex  flex-col'>
                                <Link to={'/'} className='h-[200px] w-[200px]'>
                                    <img src={item.imageUrl} alt='' className='h-full w-full rounded-sm object-cover' />
                                </Link>
                                <div className=' inline-flex items-center gap-4 p-2'>
                                    <img src='https://picsum.photos/200' alt='' className='h-10 w-10 rounded-full' />
                                    <div className='name-job flex flex-col items-baseline justify-start'>
                                        <h2>{item.title}</h2>
                                        <h3>{item.price}</h3>
                                    </div>
                                </div>
                            </div>
                            <div>
                                Lorem ipsum dolor sit amet consectetur, adipisicing elit. Repellendus pariatur illo
                                similique animi laborum omnis blanditiis hic ipsam facilis sunt rem porro nulla saepe
                                consequatur, illum reprehenderit laudantium consequuntur obcaecati?
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <div className='grid grid-cols-2 gap-2 sm:grid-cols-3  md:grid-cols-4 lg:grid-cols-5'>
                    {data.map((item, index) => (
                        <Link to={'/'} className={cn('flex flex-col rounded-sm border p-2')} key={index}>
                            <div className='h-[200px]'>
                                <img src={item.imageUrl} alt='' className='h-full w-full rounded-sm object-cover' />
                            </div>
                            <div className='flex items-center gap-4 bg-white p-2'>
                                <img src='https://picsum.photos/200' alt='' className='h-10 w-10 rounded-full' />
                                <div className='name-job flex flex-col items-baseline justify-start'>
                                    <h2>{item.title}</h2>
                                    <h3>{item.price}</h3>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            )}
        </div>
    );
};

export default News;
