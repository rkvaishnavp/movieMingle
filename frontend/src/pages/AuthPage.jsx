import React from "react";
import authAtom from "../atoms/authAtom";
import { useRecoilValue, useSetRecoilState } from "recoil";
import LoginCard from "./../components/LoginCard";
import SignupCard from "./../components/SignupCard";

const AuthPage = () => {
  const setAuthScreen = useSetRecoilState(authAtom);
  const authScreenAtom = useRecoilValue(authAtom);

  return (
    <div className="w-full flex my-10 justify-center">
      {authScreenAtom === "login" ? <LoginCard /> : <SignupCard />}
    </div>
  );
};

export default AuthPage;
