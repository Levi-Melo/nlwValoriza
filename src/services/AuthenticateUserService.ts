import { compare } from "bcryptjs";
import { getCustomRepository } from "typeorm";
import { UsersRepositories } from "../repositories/UsersRepositories";
import { sign } from "jsonwebtoken";
interface IAuthenticateRequest {
  email: string;
  password: string;
}

export class AuthenticateUserService {
  async execute({ email, password }: IAuthenticateRequest) {
    const usersRepositories = getCustomRepository(UsersRepositories);
    const user = await usersRepositories.findOne({ email });

    if (!user || !(await compare(password, user.password))) {
      throw new Error("Email/Password incorrect");
    }
    const token = sign(
      {
        email: user.email,
      },
      "c4091bafbf665a34dadb0123c261f84b",
      {
        subject: user.id,
        expiresIn: "1d",
      }
    );

    return token;
  }
}
