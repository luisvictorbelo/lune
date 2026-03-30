import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module.js';
import { AppService } from './app.service.js';
import { Logger } from 'nestjs-pino';

async function bootstrap() {
    const app = await NestFactory.create(AppModule, { bufferLogs: true });
    const logger = app.get(Logger);
    const port = app.get(AppService).getAppConfig().port;

    app.useLogger(logger);
    app.getHttpAdapter().get('/health', (_req, res) => {
        res.status(200).json({
            status: 'ok',
            timestamp: new Date().toISOString(),
            uptime: process.uptime(),
        });
    });

    await app.listen(port);

    logger.log(`Application is running on: http://localhost:${port}`);
    logger.log(
        `Health check endpoint available at: http://localhost:${port}/health`,
    );
}

bootstrap();
