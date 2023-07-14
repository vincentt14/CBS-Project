import { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import Navbar from "./components/Navbar";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import { auth } from "./utils/authentication";
import { onAuthStateChanged } from "firebase/auth";

const App = () => {
  const [user, setUser] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkUser = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
        setLoading(false);
      } else {
        setUser(null);
        setLoading(false);
      }
    });

    return checkUser;
  }, []);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center w-full h-screen text-center">
        <div className="bg-secondary py-5 px-20 rounded-sm">
          <h1 className="text-4xl font-bold text-white">Loading</h1>
        </div>
      </div>
    );
  }
  return (
    <>
      <Navbar authUser={user} />
      <Routes>
        <Route path="/" element={<HomePage authUser={user} />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
      </Routes>
    </>
  );
};

export default App;
