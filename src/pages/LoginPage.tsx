import { SubmitHandler, useForm } from "react-hook-form";
import {
  Box,
  Card,
  CardBody,
  CardHeader,
  FormControl,
  FormLabel,
  Heading,
  Input,
  InputGroup,
  InputRightElement,
  Stack,
  StackDivider,
  Text,
} from "@chakra-ui/react";
import { Button } from "@chakra-ui/react";
import styled from "styled-components";
import { Image } from "@chakra-ui/react";
import { Link } from "@chakra-ui/react";
import { size } from "../size";
import { useContext, useState } from "react";
import { useMutation } from "react-query";
import { loginUser } from "../api";
import { LoginContext } from "../contexts/LoginContext";
import { redirect, useNavigate } from "react-router-dom";

const MainContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;

  @media (max-width: ${size.lg}) {
    flex-direction: column;
  }
`;

const Field = styled.label`
  padding: 15px;
`;

type FormData = {
  name: string;
  email: string;
  password: string;
  image: string;
};

export default function LoginPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  const navigate = useNavigate();

  const loginNewUser = useMutation(loginUser, {
    onSuccess: (res) => {
      console.log(1, res);
      setData({ token: res.data.access, refreshToken: res.data.refresh });
      alert("Success login!");
      navigate("/dashboard", { replace: true });
    },
    onError: () => {
      alert("Something went wrong!");
    },
  });
  const { setData } = useContext(LoginContext);

  const onSubmit: SubmitHandler<FormData> = (data) => {
    console.log(data);
    loginNewUser.mutate({ email: data.email, password: data.password });
  };
  const [show, setShow] = useState<Boolean>(false);
  const handleClick = () => setShow(!show);

  return (
    <MainContainer>
      <Box
        pt={[100, 100, 100, 0]}
        flex="1"
        display="flex"
        alignItems="center"
        justifyContent="center"
      >
        <Card minW={[300, 450]} maxW={[300, 450]}>
          <CardHeader>
            <Image
              maxW="200px"
              objectFit="cover"
              src={require("../photos/logo.jpg")}
              alt="Logo"
            />
          </CardHeader>
          <CardBody>
            <Stack divider={<StackDivider />} spacing="4">
              <Box>
                <Heading size="xs" textTransform="uppercase">
                  Welcome back!
                </Heading>
                <Text pt="2" fontSize="sm">
                  Don't have an account?
                  <Link color="teal.500" href="#">
                    {" "}
                    Sign In
                  </Link>
                </Text>
              </Box>
              <Box>
                <form
                  style={{ display: "flex", flexDirection: "column" }}
                  onSubmit={handleSubmit(onSubmit)}
                >
                  <Field>
                    <FormLabel>Email</FormLabel>
                    <Input
                      placeholder="Email"
                      {...register("email", {
                        required: true,
                        pattern: {
                          value: /\S+@\S+\.\S+/,
                          message: "Entered value does not match email format",
                        },
                      })}
                    />
                    {errors.email?.type === "required" && (
                      <span>This field is required</span>
                    )}
                    {errors.email && (
                      <span role="alert">{errors.email.message}</span>
                    )}
                  </Field>
                  <Field>
                    <FormLabel>Password</FormLabel>
                    <InputGroup size="md">
                      <Input
                        pr="4.5rem"
                        type={show ? "text" : "password"}
                        placeholder="Password"
                        {...register("password", { required: true })}
                      />

                      <InputRightElement width="4.5rem">
                        <Button h="1.75rem" size="sm" onClick={handleClick}>
                          {show ? "Hide" : "Show"}
                        </Button>
                      </InputRightElement>
                    </InputGroup>
                    {errors.password && <span>This field is required</span>}
                  </Field>
                  <Button m={3} type="submit" colorScheme="brand">
                    Login
                  </Button>
                </form>
              </Box>
            </Stack>
          </CardBody>
        </Card>
      </Box>

      <Box
        bg="#1a202c"
        width={"100%"}
        minH="100vh"
        mt={[50, 100, 100, 0]}
        flex="1"
        display="flex"
        alignItems="center"
        justifyContent="center"
      >
        <Image
          maxW={[300, 450]}
          src={require("../photos/login.jpg")}
          alt="register photo"
        />
      </Box>
    </MainContainer>
  );
}
