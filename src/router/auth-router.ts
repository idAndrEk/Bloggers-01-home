// import {Request, Response, Router} from "express";
// import {usersService} from "../domain/users-service";
// import {jwtService} from "../application/jwt-service";
//
//
// export const authRouter = Router({})
//
//
// authRouter.post('/login',
//     async (req: Request, res: Response) => {
//         const user = await usersService.checkCredentials(req.body.login, req.body.password)
//         if (user) {
//             const token = await jwtService.createJWT(user)
//             res.status(201).send(token)
//         } else {
//             res.status(401)
//         }
//     })





// authRouter.post('/registration',
//     async (req: Request, res: Response) => {
//     const user = await authSevice.createUser(req.body.login, req.body.password)
//         res.status(201)
//         return
//     })