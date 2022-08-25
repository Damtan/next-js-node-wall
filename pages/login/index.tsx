import { useState } from "react";
import Layout from "../../component/shared/layout";
import Form from "../../component/user/login/form";
import { login } from "../../lib/user/loginHook";
import { ObjectToClass } from "../../lib/shared/ObjectToClass";
import { LoginDTO } from "../../services/dto/form/user/LoginDTO";
import { StatusCodes } from "http-status-codes";
import { ErrorParser } from "../../lib/shared/ErrorParser";
import Router from "next/router";
import { JWTCookie } from "../../services/security/JWTCookie";

const Login = () => {
  const [errors, setErrors] = useState([]);

  async function handleSubmit(e) {
    const objToClassDTO = new ObjectToClass();

    e.preventDefault();

    if (errors) setErrors([]);

    const body = {
      password: e.currentTarget.password.value,
      username: e.currentTarget.username.value,
    };

    const res = await login(objToClassDTO.toClass(body, LoginDTO));
    const data = await res.json();
    if (res.status === StatusCodes.OK) {
      const jwtCookie = new JWTCookie();
      jwtCookie.setToken(data);
      Router.push("/");
    } else {
      const errorParser = new ErrorParser(data);
      setErrors(errorParser.getReadableErrorMessages());
    }
  }

  return (
    <Layout>
      <div className="login">
        <Form errorData={errors} onSubmit={handleSubmit} />
      </div>
      <style jsx>{`
        .login {
          max-width: 21rem;
          margin: 0 auto;
          padding: 1rem;
          border: 1px solid #ccc;
          border-radius: 4px;
        }
      `}</style>
    </Layout>
  );
};

export default Login;
