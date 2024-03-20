import { MouseEvent, useState } from "react";
import "./NewNote.scss";
import { useAppDispatch } from "../../store/hook";
import { getCreateTodoList } from "../../store/Slices/todoConfigSlice";

const CreateNote = () => {
  const dispatch = useAppDispatch();

  const [title, setTile] = useState<string>("");
  const [description, setDescription] = useState<string>("");

  const handleSubmit = () => {
    try {
      dispatch(getCreateTodoList({ title, description }));
      setDescription("");
      setTile("");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="note-new">
      <div className="note-texts">
        <input
          onChange={(e) => setTile(e.target.value)}
          name="title"
          type="text"
          value={title}
          placeholder="Enter Your Title"
        />

        <textarea
          onChange={(e) => setDescription(e.target.value)}
          value={description}
          placeholder="Enter Your Description"
          rows={6}
        />
      </div>

      <div className="note-footer">
        <a onClick={handleSubmit} href="#" className="note-sm-btn">
          Create Button
        </a>
      </div>
    </div>
  );
};

export default CreateNote;
