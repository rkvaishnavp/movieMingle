import React, { useEffect, useRef, useState } from "react";
import { CgProfile } from "react-icons/cg";
import userAtom from "../atoms/userAtom";
import authAtom from "../atoms/authAtom";
import { useRecoilValue, useSetRecoilState } from "recoil";
import LoginCard from "./LoginCard";
import SignupCard from "./SignupCard";
import { Link } from "react-router-dom";

const Header = () => {
  const user = useRecoilValue(userAtom);
  const setUser = useSetRecoilState(userAtom);
  const authScreenAtom = useRecoilValue(authAtom);
  const setAuthScreen = useSetRecoilState(authAtom);
  const [isOpen, setIsOpen] = useState(false);

  const handleLogout = async () => {
    try {
      const res = await fetch("/api/users/logout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await res.json();
      localStorage.removeItem("user-moviemingle");
      setUser(null);
      setIsOpen(false);
    } catch (error) {
      console.log("Logging Out");
    }
  };

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  let menuRef = useRef();
  useEffect(() => {
    let handler = (e) => {
      if (!menuRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => {
      document.removeEventListener("mousedown", handler);
    };
  });
  return (
    <div className="bg-gray-600 flex justify-around">
      <div className="flex w-screen justify-around items-center">
        <div>
          <a href="/">
            <img src="/logo.png" width={"200px"} />
          </a>
        </div>
        {user && (
          <div className="flex flex-row gap-6 items-center">
            <div className="relative inline-block text-left" ref={menuRef}>
              <button
                type="button"
                onClick={toggleDropdown}
                className="inline-flex items-center justify-center p-2"
              >
                <CgProfile className="w-6 h-6" />
              </button>

              {isOpen && (
                <div className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
                  {/* Dropdown content goes here */}
                  <div className="py-1">
                    <Link
                      to={"/"}
                      onClick={() => setIsOpen(!isOpen)}
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      Home
                    </Link>
                    <Link
                      to={`/profile/${user.username}`}
                      onClick={() => setIsOpen(!isOpen)}
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      Profile
                    </Link>
                    <Link
                      to={"/movie/upload"}
                      onClick={() => setIsOpen(!isOpen)}
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      Upload Movie
                    </Link>
                    <Link
                      to={"/movie/update"}
                      onClick={() => setIsOpen(!isOpen)}
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      Update Movie
                    </Link>
                    <a
                      href="#"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      onClick={handleLogout}
                    >
                      Sign out
                    </a>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
        {!user &&
          (authScreenAtom === "login" ? (
            <div>
              <p
                className="cursor-pointer"
                onClick={() => setAuthScreen("signup")}
              >
                Sign Up
              </p>
            </div>
          ) : (
            <div>
              <p
                className="cursor-pointer"
                onClick={() => setAuthScreen("login")}
              >
                Login
              </p>
            </div>
          ))}
      </div>
    </div>
  );
};

export default Header;
