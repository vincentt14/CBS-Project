import { describe, test, expect } from "@jest/globals";
import { ClassicPackageModel } from "../models/ClassicPackageModel";
import { CinemaModel } from "../models/CinemaModel";

// describe("Classic Package", () => {
//   const cinema = new CinemaModel('1', 100, 50, 1);
//   const classy = new ClassicPackageModel('1', 10000, 'classy before', cinema, 10)
//   test('constructor', () => {

//     expect(classy.foodDiscount).toEqual(10)
//     expect(classy.price).toEqual(10000);
//     expect(cinema.totalSeats).toEqual(100);
//   });
// });