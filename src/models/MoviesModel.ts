import { addDoc, deleteDoc, getDoc, updateDoc } from "firebase/firestore";
import { RoomPackagesModel } from "./RoomPackageModel";
import { FirebaseSingleton } from "./FirebaseSingleton";

interface MovieResponse {
  success: boolean;
  message?: any;
}

export class MoviesModel {
  constructor(
    public id: string, 
    public title: string, 
    public synopsis: string, 
    public playingTime: string, 
    public duration: string, 
    public genre: string, 
    public cinema: RoomPackagesModel
    ) {}

    static getMovie = async (id: any) => {
      const ref = FirebaseSingleton.moviesDocRef(id);
      const docSnap = await getDoc(ref);

      if(docSnap.exists()){
        return docSnap.data()
      }
    };

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

  static updateMovie = async (id: any, title: string, synopsis: string, playingTime: string, duration: string, genre: string) => {
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
      return res;
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
      return res;
    }
  };
}
