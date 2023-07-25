import { DocumentData, updateDoc } from "firebase/firestore";
import { FirebaseSingleton } from "./FirebaseSingleton";
import {PackageResponse, RoomPackageModel } from "./RoomPackageModel";

export class DeluxePackageModel extends RoomPackageModel{
  constructor(
    public id: string,
    public price: number,
    public description: string,
    public foodDiscount: number,
    public souvenir: string,
    public bedType: string,
    public codeId: string
    ){
    super(id, price, description, codeId)
  }

  static fromFirebase = (data: DocumentData, id: string): DeluxePackageModel => {
    return new DeluxePackageModel(
      id,
      data.price,
      data.description,
      data.foodDiscount,
      data.souvenir,
      data.bedType,
      data.codeId
    );
  }

  static override updatePackage = async (id: string, price: number, description: string, foodDiscount: number, souvenir: string, bedType: string): Promise<PackageResponse> => {
    try {
      const ref = FirebaseSingleton.packagesDocRef(id);
      await updateDoc(ref, {
        price,
        description,
        foodDiscount,
        souvenir,
        bedType
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