import { QueryResult, QueryResultRow } from "pg";
import Database from "Database";
import User from "contexts/mooc/users/domain/User"
import UserRepository from "contexts/mooc/users/domain/UserRepository";
import { UserMappingError } from "contexts/shared/domain/Error/UserMappingError";
import InternalError from "contexts/shared/domain/Error/InternalError";
import UserCriteria from "contexts/mooc/users/domain/UserCriteria";
import Logger from "contexts/shared/domain/Logger";

export default class PostgreUserRepository implements UserRepository
{
    private database: Database
    private logger: Logger

    constructor(database: Database, logger: Logger)
    {
        this.database = database
        this.logger = logger
    }

    async findBy(criteria: UserCriteria): Promise<User[]> {
        let query = 'SELECT u.id, u.login_name, u.password, u.email_address, u.create_date, ud.first_name, ud.last_name, ud.country, co.currency ' 
        query += 'FROM table_user u, table_user_detail ud, table_country co '
        query += 'WHERE u.id = ud.user_id AND ud.country = co.code'
        query += criteria.getCriteria()

        try {
            const result: QueryResult<QueryResultRow> = await this.database.executeQuery(query)

            if (result.rowCount === 0) {
                return []
            }

            return this.mapUsers(result.rows)
		} catch (e: any) {
            this.logger.getLogger().error(e.stack)

            if (e instanceof UserMappingError) {
                throw e
            }
            
            throw new InternalError('Something went wrong obtaining users')
        }
    }

    async create(user: User): Promise<void>
    {
        try {
            await this.database.executeQuery('INSERT INTO table_user VALUES($1, $2, $3, $4, $5)', 
                [user.getId(), user.getLoginName(), user.getEmailAddress(), user.getPassword(), new Date().toISOString()])

            await this.database.executeQuery('INSERT INTO table_user_detail VALUES($1, $2, $3, $4)',
                [user.getId(), user.getName(), user.getLastName(), user.getCountry()])
            
            return
        } catch(error: any){
            this.logger.error(error.stack)
            
            throw new InternalError(error.message)
        }
	}

    async delete(uuid: string): Promise<void>
    {
        try {
            await this.database.executeQuery('DELETE FROM table_user WHERE id = $1', [uuid])

            return
        } catch (error: any) {
            this.logger.error(error.stack)

            throw new InternalError(error.message)
        }
	}

    async update(user: User): Promise<void>
    {
        try {
            let query = 'UPDATE table_user SET '
            query += 'login_name = $1, '
            query += 'password = $2 '
            query += 'email_address = $3 '
            query += 'WHERE id = $4'

            await this.database.executeQuery(query, [user.getLoginName(), user.getPassword(), user.getEmailAddress(), user.getId()])

            query = 'UPDATE table_user_detail SET '
            query += 'first_name = $1, '
            query += 'last_name = $2, '
            query += 'WHERE user_id = $3'

            await this.database.executeQuery(query, [user.getName(), user.getLastName(), user.getId()])

            return
        } catch (error: any) {
            this.logger.error(error.stack)

            throw new InternalError('Something went wrong updating the user')
        }
	}

    private mapUsers(rows: QueryResultRow[]): User[]
    {
        return rows.map((row: QueryResultRow) => {
            try {
                return User.createFromDataRow(row)
            } catch(e: any) {
                throw new UserMappingError()
            }
        })
    }
}
