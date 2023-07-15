import { Auth, getAuth } from "firebase/auth";
import { app } from "../config/firebase";

// https://refactoring.guru/design-patterns/singleton/typescript/example
export class FirebaseSingleton {

  private static auth: Auth;

  private constructor() { }

  public static getAuth(): Auth {
    if (!this.auth || this.auth === undefined) {
      this.auth = getAuth(app);
    }
    return this.auth;
  }

}