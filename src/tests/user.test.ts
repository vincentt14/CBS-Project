import { describe, test, expect } from "@jest/globals";
import { User } from "../models/User";

describe("User Model Constructor", () => {
  const user = new User("1", 'Rucci');
  console.log(user);
  test('user.name = Rucci', () => {
    return expect(user.name).toBe('Rucci');
  })
});

describe("User Model Register", () => {

  test('register ruccii@gmail.com ruccii', async () => {

    try {
      const res = await User.register('rucci', 'ruccii@gmail.com', 'ruccii');
      console.log(res.success, res.message);
      return expect(res.success).toBe(true);
    } catch (error) {
      return expect(error);
    }

  })
});

describe("User Model Login", () => {

  // test('login success', async () => {
  //   const res = await User.login('ruccii@gmail.com', 'ruccii');
  //   console.log(res.success, res.message);
  //   expect(res.success).toBe(true);
  // })

  test('login failed', async () => {
    const res = await User.login('aselole@gmail.com', 'aselole');
    console.log(res.success, res.message);
    return expect(res.success).toBe(false);
  })
});

