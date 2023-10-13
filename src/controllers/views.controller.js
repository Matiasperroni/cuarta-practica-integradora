import MessagesManagerDB from "../dao/mongo/messages.manager.js";
import userModel from "../dao/models/users.schema.js";
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
export const changeRole = async (req, res) => {
    try {
        const userID = req.params.uid;
        const user = req.session.user;
        let newRole;
        if (user?.role === "User") {
            newRole = "Premium";
        } else if (user?.role === "Premium") {
            newRole = "User";
        } else {
            res.status(404).send("User not found");
        }
        console.log(newRole, "a ver");
        if (newRole === "User" || newRole === "Premium") {
            const updatedUser = await userModel.findByIdAndUpdate(
                userID,
                { role: newRole },
                { new: true }
            );
            if (updatedUser) {
                res.status(200).send(updatedUser);
            } else {
                res.status(404).send("User not found.");
            }
        } else {
            res.status(400).send("Invalid role.");
        }
    } catch (error) {
        req.logger.error(`Internal error changing role. ${error}`);
        res.status(500).send(`Internal error changing role. ${error}`);
    }
};
