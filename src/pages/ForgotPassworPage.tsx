import { SubmitHandler, useForm } from "react-hook-form";
import {
  Box,
  Card,
  CardBody,
  CardHeader,
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
import { QueryClient, useMutation, useQueryClient } from "react-query";
import { loginUser, resetPasswordSendEmail } from "../api";
import { LoginContext } from "../contexts/LoginContext";
import { redirect, useNavigate } from "react-router-dom";
import useToastAlert from "../customHooks/useToastAlert";

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

export default function ForgotPasswordPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  const navigate = useNavigate();
  const toast = useToastAlert();

  const resetUserPassword = useMutation(resetPasswordSendEmail, {
    onSuccess: (res) => {
      toast("Check your mailbox!");
      navigate("/login", { replace: true });
    },
    onError: () => {
      toast("Something went wrong!", "danger");
    },
    onSettled: () => {},
  });

  const onSubmit: SubmitHandler<FormData> = ({ email }) => {
    resetUserPassword.mutate({ email });
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
                  Forgot your password?
                </Heading>
                <Text pt="2" fontSize="sm">
                  Enter your email and we'll send you a link to reset your
                  password.
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

                  <Button m={3} type="submit" colorScheme="brand">
                    Reset Password
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
          src={require("../photos/resetpasswordsendemail.jpg")}
          alt="register photo"
        />
      </Box>
    </MainContainer>
  );
}
