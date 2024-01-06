import { useState } from 'react';
import { MultiSelect, Option } from 'react-multi-select-component';
import './menu.css';
// import Button from '../../../../components/Button';
import { UseFormReturn } from 'react-hook-form';
// import { categoryConfigSchema } from '../../../../lib/types';
// import { zodResolver } from '@hookform/resolvers/zod';
// import { z } from 'zod';
import { FaTrash } from 'react-icons/fa';
const fieldTypes = [
    {
        value: 'input',
        name: 'Input',
    },
    {
        value: 'select',
        name: 'Select',
    },
    {
        value: 'multipleselect',
        name: 'Multiple select',
    },
];

const inputFieldTypes = [
    {
        value: 'text',
        name: 'Văn bản',
    },
    {
        value: 'textarea',
        name: 'Đoạn văn',
    },
    {
        value: 'file',
        name: 'Tệp tin',
    },
];

const InputFieldConfig = ({
    setFieldName,
    setFieldType,
    setFieldOptions,
    deleteField,
    index,
}: {
    setFieldName: Function;
    setFieldType: Function;
    setFieldOptions: Function;
    deleteField: Function;
    index: number;
    form: UseFormReturn<any>;
}) => {
    const [name, setName] = useState<string>();
    const [selectedFieldType, setSelectedFieldType] = useState<string | null>(null);
    const [selectedInput, setSelectedInput] = useState<string>('');
    const [selectFields, setSelectFields] = useState<Option[]>([]);
    const handleFieldTypeChange = (value: string) => {
        console.log('data');
        setSelectedFieldType(() => value);
        setFieldType(index, value);
        setSelectFields([]);
        setFieldOptions(index, []);
    };
    return (
        <div className='mb-4 mr-3 flex grid-flow-row grid-cols-4 gap-3'>
            <input
                value={name}
                onChange={(e) => {
                    setName(e.target.value);
                    setFieldName(index, e.target.value);
                }}
                type='text'
                placeholder='Tên trường'
                className='input input-bordered w-full max-w-xs'
            />

            <select
                value={selectedFieldType ?? ''}
                onChange={(e) => handleFieldTypeChange(e.target.value)}
                className='select select-bordered w-full max-w-xs'
                placeholder='Chọn loại thuộc tính'
            >
                {fieldTypes.map((item) => (
                    <option key={item.value} value={item.value}>
                        {item.name}
                    </option>
                ))}
            </select>
            <div className='w-full'>
                {selectedFieldType === 'input' && (
                    <select
                        value={selectedInput}
                        onChange={(e) => {
                            setSelectedInput(e.target.value);
                            setFieldOptions(index, e.target.value);
                        }}
                        placeholder='Loại giá trị'
                        className='select select-bordered w-full '
                    >
                        {inputFieldTypes.map((item) => (
                            <option key={item.value} value={item.value}>
                                {item.name}
                            </option>
                        ))}
                    </select>
                )}

                {(selectedFieldType == 'select' || selectedFieldType == 'multipleselect') && (
                    <div className='max-w-sx flex h-[50px] w-full'>
                        <MultiSelect
                            className='max-w-sx w-full'
                            options={[]}
                            value={selectFields}
                            onChange={(value: any) => {
                                setSelectFields(value);
                                setFieldOptions(index, value);
                            }}
                            labelledBy='Thêm giá trị'
                            isCreatable
                        />
                    </div>
                )}
            </div>
            <div onClick={() => deleteField(index)} className='flex h-[10px] w-[10px] items-center'>
                <FaTrash />
            </div>
        </div>
    );
};

export default InputFieldConfig;
