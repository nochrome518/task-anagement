import { Task } from "src/models/task.entity";
import { DataSource } from 'typeorm';

export const TaskRepository = [
	{
		provide: 'TASK_REPOSITORY',
		useFactory: (dataSource: DataSource) => dataSource.getRepository(Task),
		inject: ['DATA_SOURCE'],
	},
];