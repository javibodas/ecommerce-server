import GetUserResponse from "./GetUserResponse";
import NotFoundError from "contexts/shared/domain/Error/NotFoundError";
import User from "contexts/mooc/users/domain/User";
import UserRepository from "contexts/mooc/users/domain/UserRepository";
import UserCriteria from "contexts/mooc/users/domain/UserCriteria";

export default class GetUser {
    userRepository: UserRepository

    constructor(userRepository: UserRepository)
    {
        this.userRepository = userRepository;
    }

    async run(uuid: string): Promise<GetUserResponse>
    {
        const criteria: UserCriteria = UserCriteria.create().withId(uuid)
        const users: User[] = await this.userRepository.findBy(criteria)

        if (users.length !== 1) {
            throw new NotFoundError('User with id ' + uuid + ' not found')
        }

        return new GetUserResponse(users[0])
    }
}