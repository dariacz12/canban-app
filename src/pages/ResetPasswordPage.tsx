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
import { useMutation } from "react-query";
import { resetPassword } from "../api";
import { LoginContext } from "../contexts/LoginContext";
import { useNavigate, useParams } from "react-router-dom";
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
  password: string;
  passwordConfirmation: string;
};

export default function ResetPasswordPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  const navigate = useNavigate();
  const toast = useToastAlert();
  let { code } = useParams();

  const resetUserPassword = useMutation(resetPassword, {
    onSuccess: (res) => {
      setData({ token: res.data.jwt, refreshToken: "" });
      toast("Success password ressent!");
      navigate("/login", { replace: true });
    },
    onError: () => {
      toast("Something went wrong!", "danger");
    },
    onSettled: () => {},
  });
  const { setData } = useContext(LoginContext);

  const onSubmit: SubmitHandler<FormData> = ({
    password,
    passwordConfirmation,
  }) => {
    resetUserPassword.mutate({ password, passwordConfirmation, code });
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
                  Reset Password
                </Heading>
              </Box>
              <Box>
                <form
                  style={{ display: "flex", flexDirection: "column" }}
                  onSubmit={handleSubmit(onSubmit)}
                >
                  <Field>
                    <FormLabel> New Password</FormLabel>
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

                  <Field>
                    <FormLabel> Confirm New Password</FormLabel>
                    <InputGroup size="md">
                      <Input
                        pr="4.5rem"
                        type={show ? "text" : "password"}
                        placeholder="Password"
                        {...register("passwordConfirmation", {
                          required: true,
                        })}
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
          src={require("../photos/resetpasswordconfirmation.jpg")}
          alt="register photo"
        />
      </Box>
    </MainContainer>
  );
}
