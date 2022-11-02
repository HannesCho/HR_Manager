import axios from "axios";

enum Role {
  Admin = 0,
  Employee = 1,
}
interface CreateUserDTO {
  username: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  password2: string;
  street: string;
  housenumber: string;
  zipcode: string;
  city: string;
  country: string;
}

interface CreateUserResponse {
  username: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  street: string;
  housenumber: string;
  zipcode: number;
  city: string;
  country: string;
  role: Role;
}

export const createUser = async function (dto: CreateUserDTO) {
  try {
    const { data } = await axios.post<CreateUserResponse>(
      "/signup",
      { ...dto, zipcode: parseInt(dto.zipcode) },
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
