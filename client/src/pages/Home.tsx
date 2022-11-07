import { useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { IUser } from "../types/user.type";
import { getUserList } from "../services/user.service";
import { IEmployee } from "../types/employee.type";
import { getEmployeeList } from "../services/employee.service";

const HomePage = () => {
  const [users, setUsers] = useState<Array<IUser>>([]);
  const [employees, setEmployees] = useState<Array<IEmployee>>([]);
  //get all User List
  const getAllUsers = useCallback(async () => {
    try {
      const response = await getUserList();
      setUsers(response.data);
    } catch (error) {
      console.log(error);
    }
  }, []);

  useEffect(() => {
    getAllUsers();
  }, [getAllUsers]);

  const getAllEmployee = useCallback(async () => {
    try {
      const response = await getEmployeeList();

      setEmployees(response.data);
    } catch (error) {
      console.log(error);
    }
  }, []);

  useEffect(() => {
    getAllEmployee();
  }, [getAllEmployee]);

  const AllList = [...users, ...employees];

  //CSV-start
  interface UserCsvData {
    [key: string]: string;
  }
  const handleCSV = () => {
    const objectToCsv = (data: Array<UserCsvData>) => {
      //csvArray
      const csvRows = [];
      //push the headers
      const headers = "Vorname,Nachname,Strasse,Nr,PLZ,Ort,Land,Rolle";
      csvRows.push(headers);
      //loop over the rows
      for (const user of data) {
        const values = Object.keys(data[0]).map((header) => {
          const escaped = ("" + user[header]).replace(/"/g, '\\"');
          return `"${escaped}"`;
        });
        csvRows.push(values.join(","));
      }
      return csvRows.join("\n");
    };
    const download = (data: string) => {
      const blob = new Blob([data], { type: "text/csv" });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.setAttribute("hidden", "");
      a.setAttribute("href", url);
      a.setAttribute("download", "ListOfEmployees.csv");
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    };

    const data = AllList.map((user) => ({
      firstName: user.firstName,
      lastName: user.lastName,
      street: user.street,
      housenumber: user.housenumber,
      zipcode: user.zipcode,
      city: user.city,
      country: user.country,
      role: user.role,
    }));
    const csvData = objectToCsv(data);
    console.log(csvData);
    download(csvData);
  };
  // CSV-end

  return (
    <div className="flex flex-col item-center bg-gray-200">
      <h1 className="pt-5 pl-10 block text-2xl font-medium text-[#07074D]">
        All Employees List
      </h1>
      <div className="flex p-2 justify-end mb-5 mr-10">
        <button
          className="hover:shadow-form rounded-md bg-blue-500 hover:bg-blue-400 py-2 px-4 text-sm font-semibold text-white outline-none"
          onClick={() => handleCSV()}
        >
          Download Employee List
        </button>
      </div>
      <ul>
        {AllList.map((user) => {
          return (
            <li key={user._id} className="mx-10 my-2">
              <div className="flex min-w-min max-w-xl md:max-w-full flex-col md:flex-row md:justify-between p-5 rounded-xl bg-white p-4 shadow-lg">
                <div className="flex">
                  <div className="flex mr-10 h-12 w-12 items-center justify-center rounded-full border border-orange-100 bg-orange-50">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6 text-orange-400"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      stroke-width="2"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                      />
                    </svg>
                  </div>
                  <div className="flex flex-col">
                    <p className="text-base md:text-xl font-semibold">
                      {user.firstName} &nbsp;
                      {user.lastName}
                    </p>
                    <p className="text-sm md:text-base text-gray-300">
                      {user.email}
                    </p>
                  </div>
                </div>
                <div className="flex justify-end mt-5 md:mt-0 md:justify-center">
                  <Link
                    className="flex items-center hover:shadow-form mr-5 rounded-md bg-amber-500 hover:bg-amber-400 py-2 px-4 text-sm font-semibold text-white outline-none"
                    to={`/${user._id}`}
                  >
                    Profile
                  </Link>
                  <Link
                    className="flex items-center hover:shadow-form rounded-md bg-amber-500 hover:bg-amber-400 py-2 px-4 text-sm font-semibold text-white outline-none"
                    to={`edit/${user._id}`}
                  >
                    Edit
                  </Link>
                </div>
              </div>
            </li>
          );
        })}
      </ul>
      <hr className="m-5" />
    </div>
  );
};

export default HomePage;
