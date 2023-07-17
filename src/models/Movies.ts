import { addDoc, deleteDoc, updateDoc } from "firebase/firestore";
import { RoomPackages } from "./RoomPackage";
import { FirebaseSingleton } from "./FirebaseSingleton";

export class Movies {
  constructor(
    public id: string, 
    public title: string, 
    public synopsis: string,
    public playingTime: Date,
    public duration: number,
    public genre: string,
    public cinema: RoomPackages,
  ){}

  static createMovie = async (title: string, synopsis: string, playingTime: Date, duration: number, genre: string) => {
    try{
      const ref = FirebaseSingleton.moviesCollectionRef;
      await addDoc(ref, {
        title, 
        synopsis, 
        playingTime, 
        duration, 
        genre,
      });
      return {
        success: true,
      }
    }catch(error){
      return {
        success: false,
        message: error,
      }
    }
  }

  static updateMovie = async (id: string, title: string, synopsis: string, playingTime: Date, duration: number, genre: string) => {
    try {
      const ref = FirebaseSingleton.moviesDocRef(id);
      await updateDoc(ref, {
        title, 
        synopsis, 
        playingTime, 
        duration, 
        genre,
      });
      return {
        success: true,
      }
    } catch (error) {
      return {
        success: false,
        message: error,
      }
    }
  }

  static deleteMovie = async (id: string) => {
    try {
      const ref = FirebaseSingleton.moviesDocRef(id);
      await deleteDoc(ref);
      return {
        success: true,
      }
    } catch (error) {
      return {
        success: false,
        message: error,
      }
    }
  }
}
