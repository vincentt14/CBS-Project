import { addDoc, deleteDoc, updateDoc } from "firebase/firestore";
import { RoomPackages } from "./RoomPackage";
import { FirebaseSingleton } from "./FirebaseSingleton";

interface MovieResponse {
  success: boolean;
  message?: any;
}

export class Movies {
  constructor(
    public id: string, 
    public title: string, 
    public synopsis: string, 
    public playingTime: string, 
    public duration: string, 
    public genre: string, 
    public cinema: RoomPackages
    ) {}

  static createMovie = async (title: string, synopsis: string, playingTime: string, duration: string, genre: string) => {
    try {
      const ref = FirebaseSingleton.moviesCollectionRef();
      await addDoc(ref, {
        title,
        synopsis,
        playingTime,
        duration,
        genre,
      });
      const res: MovieResponse = {
        success: true,
      };
      return res;
    } catch (error) {
      const res: MovieResponse = {
        success: false,
        message: error,
      };
      return res;
    }
  };

  static updateMovie = async (id: string, title: string, synopsis: string, playingTime: string, duration: string, genre: string) => {
    try {
      const ref = FirebaseSingleton.moviesDocRef(id);
      await updateDoc(ref, {
        title,
        synopsis,
        playingTime,
        duration,
        genre,
      });
      const res: MovieResponse = {
        success: true,
      };
      return res;
    } catch (error) {
      const res: MovieResponse = {
        success: false,
        message: error,
      };
    }
  };

  static deleteMovie = async (id: string) => {
    try {
      const ref = FirebaseSingleton.moviesDocRef(id);
      await deleteDoc(ref);
      const res: MovieResponse = {
        success: true,
      };
      return res;
    } catch (error) {
      const res: MovieResponse = {
        success: false,
        message: error,
      };
    }
  };
}
