import { RoomPackages } from "./RoomPackage";

export class Cinema {
  constructor(
    public id: string,
    public totalSeats: number,
    public totalAvailableSeats: number,
    public roomPackages: any // TODO
  ) { }
}
