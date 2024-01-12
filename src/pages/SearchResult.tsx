import Button from '../components/Button';
import { FaCaretDown, FaFilter, FaSortAmountUpAlt, FaSortAmountDownAlt } from 'react-icons/fa';
import { Link, useLocation, useSearchParams } from 'react-router-dom';
import { cn } from '../lib/utils/cn';
import { useEffect, useState } from 'react';

import toHyphenString from '../lib/toHyphenString';
import Card from '../components/Card';
import HeadlessTippy from '../components/HeadlessTippy';
import { TbBrandProducthunt, TbBuildingCommunity } from 'react-icons/tb';
import { FaRankingStar } from 'react-icons/fa6';
import { PostItem } from './ProductDetail';
import Loading from '../components/Loading';
import ReactPaginate from 'react-paginate';
import { PostResponse, SearchPost } from '../services/postService';
import ImageForm from '../components/ImageForm';
import { useAppDispatch } from '../app/hook';
import { active, inactive } from '../features/blur/blur-slice';
type InitialFilterer = {
    byZone?: string | null;
    byProductTag: string[];
    byPrice?: 'asc' | 'desc';
};
const SearchResult = () => {
    const [searchParams] = useSearchParams();
    const location = useLocation();
    const isSearchByImage = location?.state?.image;
    const q = searchParams.get('q');
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
    const [posts, setPosts] = useState<PostItem[]>([]);
    const [filterPost, setFilterPost] = useState<PostItem[]>([]);
    const dispatch = useAppDispatch();
    useEffect(() => {
        setIsLoading(true);
        dispatch(active());
        setFilterPost([]);
        SearchPost(q, 1).then((response) => {
            const res = response as PostResponse;
            const datas: PostItem[] = res.posts;
            const totalPage = Math.ceil(res.count / 10);
            setPagination({ totalPage });
            setPosts(datas);
            setFilterPost(datas);
            setIsLoading(false);
            dispatch(inactive());
        });
    }, [q]);
    useEffect(() => setFilterPost(posts), [posts]);
    const zoneTags = ['TP. Hồ Chí Minh', 'Đà Nẵng', 'Cao Bằng', 'Hà Nội', 'Long An', 'Kiên Giang'];

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
    }, [clearFilter]);

    const [isLoading, setIsLoading] = useState(false);
    const [pagnination, setPagination] = useState({
        totalPage: 0,
    });
    const handlePageClick = (e: any) => {
        setIsLoading(true);
        setFilterPost([]);
        SearchPost(q, e.selected + 1).then((response) => {
            const res = response as PostResponse;
            const datas: PostItem[] = res.posts;
            const reviewdPosts = datas.filter((post) => post.review === 1);
            const totalPage = Math.ceil(res.count / 10);
            setPagination({ totalPage });

            setPosts(reviewdPosts);
            setFilterPost(reviewdPosts);
            setIsLoading(false);
        });
    };

    return (
        <div className='bg-bodyBg-default px-6 py-6 '>
            <div className='mx-auto  max-w-[1200px] '>
                <div className=' rounded-md bg-white p-4'>
                    <div className='mb-4 flex items-center justify-between'>
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
                        </div>
                        <h1 className=' inline-block text-left text-lg lg:w-1/2'>
                            <span className='inline-block text-primary-default'>
                                <FaRankingStar />
                            </span>
                            <span className='ml-2 '>
                                Tìm kiếm theo:{' '}
                                <span className='ml-2 line-clamp-1  font-bold text-title-default'>{q}</span>
                                {isSearchByImage && <ImageForm setPosts={setPosts} setIsLoading={setIsLoading} />}
                            </span>
                        </h1>
                    </div>
                    <div className='grid grid-cols-2 gap-4 sm:grid-cols-3  lg:grid-cols-5'>
                        {isLoading && <Loading />}
                        {filterPost.length === 0 && !isLoading ? (
                            <div className='text-gray-400'> Không tìm thấy kết quả phù hợp.</div>
                        ) : (
                            filterPost.map((item, index) => (
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
                                        className='w-[200px] '
                                        // onClick={() => handleAddCart({ ...item, quantity: 1 })}
                                    />
                                </Link>
                            ))
                        )}
                    </div>
                    <ReactPaginate
                        breakLabel='...'
                        nextLabel='Tiếp'
                        onPageChange={handlePageClick}
                        pageRangeDisplayed={5}
                        pageCount={pagnination.totalPage}
                        previousLabel='Trước'
                        renderOnZeroPageCount={null}
                        pageClassName='w-[200px'
                        pageLinkClassName=' rounded-sm  hover:bg-primary-default hover:text-white px-2 py-1 border'
                        previousClassName=' rounded-sm  hover:bg-primary-default hover:text-white  '
                        previousLinkClassName=' rounded-sm  hover:bg-primary-default hover:text-white px-2 py-1 border'
                        nextClassName=' rounded-sm  hover:bg-primary-default hover:text-white '
                        nextLinkClassName=' rounded-sm  hover:bg-primary-default hover:text-white px-2 py-1 border'
                        breakClassName=' rounded-sm  hover:bg-primary-default hover:text-white px-2 py-1 '
                        breakLinkClassName=' rounded-sm  hover:bg-primary-default hover:text-white px-2 py-1 '
                        containerClassName='flex justify-center items-center gap-2 mt-4'
                        activeClassName=''
                        activeLinkClassName='text-white bg-primary-default'
                        disabledLinkClassName='border-gray-200 text-gray-300 cursor:not-allowed  select-none hover:!text-gray-300 hover:bg-transparent cursor-not-allowed'
                        disabledClassName='hover:!text-gray-300 select-none hover:bg-transparent'
                    />
                </div>
            </div>
        </div>
    );
};

export default SearchResult;
