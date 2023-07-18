import { CinemaModel } from "./CinemaModel";

// https://www.typescriptlang.org/docs/handbook/2/classes.html
// https://www.w3schools.com/typescript/typescript_classes.php
export abstract class RoomPackagesModel {
  protected constructor(
    protected id: string,
    protected price: number,
    protected description: string,
    protected cinema: CinemaModel
  ) { }

  public editPackageInfo(): void { }

  public deletePackage(): void { }
}