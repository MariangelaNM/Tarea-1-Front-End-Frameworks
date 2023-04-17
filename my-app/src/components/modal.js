import React from "react";
import "./modal.css";
import profile from "./data/profile.json"
import Loggin from "./loggin/loggin";

function Modal({ setOpenModal }) {
  return (
    <div className="modalBackground">
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
        <img className="circular--square" style={{ width: "250px" }} src={profile.img}></img>

        <div className="user">
          <p>@{profile.user}</p>

        </div>
        <div className="body">
          <p>{profile.description}</p>
        </div>
      </div>
    </div>
  );
}

export default Modal;
