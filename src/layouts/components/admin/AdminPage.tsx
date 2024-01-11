import { useEffect, useState } from 'react';

import { cn } from '../../../lib/utils/cn';
import apiRequest from '../../../services/request';
import ReactPaginate from 'react-paginate';

const AdminPage = () => {
    const listActions = [
        {
            title: 'Quản lý người dùng',
            href: '/admin/users',
        },
        {
            title: 'Quản lý bài đăng',
            href: '/admin/posts',
        },
        {
            title: 'Quản lý sản phẩm',
            href: 'admin/products',
        },
        {
            title: 'Quản lý đơn hàng',
            href: 'admin/orders',
        },
    ];
    const [selected, setSelected] = useState(1);
    useEffect(() => {
        apiRequest.get('/users').then((response) => {
            response.data;
        });
    }, [selected]);
    const handlePageClick = () => {};
    return (
        <div className='flex  gap-5'>
            <div className='max-w-[300px] pl-5 pt-5'>
                <ul className='flex flex-col items-center gap-2'>
                    {listActions.map((action, index) => (
                        <li
                            onClick={() => setSelected(index)}
                            className={cn(
                                'w-full cursor-pointer rounded-md px-4 py-2',
                                selected === index && 'bg-gray-200',
                            )}
                        >
                            <h1>{action.title}</h1>
                        </li>
                    ))}
                </ul>
            </div>
            <div className='min-h-screen border-l-2 border-l-pink-500 pl-10 pt-5'>
                <ReactPaginate
                    breakLabel='...'
                    nextLabel='Tiếp'
                    onPageChange={handlePageClick}
                    pageRangeDisplayed={5}
                    pageCount={2}
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
    );
};

export default AdminPage;
