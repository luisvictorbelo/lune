import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module.js';

async function bootstrap() {
	const app = await NestFactory.create(AppModule);
	
	app.getHttpAdapter().get('/health', (_req, res) => {
		res.status(200).json({
			status: 'ok',
			timestamp: new Date().toISOString(),
			uptime: process.uptime()
		});
	});

	await app.listen(3000);

}

bootstrap();
