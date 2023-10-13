export default class MessageRepository {
    constructor(dao) {
        this.dao = dao;
    }
    addMessage = async (user, message) => {
        const messageToAdd = await this.dao.addMessage(user, message)
        return messageToAdd;
    }
    getMessages = async () => {
        const message = await this.dao.getMessages()
        return message;
    }
}