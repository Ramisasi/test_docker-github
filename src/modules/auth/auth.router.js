import * as user from './controller/auth.js'
import { Router } from "express";

const appRouter = Router()

appRouter.get('/ConfirmEmil/:token',user.ConfirmEmil)

appRouter.post('/signUp',user.signUp)

appRouter.post('/signin',user.signin)

appRouter.post('/forgetPassword',user.forgetPassword)

appRouter.patch('/NewPassword/:token',user.NewPassword)

export default appRouter