import * as z from 'zod';
import userRepository from '../repositories/userRepository';

export const UserCreateSchema = z.object({
    email: z.string()
        .email({ error: 'Invalid email!' })
        .min(10, { error: 'Email must be at least 10 characters long!' })
        .refine(async (email) => {
            const user = await userRepository.getUser(email)
            return !user;
        }, { error: 'Email already exists!' }),
    password: z.string()
        .min(6, { error: 'Password must be at least 6 characters long!' })
        .regex(/^[A-Za-z0-9]+$/, { error: 'Password can only contain letters, numbers and spawhitespacesces!' }),
    repeatPassword: z.string()
}).refine((data) => data.password === data.repeatPassword, {
    error: 'Passwords do not match',
    path: ['RepeatPassword']
}).transform(({ repeatPassword, ...data }) => data);



export const UserLoginSchema = z.object({
    email: z.string()
        .email({ error: 'Invalid email!' })
        .min(10, { error: 'Email must be at least 10 characters long!' })
        .refine(async (email) => {
            const user = await userRepository.getUser(email)
            return user;
        }, { error: 'Email does not exists!' }),
    password: z.string()
        .min(6, { error: 'Password must be at least 6 characters long!' })
})
