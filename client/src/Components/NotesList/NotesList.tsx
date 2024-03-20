import React from "react";

import "./NotesList.scss";
import Note from "../Note/Note";
import CreateNote from "../NewNote/NewNote";
import { TodoState } from "../../utils/types/todoType";
import Modal from "../Modal/Modal";

function NotesList({ notesData }: { notesData: TodoState[] }) {
  const [modalOpen, setModalOpen] = React.useState(false);
  const [selectedId, setSelectedId] = React.useState<string>("");
  const [updateTitle, setUpdateTitle] = React.useState<string>("");
  const [updateDesc, setUpdateDesc] = React.useState<string>("");

  const handlUpdateTodo = (
    title?: string,
    description?: string,
    _id?: string
  ) => {
    setSelectedId(_id || "");
    setUpdateDesc(description ? description : "");
    setUpdateTitle(title ? title : "");
    setModalOpen(true);
  };

  console.log("THis is NotedData", notesData);
  return (
    <div className="notes__list">
      <CreateNote />
      {notesData?.map((note: TodoState) => (
        <Note
          description={note.description}
          id={note._id}
          isCompleted={note.isCompleted}
          title={note.title}
          key={note._id}
          handleUpdate={handlUpdateTodo}
        />
      ))}

      {modalOpen && (
        <Modal
          _id={selectedId}
          description={updateDesc}
          title={updateTitle}
          setOpenModal={setModalOpen}
        />
      )}
    </div>
  );
}

export default NotesList;
