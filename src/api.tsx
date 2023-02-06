import axios from "axios";

export const BASE_URL = "";
export const LOGIN_URL = "http://localhost:8000/api/token";

type UserData = {
  name: string;
  email: string;
  password: string;
  image: string;
};

type LoginData = {
  data: {
    refresh: string;
    access: string;
  };
};
export const createAccount = async (user: object): Promise<UserData> =>
  axios.post(`${BASE_URL}`, user, {
    headers: {
      "Content-Type": "application/json",
    },
  });

export const loginUser = async ({
  email,
  password,
}: {
  email: string;
  password: string;
}): Promise<LoginData> =>
  axios.post(
    `${LOGIN_URL}`,

    { username: email, password },
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
