import axios from "axios";

interface CreateUserResponse {
  username: string;
}

export const createUser = async function () {
  try {
    const { data } = await axios.post<CreateUserResponse>(
      "/signup",
      {
        name: "Hannes",
      },
      {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      }
    );

    console.log(JSON.stringify(data, null, 4));
    return data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.log("error: ", error.message);
      return error.message;
    } else {
      console.log("unexpected error: ", error);
      return "An unexpected error occurred";
    }
  }
};
