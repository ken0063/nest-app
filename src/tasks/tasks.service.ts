/* eslint-disable @typescript-eslint/no-unused-vars */
import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';
import { TasksRepository } from './tasks.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from './entities/task.entity';
import { Auth } from 'src/auth/entities/auth.entity';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(TasksRepository)
    private tasksRepository: TasksRepository,
  ) {}

  createTask(createTaskDto: CreateTaskDto, auth: Auth): Promise<Task> {
    return this.tasksRepository.createTask(createTaskDto, auth);
  }

  async getTasks(filterDto: GetTasksFilterDto, auth: Auth): Promise<Task[]> {
    return this.tasksRepository.getTasks(filterDto, auth);
  }

  async getTaskById(id: string, auth: Auth): Promise<Task> {
    const task = await this.tasksRepository.findOne({ id, auth });
    if (!task) {
      throw new NotFoundException(`Task with ID "${id}" was not found.`);
    }
    return task;
  }

  async updateTaskStatus(
    id: string,
    updateTaskDto: UpdateTaskDto,
    auth: Auth,
  ): Promise<Task> {
    const { status } = updateTaskDto;
    const task = await this.getTaskById(id, auth);
    task.status = status;
    this.tasksRepository.save(task);
    return task;
  }

  async updateTaskTitle(
    id: string,
    updateTaskDto: UpdateTaskDto,
    auth: Auth,
  ): Promise<Task> {
    const { title } = updateTaskDto;
    const task = await this.getTaskById(id, auth);
    task.title = title;
    this.tasksRepository.save(task);
    return task;
  }

  async updateTaskDescription(
    id: string,
    updateTaskDto: UpdateTaskDto,
    auth: Auth,
  ): Promise<Task> {
    const { description } = updateTaskDto;

    const task = await this.getTaskById(id, auth);
    task.description = description;
    this.tasksRepository.save(task);
    return task;
  }

  async deleteTask(id: string, auth: Auth): Promise<void> {
    const result = await this.tasksRepository.delete({ id, auth });
    if (!result || result.affected === 0) {
      throw new NotFoundException(`Task with ID "${id}" was not found.`);
    }
  }
}
