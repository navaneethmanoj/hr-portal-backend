import { IsNotEmpty, IsNumber, IsString } from "class-validator";

class CreateDepartmentDto {
  @IsNotEmpty()
  @IsString()
  name: string;
}
class UpdateDepartmentDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNumber()
  employeeId: number;
}

export { CreateDepartmentDto, UpdateDepartmentDto };
