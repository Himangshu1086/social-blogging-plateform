import style from "./SubscriptionPlans.module.css";
import { useAuth } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import Stripe from "./Stripe";

import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";

function SubscriptionPlans() {
  const [showForm, setShowForm] = useState(false);
  const [selectedAmount, setSelectedAmount] = useState(0);

  const handleButtonClick = (amount) => {
    setSelectedAmount(amount);
    setShowForm(true);
  };

  return (
    <>
      <div className={style.subscriptionPlans}>
        <div className={style.subscriptionPlan}>
          <h2>Premium</h2>
          <p>Get Unlimited Access:</p>
          <p className={style.subscriptionDetails}>3 posts per day - $3</p>
          <button
            className={style.subscribeButton}
            value={3000}
            onClick={() => handleButtonClick(3000)}
          >
            Subscribe Now
          </button>
        </div>

        <div className={style.subscriptionPlan}>
          <h2>Super Premium</h2>
          <p>Get Unlimited Access:</p>
          <p className={style.subscriptionDetails}>5 posts per day - $5</p>
          <button
            className={style.subscribeButton}
            value={5000}
            onClick={() => handleButtonClick(5000)}
          >
            Subscribe Now
          </button>
        </div>

        <div className={style.subscriptionPlan}>
          <h2>Super Super Premium</h2>
          <p>Get Unlimited Access:</p>
          <p className={style.subscriptionDetails}>10 posts per day - $10</p>
          <button
            className={style.subscribeButton}
            value={10000}
            onClick={() => handleButtonClick(10000)}
          >
            Subscribe Now
          </button>
        </div>
      </div>
      {showForm && <Stripe amount={selectedAmount}></Stripe>}
    </>
  );
}

export default SubscriptionPlans;
