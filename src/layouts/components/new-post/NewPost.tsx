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
import { getCategories, uploadImage } from '../../../services/postService';
const NewPost = () => {
    const form = useForm<z.infer<typeof productSchema>>({
        resolver: zodResolver(productSchema),
        defaultValues: {},
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [categories, setCategories] = useState<any>([]);
    const [category, setCategory] = useState<any>();
    const [fields, setFields] = useState<any>([]);
    useEffect(() => {
        const fetch = async function () {
            const data = await getCategories();
            setCategories(data as Array<any>);
        };
        fetch();
    }, []);
    console.log(fields);
    useEffect(() => {
        console.log(category);
        const selectedCategory = categories.filter((item: any) => item.name == category);
        console.log(selectedCategory[0]);
        setFields(selectedCategory[0].fields);
    }, [category]);
    async function onSubmit(values: z.infer<typeof productSchema>) {
        console.log('submit');
        uploadImage(images).then((data) => {
            console.log(data);
        });
        // const imageUrls = await uploadImage(images);
        // console.log(imageUrls);
        console.log(values);
    }
    const [images, setImages] = useState<any[]>([]);
    const errors = form.formState.errors;
    // const categories = [
    //     {
    //         id: '1',
    //         name: 'Laptop',
    //     },
    //     {
    //         id: '2',
    //         name: 'Chuột',
    //     },
    // ];
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
    console.log(form.formState.errors);
    return (
        <div className='p-20'>
            <form onSubmit={form.handleSubmit(onSubmit)}>
                {/* <input
                    // {...field}
                    type='file'
                    onChange={async (e) => {
                        const file = e.target?.files?.[0];
                        console.log(file);
                        if (file) {
                            let data = [];
                            data.push(file);
                            const image = await uploadImage(data);
                            console.log(image);
                        }
                    }}
                    accept='image/png, image/jpeg'
                /> */}

                <div>
                    {/* <div>{JSON.stringify(form.formState.errors)}</div> */}
                    <h1 className='mb-4'>Tên sản phẩm</h1>
                    <input
                        {...form.register('name')}
                        type='text'
                        placeholder='Tên sản phẩm'
                        className='input mb-4  w-full bg-gray-100'
                    />
                    {errors.name && <p className='mb-4 text-state-error'>{`*${errors.name.message}`}</p>}
                </div>
                <div className='grid grid-cols-2 gap-4'>
                    <div>
                        <h1 className='mb-4'>Loại sản phẩm</h1>
                        <select
                            {...form.register('category_id')}
                            onChange={(data) => setCategory(data.target.value)}
                            placeholder=''
                            className='select mb-4 w-full bg-gray-100'
                        >
                            <option value={''}>Loại sản phẩm</option>
                            {categories?.map((item: any) => (
                                <option key={item.name} value={item.name}>
                                    {item.name}
                                </option>
                            ))}
                        </select>

                        {errors.category_id && (
                            <p className='mb-4 text-state-error'>{`*${errors.category_id.message}`}</p>
                        )}
                    </div>
                    <div>
                        <h1 className='mb-4'>Ngày sản xuất</h1>
                        <input
                            {...form.register('createDate', {
                                valueAsDate: true,
                            })}
                            type='date'
                            placeholder='Tên sản phẩm'
                            className='input mb-4  w-full bg-gray-100'
                        />
                        {errors.category_id && (
                            <p className='mb-4 text-state-error'>{`*${errors.category_id.message}`}</p>
                        )}
                    </div>
                </div>
                <div className='grid grid-cols-2 gap-4'>
                    <div>
                        <h1 className='mb-4'>Tình trạng</h1>
                        <select
                            {...form.register('status')}
                            onSelect={(data) => setCategory(data)}
                            placeholder=''
                            className='select mb-4 w-full bg-gray-100'
                        >
                            <option value={''}>Tình trạng</option>

                            {statusList.map((item) => (
                                <option key={item.value} value={item.value}>
                                    {item.name}
                                </option>
                            ))}
                        </select>

                        {errors.status && <p className='mb-4 text-state-error'>{`*${errors.status.message}`}</p>}
                    </div>
                    <div>
                        <h1 className='mb-4'>Số lượng</h1>
                        <input
                            {...form.register('count', {
                                valueAsNumber: true,
                            })}
                            type='number'
                            placeholder='Số lượng'
                            className='input mb-4  w-full bg-gray-100'
                        />

                        {errors.count && <p className='mb-4 text-state-error'>{`*${errors.count.message}`}</p>}
                    </div>
                </div>
                <div>
                    <div>
                        <h1 className='mb-4'>Giá tiền</h1>
                        <input
                            {...form.register('price', {
                                valueAsNumber: true,
                            })}
                            type='number'
                            placeholder='Giá tiền'
                            className='input mb-4  w-full bg-gray-100'
                        />

                        {errors.count && <p className='mb-4 text-state-error'>{`*${errors.count.message}`}</p>}
                    </div>
                </div>

                <div>
                    <h1 className='mb-4'>Thông tin sản phẩm</h1>
                    <textarea
                        {...form.register('description')}
                        className='textarea mb-4 h-[150px]  w-full bg-gray-100'
                        placeholder='Thông tin sản phẩm'
                    ></textarea>
                    {errors.name && <p className='mb-4 text-state-error'>{`*${errors.name.message}`}</p>}
                </div>
                <div className='bg-slate-500'>
                    {/* <div className='grid grid-flow-row grid-cols-5 object-contain'>
                        {images?.map((item: any) => {
                            console.log(images);
                            return (
                                <div className='h-[300px] rounded-sm bg-slate-100'>
                                    <img src={URL.createObjectURL(item)} alt='image' />
                                </div>
                            );
                        })}
                        <FileUploader fieldChange={setImages} field={images} />
                    </div> */}
                </div>
                <Button
                    type='submit'
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
