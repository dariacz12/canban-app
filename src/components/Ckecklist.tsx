import { CloseIcon } from "@chakra-ui/icons";
import { Button, Checkbox, Input } from "@chakra-ui/react";
import Item from "antd/es/list/Item";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import styled from "styled-components";

type Inputs = {
  title: string;
  checkboxitem: string;
};
const Footer = styled.div``;
const IconClose = styled.div``;
const CheckboxGroup = styled.div`
  display: flex;
  justify-content: space-between;
`;
const Checkboxes = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  max-width: 450px;
`;

const Ckecklist = () => {
  const [addItem, setAddItem] = useState<string[]>([]);
  useEffect(() => {
    setFocus("checkboxitem");
  }, []);

  const [closeButtonActive, setCloseButtonActive] = useState<
    string | undefined
  >(undefined);

  const {
    register,
    setFocus,
    resetField,
    getValues,
    formState: { errors },
  } = useForm<Inputs>();

  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
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
      <Checkboxes>
        {addItem &&
          addItem.map((item) => (
            <Checkbox
              wordBreak={"break-word"}
              colorScheme="gray"
              marginLeft={"20px"}
              marginBottom={"10px"}
              maxWidth={"450px"}
              display={"flex"}
            >
              <CheckboxGroup
                style={{ display: "flex" }}
                onMouseOver={() => setCloseButtonActive(item)}
                onMouseLeave={() => setCloseButtonActive(undefined)}
              >
                {item}
                {closeButtonActive === item ? (
                  <div
                    style={{ width: 20, height: 20 }}
                    onClick={(event) => {
                      event.preventDefault();
                    }}
                  >
                    <CloseIcon
                      onClick={() => {
                        setAddItem(
                          addItem.filter((element) => element !== item)
                        );
                      }}
                      marginLeft={"5px"}
                      boxSize={1.5}
                      color="gray.400"
                    />
                  </div>
                ) : (
                  <div style={{ width: 20, height: 20 }} />
                )}
              </CheckboxGroup>
            </Checkbox>
          ))}
      </Checkboxes>
      <Input
        focusBorderColor="#53735E"
        placeholder="Add an item"
        // marginLeft={"20px"}

        marginTop={"5px"}
        _placeholder={{
          fontSize: "sm",
        }}
        //  maxWidth={"425px"}
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
        <Button
          size={"sm"}
          onClick={() => {
            resetField("checkboxitem");
          }}
        >
          Cancel
        </Button>
        <Button
          onClick={() => {
            setAddItem([...addItem, getValues("checkboxitem")]);
            resetField("checkboxitem");
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
