import { useState } from 'react';
// import Select from 'react-tailwindcss-select';
import { Option } from 'react-tailwindcss-select/dist/components/type';
import { MultiSelect } from 'react-multi-select-component';

const options: Array<Option> = [
    // { label: 'Grapes 🍇', value: 'grapes' },
    // { label: 'Mango 🥭', value: 'mango' },
    // { label: 'Strawberry 🍓', value: 'strawberry', disabled: true },
];

const MultipleSelect = () => {
    const [values, setValues] = useState<Option[]>([]);

    return (
        <div className='border-1 h-[100px] w-full border focus:ring-gray-300'>
            <MultiSelect options={options} value={values} onChange={setValues} labelledBy='Select' isCreatable />
        </div>
    );
};

export default MultipleSelect;
