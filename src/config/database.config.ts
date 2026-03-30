import { z } from 'zod';
import { registerConfig } from '@proventuslabs/nestjs-zod';

const dbConfigSchema = z
    .object({
        POSTGRES_HOST: z
            .string()
            .default('localhost')
            .describe('Database host'),
        POSTGRES_PORT: z.coerce
            .number<string | undefined>()
            .int()
            .optional()
            .default(5432)
            .describe('Database port'),
        POSTGRES_USER: z.string().default('user').describe('Database username'),
        POSTGRES_PASSWORD: z
            .string()
            .default('password')
            .describe('Database password'),
        POSTGRES_DB: z.string().default('lune').describe('Database name'),
    })
    .required();

export const dbConfig = registerConfig('db', dbConfigSchema);
