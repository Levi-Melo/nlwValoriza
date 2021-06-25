import { UsersRepositories } from "../repositories/UsersRepositories";
import { getCustomRepository } from "typeorm";
import { hash } from "bcryptjs";
interface IUserRequest {
  name: string;
  email: string;
  admin?: boolean;
  password: string;
}

export class CreateUserService {
  async execute({ name, email, admin = false, password }: IUserRequest) {
    const usersRepositories = getCustomRepository(UsersRepositories);
    const userAlreadyExists = await usersRepositories.findOne({ email });

    if (!email) {
      throw new Error("E-mail incorrect");
    }

    const passwordHash = await hash(password, 8);

    if (userAlreadyExists) {
      throw new Error("User already exists");
    }

    const user = usersRepositories.create({
      name,
      email,
      admin,
      password: passwordHash,
    });
    await usersRepositories.save(user);
    return user;
  }
}
