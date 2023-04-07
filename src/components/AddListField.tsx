import { Button, Card, CardBody, Input } from "@chakra-ui/react";
import { m } from "framer-motion";
import { useEffect } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { createList, getTableListsList, updateListOrder } from "../api";

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
  const queryClient = useQueryClient();

  const {
    handleSubmit,
    register,
    setFocus,
    resetField,
    formState: { errors },
  } = useForm<Inputs>();

  let { tableId } = useParams();

  const updateListOrderMutation = useMutation(updateListOrder, {
    onSuccess: () => {},
    onError: () => {
      alert("Something went wrong!");
    },
    onSettled: () => {
      queryClient.invalidateQueries([`tableListsList${tableId}`]);
    },
  });
  const { data: boardData } = useQuery(`tableListsList${tableId}`, () =>
    getTableListsList(String(tableId))
  );
  console.log("listOrder", boardData);
  const addNewList = useMutation(createList, {
    onSuccess: (data) => {
      let listOrder: string[] = [];
      if (boardData?.attributes.listOrder) {
        listOrder = JSON.parse(String(boardData?.attributes.listOrder));
      }
      updateListOrderMutation.mutate({
        tableId: String(tableId),
        listOrder: [...listOrder, data.id],
      });
    },
    onError: () => {
      alert("Something went wrong t!");
    },
    onSettled: () => {
      queryClient.invalidateQueries([`tableListsList${tableId}`]);
    },
  });

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
