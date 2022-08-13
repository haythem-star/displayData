import React, { Fragment, useEffect, useState } from "react";
import "../../../node_modules/bootstrap/dist/css/bootstrap.css";

export default function UserTab() {
  const [userTable, setUserTable] = useState([]);
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setemail] = useState("");
  const [phone, setphone] = useState("");
  const [website, setwebsite] = useState("");
  const [addbool, setAddbool] = useState(false);
  const DeleteUser = (email) => {
    setUserTable(userTable.filter((item) => item.email !== email));
    console.log(userTable);
  };
  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/users", { method: "get" })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        localStorage.setItem("userTable", JSON.stringify(data));
        const tab = JSON.parse(localStorage.getItem("userTable"));
        setUserTable((userTable) => [...userTable, ...tab]);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  const handleAddUserForm = (e)=> {
    e.preventDefault()  
    const new_user = {name : name,username:username,email:email,phone:phone,website:website};
    setUserTable((userTable) => [...userTable, new_user]);
    setAddbool(!addbool)
    setName("");
    setUsername("");
    setemail("");
    setphone("");
    setwebsite("");

  }
  return (
    <Fragment>
      <table className="table">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">name</th>
            <th scope="col">username</th>
            <th scope="col">email</th>
            <th scope="col">Phone</th>
            <th scope="col">website</th>
            <th scope="col">Delete User</th>
          </tr>
        </thead>
        <tbody>
          {userTable.map((e, i) => {
            return (
              <tr key={i}>
                <th scope="row">{i}</th>
                <td>{e.name}</td>
                <td>{e.username}</td>
                <td>{e.email}</td>
                <td>{e.phone}</td>
                <td>{e.website}</td>
                <th scope="col">
                  <button
                    type="button"
                    className="btn btn-danger"
                    onClick={() => {
                      DeleteUser(e.email);
                    }}
                  >
                    Delete
                  </button>
                </th>
              </tr>
            );
          })}
        </tbody>
      </table>
      {addbool ? (
        <form style={{ margin: "10px" }} onSubmit={handleAddUserForm}>
          <div className="form-row">
            <div className="form-group col-md-6">
              <label htmlFor="inputEmail4">Email</label>
              <input
                value={email}
                onChange={(event) => {
                  setemail(event.target.value);
                }}
                type="email"
                className="form-control"
                id="inputEmail4"
              />
            </div>
            <div className="form-group col-md-6">
              <label htmlFor="inputPassword4">name</label>
              <input
                value={name}
                onChange={(event) => {
                  setName(event.target.value);
                }}
                className="form-control"
              />
            </div>
          </div>
          <div className="form-row">
            <div className="form-group col-md-6">
              <label htmlFor="inputPassword4">username</label>
              <input
                className="form-control"
                value={username}
                onChange={(event) => {
                  setUsername(event.target.value);
                }}
              />
            </div>
            <div className="form-group col-md-6">
              <label htmlFor="inputPassword4">Phone</label>
              <input
                className="form-control"
                value={phone}
                onChange={(event) => {
                  setphone(event.target.value);
                }}
              />
            </div>
            <div className="form-group col-md-6">
              <label htmlFor="inputPassword4">website</label>
              <input
                className="form-control"
                value={website}
                onChange={(event) => {
                  setwebsite(event.target.value);
                }}
              />
            </div>
          </div>
          <br />
          <button type="submit" className="btn btn-primary">
            ADD
          </button>
          <button
            type="button"
            className="btn btn-warning"
            style={{ margin: "10px" }}
            onClick={() => {
              setAddbool(!addbool);
            }}
          >
            Cancel
          </button>
        </form>
      ) : (
        <button
          type="button"
          className="btn btn-primary"
          style={{ margin: "10px" }}
          onClick={() => {
            setAddbool(!addbool);
          }}
        >
          Add user ...
        </button>
      )}
    </Fragment>
  );
}
