import React, { useState } from "react";
import { AppstoreOutlined } from "@ant-design/icons";
import type { MenuProps } from "antd";
import { Menu } from "antd";
import {
  ArrowForwardIcon,
  AttachmentIcon,
  CheckCircleIcon,
  CopyIcon,
  DeleteIcon,
  EditIcon,
  PlusSquareIcon,
} from "@chakra-ui/icons";
import { useNavigate, useParams } from "react-router-dom";
import { useMutation, useQueryClient } from "react-query";
import { deleteCard } from "../api";

type MenuItem = Required<MenuProps>["items"][number];

function getItem(
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[],
  type?: "group"
): MenuItem {
  return {
    key,
    icon,
    children,
    label,
    type,
  } as MenuItem;
}

const items: MenuItem[] = [
  getItem("Add to card", "sub1", <EditIcon />, [
    getItem("Ckecklist", "1", <CheckCircleIcon style={{ color: "dimgray" }} />),
    getItem("Attachment", "2", <AttachmentIcon />),
    getItem("Cover", "3", <PlusSquareIcon />),
  ]),
  getItem("Actions", "sub2", <AppstoreOutlined />, [
    getItem("Move", "5", <ArrowForwardIcon />),
    getItem("Copy", "6", <CopyIcon />),
    getItem("Delete", "7", <DeleteIcon style={{ color: "dimgray" }} />),
  ]),
];

const rootSubmenuKeys = ["sub1", "sub2", "sub4"];

const MenuCardItemEdit = ({
  onClickCheckList,
  onClickAttachment,
  onClickCover,
  cardId,
  listId,
  onClose,
}: {
  onClickCheckList: () => void;
  onClickAttachment: () => void;
  onClickCover: () => void;
  cardId: string;
  listId: string;
  onClose: () => void;
}) => {
  const navigate = useNavigate();
  let { tableId } = useParams();
  const queryClientCardDelete = useQueryClient();
  const delateCardMutation = useMutation(deleteCard, {
    onSuccess: () => {
      onClose();
      navigate(`/tablepage/${tableId}`);
    },
    onError: () => {
      alert("Something went wrong");
    },
    onSettled: () => {
      queryClientCardDelete.invalidateQueries([`cardTitle${listId}`]);
    },
  });
  const deleteCardItem = () => {
    delateCardMutation.mutate(cardId);
  };
  const onClick: MenuProps["onClick"] = (e) => {
    if (e.key === "1") {
      onClickCheckList();
    } else if (e.key === "2") {
      onClickAttachment();
    } else if (e.key === "3") {
      onClickCover();
    } else if (e.key === "4") {
      navigate("/");
    } else if (e.key === "5") {
      navigate("/");
    } else if (e.key === "7") {
      deleteCardItem();
    } else navigate(`/}`);
  };

  const [openKeys, setOpenKeys] = useState(["sub1"]);

  const onOpenChange: MenuProps["onOpenChange"] = (keys) => {
    const latestOpenKey = keys.find((key) => openKeys.indexOf(key) === -1);
    if (rootSubmenuKeys.indexOf(latestOpenKey!) === -1) {
      setOpenKeys(keys);
    } else {
      setOpenKeys(latestOpenKey ? [latestOpenKey] : []);
    }
  };

  return (
    <Menu
      onClick={onClick}
      mode="inline"
      openKeys={openKeys}
      onOpenChange={onOpenChange}
      style={{ maxWidth: "200px", paddingBottom: "20px" }}
      items={items}
    />
  );
};

export default MenuCardItemEdit;
