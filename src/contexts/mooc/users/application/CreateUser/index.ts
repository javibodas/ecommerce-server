import CreateUserResponse from "./CreateUserResponse";
import AlreadyExistsError from 'contexts/shared/domain/Error/AlreadyExistsError';
import User from 'contexts/mooc/users/domain/User';
import UserId from 'contexts/mooc/users/domain/UserId';
import UserRepository from "contexts/mooc/users/domain/UserRepository";
import UserCriteria from "contexts/mooc/users/domain/UserCriteria";
import GetUserByCriteria from "../GetUserByCriteria";
import PasswordEncryptor from "contexts/shared/domain/Encryptor/PasswordEncryptor";
import Logger from "contexts/shared/domain/Logger";
import UuidHelper from 'contexts/shared/domain/UuidHelper'

export default class CreateUser {
    
    private userRepository: UserRepository
    private getUserByCriteriaService: GetUserByCriteria
    private logger: Logger
	private uuidHelper: UuidHelper

    constructor(userRepository: UserRepository, getUserByCriteriaService: GetUserByCriteria, logger: Logger, uuidHelper: UuidHelper)
    {
        this.userRepository = userRepository;
        this.getUserByCriteriaService = getUserByCriteriaService
        this.logger = logger
		this.uuidHelper = uuidHelper
    }

    async run(name: string, lastName: string, loginName: string, password: string, emailAddress: string, country: string): Promise<CreateUserResponse>
    {
        const userId: UserId = new UserId(this.uuidHelper.generate())
        const encryptedPassword = await PasswordEncryptor.getEncryptedPassword(password)
        const newUser: User = new User(userId, loginName, encryptedPassword, name, lastName, emailAddress, country)

        await this.checkUserAlreadyExists(newUser)
        
        await this.userRepository.create(newUser)

        return new CreateUserResponse(userId)
    }

    private async checkUserAlreadyExists(newUser: User): Promise<void>
    {   
		await this.checkUserLoginNameAlreadyExists(newUser.getLoginName())
		await this.checkUserEmailAlreadyExists(newUser.getEmailAddress())
    }

	private async checkUserLoginNameAlreadyExists(loginName: string): Promise<void>
	{
		try {
			const criteria: UserCriteria = UserCriteria.create().withLoginName(loginName)
			await this.getUserByCriteriaService.run(criteria)
		} catch(error) { return }

		throw new AlreadyExistsError('User with login name "' + loginName + '" already exists')
	}

	private async checkUserEmailAlreadyExists(emailAddress: string): Promise<void>
	{
		try {
			const criteria: UserCriteria = UserCriteria.create().withEmailAddress(emailAddress)

			await this.getUserByCriteriaService.run(criteria)
		} catch(error) { return }

		throw new AlreadyExistsError('User with email address "' + emailAddress + '" already exists')
	}
}
