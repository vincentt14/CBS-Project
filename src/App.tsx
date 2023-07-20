import { useEffect, useState } from "react";
import { DocumentData, onSnapshot } from "firebase/firestore";
import { Routes, Route } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";

import HomePage from "./pages/HomePage";
import BookPage from "./pages/BookPage";
import Footer from "./components/Footer";
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
import UserDashboardPage from "./pages/UserDashboardPage";
import AdminDashboardPage from "./pages/AdminDashboardPage";

import { UserModel } from "./models/UserModel";
import { FirebaseSingleton } from "./models/FirebaseSingleton";
import { MoviesModel } from "./models/MoviesModel";
import { CinemaModel } from "./models/CinemaModel";

const App = () => {
  const [user, setUser] = useState<UserModel | null>(null);
  const [movies, setMovies] = useState<MoviesModel[]>([]);
  const [cinemas, setCinemas] = useState<CinemaModel[]>([]);
  const [packages, setPackages] = useState<DocumentData | []>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const auth = FirebaseSingleton.getAuth;
    const checkActiveUser = onAuthStateChanged(auth, (userCredential) => {
      if (userCredential) {
        const getUser = async () => {
          const activeUser: UserModel | null = await UserModel.getUserFromFirestore(userCredential.uid);
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

    const getPackages = onSnapshot(FirebaseSingleton.packagesCollectionRef(), (querySnapshot) => {
      const items: DocumentData = [];
      querySnapshot.forEach((doc) => {
        items.push(doc.data());
      });
      setPackages(items);
    });

    return () => {
      checkActiveUser();
      getMovies();
      getCinemas();
      getPackages();
    };
  }, []);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center w-full h-screen">
        <div className="flex flex-col">
          <h1 className="text-5xl font-bold text-secondary">Loading</h1>
          <hr className="w-24 my-3 mx-1 p-1 bg-bgColor border border-borderColor rounded-sm" />
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
        <Route path="playingNow" element={<PlayingNowPage movies={movies} cinemas={cinemas} />} />
        <Route path="book/:id" element={<BookPage cinemas={cinemas}/>} />
        <Route path="userDashboard" element={<UserDashboardPage authUser={user} movies={movies} />} />
        <Route path="adminDashboard" element={<AdminDashboardPage movies={movies} cinemas={cinemas} />}>
          <Route path="manageMovies" element={<ManageMovies movies={movies} cinemas={cinemas} />} />
          <Route path="addMovie" element={<AddMovie cinemas={cinemas} />} />
          <Route path="editMovie/:id" element={<EditMovie cinemas={cinemas} />} />

          <Route path="manageCinemas" element={<ManageCinemas cinemas={cinemas} />} />
          <Route path="addCinema" element={<AddCinema packages={packages} />} />
          <Route path="editCinema/:id" element={<EditCinema packages={packages} />} />

          <Route path="managePackages" element={<ManagePackages />} />
          <Route path="editPackage/:id" element={<EditPackage />} />
        </Route>
      </Routes>
      <Footer authUser={user} />
    </>
  );
};

export default App;
