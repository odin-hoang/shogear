import React, { useEffect, useRef, useState } from 'react';
import { FaAngleLeft, FaAngleRight } from 'react-icons/fa';
import { cn } from '../lib/utils/cn';
import { Link } from 'react-router-dom';
import Card from './Card';
import apiRequest from '../services/request';
import { PostItem } from '../pages/ProductDetail';
import Loading from './Loading';
import toHyphenString from '../lib/toHyphenString';
const Carousel = () => {
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
    const [isLoading, setIsLoading] = useState(false);
    const [posts, setPosts] = useState<PostItem[]>([]);
    useEffect(() => {
        setIsLoading(true);
        apiRequest.get('/posts').then((response) => {
            const datas: PostItem[] = response.data.results;
            const reviewdPosts = datas.filter((data) => data.review === 1);
            setPosts(reviewdPosts);
            setIsLoading(false);
        });
    }, []);
    return (
        // I will change this width
        <div className='relative px-6'>
            <div
                className={cn(
                    ' grid snap-x snap-mandatory auto-cols-[calc(100%/2-9px)] grid-flow-col items-center gap-4 overflow-hidden scroll-smooth md:auto-cols-[calc(100%/3-12px)] lg:auto-cols-[calc(100%/5-12px)]',
                    cursor.isDragging && ' scroll-auto',
                )}
                onMouseMove={handleMouseMove}
                onMouseDown={handleMouseDown}
                onMouseUp={handleMouseUp}
                ref={carouselRef}
            >
                {isLoading && <Loading />}
                {posts.map((item, index) => (
                    <Link
                        to={`/products/${toHyphenString(item.product.name)}`}
                        state={{ item }}
                        className={cn(
                            'flex snap-start flex-col rounded-sm  bg-white shadow-lg',
                            cursor.isDragging && 'cursor-grabbing select-none snap-align-none ',
                        )}
                        key={index}
                        draggable={false}
                        ref={cardRef}
                    >
                        <Card
                            imageUrl={item.product.attachments[0].file}
                            name={item.product.name}
                            price={item.product.price}
                            username={item.user}
                            postedAt={item.updatedAt}
                            zone={item.zone}
                            draggable={false}
                            isUsed={!!item.product.status}
                            isSaved={index % 2 === 0 ? true : false}
                        />
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
