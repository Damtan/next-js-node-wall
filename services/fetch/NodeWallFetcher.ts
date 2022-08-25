import { FetchInterface } from "./FetchInterface";
import { DTOInterface } from "../dto/form/DTOInterface";
import {JWTCookie} from "../security/JWTCookie";
import {AuthPageError} from "../error/Errors";

export class NodeWallFetcher implements FetchInterface {
  private readonly res;
  private readonly req;
  private authorize: boolean;

  constructor(authorize: boolean = false, res?, req?) {
    this.authorize = authorize;
    this.req = req;
    this.res = res;
  }

  public setAuthorize(authorize: boolean): void{
    this.authorize = authorize;
  }

  public getRequest(url: string, header ?: {}){
    return this.fetchRequest(url, {
      method: "GET",
      headers: this.getPrepareHeader({
        "Content-Type": "application/json",
        ...header
      }),
    });
  }

  public postRequest(
    url: string,
    body?: DTOInterface,
    header ?: {}
  ): Promise<Response> {
    return this.fetchRequest(url, {
      body: JSON.stringify(body),
      method: "POST",
      headers: this.getPrepareHeader({
        "Content-Type": "application/json",
        ...header
      }),
    });
  }

  private fetchRequest(url: string, requestObject: object
  ): Promise<Response> {
    return fetch(NodeWallFetcher.prepareURL(url), requestObject).catch((error) => {
      throw new AuthPageError();
    });
  }

  private static prepareURL(url: string): string {
    const publicApiUrl = typeof window === 'undefined' ? process.env.NEXT_PUBLIC_SERVER_SIDE_API_URL : process.env.NEXT_PUBLIC_API_URL;
    return publicApiUrl + "/" + url;
  }

  private addJwtToHeader(header: {}): {} {
    const jwtCookie = new JWTCookie(this.res, this.req);
    const jwtToken = jwtCookie.getToken();

    if(!jwtToken)
      throw new AuthPageError();

    return { ...header, Authorization: `Bearer ${jwtToken}`}
  }

  private getPrepareHeader(header: {}) {
    if(this.authorize) {
      header = this.addJwtToHeader(header);
    }

    return header;
  }
}


