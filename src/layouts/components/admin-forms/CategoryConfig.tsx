import { useEffect, useState } from 'react';
import InputFielldConfig from './components/InputFielldConfig';
import { useForm } from 'react-hook-form';
import { categoryConfigSchema } from '../../../lib/types';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import Button from '../../../components/Button';

const CategoryConfig = () => {
    const form = useForm<z.infer<typeof categoryConfigSchema>>({
        resolver: zodResolver(categoryConfigSchema),
    });
    const onSubmit = async (data: z.infer<typeof categoryConfigSchema>) => {
        // TODO: submit to server
        console.log(data);
    };
    const [fieldConfigs, setFieldConfigs] = useState<any>([]);
    const setFieldName = (index: any, value: any) => {
        const updateFieldConfigs = [...fieldConfigs];
        updateFieldConfigs[index].fieldName = value;
        setFieldConfigs(updateFieldConfigs);
    };
    const setFieldType = (index: any, value: any) => {
        const updateFieldConfigs = [...fieldConfigs];
        updateFieldConfigs[index].fieldType = value;
        setFieldConfigs(updateFieldConfigs);
    };
    const setFieldOption = (index: any, value: any) => {
        const updateFieldConfigs = [...fieldConfigs];
        updateFieldConfigs[index].options = value;
        setFieldConfigs(updateFieldConfigs);
    };
    const addFieldConfig = () => {
        const updateFieldConfigs = [...fieldConfigs];
        updateFieldConfigs.push({
            fieldName: '',
            fieldType: '',
            options: [],
        });
        setFieldConfigs(updateFieldConfigs);
    };
    const deleteField = (index: number) => {
        const updateFieldConfigs = [...fieldConfigs];
        updateFieldConfigs.splice(index, 1);
        setFieldConfigs(updateFieldConfigs);
    };
    const options = [
        {
            name: 'Máy tính',
            _id: '1',
        },
        {
            name: 'Bàn phím',
            _id: '2',
        },
    ];
    useEffect(() => {
        form.setValue('fields', fieldConfigs);
    }, [fieldConfigs]);
    return (
        <div>
            <form onSubmit={form.handleSubmit(onSubmit)}>
                {/* <div>{JSON.stringify(form.formState.errors)}</div>
                <div>{JSON.stringify(form.getValues())}</div> */}
                <div className='mb-4 flex max-w-lg gap-4'>
                    <select
                        {...form.register('categoryName')}
                        className='select select-bordered w-full max-w-xs'
                        placeholder='Chọn loại sản phẩm'
                    >
                        {options.map((item) => (
                            <option key={item._id} value={item.name}>
                                {item.name}
                            </option>
                        ))}
                    </select>
                    <Button type='button' onClick={() => addFieldConfig()}>
                        Thêm thuộc tính
                    </Button>
                </div>

                {fieldConfigs.map((index: number) => {
                    return (
                        <>
                            <InputFielldConfig
                                key={index}
                                setFieldName={setFieldName}
                                setFieldType={setFieldType}
                                setFieldOptions={setFieldOption}
                                deleteField={deleteField}
                                index={index}
                                form={form}
                            />
                            {form.formState.errors?.fields?.[index] && (
                                <p className='mt-3 text-red-600'>Thông tin không hợp lệ</p>
                            )}
                        </>
                    );
                })}
            </form>
        </div>
    );
};

export default CategoryConfig;
