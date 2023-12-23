import { z } from 'zod';
// Schema for validation using zod
export const signupSchema = z
    .object({
        firstname: z.string().min(1, 'Tên không được bỏ trống.'),
        lastname: z.string(),
        username: z.string().min(1, 'Tên đăng nhập không được bỏ trống.'),
        phone: z
            .string()
            .min(1, 'Số điện thoại không được bỏ trống.')
            .max(10, 'Số điện thoại không hợp lệ')
            .startsWith('0', 'Số điện thoại phải bắt đầu bằng 0'),
        email: z.string().min(1, 'Email không được bỏ trống.').email('Email không hợp lệ.'),
        password: z
            .string()
            .min(8, 'Mật khẩu phải bao gồm ít nhất 8 ký tự.')
            .regex(/^(?=.*[A-Za-z])/, 'Mật khẩu gồm ít nhất một chữ cái.')
            .regex(/^(?=.*[A-Z])/, 'Mật khẩu gồm ít nhất một ký tự in hoa')
            .regex(/^(?=.*\d)/, 'Mật khẩu gồm ít nhất một số.')
            .regex(/^(?=.*[@$!%*?&])/, 'Mật khẩu gồm ít nhất một ký tự đặc biệt'),
        confirmPassword: z.string(),
        address: z.string(),
    })
    .refine((data) => data.confirmPassword === data.password, {
        message: 'Mật khẩu không trùng khớp.',
        path: ['confirmPassword'],
    });
// This type used for validation register name of input
export type TSignupSchema = z.infer<typeof signupSchema>;

export const loginSchema = z.object({
    email: z.string(),
    password: z.string().min(8, 'Mật khẩu phải bao gồm ít nhất 8 ký tự.'),
});
export type TLoginSchema = z.infer<typeof loginSchema>;
