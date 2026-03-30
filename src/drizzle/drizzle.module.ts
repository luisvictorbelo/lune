import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

export const DRIZZLE = Symbol('drizzle connection');

@Module({
    providers: [
        {
            provide: DRIZZLE,
            inject: [ConfigService],
            useFactory: async (configService: ConfigService) => {
                const databaseURL = configService.get('db.url')
            }
        }
    ]
})