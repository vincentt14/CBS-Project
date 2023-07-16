import { describe, test, expect } from "@jest/globals";
import { ClassicPackage } from "../models/ClassicPackage";
import { Cinema } from "../models/Cinema";

describe("Classic Package", () => {
  const cinema = new Cinema('1', 100, 50, 1);
  const classy = new ClassicPackage('1', 10000, 'classy before', cinema, 10)
  test('constructor', () => {

    expect(classy.foodDiscount).toEqual(10)
    expect(classy.price).toEqual(10000);
    expect(cinema.totalSeats).toEqual(100);
  });
});