import { RoomPackages } from "./RoomPackage";

export class Movies {
  constructor(
    public id: string, 
    public title: string, 
    public synopsis: string,
    public playingTime: Date,
    public duration: number,
    public genre: string,
    public cinema: RoomPackages,
  ){}

  
}