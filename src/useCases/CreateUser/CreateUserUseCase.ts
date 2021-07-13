import { client } from "../../prisma/client"
import { hash } from "bcryptjs"

interface IUserRequest {
    name: string
    username: string
    password: string
}

class CreateUserUseCase {

    async execute({ name, username, password }: IUserRequest) {
         
        const UserAlreadyExists = await client.user.findFirst({
            where: {
                username
            }
        })

        if (UserAlreadyExists) {
            throw new Error("User already Exists")
        }

        const hashPass = await hash(password, 10)

        const user = await client.user.create({
            data: {
                name,
                password: hashPass,
                username
            }
        })

        return user

    }
}

export { CreateUserUseCase }