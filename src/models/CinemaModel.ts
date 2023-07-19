import { DocumentData, addDoc, deleteDoc, getDoc, updateDoc } from "firebase/firestore";
import { FirebaseSingleton } from "./FirebaseSingleton";
import { RoomPackageModel } from "./RoomPackageModel";

interface CinemaResponse {
  success: boolean;
  message?: any;
}

export class CinemaModel {
  constructor(
    public id: string,
    public name: string,
    public totalSeats: number,
    public totalAvailableSeats: number | null,
    public roomPackages: RoomPackageModel | null, 
  ) {}

  static fromFirebase = (data: DocumentData, id: string): CinemaModel => {
    return new CinemaModel(
      id,
      data.name,
      data.totalSeats,
      null,
      null
    );
  };

  static getCinema = async (id:string): Promise<CinemaModel | null> => {
    const ref = FirebaseSingleton.cinemasDocRef(id);
    const result = await getDoc(ref);

    if (result.exists()) {
      return this.fromFirebase(result.data(), result.id);
    }
    return null;
  }

  static createCinema = async (name: string, totalSeats: number) => {
    try{
      const ref = FirebaseSingleton.cinemaCollectionRef();
      await addDoc(ref, {
        name,
        totalSeats
      })
      const res: CinemaResponse = {
        success: true,
      };
      return res;
    }catch(error){
      const res: CinemaResponse = {
        success: false,
        message: error
      }
      return res
    }
  }

  static updateCinema = async (id:any, name: string, totalSeats:number) => {
    try {
      const ref = FirebaseSingleton.cinemasDocRef(id);
      await updateDoc(ref, {
        name,
        totalSeats
      });
      const res: CinemaResponse = {
        success: true,
      };
      return res;
    } catch (error) {
      const res: CinemaResponse = {
        success: false,
        message: error,
      };
      return res;
    }
  }

  static deleteCinema = async (id: string) => {
    try {
      const ref = FirebaseSingleton.cinemasDocRef(id);
      await deleteDoc(ref);
      const res: CinemaResponse = {
        success: true,
      };
      return res;
    } catch (error) {
      const res: CinemaResponse = {
        success: false,
        message: error,
      };
      return res;
    }
  } 
}
