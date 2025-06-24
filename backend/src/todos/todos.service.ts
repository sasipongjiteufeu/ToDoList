import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { Todo } from './entities/todo.entity';
import { UserApi } from 'src/user-api/entities/user-api.entity';


@Injectable()
export class TodosService {
  constructor(
    @InjectRepository(Todo)
    private readonly todoRepository: Repository<Todo>,
  ) { }

  async create(createTodoDto: CreateTodoDto, user: UserApi): Promise<Todo> {
    const newTodo = this.todoRepository.create({
      ...createTodoDto,
      user, // Associate the todo with the logged-in user
    });
    return this.todoRepository.save(newTodo);
  }

  // Find all todos for a specific user
  async findAll(user: UserApi): Promise<Todo[]> {
    return this.todoRepository.find({
      where: { user: { id: user.id } },
      order: { createdAt: 'DESC' },
    });
  }

  // Find a single todo, ensuring it belongs to the user
  async findOne(id: number, user: UserApi): Promise<Todo> {
    const todo = await this.todoRepository.findOne({
      where: { id, user: { id: user.id } },
    });
    if (!todo) {
      throw new NotFoundException(`Todo with ID "${id}" not found.`);
    }
    return todo;
  }

  async update(id: number, updateTodoDto: UpdateTodoDto, user: UserApi): Promise<Todo> {
    // First, use our findOne method to ensure the user owns this todo
    const todo = await this.findOne(id, user);

    // Merge the existing todo with the new data
    const updatedTodo = this.todoRepository.merge(todo, updateTodoDto);

    return this.todoRepository.save(updatedTodo);
  }
  
  async updateCompletionStatus(id: number, isCompleted: boolean, user: UserApi): Promise<Todo> {
    // First, use our findOne method to ensure the user owns this todo
    const todo = await this.findOne(id, user);

    // Update the completion status
    todo.isCompleted = isCompleted;

    return this.todoRepository.save(todo);
  }

  async remove(id: number, user: UserApi): Promise<void> {
    // Use findOne to get the todo and check ownership.
    // If it exists, remove it. findOne will throw an error if not found.
    const todo = await this.findOne(id, user);
    await this.todoRepository.remove(todo);
  }
}