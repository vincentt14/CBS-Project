import { User } from "../models/User";

describe("User Model Constructor", () => {
  const user = new User("1", 'Rucci');
  console.log(user);
  test('user.name = Rucci', () => {
    expect(user.name).toBe('Rucci');
  })
});

describe("User Model Register", () => {
  test('register rucci@gmail.com rucci', async () => {
    const res = await User.register('rucci', 'rucci@gmail.com', 'rucci123');
    console.log(res.success, res.message);
    // expect(res.success).toBe(true);
  })
});

describe("User Model Login", () => {
  test('login success', async () => {
    const res = await User.login('ruccii@gmail.com', 'ruccii');
    console.log(res.success, res.message);
    expect(res.success).toBe(true);
  })

  test('login failed', async () => {
    const res = await User.login('aselole@gmail.com', 'aselole');
    console.log(res.success, res.message);
    expect(res.success).toBe(false);
  })
});

