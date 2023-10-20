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
    //Lo envio asi porque enviando un solo objeto user y queriendo acceder a las propiedades me tira un error de handlebars y la manera que encontre de solucionarlo fue esta.
    const first_name = req.user.first_name;
    const last_name = req.user.last_name;
    const email = req.user.email;
    const age = req.user.age;
    const role = req.user.role;
    res.render("current", {
        first_name,
        last_name,
        email,
        age,
        role
    });
};

export const landing = (req, res) => {
    res.render("landing")
}