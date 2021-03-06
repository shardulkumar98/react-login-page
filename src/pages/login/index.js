import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useNavigate } from "react-router-dom";
import usePost from "hooks/usePost";
import * as yup from "yup";

import {
  Container,
  Head,
  Input,
  Button,
  MainContatiner,
  Form,
  Para,
} from "styles/pages/login";

const schema = yup
  .object({
    email: yup
      .string()
      .matches("[a-z0-9]+@[a-z]+.[a-z]{2,3}", "enter valid email")
      .required("Email is mandatory"),
    password: yup
      .string()
      .matches(
        /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/,
        "Uppercase, Lowecase, Special Character, Numeric"
      )
      .required("Password is mandatory"),
  })
  .required();

const Login = () => {
  const { mutateAsync } = usePost();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    // resolver: yupResolver(schema),
  });
  const navigate = useNavigate();

  const goToSignUp = () => {
    navigate("/signup");
  };

  const formData = async (data) => {
    try {
      console.log("formdata");
      const response = await mutateAsync({
        url: "/login",
        payload: data,
      });
      console.log(response);
    } catch (err) {
      console.log(err);
    }
  };
  // const onSubmit = (data) => {
  //   axios
  //     .post("https://reqres.in/api/login", {
  //       // email: data.email,
  //       // password: data.password,
  //       email: "eve.holt@reqres.in",
  //       password: "cityslicka",
  //     })
  //     .then(function (response) {
  //       navigate("/dashboard");
  //     })
  //     .catch(function (error) {
  //       console.log(error);
  //     });
  // };

  return (
    <MainContatiner>
      <Container>
        <Head>Log in your account</Head>
        <Form onSubmit={handleSubmit(formData)}>
          <Input {...register("email")} placeholder="Email" type="email" />
          <Para>{errors.email?.message}</Para>
          <Input
            {...register("password")}
            placeholder="password"
            type="password"
          />
          <Para>{errors.password?.message}</Para>
          <Button type="submit">Login</Button>
        </Form>
      </Container>
      <div onClick={goToSignUp}>create an account</div>
    </MainContatiner>
  );
};
export default Login;
