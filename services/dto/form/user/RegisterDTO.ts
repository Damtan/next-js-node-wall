import { DTOInterface } from "../DTOInterface";
export class RegisterDTO implements DTOInterface {
  public username: string;
  public email: string;
  public password: string;
}
