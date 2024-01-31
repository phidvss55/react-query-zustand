import React from "react";
import { useGeneralStore } from "../../stores/generalStore";
import {
  Button,
  Col,
  Grid,
  Group,
  Paper,
  Text,
  TextInput,
} from "@mantine/core";
import { useMutation } from "@apollo/client";
import { LoginUserMutation } from "../../gql/graphql";
import { LOGIN_USER } from "../../graphql/mutations/Login";
import { useUserStore } from "../../stores/userStore";
import { GraphQLErrorExtensions } from "graphql";
import { useForm } from "@mantine/form";

type Props = {
  toggleForm: () => void;
};

const LoginModal: React.FC<Props> = ({ toggleForm }: Props) => {
  const toggleLoginModal = useGeneralStore((state) => state.toggleLoginModal);
  const [loginUser, { loading, error, data }] =
    useMutation<LoginUserMutation>(LOGIN_USER);

  console.log("data", data, error);

  const setUser = useUserStore((state) => state.setUser);
  const setIsLoginOpen = useGeneralStore((state) => state.toggleLoginModal);
  const [errors, setErrors] = React.useState<GraphQLErrorExtensions>({});
  const [invalidCredentials, setInvalidCredentials] = React.useState("");
  const form = useForm({
    initialValues: {
      email: "",
      password: "",
    },
    validate: {
      email: (value: string) => (value.includes("@") ? null : "Invalid email"),
      password: (value: string) =>
        value.trim().length >= 3
          ? null
          : "Password must be at least 3 characters",
    },
  });

  const handleLogin = async () => {
    await loginUser({
      variables: {
        email: form.values.email,
        password: form.values.password,
      },
      onCompleted: (data) => {
        setErrors({});
        if (data?.login.user) {
          setUser({
            id: data?.login.user.id,
            email: data?.login.user.email,
            fullname: data?.login.user.fullname,
            avatarUrl: data?.login.user.avatarUrl,
          });
          setIsLoginOpen();
        }
      },
    }).catch((err) => {
      setErrors(err.graphQLErrors[0].extensions);
      if (err.graphQLErrors[0].extensions?.invalidCredentials)
        setInvalidCredentials(
          err.graphQLErrors[0].extensions.invalidCredentials
        );
      useGeneralStore.setState({ isLoginModalOpen: true });
    });
  };

  return (
    <Paper>
      <Text align="center" size="xl">
        Login
      </Text>
      <form
        onSubmit={form.onSubmit(() => {
          handleLogin();
        })}
      >
        <Grid style={{ marginTop: 20 }}>
          <Col span={12} md={12}>
            <TextInput
              autoComplete="off"
              label="Email"
              placeholder="Enter your email"
              {...form.getInputProps("email")}
              error={form.errors.email ?? (errors?.email as string)}
            />
          </Col>

          <Col span={12} md={12}>
            <TextInput
              autoComplete="off"
              label="Password"
              type="password"
              placeholder="Enter your password"
              {...form.getInputProps("password")}
              error={form.errors.password ?? (errors?.password as string)}
            />
          </Col>
          {/* Not registered yet? then render register component. use something like a text, not a button */}
          <Col span={12} md={6}>
            <Text color="red">{invalidCredentials}</Text>
          </Col>

          <Col span={12}>
            <Button pl={0} variant="link" onClick={toggleForm} color="blue">
              Not registered yet? Register here
            </Button>
          </Col>
        </Grid>
        {/* buttons: login or cancel */}
        <Group position="left" style={{ marginTop: 20 }}>
          <Button
            variant="outline"
            color="blue"
            type="submit"
            disabled={loading}
          >
            Login
          </Button>
          <Button variant="outline" color="red" onClick={toggleLoginModal}>
            Cancel
          </Button>
        </Group>
      </form>
    </Paper>
  );
};

export default LoginModal;
