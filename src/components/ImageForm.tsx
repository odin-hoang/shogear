import React, { useRef, useState } from 'react';
import Button from './Button';
import { PostItem } from '../pages/ProductDetail';
import { toast } from 'react-toastify';

import apiRequest, { flaskRequest } from '../services/request';
interface SearchPostProps {
    setPosts: React.Dispatch<React.SetStateAction<PostItem[]>>;
    setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
}
interface ListProduct {
    product_ids: number[];
}
const ImageForm = ({ setPosts, setIsLoading }: SearchPostProps) => {
    const [previewImg, setPreviewImg] = useState(
        'https://img.tgdd.vn/imgt/f_webp,fit_outside,quality_100/https://cdn.tgdd.vn//News/1499078//laptop-15-800x450-1.jpg',
    );

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const input = event.target;
        const file = input.files?.[0];
        if (file) {
            setPreviewImg(URL.createObjectURL(file));
        }
        URL.revokeObjectURL(previewImg);
    };
    const handleSubmitImage = (event: React.FormEvent) => {
        event.preventDefault();
        if (!(inputRef.current && inputRef.current.files && inputRef.current.files.length > 0)) {
            toast.error('Vui lòng chọn hình ảnh!');
            return;
        }
        // TODO: call api to get all of ids of products
        setIsLoading(true);
        var formData = new FormData();
        var imageFile = inputRef.current.files[0];
        formData.append('file', imageFile);
        setPosts([]);
        flaskRequest
            .post<ListProduct>('/search', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Access-Control-Allow-Origin': '*',
                    'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
                },
            })
            .then((response) => {
                console.log(response.data);
                const result = response.data.product_ids;
                const postPromises = result.slice(0, 5).map((post) => apiRequest.get<PostItem>(`/get/posts/${post}`));

                Promise.all(postPromises).then((responses) => {
                    const fetchedPosts = responses.map((response) => response.data);
                    const reviewdPosts = fetchedPosts.filter((post) => post.review === 1);
                    setPosts(reviewdPosts);
                    setIsLoading(false);
                });
            });
    };
    const inputRef = useRef<HTMLInputElement>(null);
    return (
        <form onSubmit={handleSubmitImage} className='flex items-center justify-around'>
            <div className='flex items-center justify-center gap-5'>
                <div className='shrink-0'>
                    <img
                        id='preview_img'
                        className='h-20 w-20 rounded-md object-contain'
                        src={previewImg}
                        alt='Current profile photo'
                    />
                </div>
                <label className='block'>
                    <span className='sr-only'>Choose profile photo</span>
                    <input
                        ref={inputRef}
                        name='image'
                        type='file'
                        onChange={handleFileChange}
                        className='block w-full text-sm text-slate-500
              file:mr-4 file:rounded-full file:border-0
              file:bg-violet-50 file:px-4
              file:py-2 file:text-sm
              file:font-semibold file:text-violet-700
              hover:file:bg-violet-100'
                    />
                </label>
            </div>
            <Button
                type='submit'
                variant={'fillBlue'}
                className='bg-gradient-to-r from-indigo-300 to-purple-400 text-sm'
            >
                Tìm kiếm
            </Button>
        </form>
    );
};

export default ImageForm;
