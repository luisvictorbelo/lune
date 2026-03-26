import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { EnvModule } from '@/env/env.module.js';
import { envSchema } from './config/env.js';

@Module({
    imports: [ConfigModule.forRoot({
        validate: (env) => envSchema.parse(env),
        isGlobal: true,
    }), EnvModule],
})

export class AppModule { }