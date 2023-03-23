import { Button, Card, CardBody, Input, useQuery } from "@chakra-ui/react";
import { useEffect } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "react-query";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { createList } from "../api";

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
  const queryQlient = useQueryClient();

  const {
    handleSubmit,
    register,
    setFocus,
    resetField,
    formState: { errors },
  } = useForm<Inputs>();

  const addNewList = useMutation(createList, {
    onSuccess: () => {
      alert("Your list was successfully created!");
    },
    onError: () => {
      alert("Something went wrong!");
    },
    onSettled: () => {
      queryQlient.invalidateQueries([`tableListsList${tableId}`]);
    },
  });
  let { tableId } = useParams();
  const onSubmit: SubmitHandler<Inputs> = ({ title }) => {
    addNewList.mutate({ title, table: String(tableId) });
    resetField("title");
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
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
    </form>
  );
};

export default AddListField;
