import { User, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { FirebaseSingleton } from "./FirebaseSingleton";
import { DocumentData, getDoc, setDoc } from "firebase/firestore";
import { MoviesModel } from "./MoviesModel";

interface AuthenticationResponse {
  success: boolean;
  user?: User;
  message?: string;
}

export class UserModel {
  constructor(
    public id: string, 
    public name: string, 
    public gender: string, 
    public email: string, 
    public isAdmin: boolean, 
    public booking: []
  ) {}

  static fromFirebase = (data: DocumentData, id: string): UserModel => {
    return new UserModel(id, data.name, data.gender, data.email, data.isAdmin, data.booking);
  };

  static getUserFromFirestore = async (userUid: string): Promise<UserModel | null> => {
    try {
      const ref = FirebaseSingleton.usersDocRef(userUid);
      const result = await getDoc(ref);

      if (result.exists()) {
        return this.fromFirebase(result.data(), result.id);
      }
      return null;
    } catch (error) {
      return null;
    }
  };

  static login = async (email: string, password: string): Promise<AuthenticationResponse> => {
    try {
      const auth = FirebaseSingleton.getAuth;
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const res: AuthenticationResponse = {
        success: true,
        user: userCredential.user,
      };
      return res;
    } catch (_) {
      const res: AuthenticationResponse = {
        success: false,
        message: "Login error",
      };
      return res;
    }
  };

  // https://firebase.google.com/docs/auth/web/start?hl=en&authuser=0#sign_up_new_users
  static register = async (name: string, email: string, password: string, gender: string, isAdmin: boolean) => {
    try {
      const auth = FirebaseSingleton.getAuth;
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const ref = FirebaseSingleton.usersDocRef(userCredential.user.uid);
      await setDoc(ref, {
        name,
        email,
        gender,
        isAdmin,
      });
      const res: AuthenticationResponse = {
        success: true,
        user: userCredential.user,
      };
      return res;
    } catch (_) {
      const res: AuthenticationResponse = {
        success: false,
        message: "Register error",
      };
      return res;
    }
  };

  static bookMovie = async (userUid: string, bookedSeat: number[], paymentMethod: string, movie: MoviesModel) => {
    try {
      const ref = FirebaseSingleton.usersDocRef(userUid);
      await setDoc(ref, {
        booking: [
          {
            bookedSeat,
            paymentMethod,
            movie,
          },
        ],
      });
      const res: AuthenticationResponse = {
        success: true,
      };
      return res;
    } catch (_) {
      const res: AuthenticationResponse = {
        success: false,
        message: "Booking error",
      };
      return res;
    }
  };

  static logout = () => {
    signOut(FirebaseSingleton.getAuth);
  };
}
