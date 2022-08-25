import Layout from "../../component/shared/layout";
import {JWTCookie} from "../../services/security/JWTCookie";

export async function getServerSideProps({ req, res }) {
    const jwtCookie = new JWTCookie(res, req);
    jwtCookie.delete();

    return {props: {}, };
}

export default function Logout() {


    return (
        <Layout>
            <p>
                Wylogowany
            </p>
            <style jsx>{`
        h1 {
          margin-bottom: 0;
        }
      `}</style>
        </Layout>
    );
}
