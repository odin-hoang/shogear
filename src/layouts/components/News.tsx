import Button from '../../components/Button';
import {
    FaAngleDoubleDown,
    FaCaretDown,
    FaFilter,
    FaPaperPlane,
    FaSortAmountDownAlt,
    FaSortAmountUpAlt,
} from 'react-icons/fa';
import { CiBoxList, CiGrid41 } from 'react-icons/ci';
import { Link } from 'react-router-dom';
import { cn } from '../../lib/utils/cn';
import { useEffect, useState } from 'react';

import toHyphenString from '../../lib/toHyphenString';
import Card from '../../components/Card';
import HeadlessTippy from '../../components/HeadlessTippy';
import { TbBrandProducthunt, TbBuildingCommunity } from 'react-icons/tb';
import apiRequest from '../../services/request';
import axios from 'axios';
import { PostItem } from '../../pages/ProductDetail';
import Loading from '../../components/Loading';
type NewsProps = object;
type InitialFilterer = {
    byZone?: string | null;
    byProductTag: string[];
    byPrice?: 'asc' | 'desc';
};
// eslint-disable-next-line no-empty-pattern
const News = ({}: NewsProps) => {
    const productTags = [
        'Laptop',
        'Laptop Gaming',
        'Ổ cứng, RAM, Thẻ nhớ',
        'Apple',
        'Màn hình',
        'Bàn phím',
        'Tai nghe - Loa',
        'Phụ kiện',
        'Chuột + Lót chuột',
    ];

    const [urls, setUrls] = useState('');
    const [posts, setPosts] = useState<PostItem[]>([]);
    const [filterPost, setFilterPost] = useState<PostItem[]>([]);
    useEffect(() => {
        setIsLoading(true);
        apiRequest.get('/posts').then((response) => {
            const datas: PostItem[] = response.data.results;
            const reviewdPosts = datas.filter((data) => data.review === 1);
            setPosts(reviewdPosts);
            setFilterPost(reviewdPosts);
            setUrls(response.data.next);
            setIsLoading(false);
        });
    }, []);
    const handleViewMore = () => {
        if (!urls) return;
        setIsLoadingViewMore(true);
        axios.get(urls).then((response) => {
            const datas: PostItem[] = response.data.results;
            const reviewdPosts = datas.filter((data) => data.review === 1);
            setPosts((prev) => {
                const newPosts = [...prev, ...reviewdPosts];
                return newPosts;
            });
            setFilterPost((prev) => {
                const newPosts = [...prev, ...reviewdPosts];
                return newPosts;
            });
            setUrls(response.data.next);
            setIsLoadingViewMore(false);
        });
    };

    console.log('re-render');
    const zoneTags = [
        'TP. Hồ Chí Minh',
        'Đà Nẵng',
        'Cao Bằng',
        'Hà Nội',
        'Long An',
        'Kiên Giang',
        'Cần Thơ',
        'Hải Phòng',
    ];
    // default layout = grid
    const [layout, setLayout] = useState(false);

    const [filterer, setFilterer] = useState<InitialFilterer>({
        byZone: null,
        byProductTag: [],
        byPrice: 'asc',
    });

    function handleFilter(e: React.MouseEvent<HTMLButtonElement, MouseEvent>, filter: 'byZone' | 'byProductTag') {
        const payloadParser = e.target as HTMLElement;
        const payload = payloadParser.innerHTML;
        if (filter === 'byZone') {
            setFilterer((prev) => (prev.byZone !== payload ? { ...prev, byZone: payload } : { ...prev, byZone: null }));
        }
        if (filter === 'byProductTag') {
            if (filterer.byProductTag.includes(payload)) {
                setFilterer((prev) => ({
                    ...prev,
                    byProductTag: [...prev.byProductTag.filter((tag) => tag !== payload)],
                }));
            } else {
                setFilterer((prev) => ({ ...prev, byProductTag: [...prev.byProductTag, payload] }));
            }
        }
    }
    function handlePrice() {
        if (filterer.byPrice === 'asc') {
            setFilterer((prev) => ({ ...prev, byPrice: 'desc' }));
            const data = filterPost.sort((a, b) => b.product.price - a.product.price);
            setFilterPost(data);
        } else if (filterer.byPrice === 'desc') {
            setFilterer((prev) => ({ ...prev, byPrice: 'asc' }));
            const data = filterPost.sort((a, b) => a.product.price - b.product.price);
            setFilterPost(data);
        }
    }

    const handleApplyFilter = () => {
        let data = posts.filter((post) => {
            const isZoneMatch = filterer.byZone ? post.zone === filterer.byZone : true;
            const isProductTagMatch =
                filterer.byProductTag.length > 0 ? filterer.byProductTag.includes(post.product.category) : true;
            return isZoneMatch && isProductTagMatch;
        });
        if (filterer.byPrice === 'asc') {
            data.sort((a, b) => a.product.price - b.product.price);
        } else if (filterer.byPrice === 'desc') {
            data.sort((a, b) => b.product.price - a.product.price);
        }
        setFilterPost(data);
    };
    const [clearFilter, setClearFilter] = useState(false);
    const handleDeleteFilter = (type: 'byZone' | 'byProductTag') => {
        if (type === 'byZone') {
            setFilterer((prev) => ({ ...prev, byZone: null }));
        } else if (type === 'byProductTag') {
            setFilterer((prev) => ({ ...prev, byProductTag: [] }));
        }
        setClearFilter(!clearFilter);
    };
    useEffect(() => {
        handleApplyFilter();
    }, [posts, clearFilter]);

    const [isLoading, setIsLoading] = useState(false);
    const [isLoadingViewMore, setIsLoadingViewMore] = useState(false);
    return (
        <div className='  rounded-md bg-white p-4'>
            {/* username and filterer */}
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
                    <HeadlessTippy
                        content={
                            <div className='w-96'>
                                <div className='icon-text'>
                                    <TbBuildingCommunity /> Tìm kiếm theo khu vực
                                </div>
                                <div className='my-4 flex flex-wrap gap-2'>
                                    {zoneTags.map((zone, index) => (
                                        <Button
                                            variant={'basic'}
                                            onClick={(e) => handleFilter(e, 'byZone')}
                                            key={index}
                                            className={cn(zone === filterer.byZone && 'active-button')}
                                        >
                                            {zone}
                                        </Button>
                                    ))}
                                </div>
                                <div className='flex items-center justify-end gap-2 '>
                                    <Button
                                        variant={'fill'}
                                        className='w-1/2 justify-center shadow-custom'
                                        onClick={handleApplyFilter}
                                    >
                                        Áp dụng
                                    </Button>
                                    <Button
                                        variant={'outline'}
                                        className='w-1/2 justify-center '
                                        onClick={() => handleDeleteFilter('byZone')}
                                    >
                                        Xoá lọc
                                    </Button>
                                </div>
                            </div>
                        }
                    >
                        <Button>
                            Toàn quốc <FaCaretDown />
                        </Button>
                    </HeadlessTippy>
                    {/* product list */}
                    <HeadlessTippy
                        content={
                            <div className='w-96'>
                                <div className='icon-text'>
                                    <TbBrandProducthunt /> Tìm kiếm theo danh mục sản phẩm
                                </div>
                                <div className='my-4 flex flex-wrap gap-2'>
                                    {productTags.map((productTag) => (
                                        <Button
                                            variant={'basic'}
                                            onClick={(e) => handleFilter(e, 'byProductTag')}
                                            key={productTag}
                                            className={cn(
                                                filterer.byProductTag.includes(productTag) && 'active-button',
                                            )}
                                        >
                                            {productTag}
                                        </Button>
                                    ))}
                                </div>
                                <div className='flex items-center justify-end gap-2 '>
                                    <Button
                                        variant={'fill'}
                                        className='w-1/2 justify-center shadow-custom'
                                        onClick={handleApplyFilter}
                                    >
                                        Áp dụng
                                    </Button>
                                    <Button
                                        variant={'outline'}
                                        className='w-1/2 justify-center '
                                        onClick={() => handleDeleteFilter('byProductTag')}
                                    >
                                        Xoá lọc
                                    </Button>
                                </div>
                            </div>
                        }
                    >
                        <Button>
                            Danh mục <FaCaretDown />
                        </Button>
                    </HeadlessTippy>
                    <Button onClick={handlePrice}>
                        Giá {filterer.byPrice === 'asc' ? <FaSortAmountUpAlt /> : <FaSortAmountDownAlt />}
                    </Button>
                    <span className='cursor-pointer text-3xl' onClick={() => setLayout(!layout)}>
                        {layout ? <CiGrid41 /> : <CiBoxList />}
                    </span>
                </div>
            </div>

            {/* layout */}
            {layout ? (
                // List
                <div className='flex flex-col gap-2'>
                    {isLoading && <Loading />}
                    {filterPost.length === 0 && (
                        <div className='text-center text-gray-400'>Không có kết quả phù hợp</div>
                    )}
                    {filterPost.map((item, index) => (
                        <Link
                            to={`/products/${toHyphenString(item.product.name)}`}
                            state={{ item }}
                            className={cn(' flex gap-4 rounded-sm border p-2')}
                            key={index}
                        >
                            <Card
                                id={item.id}
                                name={item.product.name}
                                imageUrl={item.product.attachments[0].file}
                                price={item.product.price}
                                username={item.user}
                                postedAt={item.updatedAt}
                                zone={item.zone}
                                isUsed={!!item.product.status}
                                className='w-[200px]'
                            />
                            <div>
                                {item.description}
                                <table className='table mt-5'>
                                    <tbody>
                                        {item.product.fieldValues.map(
                                            (field, index) =>
                                                index < 5 && (
                                                    <tr key={index}>
                                                        <td className='font-bold'>{field.tag}</td>
                                                        <td>{field.value}</td>
                                                    </tr>
                                                ),
                                        )}
                                    </tbody>
                                </table>
                            </div>
                        </Link>
                    ))}
                </div>
            ) : (
                // Grid
                <div className='grid grid-cols-2 gap-4 sm:grid-cols-3  lg:grid-cols-5'>
                    {isLoading && <Loading />}
                    {filterPost.length === 0 && !isLoading && (
                        <div className='text-center text-gray-400'>Không có kết quả phù hợp</div>
                    )}
                    {filterPost.map((item, index) => (
                        <Link
                            to={`/products/${toHyphenString(item.product.name)}`}
                            state={{ item }}
                            className={cn('flex flex-col rounded-sm border')}
                            key={index}
                            preventScrollReset={false}
                        >
                            <Card
                                id={item.id}
                                name={item.product.name}
                                imageUrl={item.product.attachments[0].file}
                                price={item.product.price}
                                username={item.user}
                                postedAt={item.updatedAt}
                                zone={item.zone}
                                isUsed={!!item.product.status}
                                // onClick={() => handleAddCart({ ...item, quantity: 1 })}
                            />
                        </Link>
                    ))}
                </div>
            )}

            {urls && (
                <div
                    className='mt-2 flex cursor-pointer flex-col items-center p-2 text-center font-bold'
                    onClick={handleViewMore}
                >
                    {isLoadingViewMore && <div className='loading loading-bars loading-lg'></div>}
                    Xem thêm{' '}
                    <span>
                        <FaAngleDoubleDown />
                    </span>
                </div>
            )}
        </div>
    );
};

export default News;
