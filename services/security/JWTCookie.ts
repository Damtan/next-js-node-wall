import { setCookie, getCookie, deleteCookie } from "cookies-next";
import getConfig from "next/config";
import { createCipheriv, createDecipheriv } from "crypto";
import jwt_decode from "jwt-decode";
import {ObjectToClass} from "../../lib/shared/ObjectToClass";
import {JWTDto} from "../dto/common/JWTDto";
import {AuthPageError} from "../error/Errors";

export class JWTCookie {
  private algorithm = "aes-256-cbc";
  private readonly res;
  private readonly req;

  constructor(res?: Response, req?: Request) {
    this.req = req;
    this.res = res;
  }

  public setToken(jwt: string): void {
    const cookieName = this.getCookieName();

    const token = this.hashToken(jwt);
    const jwtDto = this.getParsedToken(jwt);

    setCookie(cookieName, token, {expires: new Date(jwtDto.getExpInMilieconds())});
  }

  public getToken(): string|null {
    return this.decrypt();
  }

  public getParsedToken(jwt?: string ): JWTDto{
    const objectToClass = new ObjectToClass()

    if (!jwt) {
      jwt = this.getToken();
    }

    if(!jwt) {
      throw new AuthPageError();
    }

    return <JWTDto>objectToClass.toClass(jwt_decode(jwt), JWTDto);
  }

  private hashToken(token: string): string {
    const { publicRuntimeConfig } = getConfig();

    const cipher = createCipheriv(
      this.algorithm,
      publicRuntimeConfig.jwtCookieSecret,
      publicRuntimeConfig.jwtCookieInitVector
    );
    let encryptedData = cipher.update(token, "utf8", "binary");

    encryptedData += cipher.final("binary");

    return encryptedData;
  }

  public isJWTExpired(): boolean{
    try{
      const jwtDto = this.getParsedToken();

      return jwtDto.isExpired();
    } catch(error) {
      return true;
    }
  }

  public delete(): void {
    deleteCookie(this.getCookieName(),{req: this.req, res: this.res});
  }

  private decrypt(): string|null {

    const encryptedToken = <string>getCookie(this.getCookieName(), {req: this.req, res: this.res});
    if(encryptedToken === undefined) {
      return null;
    }

    const { publicRuntimeConfig } = getConfig();
    const decipher = createDecipheriv(
      this.algorithm,
      publicRuntimeConfig.jwtCookieSecret,
      publicRuntimeConfig.jwtCookieInitVector
    );

    let decryptedData = decipher.update(encryptedToken, "binary", "utf8");

    decryptedData += decipher.final("utf8");

    return decryptedData;
  }

  private getCookieName(): string {
    const { publicRuntimeConfig } = getConfig();
    return publicRuntimeConfig.jwtCookie;
  }

}
