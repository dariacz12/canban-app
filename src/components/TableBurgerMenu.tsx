import { ChevronDownIcon } from "@chakra-ui/icons";
import { Button, Menu, MenuButton, MenuItem, MenuList } from "@chakra-ui/react";
import React from "react";
import { QueryClient, useMutation, useQueryClient } from "react-query";
import { useNavigate } from "react-router-dom";
import { deleteTable } from "../api";

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
    <Menu>
      {({ isOpen }) => (
        <>
          <MenuButton
            isActive={isOpen}
            as={Button}
            rightIcon={<ChevronDownIcon />}
          >
            {isOpen ? "Close" : "Open"}
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
  );
};

export default TableBurgerMenu;
