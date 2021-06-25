import { getCustomRepository } from "typeorm";
import { UsersRepositories } from "../repositories/UsersRepositories";

export class ListUserService {
  async execute() {
    const usersRepositories = getCustomRepository(UsersRepositories);
    const users = await usersRepositories.find();
    return users;
  }
}
