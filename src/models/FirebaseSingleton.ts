import { Auth, getAuth } from "firebase/auth";
import { app } from "../config/firebase";
import { CollectionReference, Firestore, collection, getFirestore, doc, DocumentReference } from "firebase/firestore";

// https://www.typescriptlang.org/docs/handbook/enums.html#const-enums
export const enum Endpoint {
  users = "users",
  movies = "movies",
  cinemas = "cinemas",
  packages = "packages",
}

// https://refactoring.guru/design-patterns/singleton/typescript/example
// https://www.typescriptlang.org/docs/handbook/2/classes.html#getters--setters
// https://firebase.google.com/docs/firestore/data-model?hl=en&authuser=0#references
export class FirebaseSingleton {
  private static auth: Auth;

  private static db: Firestore;

  private constructor() {}

  public static get getAuth(): Auth {
    if (!this.auth || this.auth === undefined) this.auth = getAuth(app);
    return this.auth;
  }

  public static get getFirestore(): Firestore {
    if (!this.db || this.db === undefined) this.db = getFirestore(app);
    return this.db;
  }

  public static usersCollectionRef(): CollectionReference {
    return collection(this.getFirestore, Endpoint.users);
  }

  public static usersDocRef(id: string = ""): DocumentReference {
    return doc(this.getFirestore, `${Endpoint.users}/${id}`);
  }

  // movies
  public static moviesCollectionRef(): CollectionReference {
    return collection(this.getFirestore, Endpoint.movies);
  }

  public static moviesDocRef(id: string = ""): DocumentReference {
    return doc(this.getFirestore, `${Endpoint.movies}/${id}`);
  }

  // cinemas
  public static cinemaCollectionRef(): CollectionReference {
    return collection(this.getFirestore, Endpoint.cinemas);
  }

  public static cinemasDocRef(id: string = ""): DocumentReference {
    return doc(this.getFirestore, `${Endpoint.cinemas}/${id}`);
  }

  // packages
  public static packagesCollectionRef(): CollectionReference {
    return collection(this.getFirestore, Endpoint.packages);
  }

  public static packagesDocRef(id: string = ""): DocumentReference {
    return doc(this.getFirestore, `${Endpoint.packages}/${id}`);
  }
}
