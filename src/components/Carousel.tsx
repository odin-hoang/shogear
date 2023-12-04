import React from 'react';
import { FaAlignRight, FaAngleLeft, FaAngleRight } from 'react-icons/fa';
const Carousel = () => {
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
    ];
    return (
        // I will change this width
        <div className='relative mx-10 lg:mx-0 lg:max-w-[calc(1200px-14rem)]'>
            <div className=' grid auto-cols-[calc(100%/2-9px)] grid-flow-col items-center gap-4 overflow-hidden md:auto-cols-[calc(100%/4-12px)] lg:auto-cols-[calc(100%/5)]'>
                {data.map((item, index) => (
                    <ul className='flex flex-col rounded-md bg-white' key={index}>
                        <div className='h-[200px]'>
                            <img src={item.imageUrl} alt='' className='h-full w-full rounded-md object-cover' />
                        </div>
                        <div className='detail flex items-center gap-4 bg-white p-2'>
                            <img src='https://picsum.photos/200' alt='' className='h-10 w-10 rounded-full' />
                            <div className='name-job flex flex-col items-baseline justify-start'>
                                <h2>{item.title}</h2>
                                <h3>{item.price}</h3>
                            </div>
                        </div>
                    </ul>
                ))}
            </div>
            <div className='absolute -right-5 top-[50%] z-10 translate-y-[-50%] rounded-full bg-white p-2 text-2xl text-primary-default shadow-lg'>
                <FaAngleRight />
            </div>
            <div className='absolute -left-5 top-[50%] z-10  translate-y-[-50%] rounded-full bg-white p-2 text-2xl text-primary-default shadow-lg'>
                <FaAngleLeft />
            </div>
        </div>
    );
};

export default Carousel;
