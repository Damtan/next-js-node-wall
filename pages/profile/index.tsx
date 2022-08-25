import Layout from "../../component/shared/layout";
import {user} from "../../lib/user/userHook";
import {ProfileDto} from "../../services/dto/response/ProfileDto";
import {ObjectToClass} from "../../lib/shared/ObjectToClass";
import {AuthPageError} from "../../services/error/Errors";
import {AuthErrorMessage} from "../../component/shared/authError";

export async function getServerSideProps({ req, res }) {
    const objToClassDTO = new ObjectToClass();
    let profile = null;
    let authError = false;
    try {
        profile = objToClassDTO.toClass((await (await user(res, req)).json()), ProfileDto);
    } catch (error) {
        console.log(error);
        if (error instanceof AuthPageError) {
            authError = true;
        }
    }

    return { props: { ...profile, authError: authError } }
}

export default function Profile({ username, _id, lastName, firstName, createdAt, authError }) {
    return (
        <Layout>
            {
                authError? <AuthErrorMessage message="Nie możesz przeglądać tego. Sorki."/>:(<h1>Your user id is {_id} </h1>)
            }
            <style jsx>{`
        h1 {
          margin-bottom: 0;
        }
      `}</style>
        </Layout>
    );
}
