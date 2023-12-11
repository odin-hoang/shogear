import { FaCaretDown, FaSortAmountDown, FaSortAmountUp } from 'react-icons/fa';

type ButtonProps = {
    children: string;
    price?: string | null;
};
const Button = ({ children, price = null }: ButtonProps) => {
    return (
        <button className='flex items-center gap-1 rounded-3xl border px-2 py-1 hover:bg-secondary-default/20'>
            <span>{children} </span>
            <span className='h-5 w-5  text-lg'>
                {price ? price === 'asc' ? <FaSortAmountUp /> : <FaSortAmountDown /> : <FaCaretDown />}
            </span>
        </button>
    );
};

export default Button;
