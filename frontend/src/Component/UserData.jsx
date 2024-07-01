import React, { useEffect, useState } from "react";
import axios from "axios";
import { Table , Button } from "react-bootstrap";
import {Link} from 'react-router-dom'

function UserData() {
  const [data, setData] = useState([]);

  useEffect(() => {
    getUsers();
  }, []);

  const getUsers = async () => {
    try {
      const response = await axios.get("http://localhost:5000/usersdata");
      const userdata = await response.data;
      console.log(response);
      setData(userdata);
      console.log(data.name);
    } catch (error) {
      console.log("Error fetching users data", error);
    }
  };

  return (
    <div className="container">
      <h1 className="my-4 text-center ">Users Data</h1>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Sr No</th>
            <th>Name</th>
            <th>Date of Birth</th>
            <th>Email</th>
          </tr>
        </thead>
        <tbody>
          {data.map((user, i) => (
            <tr key={i}>
              <td>{i + 1}</td>
              <td>{user.name}</td>
              <td>{new Date(user.dateOfBirth).toLocaleDateString()}</td>
              <td>{user.email}</td>
              {/* <td>{user.password}</td> */}
            </tr>
          ))}
        </tbody>
      </Table>
      <Button variant="primary" className="m-2 text-dark ">
        <Link to='/register' className="text-white text-decoration-none ">Add New User</Link>
      </Button>
    </div>
  );
}

export default UserData;
