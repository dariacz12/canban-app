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
type ListsListCardsTitles = {
  id: number;
  attributes: {
    cards: {
      data: {
        id: number;
        attributes: {
          title: string;
        };
      }[];
    };
  };
};
type ListsToDoListTitles = {
  id: number;
  attributes: {
    todo_lists: {
      data: {
        id: number;
        attributes: {
          toDoTitle: string;
        };
      }[];
    };
  };
};
type CardDataDescription = {
  id: number;
  attributes: {
    title: string;
    description: string;
  };
};

type toDoListTitleData = {
  id: number;
  attributes: {
    toDoTitle: string;
  };
};
type ListsListData = {
  id: number;
  attributes: {
    title: string;
  };
}[];

type CardtData = {
  title: string;
  listId: String;
};

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
export const updateListTitle = async ({
  title,
  listId,
}: {
  title: string;
  listId: string;
}) =>
  axios.put(
    `${BASE_URL}/api/lists/${listId}`,
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
export const deleteList = async (listId: string) =>
  axios.delete(`${BASE_URL}/api/lists/${listId}`, {
    headers: {
      Authorization: `Bearer ${
        JSON.parse(localStorage.getItem("loginData") || "").token
      }`,
    },
  });
export const getTableListsList = async (
  tableId: string
): Promise<BoardListsListData> => {
  return (
    await axios.get(`${BASE_URL}/api/tables/${tableId}?populate=*`, {
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
export const createCard = async ({
  title,
  listId,
}: {
  title: string;
  listId: string;
}): Promise<CardtData> =>
  axios.post(
    `${BASE_URL}/api/cards`,
    {
      data: {
        title,
        lists: [listId],
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

export const getListsListCardsTitles = async (
  listId: string
): Promise<ListsListCardsTitles> => {
  return (
    await axios.get(`${BASE_URL}/api/lists/${listId}?populate=*`, {
      headers: {
        Authorization: `Bearer ${
          JSON.parse(localStorage.getItem("loginData") || "").token
        }`,
      },
    })
  ).data.data;
};
export const getCardData = async (
  cardId: string
): Promise<CardDataDescription> => {
  return (
    await axios.get(`${BASE_URL}/api/cards/${cardId}?populate=*`, {
      headers: {
        Authorization: `Bearer ${
          JSON.parse(localStorage.getItem("loginData") || "").token
        }`,
      },
    })
  ).data.data;
};
export const updateCardTitle = async ({
  title,
  cardId,
}: {
  title: string;
  cardId: string;
}) =>
  axios.put(
    `${BASE_URL}/api/cards/${cardId}`,
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
export const updateCardDescription = async ({
  description,
  cardId,
}: {
  description: string;
  cardId: string;
}) =>
  axios.put(
    `${BASE_URL}/api/cards/${cardId}`,
    {
      data: {
        description,
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
export const deleteCard = async (cardId: string) =>
  axios.delete(`${BASE_URL}/api/cards/${cardId}`, {
    headers: {
      Authorization: `Bearer ${
        JSON.parse(localStorage.getItem("loginData") || "").token
      }`,
    },
  });
export const createToDoList = async ({
  toDoTitle,
  cardId,
}: {
  toDoTitle: string;
  cardId: string;
}): Promise<toDoListTitleData> =>
  axios.post(
    `${BASE_URL}/api/todo-lists`,
    {
      data: {
        toDoTitle,
        cards: [cardId],
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
export const getListsToDoListTitles = async (
  cardId: string
): Promise<ListsToDoListTitles> => {
  return (
    await axios.get(`${BASE_URL}/api/cards/${cardId}?populate=*`, {
      headers: {
        Authorization: `Bearer ${
          JSON.parse(localStorage.getItem("loginData") || "").token
        }`,
      },
    })
  ).data.data;
};
export const getToDoListData = async (
  toDoListId: string
): Promise<toDoListTitleData> => {
  return (
    await axios.get(`${BASE_URL}/api/todo-lists/${toDoListId}?populate=*`, {
      headers: {
        Authorization: `Bearer ${
          JSON.parse(localStorage.getItem("loginData") || "").token
        }`,
      },
    })
  ).data.data;
};
