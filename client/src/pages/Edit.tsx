import { useCallback, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { editUser, getProfileUser } from "../services/user.service";
import { UserDTO } from "../types/dtos.type";
import { IUser } from "../types/user.type";

const Edit = () => {
  const [thisUser, setThisUser] = useState<IUser | null | undefined>();
  const [username, setUsername] = useState(thisUser?.username);
  const [email, setEmail] = useState(thisUser?.email);
  const [firstName, setFirstName] = useState(thisUser?.firstName);
  const [lastName, setLastName] = useState(thisUser?.lastName);
  const [street, setStreet] = useState(thisUser?.street);
  const [housenumber, setHousenumber] = useState(thisUser?.housenumber);
  const [zipcode, setZipcode] = useState(thisUser?.zipcode);
  const [city, setCity] = useState(thisUser?.city);
  const [country, setCountry] = useState(thisUser?.country);
  const [role, setRole] = useState(thisUser?.role);
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    setUsername(thisUser?.username);
    setEmail(thisUser?.email);
    setFirstName(thisUser?.firstName);
    setLastName(thisUser?.lastName);
    setStreet(thisUser?.street);
    setHousenumber(thisUser?.housenumber);
    setZipcode(thisUser?.zipcode);
    setCity(thisUser?.city);
    setCountry(thisUser?.country);
    setRole(thisUser?.role);
  }, [thisUser]);

  //get Employee for Current Profile
  const getThisUser = useCallback(async () => {
    try {
      const response = await getProfileUser(id);
      setThisUser(response.data);
    } catch (error) {
      console.log(error);
    }
  }, [id, setThisUser]);

  useEffect(() => {
    getThisUser();
  }, [getThisUser]);

  //Edit this User
  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    const userDTO: UserDTO = {
      username,
      firstName,
      lastName,
      email,
      street,
      housenumber,
      zipcode,
      city,
      country,
      role,
    };
    try {
      const editedUser = await editUser(userDTO, id);
      if (typeof editedUser.data.errorMessage === "string") {
        setErrorMessage(editedUser.data.errorMessage);
        window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
      } else {
        navigate(`/${id}`);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex items-center justify-center p-12">
      <div className="mx-auto w-full max-w-[550px]">
        {errorMessage ? (
          <div
            className="mb-3 bg-red-100 border-t border-b border-red-500 text-red-700 px-4 py-3"
            role="alert"
          >
            <p className="font-bold">Error : please try again!</p>
            <p className="text-sm">{errorMessage}</p>
          </div>
        ) : (
          <></>
        )}
        <form onSubmit={handleSubmit}>
          <h3 className="mb-8 block text-2xl font-medium text-[#07074D]">
            Edit Employee&nbsp;:&nbsp;{thisUser?.firstName}&nbsp;
            {thisUser?.lastName}
          </h3>

          <label
            className="mb-3 block text-base font-medium text-[#07074D]"
            htmlFor="username"
          >
            Username*
            <span className="text-gray-400">
              {" "}
              only for User not for Employee
            </span>
          </label>
          <input
            className="w-full mb-5 rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#60a5fa] focus:shadow-md"
            type="text"
            name="username"
            value={username}
            onChange={(e: React.FormEvent<HTMLInputElement>) =>
              setUsername(e.currentTarget.value)
            }
          />
          <br></br>
          <label
            className="mb-3 block text-base font-medium text-[#07074D]"
            htmlFor="email"
          >
            Email*
          </label>
          <input
            className="w-full mb-5 rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#60a5fa] focus:shadow-md"
            type="email"
            name="email"
            value={email}
            onChange={(e: React.FormEvent<HTMLInputElement>) =>
              setEmail(e.currentTarget.value)
            }
          />
          <br></br>
          <label
            className="mb-3 block text-base font-medium text-[#07074D]"
            htmlFor="firstName"
          >
            First Name*
          </label>
          <input
            className="w-full mb-5 rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#60a5fa] focus:shadow-md"
            type="text"
            name="firstName"
            value={firstName}
            onChange={(e: React.FormEvent<HTMLInputElement>) =>
              setFirstName(e.currentTarget.value)
            }
          />
          <br></br>
          <label
            className="mb-3 block text-base font-medium text-[#07074D]"
            htmlFor="lastName"
          >
            Last Name*
          </label>
          <input
            className="w-full mb-5 rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#60a5fa] focus:shadow-md"
            type="text"
            name="lastName"
            value={lastName}
            onChange={(e: React.FormEvent<HTMLInputElement>) =>
              setLastName(e.currentTarget.value)
            }
          />
          <br></br>
          <div>
            <label className="mb-3 block text-base font-medium text-[#07074D]">
              Address
            </label>
            <div className="grid grid-cols-4">
              <div className="col-span-3">
                <label
                  className="mb-3 block text-base font-medium text-[#07074D]"
                  htmlFor="street"
                >
                  Street
                </label>
                <input
                  className="w-full mb-5 rounded-md border border-[#e0e0e0] bg-white py-1 px-3 text-base font-medium text-[#6B7280] outline-none focus:border-[#60a5fa] focus:shadow-md"
                  type="text"
                  name="street"
                  value={street}
                  onChange={(e: React.FormEvent<HTMLInputElement>) =>
                    setStreet(e.currentTarget.value)
                  }
                />
                <br></br>
              </div>
              <div className="ml-5">
                <label
                  className="mb-3 block text-base font-medium text-[#07074D]"
                  htmlFor="housenumber"
                >
                  Nr
                </label>
                <input
                  className="w-full mb-5 rounded-md border border-[#e0e0e0] bg-white py-1 px-3  text-base font-medium text-[#6B7280] outline-none focus:border-[#60a5fa] focus:shadow-md"
                  type="text"
                  name="housenumber"
                  value={housenumber}
                  onChange={(e: React.FormEvent<HTMLInputElement>) =>
                    setHousenumber(e.currentTarget.value)
                  }
                />
                <br></br>
              </div>
            </div>
            <div className="grid grid-cols-2">
              <div className="mr-5">
                <label
                  className="mb-3 block text-base font-medium text-[#07074D]"
                  htmlFor="zipcode"
                >
                  PLZ
                </label>
                <input
                  className="w-full mb-5 rounded-md border border-[#e0e0e0] bg-white py-1 px-3 text-base font-medium text-[#6B7280] outline-none focus:border-[#60a5fa] focus:shadow-md"
                  type="number"
                  name="zipcode"
                  value={zipcode}
                  onChange={(e: React.FormEvent<HTMLInputElement>) =>
                    setZipcode(e.currentTarget.value)
                  }
                />
                <br></br>
              </div>
              <div>
                <label
                  className="mb-3 block text-base font-medium text-[#07074D]"
                  htmlFor="city"
                >
                  Ort
                </label>
                <input
                  className="w-full mb-5 rounded-md border border-[#e0e0e0] bg-white py-1 px-3  text-base font-medium text-[#6B7280] outline-none focus:border-[#60a5fa] focus:shadow-md"
                  type="text"
                  name="city"
                  value={city}
                  onChange={(e: React.FormEvent<HTMLInputElement>) =>
                    setCity(e.currentTarget.value)
                  }
                />
                <br></br>
              </div>
            </div>
            <label
              className="mb-3 block text-base font-medium text-[#07074D]"
              htmlFor="country"
            >
              Land
            </label>
            <input
              className="w-full mb-5 rounded-md border border-[#e0e0e0] bg-white py-1 px-3  text-base font-medium text-[#6B7280] outline-none focus:border-[#60a5fa] focus:shadow-md"
              type="text"
              name="country"
              value={country}
              onChange={(e: React.FormEvent<HTMLInputElement>) =>
                setCountry(e.currentTarget.value)
              }
            />
          </div>
          <label
            className="mb-3 block text-base font-medium text-[#07074D]"
            htmlFor="role"
          >
            Role*
          </label>
          <input
            className="w-full mb-5 rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#60a5fa] focus:shadow-md"
            type="text"
            name="role"
            value={role}
            onChange={(e: React.FormEvent<HTMLInputElement>) =>
              setRole(e.currentTarget.value)
            }
          />
          <br></br>
          <h3 className="mb-8 block text-base font-medium text-gray-500">
            * required
          </h3>
          <button
            className="hover:shadow-form rounded-md bg-blue-500 hover:bg-blue-400 py-3 px-8 text-base font-semibold text-white outline-none"
            type="submit"
          >
            Edit this Employee
          </button>
        </form>
      </div>
    </div>
  );
};

export default Edit;
