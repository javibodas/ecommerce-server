import User from "./User";
import UserCriteria from "./UserCriteria";

export default interface UserRepository{
    findBy(criteria: UserCriteria): Promise<User[]>
    create(user: User): Promise<void>
    delete(uuid: string): Promise<void>
    update(user: User): Promise<void>
}
