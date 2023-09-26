import { Module } from '@nestjs/common';
import { TasksController } from './tasks.controller';
import { TasksService } from './tasks.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TaskRepository } from './tasks.repository';
import { DatabaseModule } from 'src/provider/database.module';
import { CommonFunctionService } from 'src/utilities/common.services';

@Module({
	imports: [DatabaseModule],
	controllers: [TasksController],
	providers: [TasksService,...TaskRepository, CommonFunctionService]
})
export class TasksModule {}
