import { Button, Checkbox, Input } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import styled from "styled-components";

type Inputs = {
  title: string;
  checkboxitem: string;
};
const Footer = styled.div``;

const Ckecklist = () => {
  const [addItem, setAddItem] = useState<string[]>([]);
  console.log("addItem", addItem);
  useEffect(() => {
    setFocus("checkboxitem");
  }, []);

  const {
    register,
    setFocus,
    getValues,
    formState: { errors },
  } = useForm<Inputs>();

  return (
    <div>
      <Input
        maxW={"415px"}
        _placeholder={{
          fontWeight: "bold",
          fontSize: "sm",
          color: "#4c4c4c",
          paddingLeft: "0px",
        }}
        focusBorderColor="#53735E"
        placeholder="Checbox Title"
        style={{ border: "none", margin: "0px 25px 0px 5px " }}
        {...register("title", { maxLength: 18 })}
      />
      {errors.title?.type === "maxLength" && (
        <p style={{ color: "red" }} role="alert">
          Max Length is 18 symbols
        </p>
      )}
      {addItem &&
        addItem.map((item) => (
          <Checkbox marginLeft={"20px"} marginBottom={"10px"}>
            {item}
          </Checkbox>
        ))}
      <Input
        focusBorderColor="#53735E"
        placeholder="Add an item"
        marginLeft={"20px"}
        _placeholder={{
          fontSize: "sm",
        }}
        maxWidth={"420px"}
        style={{ marginBottom: "10px" }}
        {...register("checkboxitem", { required: true, maxLength: 18 })}
      />
      {errors.checkboxitem?.type === "required" && (
        <span style={{ color: "red" }}>This field is required!</span>
      )}
      {errors.checkboxitem?.type === "maxLength" && (
        <p style={{ color: "red" }} role="alert">
          Max Length is 18 symbols
        </p>
      )}
      <Footer style={{ display: "flex", margin: "20px" }}>
        <Button size={"sm"}>Cancel</Button>
        <Button
          onClick={() => {
            setAddItem([...addItem, getValues("checkboxitem")]);
          }}
          size={"sm"}
          background="#53735E"
          color="#F2F2F2"
          _hover={{ color: "black", bg: "#F2F2F2" }}
          ml={3}
          type="submit"
        >
          Add
        </Button>
      </Footer>
    </div>
  );
};

export default Ckecklist;
