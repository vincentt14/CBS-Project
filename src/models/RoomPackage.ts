import { Cinema } from "./Cinema";

// https://www.typescriptlang.org/docs/handbook/2/classes.html
// https://www.w3schools.com/typescript/typescript_classes.php
export abstract class RoomPackages {
  protected constructor(
    protected id: string,
    protected price: number,
    protected description: string,
    protected cinema: Cinema
  ) { }

  public editPackageInfo(): void { }

  public deletePackage(): void { }
}