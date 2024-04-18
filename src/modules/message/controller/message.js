import userModel from "../../../DB/modules/user.Model.js"
import messageModel from "../../../DB/modules/message.Model.js"

export const sendMessage = async (req, res) => {
    try {
        const { Text } = req.body;
        const { id } = req.params;
        const user = await userModel.findById(id).select("FirstName Email")
        if (!user) {
            res.json({ message: "In-valid reciver" })
        } else {
            const newMessage = new messageModel({ Text, RecievedId:id })
            const savedMessage = await newMessage.save()
            res.json({ message: "Done", savedMessage })
        }
    } catch (error) {
        res.json({ message: "catch error", error })
    }

}
export const softDelete = async (req, res) => {
    const {id} = req.params
    const finduser = await messageModel.findOneAndUpdate({_id:id ,RecievedId:req.user._id}, { isDelete: true })
    finduser?res.json({ message: 'don', finduser }):res.json({ message: 'No Message For This User'})
}
export const getMessageById = async (req, res) => {
    const AllMessage = await messageModel.find({RecievedId:req.user._id, isDelete: false })
    AllMessage?res.json({ message: 'All Message', AllMessage }):res.json({ message: 'No Message For This User'})
}