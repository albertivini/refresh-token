import { Request, Response } from "express"
import { CreateUserUseCase } from "./CreateUserUseCase"

class CreateUserController {

    async handle(req: Request, res: Response) {

        const { name, username, password} = req.body 

        const authenticateUser = new CreateUserUseCase()
 
        const user = await authenticateUser.execute({name, username, password})

        return res.json(user)

    }
}

export { CreateUserController }