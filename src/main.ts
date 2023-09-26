import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { GlobalExceptionFilter } from './utilities/exception-filter';

async function bootstrap() {
	const app = await NestFactory.create(AppModule);
	const options = new DocumentBuilder()
    .setTitle('API')
    .setDescription('Your API Description')
    .setVersion('1.0')
    .build();
	
	const document = SwaggerModule.createDocument(app, options);
	SwaggerModule.setup('api', app, document);
	app.useGlobalPipes(new ValidationPipe());
	app.useGlobalFilters(new GlobalExceptionFilter());
	await app.listen(8888);
}
bootstrap();
