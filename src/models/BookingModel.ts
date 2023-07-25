import { DocumentData, addDoc, deleteDoc, getDoc } from "firebase/firestore";
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
    public price: number,
  ) { }

  static fromFirebase = (data: DocumentData, id: string): BookingModel => {
    return new BookingModel(
      id,
      data.userId,
      data.movieId,
      data.paymentId,
      data.seats,
      data.price
    );
  }

  static get = async (id: string): Promise<BookingModel | null> => {
    const ref = FirebaseSingleton.bookingssDocRef(id);
    const result = await getDoc(ref);

    if (result.exists()) {
      return this.fromFirebase(result.data(), result.id);
    }
    return null;
  };
  
  static create = async (userId: string, movieId: string, paymentId: string, seats: number[], price: number) => {
    try {
      const ref = FirebaseSingleton.bookingsCollectionRef();
      await addDoc(ref, {
        userId,
        movieId,
        paymentId,
        seats,
        price
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

  static delete = async (id: string) => {
    try {
      const ref = FirebaseSingleton.bookingssDocRef(id);
      await deleteDoc(ref);
      const res: BookingResponse = {
        success: true,
      };
      return res;
    } catch (error) {
      const res: BookingResponse = {
        success: false,
        message: 'error delete booking',
      };
      return res;
    }
  }
}