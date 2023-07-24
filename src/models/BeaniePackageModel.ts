import { updateDoc } from "firebase/firestore";
import { FirebaseSingleton } from "./FirebaseSingleton";
import { PackageResponse, RoomPackageModel } from "./RoomPackageModel";

export class BeaniePackageModel extends RoomPackageModel{
  constructor(
    public id: string,
    public description: string,
    public price: number,
    public souvenir: string
  ){
    super(id, price, description)
  }

  static override updatePackage = async (id: string, description: string, price: number, souvenir:string): Promise<PackageResponse> => {
      try {
        const ref = FirebaseSingleton.packagesDocRef(id);
        await updateDoc(ref, {
          price,
          description,
          souvenir,
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
  }
}