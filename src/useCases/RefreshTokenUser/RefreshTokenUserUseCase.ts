import { client } from "../../prisma/client";
import { GenerateTokenProvider } from "../../provider/GenerateTokenProvider";
import dayjs from "dayjs"
import { GenerateRefreshTokenProvider } from "../../provider/GenerateRefreshTokenProvider";


export class RefreshTokenUserUseCase {

    async execute(refresh_token: string) {

        const refreshtoken = await client.refreshToken.findFirst({
            where: {
                id: refresh_token
            }
        })

        if(!refreshtoken) {
            throw new Error("Invalid Refresh Token")
        }


        const { userId, expiresIn } = refreshtoken
        const refreshTokenExpired = dayjs().isAfter(dayjs.unix(expiresIn))

        const generateTokenProvider = new GenerateTokenProvider()
        const token = await generateTokenProvider.execute(userId)

        if (refreshTokenExpired) {

            await client.refreshToken.deleteMany({
                where: {
                    userId: userId
                }
            })

            const generateRefreshTokenProvider = new GenerateRefreshTokenProvider()
            const newRefreshToken = await generateRefreshTokenProvider.execute(userId)

            return { token, newRefreshToken } 
        }

        return token
    }
}