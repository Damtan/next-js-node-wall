import {NodeWallFetcher} from "../../services/fetch/NodeWallFetcher";

export const getPosts = async (res?, req?): Promise<Response> => {
    const postsList = "posts";

    const fetcher = new NodeWallFetcher(false, res, req);

    return fetcher.getRequest(postsList);
};
