import GetUsersResponse from "./GetUsersResponse";
import UserRepository from "../../domain/UserRepository";
import User from "../../domain/User";

export default class GetUsers {
    userRepository: UserRepository

    constructor(userRepository: UserRepository)
    {
        this.userRepository = userRepository;
    }

    async run(): Promise<GetUsersResponse>
    {
        const users: User[] = await this.userRepository.findAll()

        return new GetUsersResponse(users)
    }
}