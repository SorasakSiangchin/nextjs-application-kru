import { compare, hashSync } from "bcrypt";
import { db } from "./db";
import { LoginRequest } from "@/interfaces/user/loginRequest";
import { RegisterRequest } from "@/interfaces/user/registerRequest";
import { UserData } from "@/interfaces/user/userData";

const GetUsers = async (): Promise<UserData[]> => {
  const users = await db.user.findMany();

  return users as UserData[];
};

const Login = async (data: LoginRequest): Promise<UserData> => {
  const users = await db.user.findMany({
    where: { email: data.email },
  });

  if (users.length === 0) {
    throw "ไม่พบผู้ใช้งาน!";
  }

  const user = users[0];

  if (await compare(data.password, user.passwordHash)) {
    return user as UserData;
  }

  throw "รหัสผ่านไมู่กต้อง!";
};

const Register = async (user: RegisterRequest) => {
  const users = await db.user.findMany({ where: { email: user.email } });
  if (users.length > 0) {
    throw "User already exists";
  }

  const passwordHash = await hashSync(user.password, 10);

  const newUser = await db.user.create({
    data: {
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      passwordHash: passwordHash,
      age: Number(user.age),
    },
  });

  return newUser;
};

const userService = {
  Login,
  Register,
  GetUsers,
};

export default userService;
