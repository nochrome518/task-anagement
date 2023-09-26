import { IsIn, IsNotEmpty, IsOptional } from "class-validator";
import { Status } from "../enums/status.enum";
import { Metrics } from "../enums/metrics.enum";

export class CreateTaskRequest {
    @IsNotEmpty() title: string;
    @IsOptional() description: string;
}

export class UpdateTaskRequest {
    @IsOptional() title: string;
    @IsOptional() description: string;
    @IsOptional() @IsIn([Status.inProgressTask, Status.completedTask]) status: string; 
}

export class TaskReportRequest {
    id: number
    title: string;
    description: string;
    @IsOptional() @IsIn([Status.openTask, Status.inProgressTask, Status.completedTask]) status: string; 
    pageSize: number;
    pageIndex: number;
    take: number;
    skip: number;
}

export class TaskMetricsRequest {
    @IsNotEmpty() @IsIn([Metrics.byDate, Metrics.byStatus]) type: string;
}