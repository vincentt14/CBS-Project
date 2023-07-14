import { app } from "../config/firebase";
import { collection, getDocs, getFirestore } from "firebase/firestore";

const db = getFirestore(app);

const moviesCollectionRef = collection(db, "movies");

const getMovieList = async () => {
  const data = await getDocs(moviesCollectionRef);
  const filteredData = data.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
  return filteredData;
};

export { getMovieList };
