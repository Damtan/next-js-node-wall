import "reflect-metadata";
import { Exclude, Expose } from "class-transformer";

@Exclude()
export class ErrorDetailsDto {
  @Expose()
  public message;

  @Expose()
  public path;

  @Expose()
  public value;
}
