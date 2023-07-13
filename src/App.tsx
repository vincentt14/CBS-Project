import { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import Navbar from "./components/Navbar";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./config/firebase";

const App = () => {
  const [user, setUser] = useState<any | null>(null);

  useEffect(() => {
    const checkUser = async () => {
      try {
        const dataUser = await getActiveUser();
        setUser(dataUser);
      } catch (error) {
        console.log(error);
      }
    };

    checkUser();
  }, []);

  const getActiveUser = () => {
    onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
  };

  // console.log(user.email);

  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
      </Routes>
    </>
  );
};

export default App;
