import {
  Box,
  Card,
  CardBody,
  Heading,
  Stack,
  StackDivider,
  Text,
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import styled from "styled-components";
import { FormData } from "../pages/RegisterPage";
import useMediaQuery, { MediaQueryKey } from "use-media-antd-query";
import PhotoForm from "../components/forms/PhotoForm";
import NameForm from "../components/forms/NameForm";
import PasswordForm from "../components/forms/PasswordForm";
import EmailForm from "../components/forms/EmailForm";
import { useState } from "react";

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  align-items: center;
  padding: 10px;
  margin-top: 20px;
`;
const Main = styled.div`
  display: flex;
  justify-content: center;
`;

const SettingPage = () => {
  const mediaQuery = useMediaQuery();
  const {
    register,
    formState: { errors },
  } = useForm<FormData>();
  return (
    <div>
      <Heading style={{ marginLeft: "10px" }} size="lg">
        Settings
      </Heading>
      <Main
        style={{
          flexDirection:
            mediaQuery === "xs"
              ? "column"
              : mediaQuery === "sm"
              ? "column"
              : mediaQuery === "md"
              ? "column"
              : mediaQuery === "lg"
              ? "column"
              : "row",
        }}
      >
        <Card
          style={{
            margin:
              mediaQuery === "xs"
                ? "40px 0px"
                : mediaQuery === "sm"
                ? "40px 0px"
                : mediaQuery === "md"
                ? "40px 0px"
                : "40px 80px",
            width: "100%",
          }}
        >
          <CardBody>
            <Stack divider={<StackDivider />} spacing="4">
              <Box>
                <Heading size="md">About You</Heading>
                <Text pt="2" fontSize="sm">
                  Manage your personal information.
                </Text>
              </Box>
              <PhotoForm />
              <NameForm />
            </Stack>
          </CardBody>
        </Card>

        <Card
          style={{
            margin:
              mediaQuery === "xs"
                ? "40px 0px"
                : mediaQuery === "sm"
                ? "40px 0px"
                : mediaQuery === "md"
                ? "40px 0px"
                : "40px 80px",
            width: "100%",
          }}
        >
          <CardBody>
            <Stack divider={<StackDivider />} spacing="4">
              <Box>
                <Heading size="md">Security</Heading>
                <Text pt="2" fontSize="sm">
                  Keep your account extra secure.
                </Text>
              </Box>
              <PasswordForm />
              <EmailForm />
            </Stack>
          </CardBody>
        </Card>
      </Main>
    </div>
  );
};

export default SettingPage;
