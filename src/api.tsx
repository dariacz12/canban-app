import axios from "axios";
import { isConstructorDeclaration } from "typescript";

export const BASE_URL = "http://localhost:8000";

type UserData = {
  name: string;
  email: string;
  password: string;
  image: string;
};

type LoginData = {
  data: {
    refresh: string;
    token: string;
  };
};
type UserPersonalData = {
  email: string;
  first_name: string;
  last_name: string;
  username: string;
};
type TableData = {
  title: string;
  imageName: string;
};
type TableListData = {
  id: number;
  name: string;
  imageUrl: string;
}[];
export const createAccount = async ({
  email,
  name,
  password,
  image,
}: UserData): Promise<UserData> =>
  axios.post(
    `${BASE_URL}/api/register`,
    {
      email,
      password,
      username: Math.random() * 1000,
      first_name: name,
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
    `${BASE_URL}/api/login`,

    { email, password },
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

export const getUserData = async (): Promise<UserPersonalData> => {
  return (
    await axios.get(`${BASE_URL}/api/user`, {
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
    `${BASE_URL}/api/board`,
    {
      id: Math.random() * 1000,
      name: title,
      imageUrl: imageName,
    },
    {
      headers: {
        Authorization: `Bearer ${
          JSON.parse(localStorage.getItem("loginData") || "").token
        }`,
      },
    }
  );
export const getTableList = async (): Promise<TableListData> => {
  return (
    await axios.get(`${BASE_URL}/api/board/list`, {
      headers: {
        Authorization: `Bearer ${
          JSON.parse(localStorage.getItem("loginData") || "").token
        }`,
      },
    })
  ).data;
};
