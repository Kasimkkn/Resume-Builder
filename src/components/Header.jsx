import React from "react";
import { Button } from "./ui/button";
import { Link } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";


function Header() {
  const {user} = useAuth();
  return (
    <div className="p-3 px-5 flex justify-between shadow-md">
      <Link to={"/dashboard"}>
        <img
          src="/logo.svg"
          className="cursor-pointer"
          width={40}
          height={40}
        />
      </Link>
      {user ? (
        <div className="flex gap-2 items-center">
          <Link to={"/dashboard"}>
            <Button variant="outline">Dashboard</Button>
          </Link>
        </div>
      ) : (
        <Link to={"/auth/sign-in"}>
          <Button>Get Started</Button>
        </Link>
      )}
    </div>
  );
}

export default Header;
