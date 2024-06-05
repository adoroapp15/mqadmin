import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import "./scss/style.scss";
import GetStarted from "./pages/GetStarted";
import { StepperForm } from "./components/StepperForm";
import { ProtectedRoute } from "./components/ProtectedRoute";
import Dashboard from "./pages/Dashboard";
import Home from "./pages/Home";
import Campaigns from "./pages/Campaigns";
import AllProjects from "./pages/AllProjects";
import Campaign from "./pages/PendingCampaigns";
import { Container, Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import SignIn from "./pages/SignIn";
import { useEffect } from "react";
import { setUserID } from "./actions";
import AllPost from "./pages/AllPost";
import AllContest from "./pages/AllContest";
import ViewApplicant from "./pages/ViewApplicant";
import AllTemplate from "./pages/AllTemplate";
import User from "./pages/User";
import ViewCampaign from "./pages/ViewCampaign";
import AllSupport from "./pages/AllSupport";
function App() {
  const state = useSelector((state) => state);
  const loggedIn = useSelector((state) => state.loggedIn);
  const isLoggin = JSON.parse(sessionStorage.getItem("isLoggin"));

  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<SignIn />} />
          {/* <Route
            path="/home"
            element={<Home />}
        /> */}

          {/* 
        <Route  path="/" element={<GetStarted />} />
        <Route path="/sign-in" element={<SignIn />} />
        <Route path="/info" element={
          <ProtectedRoute isAllowed={isLoggin}>
            <StepperForm />

          </ProtectedRoute>
        }/> */}
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          >
            <Route path="home" element={<Home />} />
            <Route path="campaigns" element={<Campaigns />} />
            <Route
              path="pendingcampaigns"
              element={<Campaign status={"pending"} />}
            />

            <Route path="all-projects" element={<AllProjects />} />
            <Route path="all-posts" element={<AllPost />} />
            <Route
            path="view-applicants"
            element={<ViewApplicant />}
        />
        <Route
            path="view-campaigns"
            element={<ViewCampaign />}
        />

            <Route path="all-contest" element={<AllContest />} />
            <Route path="all-template" element={<AllTemplate />} />
            <Route path="all-user" element={<User />} />
            <Route path="all-support" element={<AllSupport/>} />
            
          </Route>
        </Routes>
      </Router>
    </>
  );
}

export default App;
