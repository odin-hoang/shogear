import { LeftOutlined, RightOutlined } from '@ant-design/icons';
import { useEffect, useState, useRef, MutableRefObject } from 'react';
import { cn } from '../utils/cn';
const MAX_WIDTH_IMAGE = 805;
const ImageSlider = () => {
    const banners = [
        {
            id: 1,
            alt: 'Vui lễ lớn giảm nhiều hơn',
            imageUrl:
                'https://cdn.nhathuoclongchau.com.vn/unsafe/1080x0/filters:quality(90)/https://cms-prod.s3-sgn09.fptcloud.com/Banner_Web_PC_1610x492_ff4a86471c.png',
            imageUrlMobile:
                'https://cdn.nhathuoclongchau.com.vn/unsafe/1080x0/filters:quality(90)/https://cms-prod.s3-sgn09.fptcloud.com/Banner_Web_Mobi640x320_e80f26f0ce.png',
        },
        {
            imageUrl:
                'https://cdn.nhathuoclongchau.com.vn/unsafe/1080x0/filters:quality(90)/https://cms-prod.s3-sgn09.fptcloud.com/GOI_VC_CHO_TRE_01_d4efa44cc7.png',
            imageUrlMobile:
                'https://cdn.nhathuoclongchau.com.vn/unsafe/1080x0/filters:quality(90)/https://cms-prod.s3-sgn09.fptcloud.com/640x320_47f588ca90.jpg',
            title: 'Tiêm chủng vắc xin',
            id: 2,
        },
        {
            imageUrl:
                'https://cdn.nhathuoclongchau.com.vn/unsafe/1080x0/filters:quality(90)/https://cms-prod.s3-sgn09.fptcloud.com/Banner_Destop_1_3b1aa4359f.jpg',
            title: 'Brauer',
            imageUrlMobile:
                'https://cdn.nhathuoclongchau.com.vn/unsafe/1080x0/filters:quality(90)/https://cms-prod.s3-sgn09.fptcloud.com/M1_375x188_9f4cf0b250.png',
            id: 3,
        },
        {
            imageUrl:
                'https://cdn.nhathuoclongchau.com.vn/unsafe/1080x0/filters:quality(90)/https://cms-prod.s3-sgn09.fptcloud.com/Banner_Desk_805x246_ff59ae67b5.jpg',
            title: 'Vi chất dinh dưỡng từ Anh quốc',
            imageUrlMobile:
                'https://cdn.nhathuoclongchau.com.vn/unsafe/1080x0/filters:quality(90)/https://cms-prod.s3-sgn09.fptcloud.com/Banner_Mobile_a947a6bbf0.jpg',
            id: 4,
        },
        {
            imageUrl:
                'https://cdn.nhathuoclongchau.com.vn/unsafe/1080x0/filters:quality(90)/https://cms-prod.s3-sgn09.fptcloud.com/Banner_Web_PC_1610x492_ca44e10973.png',
            title: 'Tiêu hoá khoẻ dạ dày',
            imageUrlMobile:
                'https://cdn.nhathuoclongchau.com.vn/unsafe/1080x0/filters:quality(90)/https://cms-prod.s3-sgn09.fptcloud.com/Banner_Web_Mobi_640x320_b409a3d39c.png',
            id: 5,
        },
    ];
    const sliderRef: MutableRefObject<HTMLDivElement | null> = useRef(null);
    const [active, setActive] = useState(0);
    useEffect(() => {
        const intervalID = setInterval(() => {
            setActive((prev) => {
                const next = prev === banners.length - 1 ? 0 : prev + 1;
                if (sliderRef.current && next > 0) sliderRef.current.scrollLeft += MAX_WIDTH_IMAGE;
                if (sliderRef.current && next === 0) sliderRef.current.scrollLeft = 0;
                return next;
            });
        }, 3000);
        return () => clearInterval(intervalID);
    }, [active]);
    const handleNext = () => {
        setActive((prev) => {
            const next = (prev + 1) % banners.length;
            if (sliderRef.current) sliderRef.current.scrollLeft = next * MAX_WIDTH_IMAGE;
            return next;
        });
    };
    const handleBack = () => {
        setActive((prev) => {
            const next = prev === 0 ? banners.length - 1 : prev - 1;
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
            <div className='relative h-[calc(100vw*188/375)] md:h-[246px] md:w-[805px]'>
                <div
                    ref={sliderRef}
                    className=' flex h-full w-full snap-x snap-mandatory overflow-auto scroll-smooth rounded-none  md:rounded-xl'
                >
                    {banners.map((banner, index) => (
                        <picture className=' grow snap-start object-fill'>
                            <source srcSet={banner.imageUrl} media='(min-width: 768px)' />
                            <img
                                id={'banner' + index}
                                src={banner.imageUrlMobile}
                                alt={banner.title}
                                key={banner.id}
                                className={cn(
                                    'h-full  max-w-none transition-all duration-500 md:w-[805px] md:object-cover',
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
                        {banners.map((_, index) => (
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
