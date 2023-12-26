import { useState } from "react";
import Header from "./components/Header";
import { Routes, Route, Navigate } from "react-router-dom";
import HomePage from "./pages/HomePage";
import AuthPage from "./pages/AuthPage";
import UpdateProfilePage from "./pages/UpdateProfilePage";
import { useRecoilValue } from "recoil";
import userAtom from "./atoms/userAtom";
import UploadMoviePage from "./pages/UploadMoviePage";
import ProfilePage from "./pages/ProfilePage";
import UpdateMoviePage from "./pages/UpdateMoviePage";

const App = () => {
  const user = useRecoilValue(userAtom);
  return (
    <>
      <Header />
      <div className="flex justify-around">
        <Routes>
          <Route
            path="/"
            element={user ? <HomePage /> : <Navigate to={"/auth"} />}
          />
          <Route
            path="/auth"
            element={!user ? <AuthPage /> : <Navigate to={"/"} />}
          />
          <Route
            path="/profile/:username"
            element={user ? <ProfilePage /> : <Navigate to={"/auth"} />}
          />
          <Route
            path="/profile/update"
            element={user ? <UpdateProfilePage /> : <Navigate to={"/auth"} />}
          />
          <Route
            path="/movie/upload"
            element={user ? <UploadMoviePage /> : <Navigate to={"/auth"} />}
          />
          <Route
            path="/movie/update"
            element={user ? <UpdateMoviePage /> : <Navigate to={"/auth"} />}
          />
        </Routes>
      </div>
    </>
  );
};

export default App;
