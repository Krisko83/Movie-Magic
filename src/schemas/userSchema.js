import * as z from 'zod';

export const UserCreateSchema = z.object({
    name: z.string()
        .min(5, { error: 'Name must be at least 5 characters long!' })
        .regex(/^[A-Za-z0-9 ]+$/, { error: 'Name can only contain letters, numbers and whitespaces!' }),
    age: z.coerce.number()
        .min(1, { error: 'Age must be greater then or equal to 1' })
        .max(120, { error: 'Age must be less then or equal to 120' }),
    born: z.string()
        .min(10, { error: 'Born must be at least 10 characters long!' })
        .regex(/^[A-Za-z0-9 ]+$/, { error: 'Born can only contain letters, numbers and whitespaces!' }),
    character: z.string()
        .min(5, { error: 'Character must be at least 5 characters long!' })
        .regex(/^[A-Za-z0-9 ]+$/, { error: 'Character can only contain letters, numbers and whitespaces!' }),
    imageUrl: z.string()
        .regex(/^Https?:\/\//, { error: 'Image URL must start http:// or https://' })

})