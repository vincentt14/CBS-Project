import { DocumentData, addDoc, deleteDoc, getDoc, updateDoc } from "firebase/firestore";
import { RoomPackageModel } from "./RoomPackageModel";
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
    public cinema: RoomPackageModel | null
  ) {}

  static fromFirebase = (data: DocumentData, id: string): MoviesModel => {
    return new MoviesModel(
      id,
      data.title, 
      data.synopsis, 
      data.playingTime, 
      data.duration, 
      data.genre,
      null
    );
  };

  static getMovie = async (id: string): Promise<MoviesModel | null> => {
    const ref = FirebaseSingleton.moviesDocRef(id);
    const result = await getDoc(ref);
    
    if (result.exists()) {
      return this.fromFirebase(result.data(), result.id);
    }
    return null;
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
