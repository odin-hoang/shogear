import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { productSchema } from '../../../lib/types';
import { z } from 'zod';
import Button from '../../../components/Button';
import { AiOutlineLoading } from 'react-icons/ai';

import { cn } from '../../../lib/utils/cn';
import FileUploader from './components/FileUploader';

import { getCategories, postProduct, uploadImage } from '../../../services/postService';

import { CloseSquareFilled } from '@ant-design/icons';
import { toast } from 'react-toastify';
import { useAppDispatch } from '../../../app/hook';
import { active, inactive } from '../../../features/blur/blur-slice';
import { flaskRequest } from '../../../services/request';
const NewPost = () => {
    const dispatch = useAppDispatch();
    const [isLoading, setIsLoading] = useState(false);
    const form = useForm<z.infer<typeof productSchema>>({
        resolver: zodResolver(productSchema),
        defaultValues: {},
    });
    const [isSubmitting] = useState(false);
    const [categories, setCategories] = useState<any>([]);
    const [category, setCategory] = useState<any>();
    const [fields, setFields] = useState<any>([]);
    const [fieldValues, setFieldsValue] = useState<any>([]);
    useEffect(() => {
        const fetch = async function () {
            const data = await getCategories();
            console.log(data);
            setCategories(data as Array<any>);
        };
        fetch();
    }, []);
    useEffect(() => {
        const selectedCategory = categories.filter((item: any) => item.name == category);
        console.log(selectedCategory[0]);
        setFields(selectedCategory[0]?.fields);
        console.log(selectedCategory[0]?.fields);
        const fieldLength = selectedCategory[0]?.fields.length;
        const valuesInit = Array.from({ length: fieldLength }).map((_, index: number) => ({
            field: selectedCategory[0]?.fields[index]?.name,
            value: selectedCategory[0]?.fields[index]?.fieldType != 1 ? 'default' : '',
        }));
        //  console.log(valuesInit);
        setFieldsValue(valuesInit);
    }, [category]);
    interface PostResponse {
        id: number;
        attachments: [
            {
                id: number;
                file: string;
                file_type: string;
                publication: number;
            },
        ];
        createdAt: string;
        description: string;
    }
    async function onSubmit(values: z.infer<typeof productSchema>) {
        //      console.log('submit');
        setIsLoading(true);
        dispatch(active());
        uploadImage(images).then(async (data: any) => {
            console.log(data);
            if (data?.data?.length > 0) {
                let images = data?.data;
                let newImages = images.map((item: any) => ({
                    file: item,
                    file_type: 'Photo',
                }));
                const post = await postProduct({
                    product: { ...values, is_available: true, status: values.status },
                    fields: values.fields,
                    attachments: [...newImages],
                    post_zone: values.zone,
                    post_description: values.description,
                });
                const postResponse = post as PostResponse;
                if (post) {
                    console.log(post);
                    // create vector database for search
                    const postPromises = postResponse.attachments.map((attachment, index) => {
                        return new Promise((resolve, reject) => {
                            setTimeout(() => {
                                flaskRequest
                                    .post('/create', {
                                        id: attachment.publication,
                                        file: attachment.file,
                                    })
                                    .then((response) => {
                                        console.log('vector', response.data);
                                        resolve(response);
                                    })
                                    .catch((error) => {
                                        console.error(error);
                                        reject(error);
                                    });
                            }, index * 5000);
                        });
                    });
                    Promise.all(postPromises).then((responses) => console.log(responses));
                    toast.success('Đăng bài thành công');
                } else {
                    toast.error('Hãy kiểm tra lại thông tin sản phẩm!');
                }
                setIsLoading(false);
                dispatch(inactive());
            }
        });
        //     console.log(values);
    }
    const [images, setImages] = useState<any[]>([]);
    const errors = form.formState.errors;
    const statusList = [
        {
            value: 1,
            name: 'Mới',
        },
        {
            value: 0,
            name: 'Đã sử dụng',
        },
    ];
    const zoneList = [
        {
            value: 'HCM',
            name: 'Tp. Hồ Chí Minh',
        },
        {
            value: 'HN',
            name: 'Hà Nội',
        },
        {
            value: 'DN',
            name: 'Đà Nẵng',
        },
        {
            value: 'CT',
            name: 'Cần Thơ',
        },
        {
            value: 'HP',
            name: 'Hải Phòng',
        },
    ];
    useEffect(() => {
        console.log('fields change');
        form.setValue('fields', [...fieldValues]);
    }, [fieldValues]);

    const handleChangeFields = (value: string, field: any, index: number) => {
        const updateValues = fieldValues;
        updateValues[index] = { field: field.name, value };
        //        console.log(updateValues);
        setFieldsValue([...updateValues]);
        // console.log(updateValues);
    };
    //  console.log(form.getValues('fields'));
    //console.log(form.formState.errors);

    return (
        <div className='mx-auto max-w-[1200px] p-20'>
            <h3 className='mb-4 text-2xl font-semibold'>Tạo bài đăng mới</h3>
            <form onSubmit={form.handleSubmit(onSubmit)}>
                <div>
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
                            {...form.register('category')}
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

                        {errors.category && <p className='mb-4 text-state-error'>{`*${errors.category.message}`}</p>}
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
                        {errors.createDate && (
                            <p className='mb-4 text-state-error'>{`*${errors.createDate.message}`}</p>
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
                <div>
                    <h1 className='mb-4'>Khu vực</h1>
                    <select {...form.register('zone')} placeholder='' className='select mb-4 w-full bg-gray-100'>
                        {zoneList.map((item) => (
                            <option key={item.value} value={item.value}>
                                {item.name}
                            </option>
                        ))}
                    </select>
                    {errors.zone && <p className='mb-4 text-state-error'>{`*${errors.zone.message}`}</p>}
                </div>
                <h3 className='mb-4 text-xl font-semibold'>Thông tin chi tiết</h3>
                <div className='grid grid-cols-2 gap-4'>
                    {fields?.map((item: any, index: number) => {
                        if (item.fieldType == 1) {
                            return (
                                <div key={index}>
                                    <h1 className='mb-4'>{item.name}</h1>
                                    <input
                                        onChange={(data) => handleChangeFields(data.target.value, item, index)}
                                        type='input'
                                        placeholder='Nhập giá trị'
                                        className='input mb-4  w-full bg-gray-100'
                                    />
                                    {errors.fields && errors?.fields?.[index] && (
                                        <p className='mt-3 text-red-600'>Thông tin không hợp lệ</p>
                                    )}
                                </div>
                            );
                        } else if (item.fieldType == 2) {
                            return (
                                <div key={index}>
                                    <h1 className='mb-4'>{item.name}</h1>
                                    <select
                                        onChange={(data) => handleChangeFields(data.target.value, item, index)}
                                        placeholder=''
                                        className='select mb-4 w-full bg-gray-100'
                                    >
                                        <option value={'default'}>{item.name}</option>

                                        {item.options.map((option: any) => (
                                            <option key={option.name} value={option.name}>
                                                {option.name}
                                            </option>
                                        ))}
                                    </select>

                                    {errors.fields && errors?.fields?.[index] && (
                                        <p className='mt-3 text-red-600'>Thông tin không hợp lệ</p>
                                    )}
                                </div>
                            );
                        } else if (item.fieldType == 3) {
                            return (
                                <div key={index}>
                                    <h1 className='mb-4'>{item.name}</h1>
                                    <select
                                        onChange={(data) => handleChangeFields(data.target.value, item, index)}
                                        placeholder=''
                                        className='select mb-4 w-full bg-gray-100'
                                        defaultValue={'default'}
                                    >
                                        <option value={'default'}>{item.name}</option>

                                        {item.options.map((option: any) => (
                                            <option key={option.name} value={item.name}>
                                                {option.name}
                                            </option>
                                        ))}
                                    </select>
                                    {errors.fields && errors?.fields?.[index] && (
                                        <p className='mt-3 text-red-600'>Thông tin không hợp lệ</p>
                                    )}
                                </div>
                            );
                        }
                    })}
                </div>
                <h3 className='mb-4 text-xl font-semibold'>Danh sách hình ảnh</h3>
                <div className='mb-4 rounded-md bg-gray-200 p-4'>
                    <div className='grid grid-flow-row grid-cols-5 object-contain'>
                        {images?.map((item: any, index: number) => {
                            return (
                                <div className=' h-[150px] rounded-sm bg-stone-300' key={index}>
                                    <CloseSquareFilled
                                        onClick={() => {
                                            const updateImages = images;
                                            updateImages.splice(index, 1);
                                            console.log(updateImages);
                                            setImages([...updateImages]);
                                            console.log('click');
                                        }}
                                    />
                                    <img
                                        className='h-[140px] object-cover'
                                        src={URL.createObjectURL(item)}
                                        alt='image'
                                    />
                                </div>
                            );
                        })}
                        <FileUploader fieldChange={setImages} field={images} />
                    </div>
                </div>
                <Button
                    type='submit'
                    disabled={isSubmitting}
                    className={cn(
                        'w-full justify-center bg-gradient-to-r from-red-500 to-red-800 font-normal',
                        isSubmitting && 'pointer-events-none bg-inputFill-default',
                    )}
                    variant={'fill'}
                    size={'medium'}
                >
                    Thêm sản phẩm{' '}
                    {isLoading ? (
                        <span className='animate-spin'>
                            <AiOutlineLoading />
                        </span>
                    ) : (
                        ''
                    )}
                </Button>
            </form>
        </div>
    );
};

export default NewPost;
