import { useForm } from "@mantine/form";
import React from "react";
import { useUserStore } from "../../stores/userStore";
import { useGeneralStore } from "../../stores/generalStore";
import { GraphQLErrorExtensions } from "graphql";
import { useMutation } from "@apollo/client";
import { REGISTER_USER } from "../../graphql/mutations/Register";
import {
  Button,
  Col,
  Grid,
  Group,
  Paper,
  Text,
  TextInput,
} from "@mantine/core";
import { RegisterUserMutation } from "../../gql/graphql";

type Props = {
  toggleForm: () => void;
};

const RegisterModal: React.FC<Props> = ({ toggleForm }: Props) => {
  const form = useForm({
    initialValues: {
      fullname: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    validate: {
      fullname: (value: string) =>
        value.trim().length >= 3
          ? null
          : "Username must be at least 3 characters",
      email: (value: string) => (value.includes("@") ? null : "Invalid email"),
      password: (value: string) =>
        value.trim().length >= 3
          ? null
          : "Password must be at least 3 characters",
      confirmPassword: (value: string, values) =>
        value.trim().length >= 3 && value === values.password
          ? null
          : "Passwords do not match",
    },
  });
  const setUser = useUserStore((state) => state.setUser);
  const setIsLoginOpen = useGeneralStore((state) => state.toggleLoginModal);

  const [errors, setErrors] = React.useState<GraphQLErrorExtensions>({});

  const [registerUser, { loading }] =
    useMutation<RegisterUserMutation>(REGISTER_USER);

  const handleRegister = async () => {
    setErrors({});

    await registerUser({
      variables: {
        email: form.values.email,
        password: form.values.password,
        fullname: form.values.fullname,
        confirmPassword: form.values.confirmPassword,
      },
      onCompleted: (data) => {
        setErrors({});
        if (data?.register.user)
          setUser({
            id: data?.register.user.id,
            email: data?.register.user.email,
            fullname: data?.register.user.fullname,
          });
        setIsLoginOpen();
      },
    }).catch((err) => {
      console.log(err.graphQLErrors, "ERROR");
      setErrors(err.graphQLErrors[0].extensions);
      useGeneralStore.setState({ isLoginModalOpen: true });
    });
  };

  return (
    <Paper>
      <Text align="center" size="xl">
        Register
      </Text>

      <form
        onSubmit={form.onSubmit(() => {
          handleRegister();
        })}
      >
        <Grid mt={20}>
          <Col span={12} md={12}>
            <TextInput
              label="Fullname"
              placeholder="Choose a full name"
              {...form.getInputProps("fullname")}
              error={form.errors.username ?? (errors?.username as string)}
            />
          </Col>

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
          
          <Col span={12} md={12}>
            <TextInput
              {...form.getInputProps("confirmPassword")}
              error={
                form.errors.confirmPassword ??
                (errors?.confirmPassword as string)
              }
              autoComplete="off"
              label="Confirm Password"
              type="password"
              placeholder="Confirm your password"
            />
          </Col>

          <Col span={12}>
            <Button variant="link" onClick={toggleForm} pl={0}>
              Already registered? Login here
            </Button>
          </Col>
        </Grid>

        <Group position="left" mt={20}>
          <Button
            variant="outline"
            color="blue"
            type="submit"
            disabled={loading}
          >
            Register
          </Button>
          <Button variant="outline" color="red" onClick={setIsLoginOpen}>
            Cancel
          </Button>
        </Group>
      </form>
    </Paper>
  );
};

export default RegisterModal;
