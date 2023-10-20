import { useState } from "react";
import style from "./Register.module.css";
import { useAuth } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();

  const { userCredentials, setUserCredentials } = useAuth();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError({
      email: "",
      password: "",
    });
    try {
      const URL = `http://127.0.0.1:3001/signup`;
      const response = await fetch(URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include", // Add this line
        body: JSON.stringify({
          ...user,
        }),
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
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className={style.Register}>
      <h1 className={style.registerHeader}>Register</h1>
      <form onSubmit={handleSubmit}>
        <div className={style.formEntry}>
          <label htmlFor="name">Author Name</label>
          <input
            type="text"
            name="name"
            value={user.name}
            onChange={(e) => setUser({ ...user, name: e.target.value })}
            required
          />
        </div>
        <div className={style.formEntry}>
          <label htmlFor="email">Email</label>
          <input
            name="email"
            value={user.email}
            onChange={(e) => setUser({ ...user, email: e.target.value })}
          />
        </div>
        {error.email !== "" && <div className={style.error}>{error.email}</div>}
        {/* <div className={style.formEntry}>
          <label htmlFor="image">Image</label>
          <input
            type="file" // Use type="file" for file upload
            accept=".jpg,.jpeg,.png"
            name="image"
            // onChange={handleImageChange} // Handle image file change
          />
        </div> */}
        <div className={style.formEntry}>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            name="password"
            value={user.password}
            onChange={(e) => setUser({ ...user, password: e.target.value })}
          />
        </div>
        {error.password !== "" && (
          <div className={style.error}>{error.password}</div>
        )}
        <div>
          <button type="submit">Register</button>
        </div>
      </form>
    </div>
  );
};

export default Register;
