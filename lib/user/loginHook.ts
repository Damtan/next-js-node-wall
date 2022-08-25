import { NodeWallFetcher } from "../../services/fetch/NodeWallFetcher";
import { DTOInterface } from "../../services/dto/form/DTOInterface";

export const login = async (loginData: DTOInterface): Promise<Response> => {
  const login = "login";

  const fetcher = new NodeWallFetcher();

  return fetcher.postRequest(login, loginData);
};
