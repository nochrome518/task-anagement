import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { CreateTaskRequest, TaskMetricsRequest, TaskReportRequest, UpdateTaskRequest } from 'src/models/requests/task.request';
import { Task } from 'src/models/task.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TypeOrmCrudService } from "@nestjsx/crud-typeorm";
import { Messages } from 'src/constants/messages';
import { CommonFunctionService } from 'src/utilities/common.services';
import { Metrics } from 'src/models/enums/metrics.enum';

@Injectable()
export class TasksService extends TypeOrmCrudService<Task> {

    constructor(
        @Inject('TASK_REPOSITORY')
        private taskRepository: Repository<Task>,
        private commonServices: CommonFunctionService
    ){
        super(taskRepository);
    }

    async createTask(taskRequest: CreateTaskRequest): Promise<any> {
        const createTask =  await this.taskRepository.save(taskRequest)
        return this.commonServices.successResponseWithData(Messages.TASK_CREATE,createTask)
    }

    async updateTask(id: number,updateTaskRequest: UpdateTaskRequest): Promise<any> {
        let where = {} as any;
        where.id = id;
        let taskFound = await this.taskRepository.findOne({where});
        if(!taskFound){
            throw new NotFoundException(Messages.TASK_INVALID);
        }

        const mergedTask = Object.assign({}, taskFound, updateTaskRequest)  
        const updateTask = await this.taskRepository.save(mergedTask);
        return this.commonServices.successResponseWithData(Messages.TASK_UPDATE,updateTask)
    }

    async getTaskReport(searchTaskBy: TaskReportRequest): Promise<any> {
        const taskList: TaskReportRequest = searchTaskBy as TaskReportRequest;
        if (searchTaskBy.pageSize) {
            taskList.take = searchTaskBy.pageSize;
        }
        if (searchTaskBy.pageIndex) {
            taskList.skip = (searchTaskBy.pageIndex - 1) * searchTaskBy.pageSize;
        }
        delete taskList.pageIndex;
        delete taskList.pageSize;

        let where:any ={};
        where = Object.assign(where, taskList)
        delete where.skip;
        delete where.take;

        const [result, total, ] = await this.taskRepository.findAndCount({
            where : where,
            take:taskList.take,
            skip:taskList.skip,
            order:{ createdDate:"DESC"}
        });

        return {
            tasks:result,
            total: total,
            count: result.length,
        }
    }

    async getTaskMetrics(taskMetricRequest: TaskMetricsRequest): Promise<any> {
        if(taskMetricRequest.type == Metrics.byStatus){
            const metrics = await this.taskRepository
            .createQueryBuilder('task')
            .select('task.status, COUNT(task.id) as count')
            .groupBy('task.status')
            .getRawMany();
      
            const taskMetrics = {};
            metrics.forEach(metric => {
                taskMetrics[metric.status] = metric.count;
            });
            return taskMetrics;

        } else if(taskMetricRequest.type == Metrics.byDate){
            const metricsByDate = await this.getTaskMetricsByDate();
            return metricsByDate;
        }
    }

    async getTaskMetricsByDate(): Promise<any[]> {
        const metrics = await this.taskRepository
        .createQueryBuilder('task')
        .select('DATE_FORMAT(task.createdDate, "%M %Y") as date, task.status, COUNT(task.id) as count')
        .groupBy('DATE_FORMAT(task.createdDate, "%M %Y"), task.status')
        .getRawMany();
  
        const metricsByDate = {};
  
        metrics.forEach(metric => {
            const date = metric.date;
            if (!metricsByDate[date]) {
            metricsByDate[date] = { open_tasks: 0, inprogress_tasks: 0, completed_tasks: 0 };
            }

            metricsByDate[date][`${metric.status.toLowerCase()}s`] = metric.count;
        });
    
        const result = Object.keys(metricsByDate).map(date => ({
            date,
            metrics: metricsByDate[date],
        }));
  
        return result;
    }
}
