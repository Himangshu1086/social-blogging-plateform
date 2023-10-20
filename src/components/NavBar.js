import style from "./NavBar.module.css";
import { useAuth } from "../contexts/AuthContext";
import { Link } from "react-router-dom";

function NavBar() {
  const { userCredentials, setUserCredentials } = useAuth();

  async function handleLogout() {
    const URL = `http://127.0.0.1:3001/logout`;
    await fetch(URL, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    });
    setUserCredentials(null);
  }

  return (
    <div className={style.NavBar}>
      <div className={style.header}>
        <Link to="/">Nature</Link>
      </div>
      <div className={style.options}>
        {userCredentials ? (
          <div className={style.logout} onClick={handleLogout}>
            Logout
          </div>
        ) : (
          <>
            <div className={style.login}>
              <Link to="/login">Login</Link>
            </div>
            <div className={style.register}>
              <Link to="/register">Register</Link>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default NavBar;
