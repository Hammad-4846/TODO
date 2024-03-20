import { useEffect, useState } from "react";
import NotesList from "../../Components/NotesList/NotesList";
import Search from "../../Components/Search/Search";
import { useAppDispatch, useAppSelector } from "../../store/hook";
import "./Home.scss";
import { useNavigate } from "react-router-dom";
import { IoIosLogOut } from "react-icons/io";
import { getLoggedOut } from "../../store/Slices/appConfigSlice";
import { getAllTodo } from "../../store/Slices/todoConfigSlice";

function Home() {
  const notes = useAppSelector((state) => state.todos);
  const [searchText, setSearchText] = useState("");
  const { isAuthenticated } = useAppSelector((state) => state.app);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login");
    }
  }, [isAuthenticated]);

  useEffect(() => {
    dispatch(getAllTodo());
  }, []);

  const handleLogout = () => {
    dispatch(getLoggedOut());
  };

  return (
    <div className="Todo__container">
      <div className="top__section">
        <IoIosLogOut onClick={handleLogout} size={"2em"} cursor={"pointer"} />
        <Search handleSearchNote={setSearchText} />
      </div>

      <NotesList
        notesData={notes?.todos?.filter(
          (note: { title: string; description: string; _id: string }) =>
            note.description.toLowerCase().includes(searchText.toLowerCase())
        )}
      />
    </div>
  );
}

export default Home;
