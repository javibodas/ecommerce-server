import * as bcrypt from "bcrypt"

export default class PasswordEncryptor {
    private static SALT_ROUNDS = 10

    public static async getEncryptedPassword(plainPassword: string): Promise<string> {
        return await bcrypt.hash(plainPassword, this.SALT_ROUNDS)
    }

    public static async compare(plainPassword: string, encryptedPassword: string): Promise<boolean> {
        return await bcrypt.compare(plainPassword, encryptedPassword)
    }
}