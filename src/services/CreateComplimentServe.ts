import { getCustomRepository } from "typeorm";
import { ComplimentsRepository } from "../repositories/ComplimentsRepositories";
import { UsersRepositories } from "../repositories/UsersRepositories";

interface IComplimentRequest {
  tag_id: string;
  user_sender: string;
  user_receiver: string;
  message: string;
}

export class CreateComplimentService {
  async execute({
    tag_id,
    user_sender,
    user_receiver,
    message,
  }: IComplimentRequest) {
    const complimentsRepository = getCustomRepository(ComplimentsRepository);
    const usersRepositories = getCustomRepository(UsersRepositories);

    if (user_sender == user_receiver) {
      throw new Error("Incorrect User Receiver");
    }

    const userReceiver = await usersRepositories.findOne(user_receiver);
    if (!userReceiver) {
      throw new Error("User receiver does not exists");
    }

    const compliment = complimentsRepository.create({
      tag_id,
      user_sender,
      user_receiver,
      message,
    });

    await complimentsRepository.save(compliment);
    return compliment;
  }
}
