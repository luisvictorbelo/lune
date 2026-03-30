import { registerConfig } from '@proventuslabs/nestjs-zod';
import { z } from 'zod';

const appConfigSchema = z.object({
    PORT: z.coerce
        .number<string | undefined>()
        .int()
        .optional()
        .default(3000)
        .describe('The local HTTP port to bind the server to'),
    NODE_ENV: z
        .enum(['development', 'production', 'test'])
        .default('development')
        .describe('The application environment'),
});

export const appConfig = registerConfig('app', appConfigSchema);
