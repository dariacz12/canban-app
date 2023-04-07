import { Button, Textarea } from "@chakra-ui/react";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import {
  createCard,
  getListsListCardsTitles,
  updateCardsOrderInList,
} from "../api";

const Footer = styled.div``;
type Inputs = {
  title: string;
};
const AddCardField = ({
  listId,
  onClick,
}: {
  listId: string;
  onClick: () => void;
}) => {
  useEffect(() => {
    setFocus("title");
  }, []);
  const {
    register,
    resetField,
    handleSubmit,
    setFocus,
    formState: { errors },
  } = useForm<Inputs>();
  let { tableId } = useParams();
  const navigate = useNavigate();

  const queryQlient = useQueryClient();

  const updateCardsOrderMutation = useMutation(updateCardsOrderInList, {
    onSuccess: () => {},
    onError: () => {
      alert("Something went wrong!");
    },
    onSettled: () => {
      queryQlient.invalidateQueries([`cardTitle${listId}`]);
    },
  });
  const { data: listData } = useQuery(`cardTitle${listId}`, () =>
    getListsListCardsTitles(String(listId))
  );
  console.log("cardOrder", listData);
  const addNewCard = useMutation(createCard, {
    onSuccess: (data) => {
      console.log("data", data);
      navigate(`/tablepage/${tableId}`);
      resetField("title");
      let cardOrder: number[] = [];
      if (listData?.attributes.cardOrder) {
        cardOrder = JSON.parse(String(listData?.attributes.cardOrder));
      }
      updateCardsOrderMutation.mutate({
        listId: String(listId),
        cardOrder: [...cardOrder, Number(data.id)],
      });
    },
    onError: () => {
      alert("Something went wrong!");
    },
    onSettled: () => {
      queryQlient.invalidateQueries([`cardTitle${listId}`]);
    },
  });
  const onSubmit = ({ title }: { title: string }) => {
    addNewCard.mutate({ title, listId });
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
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
      </form>
    </>
  );
};

export default AddCardField;
