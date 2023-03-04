import { AddIcon } from "@chakra-ui/icons";
import { Button, Card, CardBody, Input } from "@chakra-ui/react";
import { useCallback, useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import styled from "styled-components";

const Footer = styled.div``;
type Inputs = {
  title: string;
};
const AddListField = ({
  setActiveAddList,
  activeAddList,
}: {
  setActiveAddList: React.Dispatch<React.SetStateAction<boolean>>;
  activeAddList: boolean;
}) => {
  useEffect(() => {
    setFocus("title");
  }, []);

  const {
    setValue,
    register,
    setFocus,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm<Inputs>();
  return (
    <Card
      maxW="231px"
      h={"fit-content"}
      style={{ marginLeft: "20px", background: "#e5e5e5" }}
      shadow="2px"
    >
      <CardBody
        style={{
          alignItems: "center",
          justifyContent: "left",
          paddingTop: 15,
          paddingBottom: 15,
          paddingRight: 15,
          paddingLeft: 15,
          cursor: "pointer",
        }}
      >
        <Input
          focusBorderColor="#53735E"
          placeholder="Board Title"
          style={{ marginBottom: "10px" }}
          {...register("title", { required: true, maxLength: 18 })}
        />
        {errors.title?.type === "required" && (
          <span style={{ color: "red" }}>This field is required!</span>
        )}
        {errors.title?.type === "maxLength" && (
          <p style={{ color: "red" }} role="alert">
            Max Length is 18 symbols
          </p>
        )}
        <Footer style={{ display: "flex" }}>
          <Button
            size={"sm"}
            onClick={() => {
              setActiveAddList(!activeAddList);
            }}
          >
            Cancel
          </Button>
          <Button
            size={"sm"}
            background="#53735E"
            color="#F2F2F2"
            _hover={{ color: "black", bg: "#F2F2F2" }}
            ml={3}
            type="submit"
          >
            Add List
          </Button>
        </Footer>
      </CardBody>
    </Card>
  );
};

export default AddListField;
