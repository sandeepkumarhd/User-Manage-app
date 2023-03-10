import axios from "axios";
import { useState, useEffect } from "react";
import style from "./AddUserDetails.module.css";

const AddUserDetails = () => {
  const [name, setName] = useState("");
  const [Add, setAdd] = useState("");
  const [Mobile, setMobile] = useState("");
  const [Age, setAge] = useState("");
  const [data, setData] = useState([]);
  const nameHandler = (event) => {
    setName(event.target.value);
  };
  const MobileHandelr = (event) => {
    setMobile(event.target.value);
  };
  const ageHandler = (event) => {
    setAge(event.target.value);
  };
  const addHandler = (event) => {
    setAdd(event.target.value);
  };

  const feachhandler = () => {
    axios
      .get(
        "https://crud-react-f12bd-default-rtdb.firebaseio.com/userDetails.json"
      )
      .then((response) => {
        let transform = [];
        for (let key in response.data) {
          let obj = {
            name: response.data[key].name,
            Add: response.data[key].Add,
            mobile: response.data[key].Mobile,
            age: response.data[key].Age,
            key: key,
          };
          transform.push(obj);
          setData(transform);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const AddNewData = (event) => {
    event.preventDefault();
    if(name=="" || Add==""){
        alert("Input field should be filled out...!!")
    }else if(Age==""||Mobile==""){
        alert("Enter valid Infomation...!!")
    }else if(+Age<=0){
        alert("Enter valid Age...!!")
    }else if(Mobile.length !=10){
        alert("Enter valid Mobile...!!")
    }
    else{
        axios
        .post(
          "https://crud-react-f12bd-default-rtdb.firebaseio.com/userDetails.json",
          { name: name, Age: Age, Mobile: Mobile, Add: Add }
        )
        .then((succes) => {
          feachhandler();
          return succes;
        })
        .catch((error) => {
          console.log(error);
        });
    }
   
  };

  useEffect(() => {
    feachhandler();
  }, []);
  const deleteHanlder = (key) => {
    console.log(key);
    axios
      .delete(
        `https://crud-react-f12bd-default-rtdb.firebaseio.com/userDetails/${key}.json`
      )
      .then((succes) => {
        alert("Deleted....!!");
        feachhandler();
      })
      .catch((error) => {
        alert(error.message);
      });
  };
  return (
    <div>
        <h2>Add New User</h2>
      <form onSubmit={AddNewData}>
        <input onChange={nameHandler} type={"text"} placeholder="Enter Name" />
        <input onChange={ageHandler} type={"number"} placeholder="Enter age" />
        <input
          onChange={addHandler}
          type={"text"}
          placeholder="Enter Addresh"
        />
        <input
          onChange={MobileHandelr}
          type={"number"}
          placeholder="Enter Mobile"
        />
        <input type={"submit"} value="Submit" />
      </form>
      <h2>User's Details</h2>
      <table>
        <tbody className={style.header}>
          <tr>
            <td>{"Name"}</td>
            <td>{"Address"}</td>
            <td>{"Age"}</td>
            <td>{"Mobile"}</td>
            <td>Delete</td>
          </tr>
        </tbody>
        {data.map((details, index) => {
          return (
            <tbody key={index}>
              <tr>
                <td>{details.name}</td>
                <td>{details.Add}</td>
                <td>{details.age}</td>
                <td>{details.mobile}</td>
                <td>
                  <button onClick={() => deleteHanlder(details.key)}>
                    Delete
                  </button>
                </td>
              </tr>
            </tbody>
          );
        })}
      </table>
    </div>
  );
};
export default AddUserDetails;
