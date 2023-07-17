import { User, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { FirebaseSingleton } from "./FirebaseSingleton";
import { doc, getDoc, getFirestore, setDoc } from "firebase/firestore";
import { app } from "../config/firebase";

const db = getFirestore(app);

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
    public password: string, 
    public isAdmin: boolean
    ) {}

  static getUserFromFirestore = async (userUid: string): Promise<void> => {
    try {
      // const ref = FirebaseSingleton.usersDocRef(userUid);
      // const result = await getDoc(ref);
      // if(result.exists()){
      //   console.log(result.data())
      // }else {
      //   console.log("kosong")
      // }
      const docRef = doc(db, "users", "cLrhHPW1dlg1QPTeDeORaNcISXZ2");
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        console.log("Document data:", docSnap.data());
      } else {
        // docSnap.data() will be undefined in this case
        console.log("No such document!");
      }
      return ;
    } catch (error) {
      return ;
    }
  }

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
  static register = async (name: string, email: string, password: string) => {
    try {
      const auth = FirebaseSingleton.getAuth;
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const ref = FirebaseSingleton.usersDocRef(userCredential.user.uid);
      await setDoc(ref, {
        name,
        email,
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

  static logout = () => {
    signOut(FirebaseSingleton.getAuth);
  };
}
