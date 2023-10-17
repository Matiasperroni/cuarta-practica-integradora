import MessagesManagerDB from "../dao/mongo/messages.manager.js";
// import userModel from "../dao/models/users.schema.js";
const messageManager = new MessagesManagerDB();

export const addMessage = async (req, res) => {
    let user = req.params.user;
    let message = req.params.message;
    const messages = await messageManager.addMessage(user, message);
    res.send(messages);
};

export const getMessages = async (req, res) => {
    console.log("estas en el chat");
    const chat = await messageManager.getMessages();
    // res.send(chat)
    res.render("chat", { chat });
};

export const register = (req, res) => {
    res.render("register");
};

export const login = (req, res) => {
    res.render("login");
};

export const profile = (req, res) => {
    res.render("current", {
        user: req.session.user,
    });
};
