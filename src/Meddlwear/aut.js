import jwt from 'jsonwebtoken'
import userModel from '../DB/modules/user.Model.js'
export const aut = () => {
    return async (req, res, nex) => {
        try {
            const { authorization } = req.headers
            if (!authorization?.startsWith(process.env.BeararKey)) {
                res.json({ message: "In-Valid Token Or In-Valid Bearar Token" })
            }
            else {
                const token = authorization.split(process.env.BeararKey)[1]
                const decoded = jwt.verify(token, process.env.TokenSignature)
                if (!decoded?.id || !decoded.isLogin) {
                    req.json({ message: "In-Valid Payload" })
                }
                else {
                    const findUser = await userModel.findById(decoded.id).select("FirstName Email")
                    if (!findUser) {
                        req.json({ message: "In-Valid Token" })
                    }
                    else {
                        req.user = findUser
                        nex()
                    }
                }
            }
        } catch (error) {
            res.json({message:"catch Errer" ,error })
        }
    }
}