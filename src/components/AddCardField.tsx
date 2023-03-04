import { AddIcon } from "@chakra-ui/icons";
import { Button, Card, CardBody, Input, Textarea } from "@chakra-ui/react";
import { useCallback, useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import styled from "styled-components";

const Footer = styled.div``;
type Inputs = {
  title: string;
};
const AddCardField = ({ onClick }: { onClick: () => void }) => {
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
    <>
      <Textarea
        focusBorderColor="#53735E"
        placeholder="Enter a card title ..."
        _placeholder={{ fontSize: "sm" }}
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
        <Button size={"sm"} onClick={onClick}>
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
          Add Card
        </Button>
      </Footer>
    </>
  );
};

export default AddCardField;
