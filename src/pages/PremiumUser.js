import { NavLink } from "react-router-dom";
import styles from "./PremiumUser.module.css";
import { useAuth } from "../contexts/AuthContext";

function PremiumUser() {
  return (
    <div className={styles.PremiumUser}>
      <h1> CONGRATS YOU ARE NOW PREMIUM USER!!!</h1>
      <br></br>
      <div>
        <NavLink to="/user">Continue Reading...</NavLink>
      </div>
    </div>
  );
}

export default PremiumUser;
