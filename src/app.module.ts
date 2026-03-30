import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { appConfig } from './config/app.config.js';
import { AppService } from './app.service.js';
import { LoggerModule } from 'nestjs-pino';
import { DatabaseModule } from './db/database.module.js';

@Module({
    imports: [
        ConfigModule.forRoot({
            load: [appConfig],
            isGlobal: true,
            envFilePath: '.env.local',
            expandVariables: true,
        }),
        LoggerModule.forRootAsync({
            inject: [ConfigService],
            useFactory: (config: ConfigService) => {
                const nodeEnv = config.get('app.NODE_ENV') ?? 'development';

                return {
                    pinoHttp: {
                        level:
                            nodeEnv === 'production'
                                ? 'info'
                                : nodeEnv === 'test'
                                  ? 'warn'
                                  : 'debug',
                        transport:
                            nodeEnv === 'development'
                                ? {
                                      target: 'pino-pretty',
                                      options: {
                                          colorize: true,
                                          singleLine: true,
                                      },
                                  }
                                : undefined,
                    },
                };
            },
        }),
        DatabaseModule.forRootAsync({
            imports: [ConfigModule],
            inject: [ConfigService],
            useFactory: (configService: ConfigService) => {
                return {
                    host: configService.get('db.POSTGRES_HOST') ?? 'localhost',
                    port: configService.get('db.POSTGRES_PORT') ?? 5432,
                    user: configService.get('db.POSTGRES_USER') ?? 'postgres',
                    password: configService.get('db.POSTGRES_PASSWORD') ?? '',
                    database: configService.get('db.POSTGRES_DB') ?? 'postgres',
                };
            },
        }),
    ],
    providers: [AppService],
})
export class AppModule {}
