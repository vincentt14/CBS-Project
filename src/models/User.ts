import { Auth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, updateProfile } from "firebase/auth"
import { FirebaseSingleton } from "./FirebaseSingleton";

export class User {
  constructor(public id: string, public name: string) {

  }

  static login = async (email: string, password: string) => {
    try {
      const auth = FirebaseSingleton.getAuth();
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      return {
        success: true,
        user: userCredential.user,
      };
    } catch (error) {
      return {
        success: false,
        message: error,
      };
    }
  }

  static register = async (name: string, email: string, password: string) => {
    try {
      const auth = FirebaseSingleton.getAuth();
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      await updateProfile(userCredential.user, { displayName: name });
      return {
        success: true,
        user: userCredential.user,
      };
    } catch (error) {
      return {
        success: false,
        message: error,
      };
    }
  }

  static logout = () => {
    signOut(FirebaseSingleton.getAuth());
  }
}
