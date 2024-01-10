import { LeftOutlined, RightOutlined } from '@ant-design/icons';
import React, { useEffect, useState, useRef, MutableRefObject } from 'react';
import { cn } from '../lib/utils/cn';
// const MAX_WIDTH_IMAGE = 805;
const MAX_WIDTH_IMAGE = 453;
export interface Images {
    file: string;
}
interface ImageGalleryProps {
    images: Images[];
}
const ImageSlider: React.FC<ImageGalleryProps> = ({ images }) => {
    const sliderRef: MutableRefObject<HTMLDivElement | null> = useRef(null);
    const [active, setActive] = useState(0);
    useEffect(() => {
        const intervalID = setInterval(() => {
            setActive((prev) => {
                const next = prev === images.length - 1 ? 0 : prev + 1;
                if (sliderRef.current && next > 0) sliderRef.current.scrollLeft += MAX_WIDTH_IMAGE;
                if (sliderRef.current && next === 0) sliderRef.current.scrollLeft = 0;
                return next;
            });
        }, 10000);
        return () => clearInterval(intervalID);
    }, [active]);
    const handleNext = () => {
        setActive((prev) => {
            const next = (prev + 1) % images.length;
            if (sliderRef.current) sliderRef.current.scrollLeft = next * MAX_WIDTH_IMAGE;
            return next;
        });
    };
    const handleBack = () => {
        setActive((prev) => {
            const next = prev === 0 ? images.length - 1 : prev - 1;
            if (sliderRef.current) sliderRef.current.scrollLeft += (next - prev) * MAX_WIDTH_IMAGE;
            return next;
        });
    };
    const handleChoose = (index: number) => {
        if (sliderRef.current) {
            const offset = (index - active) * MAX_WIDTH_IMAGE;
            sliderRef.current.scrollLeft += offset;
        }
        setActive(index);
    };

    return (
        <div>
            <div className='relative h-[calc(100vw*188/375)] md:h-[246px] md:w-[453px] lg:h-[453px]'>
                <div
                    ref={sliderRef}
                    className=' flex h-full w-full snap-x snap-mandatory overflow-hidden scroll-smooth rounded-none  md:rounded-sm'
                >
                    {images.map((banner, index) => (
                        <picture className=' grow snap-start bg-inputBg-default object-contain' key={index}>
                            <source srcSet={banner.file} media='(min-width: 768px)' />
                            <img
                                id={'banner' + index}
                                src={banner.file}
                                key={index}
                                className={cn(
                                    'h-full  max-w-none backdrop-blur transition-all duration-500 md:w-[453px] md:object-contain',
                                )}
                            />
                        </picture>
                    ))}

                    <LeftOutlined
                        className='absolute left-[10px] top-[50%] z-10 hidden -translate-y-[50%] rounded-[50%] bg-slate-700/50 p-[6px] text-[20px] text-white md:block'
                        onClick={handleBack}
                    />
                    <RightOutlined
                        className='absolute right-[10px] top-[50%] z-10 hidden -translate-y-[50%] rounded-[50%] bg-slate-700/50 p-[6px] text-[20px] text-white md:block'
                        onClick={handleNext}
                    />
                    <div className='absolute -bottom-6 left-[50%] z-10 flex -translate-x-[50%] items-center justify-center gap-2 md:bottom-2 '>
                        {images.map((_, index) => (
                            <span
                                className={cn('h-4 w-4 cursor-pointer rounded-[50%] bg-zinc-300 md:h-2 md:w-2', {
                                    'rounded-lg bg-zinc-400 md:w-4': active === index,
                                })}
                                key={index}
                                onClick={() => handleChoose(index)}
                            ></span>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ImageSlider;
