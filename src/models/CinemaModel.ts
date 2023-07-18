import { DocumentData, getDoc } from "firebase/firestore";
import { FirebaseSingleton } from "./FirebaseSingleton";
import { RoomPackageModel } from "./RoomPackageModel";

interface CinemaResponse {
  success: boolean;
  message?: any;
}

export class CinemaModel {
  constructor(
    public id: string,
    public totalSeats: number,
    public totalAvailableSeats: number,
    public roomPackages: RoomPackageModel | null, 
  ) {}

  static fromFirebase = (data: DocumentData, id: string): CinemaModel => {
    return new CinemaModel(
      id,
      data.totalSeats, 
      data.totalAvailableSeats, 
      null
    );
  };

  static getCinema = async (id:string): Promise<CinemaModel | null> => {
    const ref = FirebaseSingleton.moviesDocRef(id);
    const result = await getDoc(ref);

    if (result.exists()) {
      return this.fromFirebase(result.data(), result.id);
    }
    return null;
  }


}
