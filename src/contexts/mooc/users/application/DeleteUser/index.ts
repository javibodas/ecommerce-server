import DeleteUserResponse from "./DeleteUserResponse";
import UserId from "contexts/mooc/users/domain/UserId";
import UserRepository from "contexts/mooc/users/domain/UserRepository";
import GetUser from "contexts/mooc/users/application/GetUser";
import Logger from "contexts/shared/domain/Logger";

export default class DeleteUser {
    private userRepository: UserRepository
    private getUserService: GetUser
    private logger: Logger

    constructor(userRepository: UserRepository, getUserService: GetUser, logger: Logger)
    {
        this.userRepository = userRepository;
        this.getUserService = getUserService
        this.logger = logger
    }

    async run(uuid: string): Promise<DeleteUserResponse>
    {
        this.checkUserExist(uuid)

        await this.userRepository.delete(uuid)

        return new DeleteUserResponse(new UserId(uuid))
    }


    private async checkUserExist(uuid: string): Promise<void>
    {
        await this.getUserService.run(uuid)
    }
}