import { EntityRepository, Repository } from 'typeorm';
import { CreateTaskDto } from './dto/create-task.dto';
import { Task } from './entities/task.entity';
import { TaskStatus } from './tasks.status.enum';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';
import { Auth } from 'src/auth/entities/auth.entity';

@EntityRepository(Task)
export class TasksRepository extends Repository<Task> {
  async createTask(createTaskDto: CreateTaskDto, auth: Auth): Promise<Task> {
    const { title, description } = createTaskDto;
    const task = this.create({
      title,
      description,
      status: TaskStatus.OPEN,
      auth,
    });
    await this.save(task);
    return task;
  }

  async getTasks(filterDto: GetTasksFilterDto, auth: Auth): Promise<Task[]> {
    const { status, search } = filterDto;

    const query = this.createQueryBuilder('task');
    query.where({ auth });

    if (status) {
      query.andWhere('task.status=:status', { status });
    }

    if (search) {
      query.andWhere(
        '(LOWER(task.title) LIKE LOWER(:search) or LOWER(task.description) LIKE LOWER(:search))',
        { search: `%${search}%` },
      );
    }
    const result = await query.getMany();
    return result;
  }
}
