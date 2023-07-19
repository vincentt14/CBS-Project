import { useEffect, useState } from "react";
import { onSnapshot } from "firebase/firestore";
import { Routes, Route } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";

import Bookpage from "./pages/BookPage";
import HomePage from "./pages/HomePage";
import Navbar from "./components/Navbar";
import LoginPage from "./pages/LoginPage";
import AddMovie from "./components/AddMovie";
import AddCinema from "./components/AddCinema";
import EditMovie from "./components/EditMovie";
import RegisterPage from "./pages/RegisterPage";
import EditCinema from "./components/EditCinema";
import EditPackage from "./components/EditPackage";
import PlayingNowPage from "./pages/PlayingNowPage";
import ManageMovies from "./components/ManageMovies";
import ManageCinemas from "./components/ManageCinema";
import ManagePackages from "./components/ManagePackages";
import AdminDashboardPage from "./pages/AdminDashboardPage";

import { UserModel } from "./models/UserModel";
import { FirebaseSingleton } from "./models/FirebaseSingleton";
import { MoviesModel } from "./models/MoviesModel";
import { CinemaModel } from "./models/CinemaModel";

const App = () => {
  const [user, setUser] = useState<any | null>(null);
  const [movies, setMovies] = useState<any>([]);
  const [cinemas, setCinemas] = useState<any>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const auth = FirebaseSingleton.getAuth;
    const checkActiveUser = onAuthStateChanged(auth, (userCredential) => {
      if (userCredential) {
        const getUser = async () => {
          const activeUser = await UserModel.getUserFromFirestore(userCredential.uid);
          setUser(activeUser);
          setLoading(false);
        };
        getUser();
      } else {
        setUser(null);
        setLoading(false);
      }
    });

    const getMovies = onSnapshot(FirebaseSingleton.moviesCollectionRef(), (querySnapshot) => {
      const items: MoviesModel[] = [];
      querySnapshot.forEach((doc) => {
        const result = MoviesModel.fromFirebase(doc.data(), doc.id);
        items.push(result);
      });
      setMovies(items);
    });

    const getCinemas = onSnapshot(FirebaseSingleton.cinemaCollectionRef(), (querySnapshot) => {
      const items: CinemaModel[] = [];
      querySnapshot.forEach((doc) => {
        const result = CinemaModel.fromFirebase(doc.data(), doc.id);
        items.push(result);
      });
      setCinemas(items);
    });

    return () => {
      checkActiveUser();
      getMovies();
      getCinemas();
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
        <Route path="/" element={<HomePage authUser={user} movies={movies} />} />
        <Route path="login" element={<LoginPage />} />
        <Route path="register" element={<RegisterPage />} />
        <Route path="playingNow" element={<PlayingNowPage movies={movies} />} />
        <Route path="book/:id" element={<Bookpage />} />
        <Route path="adminDashboard" element={<AdminDashboardPage movies={movies} cinemas={cinemas} />}>
          <Route path="manageMovies" element={<ManageMovies movies={movies} />} />
          <Route path="addMovie" element={<AddMovie />} />
          <Route path="editMovie/:id" element={<EditMovie />} />
          
          <Route path="manageCinemas" element={<ManageCinemas cinemas={cinemas} />} />
          <Route path="addCinema" element={<AddCinema />} />
          <Route path="editCinema/:id" element={<EditCinema />} />
          
          <Route path="managePackages" element={<ManagePackages />} />
          <Route path="editPackage/:id" element={<EditPackage />} />
        </Route>
      </Routes>
    </>
  );
};

export default App;
