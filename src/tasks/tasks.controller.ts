import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  UseGuards,
  Logger,
} from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';
import { UpdateTaskStatusDto } from './dto/update-task-status.dto';
import { Task } from './entities/task.entity';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from 'src/auth/get-user-decorator';
import { Auth } from 'src/auth/entities/auth.entity';

@Controller('tasks')
@UseGuards(AuthGuard())
export class TasksController {
  private logger = new Logger('TasksController');
  constructor(private tasksService: TasksService) {}

  @Post()
  createTask(
    @Body() createTaskDto: CreateTaskDto,
    @GetUser() auth: Auth,
  ): Promise<Task> {
    this.logger.verbose(
      `User "${auth.userName}" creating a new task.Data ${JSON.stringify(
        createTaskDto,
      )}`,
    );
    return this.tasksService.createTask(createTaskDto, auth);
  }

  @Get()
  getTasks(
    @Query() filterDto: GetTasksFilterDto,
    @GetUser() auth: Auth,
  ): Promise<Task[]> {
    this.logger.verbose(
      `User "${auth.userName}" retrieving all tasks.Filters ${JSON.stringify(
        filterDto,
      )}`,
    );
    return this.tasksService.getTasks(filterDto, auth);
  }

  @Get('/:id')
  getTaskById(@Param('id') id: string, @GetUser() auth: Auth): Promise<Task> {
    return this.tasksService.getTaskById(id, auth);
  }

  @Patch('/:id/title')
  updateTaskTitle(
    @Param('id') id: string,
    @Body() updateTaskDto: UpdateTaskDto,
    @GetUser() auth: Auth,
  ): Promise<Task> {
    return this.tasksService.updateTaskTitle(id, updateTaskDto, auth);
  }

  @Patch('/:id/status')
  updateTaskStatus(
    @Param('id') id: string,
    @Body() updateTaskStatusDto: UpdateTaskStatusDto,
    @GetUser() auth: Auth,
  ): Promise<Task> {
    return this.tasksService.updateTaskStatus(id, updateTaskStatusDto, auth);
  }

  @Patch('/:id/description')
  updateTaskDescription(
    @Param('id') id: string,
    @Body() updateTaskDto: UpdateTaskDto,
    @GetUser() auth: Auth,
  ): Promise<Task> {
    return this.tasksService.updateTaskDescription(id, updateTaskDto, auth);
  }

  @Delete('/:id')
  deleteTask(@Param('id') id: string, @GetUser() auth: Auth): Promise<void> {
    return this.tasksService.deleteTask(id, auth);
  }
}
