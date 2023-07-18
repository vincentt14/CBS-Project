export class CinemaModel {
  constructor(
    public id: string,
    public totalSeats: number,
    public totalAvailableSeats: number,
    public roomPackages: any // TODO
  ) { }
}
