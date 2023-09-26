import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TasksModule } from './tasks/tasks.module';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import applicationConfig from 'src/config/application.config'
require('dotenv').config();

@Module({
	imports: [TasksModule],
	controllers: [AppController],
	providers: [AppService],
})
export class AppModule {}
