import { Router, Request, Response } from "express"
import { ensureAuthenticated } from "./middlewares/ensureAuthenticated"
import { AuthenticateUserController } from "./useCases/AuthenticateUser/AuthenticateUserController"
import { CreateUserController } from "./useCases/CreateUser/CreateUserController"
import { RefresTokenUserController } from "./useCases/RefreshTokenUser/RefreshTokenUserController"

const router = Router()

const createUserController = new CreateUserController()
const authenticateUserController = new AuthenticateUserController()
const refreshTokenUserController = new RefresTokenUserController()

router.post('/users', createUserController.handle)

router.post('/login', authenticateUserController.handle)

router.post('/refreshtoken', refreshTokenUserController.handle)

router.get('/courses', ensureAuthenticated, (req: Request, res: Response) => {
    return res.status(200).json([
        { id: 1, name: "NodeJs"},
        { id: 2, name: "ReactJs"}
    ])
})

export { router }