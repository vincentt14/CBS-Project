import { updateDoc } from "firebase/firestore";
import { CinemaModel } from "./CinemaModel";
import { FirebaseSingleton } from "./FirebaseSingleton";
import { RoomPackageModel } from "./RoomPackageModel";

interface PackageResponse {
  success: boolean;
  message?: string;
}

export class ClassicPackageModel extends RoomPackageModel {
  constructor(
    public id: string,
    public price: number,
    public description: string,
    public cinema: CinemaModel,
    public foodDiscount: number,
  ) {
    super(id, price, description, cinema);
  }

  // public override async editPackageInfo (id: string, price:number, description:string) {
  //   try {
  //     const ref = FirebaseSingleton.packagesDocRef(id);
  //     await updateDoc(ref, {
  //       price,
  //       description
  //     });
  //     const res: PackageResponse = {
  //       success: true,
  //     };
  //     return res;
  //   } catch (error) {
  //     const res: PackageResponse = {
  //       success: false,
  //       message: error,
  //     };
  //     return res;
  //   }
  // }
}