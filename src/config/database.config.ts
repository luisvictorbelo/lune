import { z } from 'zod';
import { registerConfig } from '@proventuslabs/nestjs-zod';

const dbConfigSchema = z.object({
    host: z.string().default('localhost').describe('Database host'),
    port: z.coerce.number<string | undefined>().int().optional().default(5432).describe('Database port'),
    username: z.string().default('user').describe('Database username'),
    password: z.string().default('password').describe('Database password'),
    database: z.string().default('lune').describe('Database name'),
});

export const dbConfig = registerConfig('db', dbConfigSchema);
