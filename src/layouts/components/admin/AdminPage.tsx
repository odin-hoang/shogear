import { useEffect, useState } from 'react';

import { cn } from '../../../lib/utils/cn';
import apiRequest from '../../../services/request';
import ReactPaginate from 'react-paginate';
import { PostItem } from '../../../pages/ProductDetail';
import {
    OrderResponse,
    PostResponse,
    ShowOrders,
    ShowPost,
    ShowUsers,
    UserResponse,
} from '../../../services/postService';
import Button from '../../../components/Button';
import { toast } from 'react-toastify';
import { useUserContext } from '../../../utils/authContext';
import { useNavigate } from 'react-router-dom';
import { Order, User } from '../order-results/OrderCheck';
import { FaCircleCheck } from 'react-icons/fa6';
import { useAppDispatch } from '../../../app/hook';
import { active, inactive } from '../../../features/blur/blur-slice';
import { getSellerStatus } from '../seller/SellOrderItem';
export const getBuyerStatus = (status: number) => {
    switch (status) {
        case 1:
            return 'Chờ xác nhận';
        case 2:
            return 'Đã thanh toán';
        case 3:
            return 'Đang giao hàng';
        case 4:
            return 'Nhận hàng thành công';
        case 5:
            return 'Chờ huỷ';
    }
};
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
    const [selected, setSelected] = useState(1);
    const { getUser } = useUserContext();
    const user = getUser();
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);
    const dispatch = useAppDispatch();
    useEffect(() => {
        if (!user || !user.isAdmin) {
            navigate('/');
        }
        setIsLoading(true);
        Promise.all([ShowPost(1), ShowUsers(1), ShowOrders(1)]).then(([postResponse, userResponse, orderResponse]) => {
            const postRes = postResponse as PostResponse;
            const userRes = userResponse as UserResponse;
            const orderRes = orderResponse as OrderResponse;

            const postDatas: PostItem[] = postRes.posts;
            const userDatas: User[] = userRes.users;
            const orderDatas: Order[] = orderRes.orders;

            const postTotalPage = Math.ceil(postRes.count / 10);
            const userTotalPage = Math.ceil(userRes.count / 10);
            const orderTotalPage = Math.ceil(orderRes.count / 10);

            setPagination((prev) => ({
                ...prev,
                totalPagesPost: postTotalPage,
                totalPagesUser: userTotalPage,
                totalPagesOrder: orderTotalPage,
            }));

            setPosts(postDatas);
            setUsers(userDatas);
            setOrders(orderDatas);
            setIsLoading(false);
        });
    }, []);
    const [posts, setPosts] = useState<PostItem[]>([]);
    const [users, setUsers] = useState<User[]>([]);
    const [orders, setOrders] = useState<Order[]>([]);

    const [pagnination, setPagination] = useState({
        totalPagesUser: 0,
        totalPagesPost: 0,
        totalPagesOrder: 0,
    });
    const handlePageClick = (e: any) => {
        setIsLoading(true);
        ShowPost(e.selected + 1).then((response) => {
            const res = response as PostResponse;
            const datas: PostItem[] = res.posts;
            const totalPage = Math.ceil(res.count / 10);
            setPagination((prev) => ({ ...prev, totalPagesPost: totalPage }));
            setPosts(datas);
            setIsLoading(false);
        });
    };
    const handlePageClickOrder = (e: any) => {
        setIsLoading(true);
        ShowOrders(e.selected + 1).then((response) => {
            const res = response as OrderResponse;
            const datas: Order[] = res.orders;
            const totalPage = Math.ceil(res.count / 10);
            setPagination((prev) => ({ ...prev, totalPagesOrder: totalPage }));
            setOrders(datas);
            setIsLoading(false);
        });
    };
    const handleAction = (action: number, postID: number) => {
        dispatch(active());
        apiRequest.put(`/review/posts/${postID}`, { review: action }).then(() => {
            toast.success('Cập nhật trạng thái thành công!');
            dispatch(inactive());
        });
    };
    const handleUser = (action: 'delete' | 'addAdmin' | 'removeAdmin', userID: number) => {
        dispatch(active());
        if (action == 'delete') {
            apiRequest.delete(`/users/${userID}`).then(() => {
                dispatch(inactive());
                toast.success('Xoá người dùng thành công!');
            });
        }
        if (action == 'addAdmin') {
            apiRequest.put(`/users/${userID}/`, { isAdmin: true }).then(() => {
                dispatch(inactive());
                toast.success('Thêm quyền quản trị thành công!');
            });
        }
        if (action == 'removeAdmin') {
            apiRequest.put(`/users/${userID}/`, { isAdmin: false }).then(() => {
                dispatch(inactive());
                toast.success('Xoá quyền quản trị thành công!');
            });
        }
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
                {selected == 1 && (
                    <table className='table  table-zebra'>
                        <thead>
                            <th>ID</th>
                            <th>username</th>
                            <th>Họ và tên</th>
                            <th>Số điện thoại</th>
                            <th>Email</th>
                            <th>Quản trị viên</th>
                            <th>Hành động</th>
                        </thead>
                        <tbody>
                            {users.map((user) => (
                                <tr>
                                    <td>{user.id}</td>
                                    <td>{user.username}</td>
                                    <td>{user.lastName + ' ' + user.firstName}</td>
                                    <td>{user.phone}</td>
                                    <td>{user.email}</td>
                                    <td className=' text-lg text-green-500'>
                                        {user.isAdmin ? (
                                            <FaCircleCheck />
                                        ) : (
                                            <span className='text-gray-200'>
                                                <FaCircleCheck />
                                            </span>
                                        )}
                                    </td>
                                    <td className='grid grid-cols-1 gap-2'>
                                        <Button onClick={() => handleUser('addAdmin', user.id)} variant={'outline'}>
                                            Thêm quyền quản trị
                                        </Button>
                                        <Button onClick={() => handleUser('removeAdmin', user.id)} variant={'fillBlue'}>
                                            Xoá quyền quản trị
                                        </Button>
                                        <Button onClick={() => handleUser('delete', user.id)} variant={'fill'}>
                                            Xoá người dùng
                                        </Button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
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
                            pageCount={pagnination.totalPagesPost}
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
                {selected == 3 && (
                    <div>
                        <table className='table table-zebra'>
                            <thead>
                                <th>Mã đơn hàng</th>
                                <th>Danh sách sản phẩm</th>
                                <th>Thành tiền</th>
                                <th>Nơi nhận hàng</th>
                                <th>Người mua</th>
                                <th>Trạng thái </th>
                            </thead>
                            <tbody>
                                {orders.map((order) => (
                                    <tr>
                                        <td className='text-center'>{order.id}</td>
                                        <td>
                                            {order.items.map((item) => (
                                                <ul className='mb-2'>
                                                    <li>{item.product.name}</li>
                                                    <li className='flex items-center gap-2 font-semibold text-slate-700'>
                                                        <span className='font-bold'>{item.product.user.username}</span>{' '}
                                                        <span>-</span>
                                                        <span className='rounded-lg bg-green-100 p-2 text-green-600 '>
                                                            {getSellerStatus(item.confirmationStatus)}
                                                        </span>
                                                    </li>
                                                </ul>
                                            ))}
                                        </td>
                                        <td>{order.totalPrice}</td>
                                        <td>{order.ward + ', ' + order.district + ', ' + order.province}</td>
                                        <td>{order.fullName}</td>
                                        <td className='min-w-[200px]'>
                                            <div
                                                className='rounded-lg border-[1px] bg-purple-100
                                        p-2 text-center font-semibold text-purple-600'
                                            >
                                                {getBuyerStatus(order.status)}
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        <ReactPaginate
                            breakLabel='...'
                            nextLabel='Tiếp'
                            onPageChange={handlePageClickOrder}
                            pageRangeDisplayed={5}
                            pageCount={pagnination.totalPagesOrder}
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
