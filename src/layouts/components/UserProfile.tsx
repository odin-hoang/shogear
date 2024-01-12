import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import apiRequest from '../../services/request';
import { User } from './order-results/OrderCheck';
import { PostItem } from '../../pages/ProductDetail';
import toHyphenString from '../../lib/toHyphenString';
import DefaultImages from '../../assets/images';

const UserProfile = () => {
    const location = useLocation();
    const userId = location.state.seller;
    const [isLoading, setIsLoading] = useState(false);
    useEffect(() => {
        setIsLoading(true);
        apiRequest.get<User>(`/users/${userId}`).then((response) => {
            const result: User = response.data;
            setUser(result);

            const postPromises = result.posts.slice(0, 5).map((post) => apiRequest.get<PostItem>(`/posts/${post}`));

            Promise.all(postPromises).then((responses) => {
                const fetchedPosts = responses.map((response) => response.data);
                setPosts(fetchedPosts);
                setIsLoading(false);
            });
        });
    }, []);
    const [user, setUser] = useState<User>({
        id: 0,
        username: '',
        firstName: '',
        lastName: '',
        isAdmin: false,
        products: [],
        posts: [],
        phone: '',
        email: '',
    });
    const [posts, setPosts] = useState<PostItem[]>([]);
    return (
        <div className='container mx-auto bg-bodyBg-default p-5 pt-24'>
            <div>
                <div className='relative mx-auto w-5/6 rounded-lg bg-white shadow md:w-5/6 lg:w-4/6 xl:w-3/6'>
                    <div className='flex justify-center'>
                        <img
                            src={DefaultImages.defaultAvatar}
                            alt=''
                            className='absolute -top-20 mx-auto h-32 w-32 transform rounded-full border-4 border-white shadow-md transition duration-200 hover:scale-110'
                        />
                    </div>

                    <div className='mt-16'>
                        <h1 className='text-center text-3xl font-bold text-gray-900'>
                            {user?.lastName + ' ' + user?.firstName}
                        </h1>
                        <p className='text-center text-sm font-medium text-gray-400'>{user?.username}</p>
                        <p>
                            <span></span>
                        </p>
                        <div className='my-5 px-6'>
                            <a
                                href={`https://chat.zalo.me/?phone=${user?.phone}`}
                                target='_blank'
                                className='block rounded-lg  bg-primary-900/90 px-6 py-3 text-center font-medium leading-6 text-gray-200 hover:bg-primary-900 hover:text-white'
                            >
                                Kết nối với <span className='font-bold'>+{user?.phone}</span>
                            </a>
                        </div>

                        <div className='w-full'>
                            <h3 className='px-6 text-left font-medium text-gray-900'>Bài đăng gần đây</h3>
                            {isLoading && (
                                <div>
                                    <div className='loading loading-ring loading-xs ml-6 '></div>
                                    <div className='loading loading-ring loading-sm ml-6 '></div>
                                    <div className='loading loading-ring loading-md ml-6 '></div>
                                    <div className='loading loading-ring ml-6 px-5'></div>
                                </div>
                            )}
                            <div className='mt-5 flex w-full flex-col items-center overflow-hidden text-sm'>
                                {posts.map((post) => (
                                    <Link
                                        to={`/products/${toHyphenString(post.product.name)}`}
                                        state={{ item: post }}
                                        className=' block w-full border-t border-gray-100 py-4 pl-6 pr-3 text-gray-600 transition duration-150 hover:bg-gray-100'
                                    >
                                        <img
                                            src={post.product.attachments[0].file}
                                            alt=''
                                            className='mr-2 inline-block h-6 rounded-full shadow-md'
                                        />
                                        {post.product.name}{' '}
                                        <span className='font-serif text-xs italic text-gray-500'>
                                            {' - '}
                                            {post.updatedAt}
                                        </span>
                                    </Link>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UserProfile;
