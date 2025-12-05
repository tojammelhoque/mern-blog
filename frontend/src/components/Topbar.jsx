import React from "react";
import logo from "../assets/images/logo-white.png";
import { Button } from "./ui/button";
import { Link } from "react-router-dom";
import { GoSignIn } from "react-icons/go";
import SearchBox from "./SearchBox";
import { RouteSignIn } from "@/utils/RouteName";

function Topbar() {
  return (
    <div className="bg-white flex justify-between items-center h-16 fixed w-full z-50 px-5 border-b">
      <div>
        <img src={logo} alt="logo" />
      </div>
      <div className="w-1/2">
        <SearchBox />
      </div>
      <div>
        <Button asChild className="rounded-full">
          <Link to={RouteSignIn}>
            <GoSignIn />
            Sign In
          </Link>
        </Button>
      </div>
    </div>
  );
}

export default Topbar;
