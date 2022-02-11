import { PartialType } from '@nestjs/mapped-types';
import { TaskStatus } from '../tasks.status.enum';
import { CreateTaskDto } from './create-task.dto';

export class UpdateTaskDto extends PartialType(CreateTaskDto) {
  status: TaskStatus;
}
