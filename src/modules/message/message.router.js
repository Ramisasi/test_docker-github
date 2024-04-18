
import * as message from './controller/message.js'
import {aut} from '../../Meddlwear/aut.js'
import { Router } from "express";

const appRouter = Router()

appRouter.post('/sendMessage/:id',message.sendMessage)

appRouter.patch('/softDelete/:id',aut(),message.softDelete)

appRouter.get('/getMessageById',aut(),message.getMessageById)




export default appRouter
