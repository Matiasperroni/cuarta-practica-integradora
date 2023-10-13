import messagesModel from "../models/messages.schema.js";

class MessagesManagerDB {
    constructor() {
        this.messagesModel = messagesModel;
    }
    async addMessage(user, message) {
        console.log("AH?", user, message);
        try {
            const messages = await this.messagesModel.create({
                user: user,
                message: message,
            });
            console.log("a ver si llegue aca", messages);
            return messages;
        } catch (error) {
            throw new Error("Could not add message");
        }
    }
    async getMessages() {
        try {
            const messages = await this.messagesModel.find().lean();
            return messages;
        } catch (error) {
            throw new Error("Couldn´t get messages");
        }
    }
}
export default MessagesManagerDB;
