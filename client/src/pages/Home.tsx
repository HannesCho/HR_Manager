import axios from "axios";
import { useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { IUser } from "../types/user.type";
import { getUserList } from "../services/user.service";
export default function HomePage() {
  const [users, setUsers] = useState<Array<IUser>>([]);

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

    const data = users.map((user) => ({
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

  return (
    <div className="home-container">
      <h1>HR Manager</h1>
      <button className="main-btn" onClick={() => handleCSV()}>
        Download Employee List
      </button>

      <ul>
        {users.map((user) => {
          return (
            <>
              <li key={user._id}>{user.username}</li>
              <Link to={`/${user._id}`}>details</Link>
              <Link to={`edit/${user._id}`}>edit</Link>
            </>
          );
        })}
      </ul>
    </div>
  );
}
