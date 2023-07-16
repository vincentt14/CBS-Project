import { Cinema } from "./Cinema";
import { RoomPackages } from "./RoomPackage";

export class ClassicPackage extends RoomPackages{
  constructor(
    public id: string,
    public price: number,
    public description: string,
    public cinema: Cinema,
    public foodDiscount: number,
  ){
    super(id, price, description, cinema);
  }

  public override editPackageInfo(): void {

  }

  public override deletePackage(): void {
      
  }
}