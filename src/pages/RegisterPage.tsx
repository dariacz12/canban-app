import { SubmitHandler, useForm } from "react-hook-form";
import {
  Avatar,
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
import Dropzone from "react-dropzone";
import { useMutation, useQueryClient } from "react-query";
import {
  BASE_URL,
  createAccount,
  loginUser,
  updateUserAvatarId,
  uploadUserImage,
} from "../api";
import { useNavigate } from "react-router-dom";
import { LoginContext } from "../contexts/LoginContext";
import useToastAlert from "../customHooks/useToastAlert";
import { CloudUploadOutlined, UploadOutlined } from "@ant-design/icons";

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
const DropzoneWraper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-around;
`;

export type FormData = {
  username: string;
  email: string;
  password: string;
  image: string;
};

export default function RegisterPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();
  const queryClient = useQueryClient();
  const toast = useToastAlert();
  const [avatar, setAvatar] = useState();
  const [avatarId, setAvatarId] = useState();

  const createNewAccount = useMutation(createAccount, {
    onSuccess: () => {
      toast("Success registretion!");
    },
    onError: () => {
      toast("Something went wrong", "danger");
    },
  });

  const loginNewUser = useMutation(loginUser, {
    onSuccess: (res) => {
      setData({ token: res.data.jwt, refreshToken: "" });
      toast("Success login!");
      avatarId && updateUserAvatarId({ avatarId, token: res.data.jwt });
      navigate("/dashboard", { replace: true });
    },
    onError: () => {
      toast("Something went wrong!", "danger");
    },
  });
  const { setData } = useContext(LoginContext);
  const [show, setShow] = useState<Boolean>();
  const handleClick = () => setShow(!show);

  const navigate = useNavigate();

  const handleFileUpload = async (file: File) => {
    try {
      const form = new FormData();
      form.append("files", file);
      const response = await uploadUserImage(form);
      console.log("response", response.data[0]);
      setAvatar(response.data[0].url);

      setAvatarId(response.data[0].id);
    } catch (error) {
      console.log(error);
    }
  };
  const onSubmit = async (data: FormData) => {
    await createNewAccount.mutateAsync(data);
    await loginNewUser.mutateAsync({
      email: data.email,
      password: data.password,
    });
  };
  return (
    <MainContainer>
      <Box
        pt={[100, 100, 100, 0]}
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
                  Create new account
                </Heading>
                <Text pt="2" fontSize="sm">
                  Already a Member?
                  <Link color="teal.500" href="/login">
                    {" "}
                    Log In
                  </Link>
                </Text>
              </Box>
              <Box>
                <form
                  style={{ display: "flex", flexDirection: "column" }}
                  onSubmit={handleSubmit(onSubmit)}
                >
                  <Field>
                    <FormLabel>Name</FormLabel>
                    <Input
                      placeholder="Name"
                      {...register("username", { required: true })}
                    />
                    {errors.username && <span>This field is required</span>}
                  </Field>
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
                  <Field>
                    <FormLabel>Avatar</FormLabel>
                    <DropzoneWraper>
                      <Dropzone
                        onDrop={(acceptedFiles) => {
                          console.log(acceptedFiles[0]);
                          handleFileUpload(acceptedFiles[0]);
                        }}
                      >
                        {({ getRootProps, getInputProps }) => (
                          <section>
                            <div {...getRootProps()}>
                              <input {...getInputProps()} />
                              <CloudUploadOutlined
                                style={{
                                  fontSize: "60px",
                                  color: "#1a202c",
                                  paddingLeft: "5px",
                                }}
                              />
                            </div>
                          </section>
                        )}
                      </Dropzone>
                      {avatar && (
                        <Avatar
                          size="xl"
                          name="avatar"
                          src={`${BASE_URL}${avatar}`}
                        />
                      )}
                    </DropzoneWraper>
                  </Field>
                  <Button bg="#1a202c" m={3} type="submit" colorScheme="brand">
                    Register
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
        mt={[100, 100, 100, 0]}
        flex="1"
        display="flex"
        alignItems="center"
        justifyContent="center"
      >
        <Image
          maxW="450px"
          src={require("../photos/register.jpg")}
          alt="register photo"
        />
      </Box>
    </MainContainer>
  );
}
