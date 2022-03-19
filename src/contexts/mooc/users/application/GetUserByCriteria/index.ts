import GetUserResponse from "../GetUser/GetUserResponse";
import NotFoundError from "contexts/shared/domain/Error/NotFoundError";
import User from "contexts/mooc/users/domain/User";
import UserRepository from "contexts/mooc/users/domain/UserRepository";
import UserCriteria from "contexts/mooc/users/domain/UserCriteria";

export default class GetUserByCriteria {
    userRepository: UserRepository

    constructor(userRepository: UserRepository)
    {
        this.userRepository = userRepository;
    }

    async run(criteria: UserCriteria): Promise<GetUserResponse>
    {
        const users: User[] = await this.userRepository.findBy(criteria)
        
        if (users.length < 1) {
            throw new NotFoundError('User not found')
        }

        return new GetUserResponse(users[0])
    }
}
