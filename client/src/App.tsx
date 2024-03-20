import { Route, Routes } from "react-router-dom";
import Login from "./Container/Login/Login";
import Home from "./Container/Home/Home";
import Signup from "./Container/Signup/Signup";
import { useEffect, useRef } from "react";
import { useAppDispatch, useAppSelector } from "./store/hook";
import { getUserDetail } from "./store/Slices/appConfigSlice";
import { getAllTodo } from "./store/Slices/todoConfigSlice";
import LoadingBar from "react-top-loading-bar";
import {LoadingBarRef} from "react-top-loading-bar"

function App() {
  const loadingRef = useRef<LoadingBarRef>(null);
  const dispatch = useAppDispatch();
  const {isLoading} = useAppSelector((state) => state.app);

  useEffect(() => {
    dispatch(getUserDetail());
  }, [dispatch]);

  useEffect(() => {
    if (isLoading) {
      loadingRef.current?.continuousStart();
    } else {
      loadingRef.current?.complete();
    }
  });

  return (
    <div className="App">
      <LoadingBar  ref={loadingRef} color="#000" />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </div>
  );
}

export default App;
