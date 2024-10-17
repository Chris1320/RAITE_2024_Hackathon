import { BrowserRouter, Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import HomePage from "./pages/HomePage";
import Login from "./pages/Login";
import Register from "./pages/Register";
import PublicListing from "./pages/PublicListing";
import { useState } from "react";
import AuthRoute from "./components/AuthRoute";
import Profile from "./pages/Profile";
import MyListing from "./pages/MyListing";
import AppSample from "./App (Sample)";

const App = () => {

  const [authContext, setAuthContext] = useState({
    authenticated: false,
    principal: null
  });

  const toggleAuthContext = (isAuth, principal = null) => {
    setAuthContext({
      authenticated: isAuth,
      principal: principal
    })
  }

  return(
    <>
      <BrowserRouter>
        <Header isAuthenticated={authContext.authenticated} toggleAuth={toggleAuthContext}/>
        <Routes>
          <Route path="/sample" element={<AppSample/>}/>
          <Route path="/" index element={<HomePage/>}/>
          <Route path="/login" element={<Login setAuthContext={toggleAuthContext}/>}/>
          <Route path="/register" element={<Register/>}/>
          <Route path="/listing" element={<PublicListing/>}/>
          <Route path="/profile" element={<AuthRoute isAuthenticated={authContext.authenticated} component={<Profile/>}/>}/>
          <Route path="/my-listing" element={<AuthRoute isAuthenticated={authContext.authenticated} component={<MyListing/>}/>}/>
        </Routes>
      </BrowserRouter>
    </>
  );

}

export default App;