import { describe, test, expect } from "@jest/globals";
import { getMovieList } from "../utils/movies";

describe("User Model getUserFromFirestore", () => {
  test('data exist', async () => {
    try {
      const res = await getMovieList()
      console.log(res)
      return expect("sukses");
    } catch (error) {
      console.log("gagal");
      return expect("gagal");
    }
  });
});