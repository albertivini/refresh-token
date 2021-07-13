import { client } from "../../prisma/client"
import { compare } from "bcryptjs"
import { GenerateRefreshTokenProvider } from "../../provider/GenerateRefreshTokenProvider"
import { GenerateTokenProvider } from "../../provider/GenerateTokenProvider"

interface IRequest {
    username: string
    password: string
}

class AuthenticateUserUseCase {
    
    async execute({ username, password }: IRequest) {

        const UserAlreadyExists = await client.user.findFirst({
            where: {
                username
            }
        })

        console.log("chegou aqui")

        if (!UserAlreadyExists) {
            throw new Error("User/password incorrect")
        }

        const unhashPass = await compare(password, UserAlreadyExists.password)

        if (!unhashPass) {
            throw new Error("User/password incorrect")
        }

        console.log("passou daqui")

        const { id } = UserAlreadyExists

        const generateTokenProvider = new GenerateTokenProvider()
        const token = await generateTokenProvider.execute(id)

        console.log("gerou o token")

        await client.refreshToken.deleteMany({
            where: {
                userId: id
            }
        })


        const generateRefreshTokenProvider = new GenerateRefreshTokenProvider()
        const refreshToken = await generateRefreshTokenProvider.execute(id)

        console.log("gerou o refreshtoken")

        return { token, refreshToken }

    }
}

export { AuthenticateUserUseCase }