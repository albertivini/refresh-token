import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken"

export function ensureAuthenticated (req: Request, res: Response, next: NextFunction) {

    const authToken = req.headers.authorization.split(' ')[1]

    if (!authToken) {
        return res.status(401).json({ message: "Token is missing"})
    }

    try {

        verify(authToken, "chave")
        return next()
        
    } catch (err) {
        return res.status(401).json({
            message: "Invalid token"
        })
    }

}