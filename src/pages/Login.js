import { useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import style from "./Login.module.css";

const Login = () => {
  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState({
    email: "",
    password: "",
  });
  const { userCredentials, setUserCredentials } = useAuth();

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError({
      email: "",
      password: "",
    });
    try {
      const URL = `http://127.0.0.1:3001/login`;
      const response = await fetch(URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(user),
      });

      if (response.status === 200) {
        const data = await response.json();
        setUserCredentials({ ...data });
        navigate("/user");
      }
      if (response.status === 400) {
        const err = await response.json();
        setError(err);
      }
    } catch (error) {}
  };

  return (
    <div className={style.Login}>
      <h1 className={style.loginHeader}>Login</h1>
      <form onSubmit={handleSubmit}>
        <div className={style.formEntry}>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            name="email"
            value={user.email}
            onChange={(e) => setUser({ ...user, email: e.target.value })}
            required
          />
        </div>
        {error.email !== "" && <div className={style.error}>{error.email}</div>}

        <div className={style.formEntry}>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            name="password"
            value={user.password}
            onChange={(e) => setUser({ ...user, password: e.target.value })}
            required
          />
        </div>
        {error.password !== "" && (
          <div className={style.error}>{error.password}</div>
        )}
        <div>
          <button type="submit">Login</button>
        </div>
      </form>
    </div>
  );
};

export default Login;
