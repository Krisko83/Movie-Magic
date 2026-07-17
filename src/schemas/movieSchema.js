
import { title } from 'node:process';
import * as z from 'zod';

export const CreateMovieSchema = z.object({
    title: z.string()
        .min(5, { message: 'Title must be at least 5 characters long!' })
        .regex(/^[A-Za-z0-9 ]+$/, { error: 'Title can only contain letters, numbers and whitespaces!' }),
    category: z.enum(['tv-show', 'animation', 'movie', 'documentary', 'short-film'], { error: 'Category must be one of TV Show, Animation, Movie, Documentary or Short Film' }),
    genre: z.string()
        .min(5, { error: 'Genre must be at least 5 characters long!' })
        .regex(/^[A-Za-z0-9 ]+$/, { error: 'Genre can only contain letters, numbers and whitespaces!' }),
    director: z.string()
        .min(5, { error: 'Director must be at least 5 characters long!' })
        .regex(/^[A-Za-z0-9 ]+$/, { error: 'Director can only contain letters, numbers and spawhitespacesces!' }),
    year: z.coerce.number()
        .min(1900, { error: 'Year must be greater ot equal to 1900' })
        .max((new Date).getFullYear(), { error: `Year must be less then or equal to ${(new Date).getFullYear()}!` }),
    imageUrl: z.string()
        .regex(/^https?:\/\//, { error: 'Image URL must start http:// or https://' }),
    rating: z.coerce.number()
        .min(1, { error: 'Rating must be greater than or equal to 1' })
        .max(10, { error: 'Rating must be less then or equal to 10' }),
    description: z.string()
        .min(20, { error: 'Desciption must be at least 20 characters long!' })
        .regex(/^[A-Za-z0-9 ]+$/, { error: 'Desciption can only contain letters, numbers and whitespaces!' })
});