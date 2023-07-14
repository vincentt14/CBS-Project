import { app } from "../config/firebase";
import { addDoc, collection, getDocs, getFirestore } from "firebase/firestore";

const db = getFirestore(app);

const moviesCollectionRef = collection(db, "movies");

const getMovieList = async () => {
  const data = await getDocs(moviesCollectionRef);
  const filteredData = data.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
  return filteredData;
};

const createMovie = async (title: string, synopsis: string, playing_time: string, genre: string, duration: string) => {
  try {
    await addDoc(moviesCollectionRef, {
      title,
      synopsis,
      playing_time,
      genre,
      duration,
    });
    return {
      success: true,
    };
  } catch (error) {
    return {
      success: false,
      message: "Failed Add Movie",
    };
  }
};

export { getMovieList, createMovie };
