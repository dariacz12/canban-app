import { CloseIcon } from "@chakra-ui/icons";
import {
  Button,
  Checkbox,
  extendTheme,
  Input,
  Textarea,
} from "@chakra-ui/react";
import React, { useEffect, useRef, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useMutation, useQuery, useQueryClient } from "react-query";
import styled from "styled-components";
import {
  createCheckbox,
  deleteCheckbox,
  deleteToDoList,
  getListsCheckboxes,
  updateCheckboxCheckedStatus,
  updateCheckboxTitle,
  updateToDoListTitle,
} from "../api";
import useClickOutside from "../customHooks/useClickOutside";
import useToastAlert from "../customHooks/useToastAlert";

type Inputs = {
  title: string;
  checkboxitem: string;
};
type InputCheckbox = {
  checkboxitem: string;
};
const Wrap = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
const WrapCheckbox = styled.div``;
const ActiveAddCheckboxWrap = styled.div``;
const AddCancelCheckboxWrap = styled.div``;

const Footer = styled.div``;
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
const Main = styled.div`
  display: flex;
  flex-direction: column;
`;
const Ckecklist = ({
  title,
  cardId,
  toDoTitleId,
}: {
  title: string;
  cardId: string;
  toDoTitleId: string;
}) => {
  const [addItem, setAddItem] = useState<string[]>([]);

  const [closeButtonActive, setCloseButtonActive] = useState<
    string | undefined
  >(undefined);

  const {
    register,
    setFocus,
    resetField,
    getValues,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();
  const toDoTitleInputWraperRef = useRef<HTMLDivElement>(null);

  const onTitleSaved = () => {
    resetField("title");
  };
  const toast = useToastAlert();
  const onSubmitTitle = () => onTitleSaved();
  useClickOutside(toDoTitleInputWraperRef, onTitleSaved);
  const queryClient = useQueryClient();
  const updateToDoListTitleMutation = useMutation(updateToDoListTitle, {
    onSuccess: () => {},
    onError: () => {
      toast("Something went wrong!", "danger");
    },
    onSettled: () => {
      queryClient.invalidateQueries([`ListsToDoListTitles${cardId}`]);
    },
  });
  const updateCheckedBoxStatusMutation = useMutation(
    updateCheckboxCheckedStatus,
    {
      onSuccess: () => {},
      onError: () => {
        toast("Something went wrong!", "danger");
      },
      onSettled: () => {
        queryClient.invalidateQueries([`Checkboxes${toDoTitleId}`]);
      },
    }
  );
  const queryClientToDoListTitleDelete = useQueryClient();
  const deleteToDoListTitleMutation = useMutation(deleteToDoList, {
    onSuccess: () => {},
    onError: () => {
      toast("Something went wrong!", "danger");
    },
    onSettled: () => {
      queryClientToDoListTitleDelete.invalidateQueries([
        `ListsToDoListTitles${cardId}`,
      ]);
    },
  });
  const [activeButton, setActiveButton] = useState<Boolean>(false);

  const { data } = useQuery(`Checkboxes${toDoTitleId}`, () =>
    getListsCheckboxes(String(toDoTitleId))
  );

  const queryClientAddCheckbox = useQueryClient();
  const addCheckboxMutation = useMutation(createCheckbox, {
    onSuccess: () => {},
    onError: () => {
      toast("Something went wrong!", "danger");
    },
    onSettled: () => {
      queryClientAddCheckbox.invalidateQueries([`Checkboxes${toDoTitleId}`]);
    },
  });

  const onSubmitCheckbox: SubmitHandler<InputCheckbox> = ({ checkboxitem }) => {
    addCheckboxMutation.mutate({
      checkboxTitle: checkboxitem,
      toDoTitleId: String(toDoTitleId),
    });
    resetField("checkboxitem");
  };
  const queryClientCheckboxDelete = useQueryClient();
  const deleteCheckboxMutation = useMutation(deleteCheckbox, {
    onSuccess: () => {},
    onError: () => {
      toast("Something went wrong!", "danger");
    },
    onSettled: () => {
      queryClientCheckboxDelete.invalidateQueries([`Checkboxes${toDoTitleId}`]);
    },
  });
  const queryClientCheckboxUpdate = useQueryClient();
  const updateCheckboxMutation = useMutation(updateCheckboxTitle, {
    onSuccess: () => {},
    onError: () => {
      toast("Something went wrong!", "danger");
    },
    onSettled: () => {
      queryClientCheckboxUpdate.invalidateQueries([`Checkboxes${toDoTitleId}`]);
    },
  });
  return (
    <Main>
      <Wrap ref={toDoTitleInputWraperRef}>
        <form
          style={{ maxWidth: "500px" }}
          onSubmit={handleSubmit(onSubmitTitle)}
        >
          <Input
            maxW={"500px"}
            _placeholder={{
              fontWeight: "bold",
              fontSize: "sm",
              color: "#4c4c4c",
              paddingLeft: "0px",
            }}
            {...register("title", { maxLength: 18 })}
            focusBorderColor="#53735E"
            placeholder={title ? title : "Checlist Title"}
            onClick={() => setValue("title", title)}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
              updateToDoListTitleMutation.mutate({
                toDoTitle: event.target.value,
                toDoTitleId: String(toDoTitleId),
              });
            }}
            style={{ border: "none", marginRight: "30px" }}
          />
          {errors.title?.type === "maxLength" && (
            <p style={{ color: "red" }} role="alert">
              Max Length is 18 symbols
            </p>
          )}
        </form>
        <Button
          onClick={() =>
            deleteToDoListTitleMutation.mutate({
              toDoTitleId: String(toDoTitleId),
            })
          }
          size={"xs"}
          color={"gray.600"}
          marginLeft={"10px"}
        >
          Delete
        </Button>
      </Wrap>
      <Checkboxes>
        {data?.attributes.checkboxes.data.map(
          ({ attributes, id: checkboxId }) => (
            <>
              {" "}
              <CheckboxGroup
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "flex-start",
                  paddingRight: "10px",
                }}
                onMouseOver={() =>
                  setCloseButtonActive(attributes.checkboxTitle)
                }
                onMouseLeave={() => setCloseButtonActive(undefined)}
              >
                <Checkbox
                  key={checkboxId}
                  colorScheme="gray"
                  isChecked={attributes.checked}
                  maxWidth={"450px"}
                  display={"flex"}
                  paddingTop={"12px"}
                  onChange={(e) => {
                    updateCheckedBoxStatusMutation.mutate({
                      checked: e.target.checked,
                      checkboxId: String(checkboxId),
                    });
                  }}
                ></Checkbox>
                <Textarea
                  rows={2}
                  border={"none"}
                  onChange={(e) =>
                    updateCheckboxMutation.mutate({
                      checkboxTitle: e.target.value,
                      checkboxId: String(checkboxId),
                    })
                  }
                  style={{
                    wordBreak: "break-all",
                    wordWrap: "break-word",
                  }}
                  value={attributes.checkboxTitle}
                />
                <CloseIcon
                  onClick={() => {
                    deleteCheckboxMutation.mutate({
                      checkboxId: String(checkboxId),
                    });
                  }}
                  marginLeft={"5px"}
                  boxSize={1.5}
                  color="gray.400"
                />
              </CheckboxGroup>
            </>
          )
        )}
      </Checkboxes>

      <form onSubmit={handleSubmit(onSubmitCheckbox)}>
        <Input
          focusBorderColor="#53735E"
          marginTop={"5px"}
          _placeholder={{
            fontSize: "sm",
          }}
          onClick={() => {
            setActiveButton(true);
          }}
          style={{ marginBottom: "10px" }}
          {...register("checkboxitem", { required: true })}
        />
        {errors.checkboxitem?.type === "required" && (
          <span style={{ color: "red" }}>This field is required!</span>
        )}

        <Footer style={{ display: "flex", margin: "10px 0px 30px 0px" }}>
          {!activeButton ? (
            <ActiveAddCheckboxWrap>
              <Button
                onClick={() => {
                  setActiveButton(!activeButton);
                }}
                size={"sm"}
                color={"gray.600"}
              >
                Add an item
              </Button>
            </ActiveAddCheckboxWrap>
          ) : (
            <AddCancelCheckboxWrap>
              <Button
                size={"sm"}
                color={"gray.600"}
                onClick={() => {
                  resetField("checkboxitem");
                  setActiveButton(!activeButton);
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
                Add
              </Button>
            </AddCancelCheckboxWrap>
          )}
        </Footer>
      </form>
    </Main>
  );
};

export default Ckecklist;
