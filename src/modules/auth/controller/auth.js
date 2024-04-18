import userModel from "../../../DB/modules/user.Model.js"
import { SendEmail } from "../../../Serves/auth.js"
import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'

export const ConfirmEmil = async (req, res) => {
    try {
        const { token } = req.params
        const decoded = jwt.verify(token, process.env.ConfirmEmailToken)
        const finduser = await userModel.updateOne({ _id: decoded.id, ConfirmEmail: false }, { ConfirmEmail: true })
        finduser.modifiedCount ? res.json({ message: `ConfirmEmil` }) : res.json({ message: `Email isz ConfirmEmil or In-Valid Account` })
    } catch (error) {
        res.json({ message: "catch Errer", error })
    }

}
export const signUp = async (req, res) => {
    try {
        const { Email, Password } = req.body
        const findEmail = await userModel.findOne({ Email }).select('Email')
        if (findEmail) {
            res.json({ message: `Email Exsit .............${findEmail}` })
        }
        else {
            const hasPassowrd = await bcrypt.hash(Password, parseInt(process.env.hasRound))
            const userdata = await userModel({ Email, Password: hasPassowrd })
            const saveData = await userdata.save();
            const token = jwt.sign({ id: saveData._id }, process.env.ConfirmEmailToken, { expiresIn: '1h' })
            const url = `${req.protocol}://${req.headers.host}${process.env.basUrlName}/auth/ConfirmEmil/${token}`
            const message = `<a href='${url}'> Followe Me To Confirm Email</a>`
            SendEmail(Email, 'Confirm Email', message)
            res.json({ message: `Don ............ `, saveData })
        }
    } catch (Errore) {
        res.json({ message: `Catch Errore............ ${Errore}` })
    }
}
export const signin = async (req, res) => {
    const { Email, Password } = req.body
    try {
        const finduser = await userModel.findOne({ Email, isDelete: false })
        if (!finduser) {
            res.json({ message: 'In-Valid Account' })
        }
        else {
            if (!finduser.ConfirmEmail) {
                res.json({ message: 'Plez Confirm Your Email First' })
            }
            else {
                const match = await bcrypt.compare(Password, finduser.Password)
                if (!match) {
                    res.json({ message: 'Passowrd Msmatch' })
                }
                else {
                    const finduser = await userModel.findOneAndUpdate({ Email, isDelete: false }, { isOnline: true })
                    const token = jwt.sign({ id: finduser._id, isLogin: true }, process.env.TokenSignature, { expiresIn: '1h' })
                    res.json({ message: 'don', token })
                }
            }
        }
    } catch (error) {
        res.json({ message: "catch Errer", error })
    }

}
export const forgetPassword = async (req, res) => {
    try {
        const { Email } = req.body
        const findEmail = await userModel.findOne({ Email, isDelete:false }).select('Email')
        if (!findEmail) {
            res.json({ message: `Email Not Exsit .............${findEmail}` })
        }
        else {
            const token = jwt.sign({ id: findEmail._id }, process.env.ConfirmEmailToken, { expiresIn: '1h' })
            const url = `${req.protocol}://${req.headers.host}${process.env.basUrlName}/auth/NewPassword/${token}`
            const message = `<a href='${url}'> Followe Me To Change Your Password</a>`
            SendEmail(Email, 'Change Password', message)
            res.json({ message: `Don ............ `})
        }
    } catch (Errore) {
        res.json({ message: `Catch Errore............ ${Errore}` })
    }
}
export const NewPassword = async (req, res) => {
    const { token } = req.params
    const { Password } = req.body
    const decoded = jwt.verify(token, process.env.ConfirmEmailToken)
    const hasPassowrd = await bcrypt.hash(Password, parseInt(process.env.hasRound))
    const finduser = await userModel.updateOne({ _id: decoded.id, ConfirmEmail: true }, { Password:hasPassowrd })
    finduser.modifiedCount ? res.json({ message: `Changed Password` }) : res.json({ message: `Ms To Change Password` })
}
