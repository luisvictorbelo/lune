import { defineConfig } from 'drizzle-kit';
import { ConfigService } from '@nestjs/config';

const configService = new ConfigService();

const dbConfig = {
    host: configService.get('db.POSTGRES_HOST'),
    port: configService.get('db.POSTGRES_PORT'),
    user: configService.get('db.POSTGRES_USER'),
    password: configService.get('db.POSTGRES_PASSWORD'),
    database: configService.get('db.POSTGRES_DB'),
};

export default defineConfig({
    schema: './src/db/schemas/**.ts',
    out: './drizzle',
    dialect: 'postgresql',
    dbCredentials: {
        url: `postgresql://${dbConfig.user}:${dbConfig.password}@${dbConfig.host}:${dbConfig.port}/${dbConfig.database}`,
    },
});
