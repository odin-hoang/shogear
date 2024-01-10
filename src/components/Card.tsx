import { numberWithCommas } from '../lib/scripts';
import { FaClockRotateLeft } from 'react-icons/fa6';
import { MdLocationPin } from 'react-icons/md';
import { FireIcon } from './Icons';
import DefaultImages from '../assets/images';
interface CardProps {
    id?: number;
    quantity?: number;
    imageUrl: string;
    name: string;
    username: string;
    avatarUrl?: string;
    price: number;
    postedAt?: string;
    zone?: string;
    className?: string;
    draggable?: boolean;
    isUsed?: boolean;
    isSaved?: boolean;
}
const Card = ({
    // id,
    // quantity,
    imageUrl,
    username,
    price,
    name,
    postedAt,
    zone,
    className = '',
    draggable = true,
    isUsed = true,
}: CardProps) => {
    return (
        <div className={` flex flex-col ${className}`}>
            <div className={`relative h-[200px] overflow-hidden ${className}`}>
                <img
                    src={imageUrl}
                    alt=''
                    className='h-full w-full rounded-sm object-cover transition-all duration-500 hover:scale-110'
                    draggable={draggable}
                />
                <div className='absolute bottom-0 left-0 flex w-full items-center'>
                    {isUsed === false ? (
                        <span className='flex flex-1 items-center bg-white/50 backdrop-blur-sm'>
                            <span className='tag-used'>Đã qua sử dụng</span>
                            {/* <span className='tag-time-used grow'>3 tháng</span> */}
                        </span>
                    ) : (
                        <span className='tag-like-new flex items-center gap-2'>
                            <FireIcon />
                            Like new 99%
                        </span>
                    )}
                </div>
            </div>
            <div className='flex flex-col gap-2 rounded-sm bg-white p-2'>
                <p className='line-clamp-2 h-[40px] text-sm font-medium'>{name}</p>
                <h3 className='flex items-center justify-between'>
                    <span className='price '>{numberWithCommas(price)}</span>
                </h3>
                <div className='flex items-center gap-4'>
                    <div className='avatar online h-10 w-10 shrink-0'>
                        <img src={DefaultImages.defaultAvatar} alt='' className=' rounded-full' draggable={draggable} />
                    </div>
                    <div className=' flex flex-col items-baseline justify-start'>
                        <h2>{username}</h2>
                        <div className='flex items-center gap-1 text-xs text-secondary-default'>
                            <span>
                                <FaClockRotateLeft />
                            </span>
                            <span>{postedAt}</span>
                        </div>
                    </div>
                </div>
                <h2 className='flex items-center justify-between pt-2'>
                    <span className='flex items-center text-primary-900'>
                        <MdLocationPin />
                        <span className='text-right text-xs text-secondary-default'>{zone}</span>
                    </span>
                    {/* {isSaved ? (
                        <span className='text-primary-default'>
                            <FaHeart />
                        </span>
                    ) : (
                        <span className=''>
                            <FaRegHeart />
                        </span>
                    )} */}
                </h2>
            </div>
        </div>
    );
};

export default Card;
