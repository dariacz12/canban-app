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
import { useContext, useEffect, useRef, useState } from "react";
import { QueryClient, useMutation, useQueryClient } from "react-query";
import { loginUser } from "../api";
import { LoginContext } from "../contexts/LoginContext";
import { redirect, useNavigate } from "react-router-dom";
import useToastAlert from "../customHooks/useToastAlert";

const MainContainer = styled.div`
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

export default function MainPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  const navigate = useNavigate();
  const toast = useToastAlert();

  const loginNewUser = useMutation(loginUser, {
    onSuccess: (res) => {
      setData({ token: res.data.jwt, refreshToken: "" });
      toast("Success login!");
      navigate("/dashboard", { replace: true });
    },
    onError: () => {
      toast("Something went wrong!", "danger");
    },
    onSettled: () => {},
  });
  const { setData } = useContext(LoginContext);

  const [pageLoaded, setPageLoaded] = useState<boolean>();

  useEffect(() => {
    setPageLoaded(true);
    const video = videoRef.current;
    if (video) {
      video.addEventListener("canplay", () => {
        video.play();
      });
    }
  }, []);

  const onSubmit: SubmitHandler<FormData> = ({ email, password }) => {
    loginNewUser.mutate({ email, password });
  };
  const [show, setShow] = useState<Boolean>(false);
  const handleClick = () => setShow(!show);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (video) {
      const playPromise = video.play();
      if (playPromise !== undefined) {
        playPromise.then(() => {}).catch(() => {});
      }
    }
  }, []);

  return (
    <MainContainer>
      <Box
        flex="1"
        display="flex"
        flexDirection={"column"}
        alignItems="center"
        justifyContent="center"
        marginTop={"50px"}
        marginBottom={"50px"}
      >
        <Box minW={[300, 450]} maxW={[300, 650]}>
          <Box>
            <Image
              maxW="200px"
              marginBottom={"30px"}
              marginTop={"30px"}
              marginLeft={"auto"}
              marginRight={"auto"}
              objectFit="cover"
              src={require("../photos/logo.jpg")}
              alt="Logo"
            />
          </Box>
          <Box>
            <Stack divider={<StackDivider />} spacing="4">
              <Box>
                <Heading size="xl" textAlign={"center"} marginBottom={"20px"}>
                  Brings all your tasks and tools together!
                </Heading>
                <Text
                  color={"rgba(13,18,22,.7)"}
                  padding={"10px"}
                  pt="2"
                  marginBottom={"20px"}
                  fontSize="md"
                  textAlign={"center"}
                >
                  Simple, flexible, and powerful. All it takes are boards,
                  lists, and cards to get a clear view of what needs to get
                  done.
                </Text>
              </Box>
              <Box marginLeft={"auto"} marginRight={"auto"}>
                <Button
                  maxWidth={"200px"}
                  m={3}
                  type="submit"
                  colorScheme="brand"
                  onClick={() => navigate("/register")}
                >
                  Sign up - it's free!
                </Button>
              </Box>
            </Stack>
          </Box>
        </Box>
      </Box>

      <Box
        maxWidth={"850px"}
        flex="1"
        display="flex"
        alignItems="center"
        justifyContent="center"
        marginLeft={"auto"}
        marginRight={"auto"}
      >
        {pageLoaded && (
          <video
            autoPlay={true}
            ref={videoRef}
            loop
            playsInline
            muted
            src={require("../video/mainpage.mov")}
          ></video>
        )}
      </Box>
    </MainContainer>
  );
}
