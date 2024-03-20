import { MdDeleteForever } from "react-icons/md";
import { FaEdit } from "react-icons/fa";

import "./Note.scss";
import {
  getRemoveTodo,
  getUpdateTodoStatus,
} from "../../store/Slices/todoConfigSlice";
import { useAppDispatch } from "../../store/hook";

const Note = ({
  id,
  description,
  title,
  isCompleted,
  handleUpdate
}: {
  id: string;
  description: string;
  title: string;
  isCompleted: Boolean;
  handleUpdate : (id : string, description : string, _id : string) => void
}) => {
  const dispatch = useAppDispatch();
  const handleUpdateTodoProgress = () => {
    // dispatch the action to update todo progress status
    dispatch(getUpdateTodoStatus({ todoId: id }));
  };

  const handleRemoveTodo = () => {
    dispatch(getRemoveTodo({ todoId: id }));
  };

  return (
    <div className="note">
      <div className="note-texts">
        <div className="note-title">
          <h4>{title}</h4>
        </div>

        <div className="note-description">
          <p>{description}</p>
        </div>
      </div>

      <div className="note-footer">
        <small
          style={{
            backgroundColor: isCompleted ? "#00ab41" : "#ffe12b",
          }}
          onClick={handleUpdateTodoProgress}
        >
          {isCompleted ? "Completed " : "In Progress"}
        </small>
        <div className="note__icons">
          <MdDeleteForever
            onClick={handleRemoveTodo}
            className="delete-icon"
            size="1.3em"
          />
          <FaEdit size="1.3em"
            onClick={() => handleUpdate(title,description,id)}
          
          />
        </div>
      </div>
    </div>
  );
};

export default Note;
