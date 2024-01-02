import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { productSchema } from '../../../lib/types';
import { z } from 'zod';
import Button from '../../../components/Button';
import { AiOutlineLoading } from 'react-icons/ai';
import { LuLogIn } from 'react-icons/lu';
import { cn } from '../../../lib/utils/cn';
import FileUploader from './components/FileUploader';
import { FileWithPath } from 'react-dropzone';

const NewPost = () => {
    const form = useForm<z.infer<typeof productSchema>>({
        resolver: zodResolver(productSchema),
        defaultValues: {},
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    async function onSubmit(values: z.infer<typeof productSchema>) {
        console.log('submit');
        console.log(values);
    }
    const [images, setImages] = useState<FileWithPath[]>([]);
    const errors = form.formState.errors;
    const categories = [
        {
            id: '1',
            name: 'Laptop',
        },
        {
            id: '2',
            name: 'Chuột',
        },
    ];
    const statusList = [
        {
            value: 'new',
            name: 'Mới',
        },
        {
            value: 'used',
            name: 'Đã sử dụng',
        },
    ];
    return (
        <div className='p-20'>
            <form onSubmit={form.handleSubmit(onSubmit)}>
                <div>
                    <h1 className='mb-4'>Tên sản phẩm</h1>
                    <input
                        {...form.register('name')}
                        type='text'
                        placeholder='Tên sản phẩm'
                        className='input mb-4  w-full bg-gray-100'
                    />
                    {errors.name && <p className='text-state-error mb-4'>{`*${errors.name.message}`}</p>}
                </div>
                <div className='grid grid-cols-2 gap-4'>
                    <div>
                        <h1 className='mb-4'>Loại sản phẩm</h1>
                        <select
                            {...form.register('category_id')}
                            placeholder=''
                            className='select mb-4 w-full bg-gray-100'
                        >
                            <option value={''}>Loại sản phẩm</option>

                            {categories.map((item) => (
                                <option key={item.id} value={item.id}>
                                    {item.name}
                                </option>
                            ))}
                        </select>

                        {errors.category_id && (
                            <p className='text-state-error mb-4'>{`*${errors.category_id.message}`}</p>
                        )}
                    </div>
                    <div>
                        <h1 className='mb-4'>Ngày sản xuất</h1>
                        <input
                            {...form.register('createDate')}
                            type='date'
                            placeholder='Tên sản phẩm'
                            className='input mb-4  w-full bg-gray-100'
                        />

                        {errors.category_id && (
                            <p className='text-state-error mb-4'>{`*${errors.category_id.message}`}</p>
                        )}
                    </div>
                </div>
                <div className='grid grid-cols-2 gap-4'>
                    <div>
                        <h1 className='mb-4'>Tình trạng</h1>
                        <select {...form.register('status')} placeholder='' className='select mb-4 w-full bg-gray-100'>
                            <option value={''}>Tình trạng</option>

                            {statusList.map((item) => (
                                <option key={item.value} value={item.value}>
                                    {item.name}
                                </option>
                            ))}
                        </select>

                        {errors.status && <p className='text-state-error mb-4'>{`*${errors.status.message}`}</p>}
                    </div>
                    <div>
                        <h1 className='mb-4'>Số lượng</h1>
                        <input
                            {...form.register('count')}
                            type='number'
                            placeholder='Số lượng'
                            className='input mb-4  w-full bg-gray-100'
                        />

                        {errors.count && <p className='text-state-error mb-4'>{`*${errors.count.message}`}</p>}
                    </div>
                </div>
                <div>
                    <h1 className='mb-4'>Thông tin sản phẩm</h1>
                    <textarea
                        className='textarea mb-4 h-[150px]  w-full bg-gray-100'
                        placeholder='Thông tin sản phẩm'
                    ></textarea>
                    {errors.name && <p className='text-state-error mb-4'>{`*${errors.name.message}`}</p>}
                </div>
                <div>
                    <div className='grid h-[300px] grid-flow-row grid-cols-5 object-contain'>
                        {images?.map((item: any) => {
                            console.log(images);
                            return (
                                <div className='h-[300px]'>
                                    <img src={URL.createObjectURL(item)} alt='image' />
                                </div>
                            );
                        })}
                        <FileUploader fieldChange={setImages} field={images} />
                    </div>
                </div>
                <Button
                    disabled={isSubmitting}
                    className={cn('w-full justify-center font-normal ', isSubmitting && 'bg-inputFill-default')}
                    variant={'fill'}
                    size={'medium'}
                >
                    Thêm sản phẩm{' '}
                    {isSubmitting ? (
                        <span className='animate-spin'>
                            <AiOutlineLoading />
                        </span>
                    ) : null}
                </Button>
            </form>
        </div>
    );
};

export default NewPost;
