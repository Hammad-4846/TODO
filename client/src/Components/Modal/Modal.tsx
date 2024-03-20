import React, { Dispatch, SetStateAction, useState } from "react";
import "./Model.scss";
import { useAppDispatch } from "../../store/hook";
import { getUpdateTodo } from "../../store/Slices/todoConfigSlice";

function Modal({
  setOpenModal,
  title,
  description,
  _id,
}: {
  _id : string
  title: string;
  description: string;
  setOpenModal: Dispatch<SetStateAction<boolean>>;
}) {
  const [updartedtitle, setUpdatedTitle] = useState("");
  const [updateddescription, setUpdatedDescription] = useState("");
  const dispatch = useAppDispatch();

  const handlUpdate = () => {
    dispatch(getUpdateTodo({description : updateddescription, title : updartedtitle, todoId: _id}))
    setOpenModal(false);
  }

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
        <div className="title">
          <h1>Edit Your TODO-NOTE</h1>
        </div>
        <div className="body">
          <input
            onChange={(e) => setUpdatedTitle(e.target.value)}
            defaultValue={title}
            type="text"
            placeholder="Title"
          ></input>
          <textarea
            defaultValue={description}
            placeholder="Enter Your Description"
            rows={6}
            onChange={(e) => setUpdatedDescription(e.target.value)}
          />
        </div>
        <div className="footer">
          <button
            onClick={() => {
              setOpenModal(false);
            }}
            id="cancelBtn"
          >
            Cancel
          </button>
          <button onClick={handlUpdate}>Update</button>
        </div>
      </div>
    </div>
  );
}

export default Modal;
