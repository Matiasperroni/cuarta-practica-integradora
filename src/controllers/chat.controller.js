import { messageRepository, productRepository } from "../repositories/index.js";
import CustomError from "../utils/errors/CustomError.js";

export const sendProductList = async () => {
    try {
        const products = await productRepository.getProducts();
        if (!products) {
            CustomError.createError({
                name: "Request error",
                cause: "We´ll look into this.",
                code: EErrors.ROUTING_ERROR,
                message: "Could not get all messages",
            });
        }
        return products;
    } catch (error) {
        req.logger.error(`Interval server error getting products ${error}`);
    }
};

// export const addMessage = async (user, message) => {
//     const messageAdded = await messageRepository.addMessage(user, message);
//     console.log("sera que me rompo aca?", messageAdded);
//     return messageAdded;
// };
// export const getMessages = async () => {
//     const messages = await messageRepository.getMessages();
//     return messages;
// };

export const ioConnection = async (socket) => {
    console.log("Nuevo cliente conectado");
    const products = await sendProductList();
    socket.emit("sendProducts", products);

    socket.on("message", async (data) => {
        let user = data.user;
        let message = data.message;
        await messageRepository.addMessage(user, message);
        const messages = await messageRepository.getMessages();
        socket.emit("messageLogs", messages);
    });
};

export const realTimeProducts = async (req, res) => {
    res.render("realTimeProducts");
};
