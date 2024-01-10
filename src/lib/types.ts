import { z } from 'zod';
// Schema for validation using zod
export const signupSchema = z
    .object({
        firstName: z.string().min(1, 'Tên không được bỏ trống.'),
        lastName: z.string(),
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
        address: z.string().min(1, 'Địa chỉ không được bỏ trống.'),
    })
    .refine((data) => data.confirmPassword === data.password, {
        message: 'Mật khẩu không trùng khớp.',
        path: ['confirmPassword'],
    });
// This type used for validation register name of input
export type TSignupSchema = z.infer<typeof signupSchema>;

export const loginSchema = z.object({
    email: z.string().min(1, 'Tài khoản không được bỏ trống.'),
    password: z.string().min(8, 'Mật khẩu phải bao gồm ít nhất 8 ký tự.'),
});
export const categoryConfigSchema = z.object({
    categoryName: z.string().min(1, 'Bạn chưa chọn loại sản phẩm'),
    fields: z.array(
        z.object({
            fieldName: z.string().min(1, 'Tên trường không được để trống'),
            fieldType: z.string().min(1, 'Loại trường không được để trống'),
            options: z.custom(),
        }),
    ),
});
export const productSchema = z.object({
    category: z.string(),
    name: z.string().min(1, 'Trường này là bắt buộc'),
    description: z.string().min(1, 'Trường này là bắt buộc'),
    price: z.number(),
    count: z.number(),
    createDate: z.date(),
    status: z.string(),
    fields: z.array(
        z
            .object({
                field: z.string(),
                value: z.string(),
            })
            .refine((data) => {
                if (data.value != '') return true;
                else return false;
            }),
    ),
    zone: z.string(),
    // images: z.custom().array(),
});
export type TLoginSchema = z.infer<typeof loginSchema>;
