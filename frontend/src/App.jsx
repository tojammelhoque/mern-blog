import React from "react";
import { Button } from "./components/ui/button";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./Layout/Layout";
import { RouteIndex, RouteSignIn, RouteSignUp } from "./utils/RouteName";
import Index from "./pages/Index";
import SignUp from "./pages/SignUp";
import SignIn from "./pages/SignIn";

function App() {
  return (
    <BrowserRouter>

      <Routes>
        <Route path={RouteIndex} element={<Layout />}>
          <Route index element={Index} />
        </Route>
        <Route path={RouteSignUp} element={<SignUp />} />
        <Route path={RouteSignIn} element={<SignIn />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
