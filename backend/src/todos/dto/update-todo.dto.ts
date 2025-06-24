import { IsString, IsBoolean, IsOptional } from 'class-validator';

export class UpdateTodoDto {
  @IsString()
  @IsOptional()
  title?: string;

  @IsString()
  @IsOptional()
  description?: string;

  // --- ADD THIS FIELD ---
  @IsBoolean()
  @IsOptional()
  isCompleted?: boolean;
}