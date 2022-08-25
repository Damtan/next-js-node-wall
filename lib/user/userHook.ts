import {NodeWallFetcher} from "../../services/fetch/NodeWallFetcher";
import {useEffect, useState} from "react";
import {ProfileDto} from "../../services/dto/response/ProfileDto";
import {ObjectToClass} from "../shared/ObjectToClass";

/**
 * For server side
 */
export const user = async (res?, req?): Promise<Response> => {
    const profile = "user/me";

    const fetcher = new NodeWallFetcher(true, res, req);

    return fetcher.getRequest(profile);
};

/**
 * For client side
 */
export function getUser(): ProfileDto|null{
    const objToClassDTO = new ObjectToClass();
    const [userProfile, setUserProfile] = useState(null);

    useEffect(() => {
        if (!userProfile) {
            getUserProfile();
        }
    }, []);

    const getUserProfile = async () => {
        let userProfile = null;
        try {
            const userData = await user();
            userProfile = objToClassDTO.toClass(await userData.json(), ProfileDto);
        } catch (error) {

        }

        setUserProfile(userProfile);
    };

    return userProfile;
}
