import React, { useState } from "react";
import TextInput from "./TextInput";
import { LOGIN_USER } from "../graphql/mutations/login";
import { useMutation } from "@apollo/client";
import { useUserStore } from "../store/userStore";
import useGeneralStore from "../store/generalStore";
import { GraphQLErrorExtensions } from "graphql";

function Login() {
  const [loginData, setLoginData] = React.useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = React.useState<GraphQLErrorExtensions>({});
  const setUser = useUserStore((state) => state.setUser);
  const setLoginIsOpen = useGeneralStore((state) => state.setLoginIsOpen);
  const [invalidCredentials, setInvalidCredentials] = useState("");
  const [loginUser, { error }] = useMutation(LOGIN_USER, {
    onCompleted: (data) => {
      console.log("DATA", data);
    },
    variables: {
      email: loginData.email,
      password: loginData.password,
    },
  });

  const handleLogin = async () => {
    setErrors({});

    try {
      const response = await loginUser({
        variables: {
          email: loginData.email,
          password: loginData.password,
        },
      });

      response?.data && setUser(response.data.login.user);
      setLoginIsOpen(false);
    } catch (_) {
      console.log("ERROR", error);
      if (
        error?.graphQLErrors &&
        error.graphQLErrors[0].extensions?.invalidCredentials
      ) {
        setInvalidCredentials(
          error.graphQLErrors[0].extensions.invalidCredentials as string
        );
      } else if (error) {
        const validationErrors = error.graphQLErrors[0].extensions;
        setErrors(validationErrors);
      }
    }
  };

  return (
    <>
      <div className="text-center text-[28px] mb-4 font-bold">Login</div>

      <div className="px-6 pb-1.5 text-[15px]">Email address</div>
      <div className="px-6 pb-2">
        <TextInput
          max={64}
          placeHolder="Enter your email address"
          onChange={(e) =>
            setLoginData({ ...loginData, email: e.target.value })
          }
          inputType="email"
          autoFocus={true}
          error={errors?.email as string}
        />
      </div>
      <div className="px-6 pb-2">
        <TextInput
          autoFocus={false}
          max={64}
          onChange={(e) =>
            setLoginData({ ...loginData, password: e.target.value })
          }
          placeHolder="Password"
          inputType="password"
          error={errors?.password as string}
        />
      </div>
      <div className="px-6 text-[12px] text-gray-600">Forgot password?</div>
      <div className="px-6 mt-6">
        <button
          onClick={handleLogin}
          disabled={!loginData.email || !loginData.password}
          className={[
            "w-full text-[17px] font-semibold text-white py-3 rounded-sm",
            !loginData.email || !loginData.password
              ? "bg-gray-200"
              : "bg-[#F02C56]",
          ].join(" ")}
        >
          Login
        </button>
      </div>
    </>
  );
}

export default Login;
