import { CloudUploadOutlined } from "@ant-design/icons";
import { Avatar, Box, Button, Center, Divider, Text } from "@chakra-ui/react";
import { useState } from "react";
import Dropzone from "react-dropzone";
import { useForm } from "react-hook-form";
import { useQuery, useQueryClient } from "react-query";
import styled from "styled-components";
import {
  BASE_URL,
  getUserData,
  updateUserAvatarId,
  uploadUserImage,
} from "../../api";

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  align-items: center;
  padding: 10px;
  margin-top: 20px;
`;

const PhotoForm = () => {
  const {
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();
  const { data } = useQuery("userData", getUserData);
  const avatar = data?.image?.url;
  const [avatarUploded, setAvatarUploded] = useState();
  const [avatarId, setAvatarId] = useState();
  const handleFileUpload = async (file: File) => {
    try {
      const form = new FormData();
      form.append("files", file);
      const response = await uploadUserImage(form);
      console.log("response", response.data[0]);
      setAvatarUploded(response.data[0].url);

      setAvatarId(response.data[0].id);
    } catch (error) {
      console.log(error);
    }
  };
  const queryClient = useQueryClient();
  const onSubmit = async () => {
    avatarId && (await updateUserAvatarId({ avatarId, token: null }));
    queryClient.invalidateQueries("userData");
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
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
            name="avatar"
            src={
              avatar
                ? `${BASE_URL}${avatarUploded ? avatarUploded : avatar}`
                : require("../../photos/avatar.jpg")
            }
            style={{ marginRight: "40px" }}
          />
          <Center height="50px">
            <Divider orientation="vertical" />
          </Center>
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
        </Wrapper>
      </Box>
      <Button m={3} type="submit" colorScheme="brand">
        Save changes
      </Button>
    </form>
  );
};

export default PhotoForm;
