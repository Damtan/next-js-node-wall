import { NodeWallFetcher } from "../../services/fetch/NodeWallFetcher";
import { DTOInterface } from "../../services/dto/form/DTOInterface";

export const register = async (
  registrationData: DTOInterface
): Promise<Response> => {
  const register = "register";

  const fetcher = new NodeWallFetcher();

  return fetcher.postRequest(register, registrationData);
};
