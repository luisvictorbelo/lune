import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module.js';
import { EnvService } from './env/env.service.js';

async function bootstrap() {
	const app = await NestFactory.create(AppModule);

	const configService = app.get(EnvService);

	const port = configService.get('PORT');

	app.getHttpAdapter().get('/health', (_req, res) => {
		res.status(200).json({
			status: 'ok',
			timestamp: new Date().toISOString(),
			uptime: process.uptime()
		});
	});

	await app.listen(port);

}

bootstrap();
