import { sign } from "jsonwebtoken"

export class GenerateTokenProvider {

    async execute(userId: string) {
        const token = sign({}, "chave", {
            subject: userId,
            expiresIn: "20s"})

        return token
    }
    
}