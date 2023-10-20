import { setLastConnection } from "../controllers/sessions.controller.js";

export const isConnected = (req, res, next) => {
    if (req.user) return res.redirect("/api/products");
    next();
};

export const isDisconnected = (req, res, next) => {
    if (!req.user) return res.redirect("/login");
    next();
};

export const isAdminOrPremium = (req, res, next) => {
    const user = req.user;
    if (user?.role === "Admin" || user?.role === "Premium") {
        next();
    } else {
        res.status(401).send({ error: "Unauthorized" });
    }
};

export const isUserPremiumOrAdmin = (req, res, next) => {
    const user = req.user || req.session.user;
    console.log("soy el user del middleware", user);
    if (!user) res.status(401).redirect("/login");
    if (
        user?.role === "Admin" ||
        user?.role === "Premium" ||
        user?.role === "User"
    ) {
        next();
    } else {
        req.logger.error(
            "Users with the 'user' role do not have permissions to perform this action"
        );
        res.status(401).send(
            "Error: You do not have permissions to perform this action"
        );
    }
};

export const isUserAvailableToAddToCart = (req, res, next) => {
    if (
        req?.user?.role === "User" ||
        req?.user?.role === "Premium"
    ) {
        next();
    } else {
        return res
            .status(403)
            .send({ error: "You must be an user to add products to cart." });
    }
};

export const setLastConnectionMiddleware = async (req, res, next) => {
    let email;
    if(!req?.session?.user?.email) {
        email = req.user.email;
    } else {
        email = req.session.user.email;
    }
    await setLastConnection(email);
    next();
};
