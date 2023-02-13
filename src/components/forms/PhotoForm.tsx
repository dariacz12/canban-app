import {
  Avatar,
  Box,
  Button,
  Center,
  Divider,
  Heading,
  Text,
} from "@chakra-ui/react";
import React from "react";
import styled from "styled-components";
import Dropzone from "../../components/Dropzone";

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  align-items: center;
  padding: 10px;
  margin-top: 20px;
`;

const PhotoForm = () => {
  return (
    <form>
      <Box>
        <Text pt="2" as="b" fontSize="md" color={"gray.700"}>
          Profile photo
        </Text>
        <Text pt="2" fontSize="sm">
          Change profile photo
        </Text>
        <Wrapper>
          <Avatar
            size="2xl"
            name="Ryan Florence"
            src={require("../../photos/avatar.jpg")}
            style={{ marginRight: "40px" }}
          />
          <Center height="50px">
            <Divider orientation="vertical" />
          </Center>
          <Dropzone />
        </Wrapper>
      </Box>
      <Button m={3} type="submit" colorScheme="brand">
        Save changes
      </Button>
    </form>
  );
};

export default PhotoForm;
