import {
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsString,
  ValidateNested,
} from "class-validator";
import { Type } from "class-transformer";
import { CreateAddressDto, UpdateAddressDto } from "./address.dto";
import "reflect-metadata";
import { Role } from "../utils/role.enum";
import { CreateDepartmentDto } from "./department.dto";
import { DeclarationWithTypeParameters } from "typescript";

export class CreateEmployeeDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  @IsEmail()
  email: string;

  @IsString()
  password: string;

  @IsNotEmpty()
  @IsEnum(Role)
  role: Role;

  @IsNotEmpty()
  @IsNumber()
  age: number;

  @IsNotEmpty()
  @ValidateNested({ each: true })
  @Type(() => CreateAddressDto)
  address: CreateAddressDto;

  @IsNotEmpty()
  @IsNumber()
  departmentId: number;
}

export class UpdateEmployeeDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsNumber()
  age: number;

  @IsNotEmpty()
  @ValidateNested({ each: true })
  @Type(() => UpdateAddressDto)
  address: UpdateAddressDto;

  @IsNotEmpty()
  @IsNumber()
  departmentId: number;
}
