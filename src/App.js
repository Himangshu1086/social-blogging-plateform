import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import User from "./pages/User";
import AuthorProfile from "./pages/AuthorProfile";
import FullPost from "./pages/FullPost";
import NavBar from "./components/NavBar";
import Home from "./pages/Home";

import { useAuth } from "./contexts/AuthContext";
import Section from "./components/Section";
import SubscriptionPlans from "./pages/SubscriptionPlans";
import PremiumUser from "./pages/PremiumUser";
import TopicList from "./components/TopicList";
import SavePost from "./components/SavePost";
import { useState } from "react";

import Stripe from "./pages/Stripe";

function App() {
  const { userCredentials } = useAuth();

  function Protected({ userCredentials, children }) {
    if (!userCredentials) {
      return <Navigate to="/login" replace />;
    }
    return children;
  }

  function SubscriptionCheck({ userCredentials, children }) {
    console.log(userCredentials.maxViews, userCredentials.today_views.length);
    if (userCredentials.maxViews < userCredentials.today_views.length) {
      return <Navigate to="/subscriptionPlans" replace />;
    }
    return children;
  }

  const [savePost, setSavePost] = useState([]);
  return (
    <>
      <BrowserRouter>
        <NavBar></NavBar>
        <Routes>
          <Route path="/" element={<Home></Home>}></Route>
          <Route path="/login" element={<Login></Login>}></Route>
          <Route path="/register" element={<Register></Register>}></Route>
          <Route
            path="/subscriptionPlans"
            element={<SubscriptionPlans></SubscriptionPlans>}
          ></Route>
          <Route
            path="/premiumUser"
            element={<PremiumUser></PremiumUser>}
          ></Route>
          <Route
            path="/user"
            element={
              <Protected userCredentials={userCredentials}>
                <User />
              </Protected>
            }
          >
            <Route
              index
              element={
                <Section
                  url={`http://127.0.0.1:3001/authorPosts/${userCredentials?._id}`}
                  sectionId={0}
                  savePost={savePost}
                  setSavePost={setSavePost}
                ></Section>
              }
            ></Route>
            <Route
              path="yourPosts"
              element={
                <Section
                  url={`http://127.0.0.1:3001/authorPosts/${userCredentials?._id}`}
                  sectionId={0}
                  savePost={savePost}
                  setSavePost={setSavePost}
                ></Section>
              }
            ></Route>
            <Route
              path="allPosts"
              element={
                <Section
                  url={`http://127.0.0.1:3001/allPosts`}
                  sectionId={1}
                  savePost={savePost}
                  setSavePost={setSavePost}
                ></Section>
              }
            ></Route>
            <Route
              path="recPosts"
              element={
                <Section
                  url={`http://127.0.0.1:3001/recPosts/${userCredentials?._id}`}
                  sectionId={2}
                  savePost={savePost}
                  setSavePost={setSavePost}
                ></Section>
              }
            ></Route>
            <Route
              path="topPosts"
              element={
                <Section
                  url={"http://127.0.0.1:3001/topPosts"}
                  sectionId={3}
                  savePost={savePost}
                  setSavePost={setSavePost}
                ></Section>
              }
            ></Route>
            <Route
              path="savePost"
              element={<SavePost sectionId={5} savePost={savePost}></SavePost>}
            ></Route>
            <Route
              path="topicList"
              element={<TopicList sectionId={6}></TopicList>}
            ></Route>
          </Route>
          <Route
            path="/authorProfile/:authorId"
            element={
              <Protected userCredentials={userCredentials}>
                <AuthorProfile></AuthorProfile>
              </Protected>
            }
          ></Route>

          <Route
            path="/post/:postId"
            element={
              <Protected userCredentials={userCredentials}>
                <SubscriptionCheck userCredentials={userCredentials}>
                  <FullPost></FullPost>
                </SubscriptionCheck>
              </Protected>
            }
          ></Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
