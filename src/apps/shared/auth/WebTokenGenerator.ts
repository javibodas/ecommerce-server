import jwt from 'jsonwebtoken'

export default class WebTokenGenerator {

    public static generate(uuid: string): string {
        return jwt.sign(uuid, process.env.TOKEN_SECRET || '')
    }

    public static async validate(token: string): Promise<void> {
		jwt.verify(token, process.env.TOKEN_SECRET || '', (err, decoded) => {
			if (decoded) return

			throw err
		})
    }
}
