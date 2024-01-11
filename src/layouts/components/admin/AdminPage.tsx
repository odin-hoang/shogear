import { useEffect, useState } from 'react';

import { cn } from '../../../lib/utils/cn';
import apiRequest from '../../../services/request';
import ReactPaginate from 'react-paginate';
import { PostItem } from '../../../pages/ProductDetail';
import { PostResponse, ShowPost } from '../../../services/postService';
import Button from '../../../components/Button';
import { toast } from 'react-toastify';
import { useUserContext } from '../../../utils/authContext';
import { useNavigate } from 'react-router-dom';

const AdminPage = () => {
    const listActions = [
        {
            id: 1,
            title: 'Quản lý người dùng',
            href: '/admin/users',
        },
        {
            id: 2,
            title: 'Quản lý bài đăng',
            href: '/admin/posts',
        },
        {
            id: 3,
            title: 'Quản lý đơn hàng',
            href: 'admin/orders',
        },
    ];
    const [selected, setSelected] = useState(2);
    const { getUser } = useUserContext();
    const user = getUser();
    const navigate = useNavigate();

    useEffect(() => {
        if (!user || !user.isAdmin) {
            navigate('/');
        }
        setIsLoading(true);
        ShowPost(1).then((response) => {
            const res = response as PostResponse;
            const datas: PostItem[] = res.posts;
            const totalPage = Math.ceil(res.count / 10);
            setPagination({ totalPage });
            setPosts(datas);
            setIsLoading(false);
        });
    }, []);
    const [posts, setPosts] = useState<PostItem[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [pagnination, setPagination] = useState({
        totalPage: 0,
    });
    const handlePageClick = (e: any) => {
        setIsLoading(true);
        ShowPost(e.selected + 1).then((response) => {
            const res = response as PostResponse;
            const datas: PostItem[] = res.posts;
            const totalPage = Math.ceil(res.count / 10);
            setPagination({ totalPage });
            setPosts(datas);
            setIsLoading(false);
        });
    };
    const handleAction = (action: number, postID: number) => {
        apiRequest.put(`/review/posts/${postID}`, { review: action }).then(() => {
            toast.success('Cập nhật trạng thái thành công!');
        });
    };
    return (
        <div className='flex gap-5'>
            <div className='min-w-[200px] pl-5 pt-5'>
                <ul className='flex flex-col items-center gap-2'>
                    {listActions.map((action) => (
                        <li
                            onClick={() => setSelected(action.id)}
                            className={cn(
                                'w-full cursor-pointer rounded-md px-4 py-2',
                                selected === action.id && 'bg-gray-200',
                            )}
                        >
                            <h1>{action.title}</h1>
                        </li>
                    ))}
                </ul>
            </div>
            <div className='mb-10 min-h-screen border-l-2 border-l-pink-500 pl-10 pt-5'>
                {selected == 2 && (
                    <>
                        <table className='table table-zebra'>
                            <thead>
                                <th>ID</th>
                                <th>Tiêu đề</th>
                                <th>Mô tả</th>
                                <th>Nguời đăng</th>
                                <th>Ngày đăng</th>
                                <th>Trạng thái</th>
                            </thead>
                            <tbody>
                                {posts.map((post) => (
                                    <tr>
                                        <td>{post.id}</td>
                                        <td>
                                            <div>{post.product.name}</div>
                                            {post.review == 1 && (
                                                <div className='mt-2 inline-block rounded-md bg-gradient-to-r from-emerald-500 to-lime-600 px-2 py-1 text-white'>
                                                    Đã duyệt
                                                </div>
                                            )}
                                            {post.review == 2 && (
                                                <div className='mt-2 inline-block rounded-md bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 px-2 py-1 text-white'>
                                                    Đã huỷ
                                                </div>
                                            )}
                                        </td>
                                        <td>
                                            <p>{post.description}</p>
                                            <div className='mt-2 flex items-center gap-2'>
                                                {post.product.attachments.map((attach) => (
                                                    <img className='h-20 w-20' src={attach.file}></img>
                                                ))}
                                            </div>
                                        </td>
                                        <td>{post.user}</td>
                                        <td>{post.createdAt}</td>
                                        <td className='flex flex-col items-center gap-2'>
                                            <Button onClick={() => handleAction(1, post.id)} variant='fillBlue'>
                                                Duyệt
                                            </Button>
                                            <Button onClick={() => handleAction(2, post.id)} variant='fill'>
                                                Huỷ bỏ
                                            </Button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
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
                    </>
                )}
                {isLoading && (
                    <div className='flex items-center justify-center p-5'>
                        <span className='loading loading-spinner loading-lg'></span>
                    </div>
                )}
            </div>
        </div>
    );
};

export default AdminPage;
