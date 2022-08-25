import { plainToClass } from "class-transformer";
import { ErrorDto } from "../../services/dto/error/ErrorDto";
import { ErrorDetailsDto } from "../../services/dto/error/ErrorDetailsDto";

export class ErrorParser {
  private errorObject: ErrorDto;
  constructor(error: any) {
    const detailedErrors = [];

    for (const [key, value] of Object.entries(error.errors)) {
      detailedErrors.push(value);
    }

    error.errors = detailedErrors;

    this.errorObject = plainToClass(ErrorDto, error);
  }

  getErrorObject(): ErrorDto {
    return this.errorObject;
  }

  getReadableErrorMessages(): ErrorDetailsDto[] {
    const readableErrorMessage = [];

    for (const [key, value] of Object.entries(this.errorObject.errors)) {
      readableErrorMessage[key] = value;
    }

    return readableErrorMessage;
  }

  customCreate(field: string, message: string, value?: any): void {
    if (this.errorObject === undefined) this.errorObject = new ErrorDto();

    if (this.errorObject.errors.length === 0) {
      this.errorObject.errors = [];
    }

    const errorDetailsDto = new ErrorDetailsDto();

    errorDetailsDto.value = value;
    errorDetailsDto.message = message;
    errorDetailsDto.path = field;

    this.errorObject.errors.push(errorDetailsDto);
  }
}
