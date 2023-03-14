import axios from "axios";
import { isConstructorDeclaration } from "typescript";

export const BASE_URL = "http://localhost:1337";

type UserData = {
  username: string;
  email: string;
  password: string;
  image: string;
};

type LoginData = {
  data: {
    refresh: string;
    jwt: string;
  };
};
type UserPersonalData = {
  email: string;
  username: string;
  image: string;
};
type TableData = {
  title: string;
  imageName: string;
};
type updateTableTitle = {
  title: string;
  tableId: string | undefined;
};
type updateTableImage = {
  imageName: string;
  tableId: string | undefined;
};
type TableListData = {
  id: number;
  attributes: {
    title: string;
    imageUrl: string;
  };
}[];

type ListData = {
  title: string;
  table: string;
};
type BoardListsListData = {
  id: number;
  attributes: {
    lists: {
      data: ListsListData;
    };
  };
};
type ListsListData = {
  id: number;
  attributes: {
    title: string;
  };
}[];
export const createAccount = async ({
  email,
  username,
  password,
  image,
}: UserData): Promise<UserData> =>
  axios.post(
    `${BASE_URL}/api/auth/local/register`,
    {
      email,
      password,
      username,
      image,
    },
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

export const loginUser = async ({
  email,
  password,
}: {
  email: string;
  password: string;
}): Promise<LoginData> =>
  axios.post(
    `${BASE_URL}/api/auth/local`,

    { identifier: email, password },
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

export const getUserData = async (): Promise<UserPersonalData> => {
  return (
    await axios.get(`${BASE_URL}/api/users/me`, {
      headers: {
        Authorization: `Bearer ${
          JSON.parse(localStorage.getItem("loginData") || "").token
        }`,
      },
    })
  ).data;
};
export const createTable = async ({
  title,
  imageName,
}: TableData): Promise<TableData> =>
  axios.post(
    `${BASE_URL}/api/tables`,
    {
      data: {
        title,
        imageUrl: imageName,
      },
    },
    {
      headers: {
        Authorization: `Bearer ${
          JSON.parse(localStorage.getItem("loginData") || "").token
        }`,
      },
    }
  );

export const updateTableTitle = async ({ title, tableId }: updateTableTitle) =>
  axios.put(
    `${BASE_URL}/api/tables/${tableId}`,
    {
      data: {
        title,
      },
    },
    {
      headers: {
        Authorization: `Bearer ${
          JSON.parse(localStorage.getItem("loginData") || "").token
        }`,
      },
    }
  );
export const updateTableImage = async ({
  imageName,
  tableId,
}: updateTableImage) =>
  axios.put(
    `${BASE_URL}/api/tables/${tableId}`,
    {
      data: {
        imageUrl: imageName,
      },
    },
    {
      headers: {
        Authorization: `Bearer ${
          JSON.parse(localStorage.getItem("loginData") || "").token
        }`,
      },
    }
  );

export const deleteTable = async (tableId: string) =>
  axios.delete(`${BASE_URL}/api/tables/${tableId}`, {
    headers: {
      Authorization: `Bearer ${
        JSON.parse(localStorage.getItem("loginData") || "").token
      }`,
    },
  });

export const getTableList = async (): Promise<TableListData> => {
  return (
    await axios.get(`${BASE_URL}/api/tables`, {
      headers: {
        Authorization: `Bearer ${
          JSON.parse(localStorage.getItem("loginData") || "").token
        }`,
      },
    })
  ).data.data;
};

export const createList = async ({
  title,
  table,
}: ListData): Promise<ListData> =>
  axios.post(
    `${BASE_URL}/api/lists`,
    {
      data: {
        title,
        tables: [table],
      },
    },
    {
      headers: {
        Authorization: `Bearer ${
          JSON.parse(localStorage.getItem("loginData") || "").token
        }`,
      },
    }
  );
export const getTableListsList = async (
  tableId: string
): Promise<BoardListsListData> => {
  return (
    await axios.get(`${BASE_URL}/api/tables/${tableId}`, {
      headers: {
        Authorization: `Bearer ${
          JSON.parse(localStorage.getItem("loginData") || "").token
        }`,
      },
    })
  ).data.data;
};
export const getListsList = async (): Promise<ListsListData> => {
  return (
    await axios.get(`${BASE_URL}/api/lists`, {
      headers: {
        Authorization: `Bearer ${
          JSON.parse(localStorage.getItem("loginData") || "").token
        }`,
      },
    })
  ).data.data;
};
