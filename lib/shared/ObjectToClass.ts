import { plainToClass } from "class-transformer";
import { DTOInterface } from "../../services/dto/form/DTOInterface";

export class ObjectToClass {
  toClass(data: object, classObject: DTOInterface): DTOInterface {
    // @ts-ignore
    return plainToClass(classObject, data);
  }
}
