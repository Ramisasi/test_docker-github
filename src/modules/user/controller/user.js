import userModel from "../../../DB/modules/user.Model.js"
import bcrypt from 'bcryptjs'
import { SendEmail } from "../../../Serves/auth.js"
import jwt from "jsonwebtoken"

export const userProfil = async (req, res) => {
    const userdata = await userModel.findById(req.user._id)
    res.json({ message: `Wellcom In Saraha Applction .............`, userdata })
}
export const updateProfile = async (req, res, nex) => {
    const id = req.user._id
    const { FirstName, lastName, Email, Age, Phone } = req.body
    try {
        if (!Email) {
            const findUser = await userModel.findByIdAndUpdate(id, { FirstName, lastName, Age, Phone }, { new: true })
            if (!findUser) {
                res.json({ message: "In-Valid Account1" })
            }
            else {
                res.json({ message: "Don1", findUser })
            }
        }
        else {
            const findUser = await userModel.findByIdAndUpdate(id, { FirstName, lastName, Email, Age, Phone, ConfirmEmail: false }, { new: true })
            const token = jwt.sign({ id: findUser._id }, process.env.ConfirmEmailToken, { expiresIn: '1h' })
            const url = `${req.protocol}://${req.headers.host}${process.env.basUrlName}/auth/ConfirmEmil/${token}`
            const message = `<a href='${url}'> Followe Me To Confirm Email</a>`
            SendEmail(Email, 'Confirm Email', message)
            if (!findUser) {
                res.json({ message: "In-Valid Account" })
            }
            else {
                res.json({ message: "Don", findUser })
            }
        }
    } catch (error) {
        res.json({ message: "catch erroe", error })
    }

}
export const deleteProfil = async (req, res) => {
    const userdata = await userModel.findByIdAndDelete(req.user._id)
    userdata ? res.json({ message: `Delete succeeded`, userdata }) : res.json({ message: `In-Valid Account`, userdata })
}
export const getAllUser = async (req, res) => {
    const userdata = await userModel.find({})
    res.json({ message: `Users `, userdata })
}
export const signOut = async (req, res) => {
    const finduser = await userModel.findByIdAndUpdate(req.user._id, { isOnline: false })
    const token = jwt.sign({ id: finduser._id, isLogin: false }, process.env.TokenSignature)
    res.json({ message: 'don', token })
}
export const softDelete = async (req, res) => {
    const finduser = await userModel.findByIdAndUpdate(req.user._id, { isDelete: true })
    res.json({ message: 'don', finduser })
}
export const updatePasswordProfile = async (req, res, nex) => {
    const id = req.user._id
    const { OldPassword, NewPassword } = req.body
    try {
        const findUserPass = await userModel.findById(id).select("Password")
        const comparePassowrd = await bcrypt.compare(OldPassword, findUserPass.Password)
        if (!comparePassowrd) {
            res.json({ message: "MsPassword" })
        }
        else {
            const hasPassowrd = await bcrypt.hash(NewPassword, parseInt(process.env.hasPassowrd))
            const findUser = await userModel.findByIdAndUpdate(id, { Password: hasPassowrd }, { new: true })
            if (!findUser) {
                res.json({ message: "In-Valid Account1" })
            }
            else {
                res.json({ message: "Don1", findUser })
            }

        }

    } catch (error) {
        res.json({ message: "catch erroe", error })
    }

}
export const lastSeen = async (req, res) => {
    try {
        const { id } = req.params
        const finduser = await userModel.findOne({ _id: id, isOnline: false }).select("-_id updatedAt")
        finduser ? res.json({ message: `last Seen At ${finduser.updatedAt}` }) : res.json({ message: ' MsAccount', finduser })
    } catch (error) {
        res.json({ message: "catch erroe", error })
    }
}
export const ShearProfile = async (req,res) =>{
    const id = req.user._id
    const url = `${req.protocol}://${req.headers.host}${process.env.basUrlName}/user/ViewProfil/${id}`
    const message = `<a href='${url}'> Followe My Profile</a>`
    res.json({ message: `Followe My Profile`, message })
}
export const ViewProfil = async (req,res) =>{
    const { id } = req.params
    const finduser = await userModel.findOne({ _id:id, isDelete: false }).select("-_id FirstName lastName Email Age Phone")
    finduser? res.json({ message: 'Welcom Im My Profile' , finduser}) : res.json({ message: 'In-Valid Account'})
}