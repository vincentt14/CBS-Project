import { CinemaModel } from "./CinemaModel";
import {RoomPackageModel } from "./RoomPackageModel";

export class DeluxePackageModel extends RoomPackageModel{
  constructor(
    public id: string,
    public price: number,
    public description: string,
    public cinema: CinemaModel,
    public foodDiscount: number,
    public bedType: string,
    public souvenir: string,
    ){
    super(id, price, description, cinema)
  }

  public override editPackageInfo(): void {
      
  }
}