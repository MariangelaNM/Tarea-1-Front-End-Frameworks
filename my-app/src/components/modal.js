import React, { useEffect, useState } from "react";
import "./modal.css";

function Modal({ setOpenModal }) {
  const [result, setResult] = useState(undefined);

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
    debugger;
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
        </div>
      )}
    </div>
  );
}

export default Modal;
