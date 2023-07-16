import { Auth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, updateProfile } from "firebase/auth"
import { FirebaseSingleton } from "./FirebaseSingleton";
import { doc, setDoc } from "firebase/firestore";

export class User {
  constructor(
    public id: string, 
    public name: string,
    public gender: string,
    public email: string,
    public password: string,
    public isAdmin: boolean
  ) {

  }

  static login = async (email: string, password: string) => {
    try {
      const auth = FirebaseSingleton.getAuth;
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

  // https://firebase.google.com/docs/auth/web/start?hl=en&authuser=0#sign_up_new_users
  static register = async (name: string, email: string, password: string) => {
    try {
      const auth = FirebaseSingleton.getAuth;
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      // await updateProfile(userCredential.user, { displayName: name });
      const ref = FirebaseSingleton.usersDocRef(userCredential.user.uid);
      await setDoc(ref, {
        name, email
      });
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
    signOut(FirebaseSingleton.getAuth);
  }
}
