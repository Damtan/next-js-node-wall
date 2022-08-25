export interface FetchInterface {
  postRequest(url: string, method: string, body: object, header: object): Promise<Response>;
  getRequest(url: string, body: object, header: object): Promise<Response>;
}
