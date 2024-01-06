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
type NewsProps = object;
type InitialFilterer = {
    byZone?: string | null;
    byProductTag: string[];
    byPrice?: 'asc' | 'desc';
};
export type Post = {
    id: number;
    name: string;
    imageUrl: string;
    price: number;
    description: string;
    username: string;
    postedAt: string;
    zone: string;
    isUsed?: boolean;
    category: string;
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
    const [posts, setPosts] = useState<Post[]>([]);
    const [filterPost, setFilterPost] = useState<Post[]>([]);
    useEffect(() => {
        apiRequest.get('/posts').then((response) => {
            const datas: Post[] = [];
            for (const post of response.data.results) {
                const data: Post = {
                    id: post.product.id,
                    imageUrl: post.attachments.length
                        ? post.attachments[0].file
                        : 'https://product.hstatic.net/200000722513/product/km086w_facd6092154b4d769a04f1859a0c4b8e_medium.png',
                    description: post.description,
                    username: post.user,
                    price: post.product.price,
                    postedAt: post.updatedAt,
                    zone: post.zone,
                    name: post.product.name,
                    category: post.product.category,
                };
                datas.push(data);
            }
            setPosts((prev) => {
                const newPosts = [...prev, ...datas];
                return newPosts.filter((post, index, self) => index === self.findIndex((p) => p.id === post.id));
            });
            console.log({ data: response.data });
            setUrls(response.data.next);
        });
    }, []);
    const handleViewMore = () => {
        if (!urls) return;
        console.log(urls);
        axios.get(urls).then((response) => {
            const datas: Post[] = [];
            for (const post of response.data.results) {
                const data: Post = {
                    id: post.product.id,
                    imageUrl: post.attachments.length
                        ? post.attachments[0].file
                        : 'https://product.hstatic.net/200000722513/product/km086w_facd6092154b4d769a04f1859a0c4b8e_medium.png',
                    description: post.description,
                    username: post.user,
                    price: post.product.price,
                    postedAt: post.updatedAt,
                    zone: post.zone,
                    name: post.product.name,
                    category: post.product.category,
                };
                datas.push(data);
            }
            setPosts((prev) => {
                const newPosts = [...prev, ...datas];
                return newPosts.filter((post, index, self) => index === self.findIndex((p) => p.id === post.id));
            });

            setUrls(response.data.next);
        });
    };

    const zoneTags = ['TP. Hồ Chí Minh', 'Đà Nẵng', 'Cao Bằng', 'Hà Nội', 'Long An', 'Kiên Giang'];
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
        } else if (filterer.byPrice === 'desc') {
            setFilterer((prev) => ({ ...prev, byPrice: 'asc' }));
        }
    }
    const handleApplyFilter = () => {
        const data = posts.filter((post) => post.zone === filterer.byZone);
        setFilterPost(data);
        console.log({ filter: filterPost });
        console.log('zo');
    };
    const handleDeleteFilter = (type: 'byZone' | 'byProductTag') => {
        if (type === 'byZone') {
            setFilterer((prev) => ({ ...prev, byZone: null }));
            setFilterPost(posts);
        }
        if (type === 'byProductTag') setFilterer((prev) => ({ ...prev, byProductTag: [] }));
    };
    useEffect(() => {
        setFilterPost(posts);
    }, [posts]);
    console.log(filterPost);
    return (
        <div className='min-h-screen  rounded-md bg-white p-4'>
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
                        <div></div>
                        {/* <Button>
                            Danh mục <FaCaretDown />
                        </Button> */}
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
                    {filterPost.map((item, index) => (
                        <div className={cn(' flex gap-4 rounded-sm border p-2')} key={index}>
                            <Card
                                id={item.id}
                                name={item.name}
                                imageUrl={item.imageUrl}
                                price={item.price}
                                username={item.username}
                                postedAt={item.postedAt}
                                zone={item.zone}
                                isUsed={item.isUsed}
                                className='w-[200px]'
                            />
                            <div>
                                Lorem ipsum dolor sit amet consectetur, adipisicing elit. Repellendus pariatur illo
                                similique animi laborum omnis blanditiis hic ipsam facilis sunt rem porro nulla saepe
                                consequatur, illum reprehenderit laudantium consequuntur obcaecati?
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                // Grid
                <div className='grid grid-cols-2 gap-4 sm:grid-cols-3  lg:grid-cols-5'>
                    {filterPost.map((item, index) => (
                        <Link
                            to={`/products/${toHyphenString(item.name)}`}
                            state={{ item }}
                            className={cn('flex flex-col rounded-sm border')}
                            key={index}
                            preventScrollReset={false}
                        >
                            <Card
                                id={item.id}
                                name={item.name}
                                imageUrl={item.imageUrl}
                                price={item.price}
                                username={item.username}
                                postedAt={item.postedAt}
                                zone={item.zone}
                                isUsed={item.isUsed}
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
