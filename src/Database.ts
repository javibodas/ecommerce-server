import { Pool, QueryArrayResult } from "pg"

export default class Database {
    pool: Pool

    constructor(user: string, host: string, dbName: string, password: string, port: number){
		this.pool = new Pool({
        user,
        host,
        database: dbName,
        password,
        port,
      })
    }

    public executeQuery(queryString: string, parameters: Array<string | number | any> = []): Promise<QueryArrayResult>
    {
        if (parameters.length > 0) return this.pool.query(queryString, parameters)

        return this.pool.query(queryString)
    }
}
