import { updateDoc } from "firebase/firestore";
import { FirebaseSingleton } from "./FirebaseSingleton";
import { PackageResponse, RoomPackageModel } from "./RoomPackageModel";

export class ClassicPackageModel extends RoomPackageModel {
  constructor(
    public id: string,
    public price: number,
    public description: string,
    public foodDiscount: number,
  ) {
    super(id, price, description);
  }

  static override updatePackage = async (id: string, price: number, description: string, foodDiscount: number): Promise<PackageResponse> => {
    try {
      const ref = FirebaseSingleton.packagesDocRef(id);
      await updateDoc(ref, {
        price,
        description,
        foodDiscount,
      });
      const res: PackageResponse = {
        success: true,
      };
      return res;
    } catch (error) {
      const res: PackageResponse = {
        success: false,
        message: "error update package",
      };
      return res;
    }
  };
}