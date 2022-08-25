import "reflect-metadata";
import { Type } from "class-transformer";
import { ErrorDetailsDto } from "./ErrorDetailsDto";

export class ErrorDto {
  public message: string;

  @Type(() => ErrorDetailsDto)
  public errors: ErrorDetailsDto[];
}
