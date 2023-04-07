import { StarIcon } from "@chakra-ui/icons";
import {
  Card,
  CardBody,
  Heading,
  Input,
  useDisclosure,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { getTable, updateTableTitle } from "../api";
import usePageList from "../customHooks/usePageList";
import useMakeTableStarred from "../customHooks/useStarredTable";
import useStarredTable from "../customHooks/useStarredTable";
import ChangeBackgroundImage from "./ChangeBackgroundImage";
import TableBurgerMenu from "./TableBurgerMenu";

const MenuItemsBoard = [
  { name: "Change Background Image", id: "1item" },
  { name: "Delete Board", id: "2item" },
];

const LeftMenu = styled.div``;
const RightMenu = styled.div``;
const TableMenu = () => {
  const { setValue, register } = useForm();
  const [state] = usePageList();

  let { tableId } = useParams<{ tableId?: string }>();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = React.useRef<HTMLButtonElement>(null);

  const { mutate } = useMakeTableStarred(String(tableId));
  const { data } = useQuery(`tableDitailsData${tableId}`, () =>
    getTable(String(tableId))
  );

  const starrtedTable = (tableId: string | undefined) => {
    mutate({ starred: Boolean(!data?.attributes.starred), tableId });
  };
  return (
    <>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          height: "70px",
          justifyContent: "space-between",
        }}
      >
        <LeftMenu
          style={{ display: "flex", alignItems: "center", height: "70px" }}
        >
          <Card
            shadow="2px"
            margin="0px 0px 0px 20px"
            style={{ background: "rgba(204, 204, 204, 0)" }}
          >
            <CardBody
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                padding: 5,
              }}
            >
              <form>
                <Input
                  focusBorderColor="#53735E"
                  border={"none"}
                  color="whitesmoke"
                  fontWeight="bold"
                  {...register("title", { maxLength: 18 })}
                  _placeholder={{
                    color: "whitesmoke",
                    position: "relative",
                    fontWeight: "bold",
                  }}
                  placeholder={
                    state?.find(({ id }) => String(id) === tableId)?.boardName
                  }
                  onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                    updateTableTitle({ title: event.target.value, tableId });
                  }}
                />
              </form>
            </CardBody>
          </Card>
        </LeftMenu>
        <RightMenu
          style={{ display: "flex", alignItems: "center", height: "70px" }}
        >
          <Card
            style={{
              marginLeft: "20px",
              background: "rgba(204, 204, 204, 0.5)",
            }}
            shadow="2px"
          >
            <CardBody
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                padding: 15,
              }}
            >
              <StarIcon
                style={{
                  cursor: "pointer",
                  color: data?.attributes.starred ? "#53735E" : "whitesmoke",
                  position: "relative",
                }}
                onClick={() => {
                  starrtedTable(tableId);
                }}
              />
            </CardBody>
          </Card>

          <TableBurgerMenu
            onClickChangeImage={onOpen}
            tableId={String(tableId)}
          />
        </RightMenu>
      </div>
      <ChangeBackgroundImage
        tableId={tableId}
        isOpen={isOpen}
        onClose={onClose}
        cancelRef={cancelRef}
      />
    </>
  );
};

export default TableMenu;
