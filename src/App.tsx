import { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import { getAuth, onAuthStateChanged } from "firebase/auth";

import HomePage from "./pages/HomePage";
import Navbar from "./components/Navbar";
import LoginPage from "./pages/LoginPage";
import AddMovie from "./components/AddMovie";
import RegisterPage from "./pages/RegisterPage";
import PlayingNowPage from "./pages/PlayingNowPage";
import ManageMovies from "./components/ManageMovies";
import ManagePackages from "./components/ManagePackages";
import AdminDashboardPage from "./pages/AdminDashboardPage";
// import { FirebaseSingleton } from "./models/FirebaseSingleton";
// import { UserModel } from "./models/UserModel";
import { app } from "./config/firebase";
import { onSnapshot } from "firebase/firestore";
import { FirebaseSingleton } from "./models/FirebaseSingleton";

const App = () => {
  const [user, setUser] = useState<any | null>(null);
  const [movies, setMovies] = useState<any>([]);
  const [loading, setLoading] = useState(true);
  const auth = getAuth(app);

  useEffect(() => {
    // const auth = FirebaseSingleton.getAuth;
    const checkUser = onAuthStateChanged(auth, (userCredential) => {
      if (userCredential) {
        // await getUserFromFirestore(userCredential.uid)
        setUser(userCredential);
        setLoading(false);
      } else {
        setUser(null);
        setLoading(false);
      }
    });

    // return checkUser;

    const getMovie = onSnapshot(FirebaseSingleton.moviesCollectionRef(), (querySnapshot) => {
      const items: any[] = [];
      querySnapshot.forEach((doc) => {
        items.push({ ...doc.data(), id: doc.id });
      });
      setMovies(items);
    });

    return () => {
      getMovie();
      checkUser();
    };
  }, []);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center w-full h-screen">
        <div className="flex flex-col">
          <h1 className="text-5xl font-bold text-secondary">Loading</h1>
          <hr className="w-24 my-3 mx-1 p-1 bg-secondary border border-borderColor rounded-sm" />
        </div>
      </div>
    );
  }

  return (
    <>
      <Navbar authUser={user} />
      <Routes>
        <Route path="/" element={<HomePage authUser={user} />} />
        <Route path="login" element={<LoginPage />} />
        <Route path="register" element={<RegisterPage />} />
        <Route path="playingNow" element={<PlayingNowPage />} />
        <Route path="adminDashboard" element={<AdminDashboardPage movies={movies} />}>
          <Route path="manageMovies" element={<ManageMovies movies={movies} />}>
            <Route path="addMovie" element={<AddMovie />} />
          </Route>
          <Route path="managePackages" element={<ManagePackages />} />
        </Route>
      </Routes>
    </>
  );
};

export default App;
