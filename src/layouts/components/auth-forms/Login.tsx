import { useForm } from 'react-hook-form';
import Button from '../../../components/Button';
import React from 'react';
import { LuLogIn } from 'react-icons/lu';
import { Link } from 'react-router-dom';
import { FaFacebook, FaGoogle } from 'react-icons/fa';
import { cn } from '../../../lib/utils/cn';
import { AiOutlineLoading } from 'react-icons/ai';
import { zodResolver } from '@hookform/resolvers/zod';
import { TLoginSchema, loginSchema } from '../../../lib/types';
interface LoginFormProps extends React.ComponentPropsWithRef<'form'> {
    onLoginModal: () => void;
}

const Login = ({ onLoginModal }: LoginFormProps) => {
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
        reset,
    } = useForm<TLoginSchema>({
        resolver: zodResolver(loginSchema),
    });
    const onSubmit = async (data: TLoginSchema) => {
        // TODO: submit to server
        await new Promise((resolve) => setTimeout(resolve, 3000));
        console.log(data);
        reset();
    };
    return (
        <>
            <form onSubmit={handleSubmit(onSubmit)}>
                <h1 className='mb-10'>Đăng nhập hoặc tạo tài khoản</h1>
                <input
                    {...register('email')}
                    type='text'
                    placeholder='Tên đăng nhập hoặc email'
                    className='input mb-2  w-full bg-gray-100'
                />
                {errors.email && <p className='mb-4 text-state-error'>{`*${errors.email.message}`}</p>}
                <input
                    {...register('password')}
                    type='password'
                    placeholder='Mật khẩu'
                    className='input mb-4 w-full bg-gray-100'
                />
                {errors.password && <p className='mb-4 text-state-error'>{`*${errors.password?.message}`}</p>}
                <Link to={'/'} className='float-right mb-4 underline'>
                    Quên mật khẩu?
                </Link>
                <Button
                    disabled={isSubmitting}
                    className={cn('w-full justify-center font-normal ', isSubmitting && 'bg-inputFill-default')}
                    variant={'fill'}
                    size={'medium'}
                >
                    Đăng nhập{' '}
                    {isSubmitting ? (
                        <span className='animate-spin'>
                            <AiOutlineLoading />
                        </span>
                    ) : (
                        <LuLogIn />
                    )}
                </Button>
            </form>
            <div className='divider'>hoặc đăng nhập bằng</div>
            <div className='flex items-center gap-4'>
                <Button variant={'fill'} className='w-full justify-center opacity-90 hover:opacity-100'>
                    <FaGoogle /> Google
                </Button>
                <Button variant={'fillBlue'} className='w-full justify-center opacity-90 hover:opacity-100'>
                    <FaFacebook /> Facebook
                </Button>
            </div>

            <p className='mt-4 text-center'>
                Bạn chưa có tài khoản?{' '}
                <span className='link link-primary' onClick={onLoginModal}>
                    Đăng ký ngay
                </span>
            </p>
        </>
    );
};

export default Login;
