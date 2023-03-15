import { ChevronDownIcon } from "@chakra-ui/icons";
import { Button, Menu, MenuButton, MenuItem, MenuList } from "@chakra-ui/react";
import React from "react";
import { QueryClient, useMutation, useQueryClient } from "react-query";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { deleteTable } from "../api";

const Wrap = styled.div``;
const TableBurgerMenu = ({
  onClickChangeImage,
  tableId,
}: {
  onClickChangeImage: () => void;
  tableId: string;
}) => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const deleteTableMutation = useMutation(deleteTable, {
    onSuccess: () => {
      navigate("/dashboard");
    },
    onError: () => {
      alert("Something went wrong");
    },
    onSettled: () => {
      queryClient.invalidateQueries(["tableList"]);
    },
  });

  return (
    <Wrap style={{ margin: "0px 30px 0px 10px" }}>
      <Menu>
        {({ isOpen }) => (
          <>
            <MenuButton
              isActive={isOpen}
              as={Button}
              rightIcon={<ChevronDownIcon />}
            >
              {isOpen ? "Close" : "More"}
            </MenuButton>
            <MenuList>
              <MenuItem onClick={onClickChangeImage}>
                Change Background Image
              </MenuItem>
              <MenuItem onClick={() => deleteTableMutation.mutate(tableId)}>
                Delete Table
              </MenuItem>
            </MenuList>
          </>
        )}
      </Menu>
    </Wrap>
  );
};

export default TableBurgerMenu;
