
import * as user from './controller/user.js'
import {aut} from '../../Meddlwear/aut.js'
import { Router } from "express";

const appRouter = Router()


appRouter.get('/Profile',aut(),user.userProfil)

appRouter.get('/getAllUser',aut(),user.getAllUser)

appRouter.patch('/updateProfile',aut(),user.updateProfile)

appRouter.delete('/deleteProfil',aut(),user.deleteProfil)

appRouter.patch('/signOut',aut(),user.signOut)

appRouter.patch('/softDelete',aut(),user.softDelete)

appRouter.patch('/updatePasswordProfile',aut(),user.updatePasswordProfile)

appRouter.get('/lastSeen/:id',aut(),user.lastSeen)

appRouter.get('/ShearProfile',aut(),user.ShearProfile)

appRouter.get('/ViewProfil/:id',user.ViewProfil)



export default appRouter
