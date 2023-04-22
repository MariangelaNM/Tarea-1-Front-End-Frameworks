import React, { useEffect, useState } from "react";
import "./modal.css";
import { useNavigate } from "react-router-dom";

function Modal({ setOpenModal }) {
  const [result, setResult] = useState(undefined);
  const navigate = useNavigate();
  useEffect(() => {
    callDataProfile();
  }, []);

  function callDataProfile() {
    const token = JSON.parse(localStorage.getItem("token")).token;
    var myHeaders = new Headers();
    myHeaders.append("Authorization", "Bearer " + token);
    var requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };

    fetch("https://three-points.herokuapp.com/api//users/me", requestOptions)
      .then(async (response) => {
        const isJson = response.headers
          .get("content-type")
          ?.includes("application/json");
        const data = isJson && (await response.json());
        // check for error response
        if (!response.ok) {
          const error = (data && data.message) || response.status;
          return Promise.reject(error);
        }
        setResult(data);
      })
      .catch((error) => {
        this.setState({ errorMessage: error.toString() });
        console.error("There was an error!", error);
      });
  }

  function Logout (){
    localStorage.clear();
    navigate(`/loggin`);
  }

  return (
    <div className="modalBackground">
      {result != undefined && (
        <div className="modalContainer">
          <div className="titleCloseBtn">
            <button
              onClick={() => {
                setOpenModal(false);
              }}
            >
              X
            </button>
          </div>
          <img
            className="circular--square"
            style={{ width: "250px" }}
            src={result.avatar}
          ></img>

          <div className="user">
            <p>@{result.name}</p>
          </div>
          <div className="body">
            <p>{result.bio}</p>
          </div>
          <button type="button" class="btn btn-danger" onClick={()=>(Logout ())}>
            Logout
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              class="bi bi-chevron-bar-left"
              viewBox="0 0 16 16" 
            >
              <path
                fill-rule="evenodd"
                d="M11.854 3.646a.5.5 0 0 1 0 .708L8.207 8l3.647 3.646a.5.5 0 0 1-.708.708l-4-4a.5.5 0 0 1 0-.708l4-4a.5.5 0 0 1 .708 0zM4.5 1a.5.5 0 0 0-.5.5v13a.5.5 0 0 0 1 0v-13a.5.5 0 0 0-.5-.5z"
              />
            </svg>
          </button>
        </div>
      )}
    </div>
  );
}

export default Modal;
