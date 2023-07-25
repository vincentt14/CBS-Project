export interface PackageResponse {
  success: boolean;
  message?: string;
}

// https://www.typescriptlang.org/docs/handbook/2/classes.html
// https://www.w3schools.com/typescript/typescript_classes.php
export abstract class RoomPackageModel {
  protected constructor(
    protected id: string,
    protected price: number,
    protected description: string,
    protected codeId: string
  ) { }

  public static updatePackage = async (...props: any): Promise<PackageResponse> => {
    return {
      success: false,
      message: ""
    } as PackageResponse;
  }
}