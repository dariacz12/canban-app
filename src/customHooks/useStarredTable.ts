import React, { useEffect, useState } from "react";
import { useMutation, useQueryClient } from "react-query";
import { updateTableStarred } from "../api";

const useMakeTableStarred = (tableId: string) => {
  const queryClientUpdate = useQueryClient();
  return useMutation(updateTableStarred, {
    onSuccess: () => {},
    onError: () => {
      alert("Something went wrong");
    },
    onSettled: () => {
      queryClientUpdate.invalidateQueries([`tableList`]);
      queryClientUpdate.invalidateQueries([`tableDitailsData${tableId}`]);
    },
  });
};

export default useMakeTableStarred;
