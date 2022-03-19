import User from '../../../src/contexts/mooc/users/domain/User'
import UserCriteria from '../../../src/contexts/mooc/users/domain/UserCriteria'
import UserRepository from '../../../src/contexts/mooc/users/domain/UserRepository'

export default class TestUserRepository implements UserRepository {
	public users: User[] = []


	async findBy(criteria: UserCriteria): Promise<User[]> 
	{
		return new Promise((resolve) => {

			resolve(
				this.users.filter((user: User) => { 
					return user.getId() === criteria.getId() ||
					user.getLoginName() === criteria.getLoginName() ||
					user.getEmailAddress() === criteria.getEmailAddress()
				})
			)
		})
	}

	async create(user: User): Promise<void>
	{
		return new Promise((resolve) => {
			this.users.push(user)
			resolve(undefined)
		})
	}

	async delete(uuid: string): Promise<void>
	{
		return new Promise((resolve) => {
			this.users = this.users.filter((user: User) => user.getId() !== uuid)
			resolve(undefined)
		})
	}

	async update(user: User): Promise<void>
	{
		return new Promise((resolve) => {
			this.users.filter((userFil: User) => userFil.getId() === user.getId())
			this.users = this.users.filter((userFil: User) => userFil.getId() !== user.getId())
			
			resolve(undefined)
		})
	}
}
