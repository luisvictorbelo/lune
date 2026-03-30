import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { appConfig } from './config/app.config.js';
import { AppService } from './app.service.js';
import { LoggerModule } from 'nestjs-pino';

@Module({
    imports: [
        ConfigModule.forRoot({
            load: [appConfig],
            isGlobal: true,
            envFilePath: '.env.local'
        }),
        LoggerModule.forRootAsync({
            inject: [ConfigService],
            useFactory: (config: ConfigService) => {
                const nodeEnv = config.get('app.node_env') ?? 'development';

                return {
                    pinoHttp: {
                        level:
                            nodeEnv === 'production' ? 'info' :
                                nodeEnv === 'test' ? 'warn' :
                                    'debug',
                        transport:
                            nodeEnv === 'development'
                                ? {
                                    target: 'pino-pretty',
                                    options: { colorize: true, singleLine: true },
                                }
                                : undefined,
                    }
                }
            }
        })
    ],
    providers: [AppService]
})

export class AppModule { }