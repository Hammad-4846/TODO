import { FormEvent, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Signup.scss";
import { axiosClient } from "../../utils/axios/axiosClient";
import { setItem, KEY_ACCESS_TOKEN } from "../../utils/localStorage";
import { useAppDispatch, useAppSelector } from "../../store/hook";
import { getSignupUser } from "../../store/Slices/appConfigSlice";
// import { KEY_ACCESS_TOKEN, setItem } from "../../utils/localStorageManager";

function Signup() {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { isAuthenticated } = useAppSelector((state) => state.app);
  const dispatch = useAppDispatch();

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    try {
      dispatch(getSignupUser({ name, email, password }));
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/");
    }
  }, [isAuthenticated]);

  return (
    <div className="Signup">
      <div className="signup-box">
        <h2 className="heading">Signup</h2>
        <form onSubmit={handleSubmit}>
          <label htmlFor="name">Name</label>
          <input
            type="name"
            className="name"
            id="name"
            onChange={(e) => setName(e.target.value)}
          />

          <label htmlFor="email">Email</label>
          <input
            type="email"
            className="email"
            id="email"
            onChange={(e) => setEmail(e.target.value)}
          />

          <label htmlFor="password">Password</label>
          <input
            type="password"
            className="password"
            id="password"
            onChange={(e) => setPassword(e.target.value)}
          />

          <input type="submit" className="submit" />
        </form>
        <p className="subheading">
          Have an account? <Link to="/login">Login</Link>
        </p>
      </div>
    </div>
  );
}

export default Signup;
