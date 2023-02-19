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
