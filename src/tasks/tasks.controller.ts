import { Body, Controller, Param, Patch, Post, Req } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskRequest, TaskMetricsRequest, TaskReportRequest, UpdateTaskRequest } from 'src/models/requests/task.request';
import { CommonFunctionService } from 'src/utilities/common.services';
import { Messages } from 'src/constants/messages';
import { ApiTags } from '@nestjs/swagger';

@Controller('tasks')
export class TasksController {

    constructor(
        private tasksService: TasksService,
        private commonServices: CommonFunctionService
    ){}
    
    @Post('create')
    async createTask(@Body() taskRequest: CreateTaskRequest, @Req() req:Request): Promise<any> {
        return await this.tasksService.createTask(taskRequest);
    }

    @Patch(':id')
    async updateTask(@Param('id') id: number, @Body() updateTaskRequest: UpdateTaskRequest): Promise<any> {
        return await this.tasksService.updateTask(id, updateTaskRequest);
    }

    @Post('report')
    async getTaskList(@Body() searchTaskBy: TaskReportRequest, @Req() req:Request): Promise<any> {
        const taskReport = await this.tasksService.getTaskReport(searchTaskBy);
        if(taskReport.tasks.length!=0){
            return this.commonServices.successResponseWithData(Messages.DATA_RETRIEVE,taskReport)
        } else {
            return this.commonServices.successResponse(Messages.NO_DATA_FOUND)
        }
    }

    @Post('metrics')
    async getTaskMetrics(@Body() taskMetricRequest: TaskMetricsRequest) {
        const taskMetrices =  await this.tasksService.getTaskMetrics(taskMetricRequest);
        return this.commonServices.successResponseWithData(Messages.DATA_RETRIEVE,taskMetrices)
    }
    
}
