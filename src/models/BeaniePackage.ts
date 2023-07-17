import { Cinema } from "./Cinema";
import { RoomPackages } from "./RoomPackage";

export class BeaniePackage extends RoomPackages{
  constructor(
    public id: string,
    public price: number,
    public description: string,
    public cinema: Cinema,
    public beanieMaterial: string,
    public souvenir: string
  ){
    super(id, price, description, cinema)
  }

  public override editPackageInfo(): void {
      
  }

  public override deletePackage(): void {
      
  }
}