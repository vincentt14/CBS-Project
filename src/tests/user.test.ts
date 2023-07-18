import { describe, test, expect } from "@jest/globals";
import { UserModel } from "../models/UserModel";

describe("User Model Constructor", () => {
  const date = new Date();
  console.log(date);
  console.log(date.toISOString());
  console.log(date.toUTCString());
  console.log(date.toString());
  const user = new UserModel('1','rucci','L','rucci@gmail.com','***',true);
  console.log(user);
  test('user.name = Rucci', () => {
    return expect(user.name).toBe('rucci');
  })
});

// describe("User Model Register", () => {

//   test('register ruccii@gmail.com ruccii', async () => {

//     try {
//       const res = await UserModel.register('rucci', 'ruccii@gmail.com', 'ruccii');
//       console.log(res.success, res.message);
//       return expect(res.success).toBe(true);
//     } catch (error) {
//       return expect(error);
//     }

//   })
// });

describe("User Model Login", () => {

  test('login success', async () => {
    const res = await UserModel.login('ruccii@gmail.com', 'ruccii');
    console.log(res.success, res.message);
    expect(res.success).toBe(true);
  })

  test('login failed', async () => {
    const res = await UserModel.login('aselole@gmail.com', 'aselole');
    console.log(res.success, res.message);
    return expect(res.success).toBe(false);
  })
});

// describe("User Model getUserFromFirestore", () => {
//   test('data exist', async () => {
//     try {
//       await UserModel.getUserFromFirestore("cLrhHPW1dlg1QPTeDeORaNcISXZ2");
//       return expect("sukses");
//     } catch (error) {
//       console.log("gagal");
//       return expect("gagal");
//     }
//   });
// });
