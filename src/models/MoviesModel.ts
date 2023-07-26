import { DocumentData, addDoc, deleteDoc, getDoc, updateDoc } from "firebase/firestore";
import { FirebaseSingleton } from "./FirebaseSingleton";
import { formatTime } from "../utils/formatTime";

interface MovieResponse {
  success: boolean;
  message?: string;
}

export class MoviesModel {
  constructor(
    public id: string,
    public title: string,
    public synopsis: string,
    public playingTime: Date,
    public duration: number,
    public genre: string,
    public cinemaId: string,
  ) { }

  static fromFirebase = (data: DocumentData, id: string): MoviesModel => {
    const splittedDate: string[] = data.playingTime.split(":");
    const tempDate = new Date(0, 0, 0, +splittedDate[0], +splittedDate[1]);
    return new MoviesModel(id, data.title, data.synopsis, tempDate, data.duration, data.genre, data.cinemaId);
  };

  static getMovie = async (id: string): Promise<MoviesModel | null> => {
    const ref = FirebaseSingleton.moviesDocRef(id);
    const result = await getDoc(ref);

    if (result.exists()) {
      return this.fromFirebase(result.data(), result.id);
    }
    return null;
  };

  static createMovie = async (title: string, synopsis: string, playingTime: Date, duration: number, cinemaId: string, genre: string): Promise<MovieResponse> => {
    try {
      const ref = FirebaseSingleton.moviesCollectionRef();
      const tempDate = formatTime(playingTime);
      await addDoc(ref, {
        title,
        synopsis,
        playingTime: tempDate,
        duration,
        cinemaId,
        genre,
      });
      const res: MovieResponse = {
        success: true,
      };
      return res;
    } catch (error) {
      const res: MovieResponse = {
        success: false,
        message: "error create movie",
      };
      return res;
    }
  };

  static updateMovie = async (id: string, title: string, synopsis: string, playingTime: Date, duration: number, cinemaId: string, genre: string): Promise<MovieResponse> => {
    try {
      const ref = FirebaseSingleton.moviesDocRef(id);
      const tempDate = formatTime(playingTime);
      await updateDoc(ref, {
        title,
        synopsis,
        playingTime: tempDate,
        duration,
        cinemaId,
        genre,
      });
      const res: MovieResponse = {
        success: true,
      };
      return res;
    } catch (error) {
      const res: MovieResponse = {
        success: false,
        message: "error update movie",
      };
      return res;
    }
  };

  static deleteMovie = async (id: string): Promise<MovieResponse> => {
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
        message: "error delete movie",
      };
      return res;
    }
  };
}
