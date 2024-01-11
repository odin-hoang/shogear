import { useForm } from 'react-hook-form';
import Button from '../../../components/Button';
import React from 'react';
import { LuLogIn } from 'react-icons/lu';

// import { FaFacebook, FaGoogle } from 'react-icons/fa';
import { cn } from '../../../lib/utils/cn';
import { AiOutlineLoading } from 'react-icons/ai';

import { zodResolver } from '@hookform/resolvers/zod';
import { TSignupSchema, signupSchema } from '../../../lib/types';
import { registerUser } from '../../../services/loginService';
import { toast } from 'react-toastify';

interface SignupFormProps extends React.ComponentPropsWithRef<'form'> {
    onLoginModal: () => void;
}

const Signup = ({ onLoginModal }: SignupFormProps) => {
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
        reset,
    } = useForm<TSignupSchema>({
        resolver: zodResolver(signupSchema),
    });
    const onSubmit = async (data: TSignupSchema) => {
        // TODO: submit to server
        const user = await registerUser(data);
        if (user) {
            onLoginModal();
            reset();
            toast.success('Đăng ký tài khoản thành công!');
        } else {
            toast.error('Đăng ký không thành công');
        }
    };
    return (
        <>
            <form onSubmit={handleSubmit(onSubmit)}>
                <h1 className=' mb-10'>Đăng ký tài khoản SHOGEAR</h1>
                <input
                    {...register('lastName')}
                    type='text'
                    placeholder='Họ và tên đệm'
                    className='input mb-2 w-1/2 bg-gray-100'
                />
                {errors.lastName && <p className='mb-4 text-state-error'>{`*${errors.lastName.message}`}</p>}
                <input
                    {...register('firstName')}
                    type='text'
                    placeholder='Tên *'
                    className='input float-right mb-2 w-[calc(50%-16px)] bg-gray-100'
                />
                {errors.firstName && <p className='mb-4 text-state-error'>{`*${errors.firstName.message}`}</p>}
                <input
                    {...register('username')}
                    type='text'
                    placeholder='Tên đăng nhập *'
                    className='input mb-2  w-full bg-gray-100'
                />
                {errors.username && <p className='mb-4 text-state-error'>{`*${errors.username.message}`}</p>}
                <input
                    {...register('phone')}
                    type='text'
                    placeholder='Số điện thoại *'
                    className='input mb-2  w-full bg-gray-100'
                />
                {errors.phone && <p className='mb-4 text-state-error'>{`*${errors.phone.message}`}</p>}
                <input
                    {...register('email')}
                    type='text'
                    placeholder='Email *'
                    className='input mb-2  w-full bg-gray-100'
                />
                {errors.email && <p className='mb-4 text-state-error'>{`*${errors.email.message}`}</p>}
                <input
                    {...register('password')}
                    type='password'
                    placeholder='Mật khẩu *'
                    className='input mb-2 w-full bg-gray-100'
                />
                {errors.password && <p className='mb-4 text-state-error'>{`*${errors.password?.message}`}</p>}
                <input
                    {...register('confirmPassword')}
                    type='password'
                    placeholder='Nhập lại mật khẩu *'
                    className='input mb-2 w-full bg-gray-100'
                />
                {errors.confirmPassword && (
                    <p className='mb-4 text-state-error'>{`*${errors.confirmPassword?.message}`}</p>
                )}
                <input
                    {...register('address')}
                    type='textarea'
                    placeholder='Địa chỉ'
                    className='input mb-4  w-full bg-gray-100'
                />
                {errors.address && <p className='mb-4 text-state-error'>{`*${errors.address.message}`}</p>}
                <Button
                    disabled={isSubmitting}
                    className={cn('w-full justify-center font-normal ', isSubmitting && 'bg-inputFill-default')}
                    variant={'fill'}
                    size={'medium'}
                >
                    Tạo tài khoản{' '}
                    {isSubmitting ? (
                        <span className='animate-spin'>
                            <AiOutlineLoading />
                        </span>
                    ) : (
                        <LuLogIn />
                    )}
                </Button>
            </form>
            {/* <div className='divider'>hoặc đăng ký bằng</div>
            <div className='flex items-center gap-4'>
                <Button variant={'fill'} className='w-full justify-center opacity-90 hover:opacity-100'>
                    <FaGoogle /> Google
                </Button>
                <Button variant={'fillBlue'} className='w-full justify-center opacity-90 hover:opacity-100'>
                    <FaFacebook /> Facebook
                </Button>
            </div> */}

            <p className='mt-4 text-center'>
                Bạn đã có tài khoản?{' '}
                <span onClick={onLoginModal} className='link link-primary'>
                    Đăng nhập
                </span>
            </p>
        </>
    );
};

export default Signup;
