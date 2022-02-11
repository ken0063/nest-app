import { IsEnum, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { TaskStatus } from '../tasks.status.enum';

export class GetTasksFilterDto {
  @IsEnum(TaskStatus)
  @IsOptional()
  status?: TaskStatus;

  @IsNotEmpty()
  @IsString()
  @IsOptional()
  search?: string;
}
