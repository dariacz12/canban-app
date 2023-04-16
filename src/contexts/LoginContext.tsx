import { createContext, ReactNode, useEffect, useState } from "react";

export type LoginDataType = {
  token: string;
  refreshToken: string;
};

type LoginContextType = {
  data: LoginDataType;
  setData: React.Dispatch<React.SetStateAction<LoginDataType>>;
};
export const LoginContext = createContext<LoginContextType>({
  data: {
    refreshToken: "",
    token: "",
  },
  setData: () => {},
});
export const LoginContextProvider = ({ children }: { children: ReactNode }) => {
  const [data, setData] = useState<LoginDataType>(
    JSON.parse(localStorage.getItem("loginData") || "{}").token === ""
      ? {
          token: "",
          refreshToken: "",
        }
      : JSON.parse(localStorage.getItem("loginData") || "{}")
  );

  useEffect(() => {
    localStorage.setItem("loginData", JSON.stringify(data));
  }, [data]);
  return (
    <LoginContext.Provider value={{ data, setData }}>
      {children}
    </LoginContext.Provider>
  );
};
