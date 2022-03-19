import UserRepository from "contexts/mooc/users/domain/UserRepository";
import User from "contexts/mooc/users/domain/User";
import UserCriteria from "contexts/mooc/users/domain/UserCriteria";
import UserId from "contexts/mooc/users/domain/UserId";
import UpdateUserResponse from "./UpdateUserResponse";
import GetUserByCriteria from "../GetUserByCriteria";
import GetUserResponse from "contexts/mooc/users/application/GetUser/GetUserResponse";
import AlreadyExistsError from "contexts/shared/domain/Error/AlreadyExistsError";
import Logger from "contexts/shared/domain/Logger";


export default class UpdateUser {
    private userRepository: UserRepository
    private getUserByCriteriaService: GetUserByCriteria
    private logger: Logger

    constructor(userRepository: UserRepository, getUserByCriteriaService: GetUserByCriteria, logger: Logger)
    {
        this.userRepository = userRepository;
        this.getUserByCriteriaService = getUserByCriteriaService
        this.logger = logger
    }

    async run(id: string, name?: string, lastName?: string, loginName?: string, password?: string, emailAddress?: string): Promise<UpdateUserResponse>
    {
        
        const getUserResponse: GetUserResponse = await this.checkUserExists(id)
        const oldUser: User = getUserResponse.getData()

        await this.checkIfUserAlreadyExistsWithLoginNameAndEmailAddress(oldUser, loginName, password)

        const newUser: User = new User(
            new UserId(id), 
            loginName ? loginName : oldUser.getLoginName(),
            oldUser.getPassword(),
            name ? name : oldUser.getName(),
            lastName ? lastName : oldUser.getLastName(),
            emailAddress ? emailAddress : oldUser.getEmailAddress(),
            oldUser.getCountry()
        )

        await this.userRepository.update(newUser)

        return new UpdateUserResponse(newUser)
    }

    private async checkUserExists(uuid: string): Promise<GetUserResponse> {
        const criteria: UserCriteria = UserCriteria.create().withId(uuid)

        return await this.getUserByCriteriaService.run(criteria)
    }


    private async checkIfUserAlreadyExistsWithLoginNameAndEmailAddress(oldUser: User, loginName?: string, emailAddress?: string): Promise<void> {
        try {
            if (loginName && loginName !== oldUser.getLoginName()) {
                const criteria: UserCriteria = UserCriteria.create().withLoginName(loginName)

                await this.getUserByCriteriaService.run(criteria)

                throw new AlreadyExistsError("User with login name '" + loginName + "' already exists")
            }

            if (emailAddress && emailAddress !== oldUser.getEmailAddress()) {
                const criteria: UserCriteria = UserCriteria.create().withEmailAddress(emailAddress)

                await this.getUserByCriteriaService.run(criteria)

                throw new AlreadyExistsError("User with email address '" + emailAddress + "' already exists")
            }
        } catch (error) {
            if (error instanceof AlreadyExistsError) {
                throw error
            }
        }
    }
}