import React, { useEffect, useState } from "react";
import { useMutation, useQueryClient } from "react-query";
import { updateTableStarred } from "../api";
import useToastAlert from "./useToastAlert";

const useMakeTableStarred = (tableId: string) => {
  const queryClientUpdate = useQueryClient();
  const toast = useToastAlert();
  return useMutation(updateTableStarred, {
    onSuccess: () => {},
    onError: () => {
      toast("Something went wrong");
    },
    onSettled: () => {
      queryClientUpdate.invalidateQueries([`tableList`]);
      queryClientUpdate.invalidateQueries([`tableDitailsData${tableId}`]);
    },
  });
};

export default useMakeTableStarred;
