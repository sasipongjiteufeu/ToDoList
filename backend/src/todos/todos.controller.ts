// src/todos/todos.controller.ts
import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Req,
  ParseUUIDPipe,
  HttpCode,
  HttpStatus,
  ParseIntPipe,
} from '@nestjs/common';
import { TodosService } from './todos.service';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { AuthGuard } from '@nestjs/passport'; // Assuming you use Passport's JWT guard
import { UserApi } from 'src/user-api/entities/user-api.entity';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { RolesGuard } from 'src/auth/Role/roles.guard';
import { Roles } from 'src/auth/Role/roles.decorator';
import { Role } from 'src/auth/Role/role.enum';

@Controller('todos')
@UseGuards(AuthGuard('jwt')) // Protect all routes in this controller
export class TodosController {
  constructor(private readonly todosService: TodosService) { }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Post()
  create(@Body() createTodoDto: CreateTodoDto, @Req() req: any) {
    // req.user is populated by Passport after the JWT is validated
    const user = req.user as UserApi;
    return this.todosService.create(createTodoDto, user);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.User)
  @HttpCode(HttpStatus.OK) // Return 200 OK on success
  @Get()
  findAll(@Req() req: any) {
    const user = req.user as UserApi;
    return this.todosService.findAll(user);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.User)
  @HttpCode(HttpStatus.OK) // Return 200 OK on success
  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number, @Req() req: any) {
    const user = req.user as UserApi;
    return this.todosService.findOne(id, user);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.User)
  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateTodoDto: UpdateTodoDto,
    @Req() req: any,
  ) {
    const user = req.user as UserApi;
    return this.todosService.update(id, updateTodoDto, user);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.User) // Assuming you have an ADMIN role defined
  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT) // Return 204 No Content on success
  remove(@Param('id', ParseIntPipe) id: number, @Req() req: any) {
    const user = req.user as UserApi;
    return this.todosService.remove(id, user);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.User) // Assuming you have an ADMIN role defined
  @Post(':CompletionStatus')
  @HttpCode(HttpStatus.NO_CONTENT) // Return 204 No Content on success
  async updateCompletionStatus(
    @Param('id', ParseUUIDPipe) id: number,
    @Body('isCompleted') isCompleted: boolean,
    @Req() req: any,
  ) {
    const user = req.user as UserApi;
    return this.todosService.updateCompletionStatus(id, isCompleted, user);
  }
}