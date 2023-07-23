import { DocumentData, addDoc } from "firebase/firestore";
import { FirebaseSingleton } from "./FirebaseSingleton";

interface BookingResponse {
  success: boolean;
  message?: string;
}


export class BookingModel {
  constructor(
    public id: string,
    public userId: string,
    public movieId: string,
    public paymentId: string,
    public seats: number[],
  ) { }

  static fromFirebase = (data: DocumentData, id: string): BookingModel => {
    return new BookingModel(
      id,
      data.userId,
      data.movieId,
      data.paymentId,
      data.seats,
    );
  }

  static create = async (userId: string, movieId: string, paymentId: string, seats: number[]) => {
    try {
      const ref = FirebaseSingleton.bookingsCollectionRef();
      await addDoc(ref, {
        userId,
        movieId,
        paymentId,
        seats,
      });
      const res: BookingResponse = {
        success: true,
      };
      return res;
    } catch (error) {
      const res: BookingResponse = {
        success: false,
        message: "error create booking",
      };
      return res;
    }
  }
}