import { FaCaretDown, FaSortAmountDown, FaSortAmountUp } from 'react-icons/fa';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../lib/utils/cn';
import { forwardRef } from 'react';
export type ButtonVariantProps = VariantProps<typeof buttonVariants>;
export const buttonVariants = cva('flex items-center px-2 py-1 gap-2 ', {
    variants: {
        variant: {
            default: 'bg-white hover:bg-secondary-default/20 rounded-3xl border gap-1',
            basic: 'rounded-3xl border bg-bodyBg-default',
            outline: 'border rounded-md text-primary-900 border-2 font-medium',
            fill: ' bg-primary-default text-white rounded-md font-bold',
            fillBlue: 'bg-sub-default text-bold text-white rounded-md',
            outlineBlue: ' rounded-md ring w-full',
        },
        size: {
            default: '',
            medium: 'h-12 text-lg',
        },
    },
    defaultVariants: {
        variant: 'default',
        size: 'default',
    },
});
export interface ButtonProps extends ButtonVariantProps, React.ComponentPropsWithRef<'button'> {
    children: React.ReactNode;
    price?: string | null;
}
const Button = forwardRef<HTMLButtonElement, ButtonProps>(
    ({ children, price = null, variant = 'default', size = 'default', className, ...rest }: ButtonProps, ref) => {
        return (
            <button ref={ref} className={cn(buttonVariants({ variant, size, className }))} {...rest}>
                {children}
                {!!(variant === 'default') && (
                    <span className='h-5 w-5  text-lg'>
                        {price ? (
                            price === 'asc' ? (
                                <FaSortAmountUp />
                            ) : price === 'desc' ? (
                                <FaSortAmountDown />
                            ) : (
                                ''
                            )
                        ) : (
                            <FaCaretDown />
                        )}
                    </span>
                )}
            </button>
        );
    },
);

export default Button;
