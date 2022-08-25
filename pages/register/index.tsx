import { useState } from "react";
import Layout from "../../component/shared/layout";
import Form from "../../component/user/register/form";
import { register } from "../../lib/user/registerHook";
import { ObjectToClass } from "../../lib/shared/ObjectToClass";
import { RegisterDTO } from "../../services/dto/form/user/RegisterDTO";
import { StatusCodes } from "http-status-codes";
import { ErrorParser } from "../../lib/shared/ErrorParser";
import Router from "next/router";

const Signup = () => {
  const [errors, setErrors] = useState([]);

  async function handleSubmit(e) {
    const objToClassDTO = new ObjectToClass();

    e.preventDefault();

    if (errors) setErrors([]);

    const body = {
      email: e.currentTarget.email.value,
      password: e.currentTarget.password.value,
      username: e.currentTarget.username.value,
    };

    if (body.password !== e.currentTarget.rpassword.value) {
      const errorParser = new ErrorParser({});
      errorParser.customCreate("password", "The passwords don't match");
      setErrors(errorParser.getReadableErrorMessages());
      return;
    }

    const res = await register(objToClassDTO.toClass(body, RegisterDTO));

    if (res.status === StatusCodes.CREATED) {
      Router.push("/login");
    } else {
      const errorParser = new ErrorParser(await res.json());
      setErrors(errorParser.getReadableErrorMessages());
    }
  }

  return (
    <Layout>
      <div className="login">
        <Form isLogin={false} errorData={errors} onSubmit={handleSubmit} />
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

export default Signup;
