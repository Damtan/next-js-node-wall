import {DTOInterface} from "../form/DTOInterface";
import {MILISECONDS_MULTIPLIER} from "../../consts/TimeConst";

export class JWTDto implements DTOInterface{
    username:string;
    iat:number;
    exp:number;

    public isExpired(): boolean{
        return new Date(this.getExpInMilieconds()) < new Date();
    }

    public getIatInMilieconds(): number{
        return this.iat * MILISECONDS_MULTIPLIER
    }

    public getExpInMilieconds(): number{
        return this.exp * MILISECONDS_MULTIPLIER
    }
}
