import React, { useRef, useState } from 'react';
import { FaAngleLeft, FaAngleRight } from 'react-icons/fa';
import { cn } from '../utils/cn';
import { Link } from 'react-router-dom';
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
        {
            imageUrl: 'https://picsum.photos/200/270',
            title: 'Kelvin Smith',
            price: '120 000',
        },
    ];
    const carouselRef = useRef<HTMLDivElement>(null);
    const cardRef = useRef<HTMLAnchorElement>(null);
    const initialCursorState = {
        isDragging: false,
        startX: 0,
        startScrollLeft: 0,
    };
    const [cursor, setCursor] = useState(initialCursorState);
    function handleMouseMove(e: React.MouseEvent<HTMLDivElement>) {
        // if isDragging is false return from here
        if (!cursor.isDragging) return;
        if (carouselRef.current) {
            carouselRef.current.scrollLeft = cursor.startScrollLeft - (e.pageX - cursor.startX);
        }
    }
    function handleMouseDown(e: React.MouseEvent<HTMLDivElement>) {
        setCursor((state) => ({
            ...state,
            isDragging: true,
            // Records the initial cursor and scroll position of the carousel
            startX: e.pageX,
            startScrollLeft: carouselRef.current?.scrollLeft || 0,
        }));
    }
    function handleMouseUp() {
        setCursor((state) => ({
            ...state,
            isDragging: false,
        }));
    }

    const handleSlide = (side: number) => {
        if (carouselRef.current && cardRef.current) {
            carouselRef.current.scrollLeft += side * cardRef.current?.offsetWidth;
        }
    };
    return (
        // I will change this width
        <div className='relative mx-10 lg:mx-0 lg:max-w-[calc(1200px-14rem)]'>
            <div
                className={cn(
                    ' grid snap-x snap-mandatory auto-cols-[calc(100%/2-9px)] grid-flow-col items-center gap-4 overflow-hidden scroll-smooth md:auto-cols-[calc(100%/4-12px)] lg:auto-cols-[calc(100%/5)]',
                    cursor.isDragging && ' scroll-auto',
                )}
                onMouseMove={handleMouseMove}
                onMouseDown={handleMouseDown}
                onMouseUp={handleMouseUp}
                ref={carouselRef}
            >
                {data.map((item, index) => (
                    <Link
                        to={'/'}
                        className={cn(
                            'flex snap-start flex-col rounded-md bg-white',
                            cursor.isDragging && 'cursor-grabbing select-none snap-align-none ',
                        )}
                        key={index}
                        draggable={false}
                        ref={cardRef}
                    >
                        <div className='h-[200px]'>
                            <img
                                src={item.imageUrl}
                                alt=''
                                className='h-full w-full rounded-md object-cover'
                                draggable={false}
                            />
                        </div>
                        <div className='detail flex  items-center gap-4 bg-white p-2'>
                            <img
                                src='https://picsum.photos/200'
                                alt=''
                                className='h-10 w-10 rounded-full'
                                draggable={false}
                            />
                            <div className='name-job flex flex-col items-baseline justify-start'>
                                <h2>{item.title}</h2>
                                <h3>{item.price}</h3>
                            </div>
                        </div>
                    </Link>
                ))}
            </div>
            <div
                className='absolute -right-5 top-[50%] z-10 translate-y-[-50%] cursor-pointer rounded-full bg-white p-2 text-2xl text-primary-default shadow-lg active:text-primary-900'
                onClick={() => handleSlide(1)}
            >
                <FaAngleRight />
            </div>
            <div
                className='absolute -left-5 top-[50%] z-10  translate-y-[-50%] cursor-pointer rounded-full bg-white p-2 text-2xl text-primary-default shadow-lg active:text-primary-900'
                onClick={() => handleSlide(-1)}
            >
                <FaAngleLeft />
            </div>
        </div>
    );
};

export default Carousel;
